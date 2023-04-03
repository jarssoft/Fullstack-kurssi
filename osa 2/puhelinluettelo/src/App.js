import personService from './services/persons'
import { useState, useEffect } from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    margin: '10px'    
  }

  return (
    <div style={footerStyle}>
      {message}
    </div>
  )
}

const Person = (props) => {  
  return (
    <li>
      <button onClick={props.onRemove}>poista</button>
      {props.person.name} {props.person.number} 
    </li>)
}

const Input = ({value, onChange, text}) => { 
  return ( 
    <div>
        {text} :  
        <input 
          type="text"
          value={value} 
          onChange={onChange} 
        />
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findText, setFindText] = useState('')
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    personService
      .getAll()      
      .then(response => {        
        setPersons(response.data)
      })
  }, [])

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)        
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()

    let newPerson = {
      name: newName, 
      number: newNumber 
    }

    let sama = persons.find((p)=>(p.name===newName));

    if(sama===undefined){      
      personService
        .create(newPerson)
        .then(returnedNote => {        
          console.log(returnedNote);
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNewNumber('')
          showMessage(`Lisättiin ${newPerson.name}`)
      })
    }else{
      if(window.confirm(`Korvataanko ${newName}?`)){
        personService
          .update(sama.id, newPerson)
          .then(response => {
              newPerson.id=sama.id            
              setPersons(persons.map(p => (p.id != sama.id) ? p : newPerson));
              setNewName('')
              setNewNumber('')   
              showMessage(`Korvattiin ${newPerson.name}`)
        })
      }
    }
  }

  const removeName = (person) => {
    if( window.confirm(`Poistetaanko ${person.name}?`)){
      personService
        .remove(person.id)
        .then(response => {        
          console.log(`${person} removed`);
          setPersons(persons.filter(p => (p.id !=  person.id)))
          showMessage(`Poistettiin ${person.name}`)
          })
    }
  }

  const changeHandler = (hander) => ((event) => hander(event.target.value))
  const removeHandler = (person) => (() => removeName(person))

  return (
    <div>

      <h2>Puhelinluettelo</h2>

      <form>
        <Input 
            text={"Etsi nimeä"} 
            value={findText} 
            onChange={changeHandler(setFindText)} 
        />
      </form>

      <h2>Lisäys</h2>

      <Notification message={message} />

      <form onSubmit={addName}>
        <Input 
            text={"Nimi"} 
            value={newName} 
            onChange={changeHandler(setNewName)} 
        />
        <Input 
            text={"Numero"} 
            value={newNumber} 
            onChange={changeHandler(setNewNumber)} 
        />  
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>

      <h2>Numerot</h2>
      
      <ul>
      {
        findText == ''
          ? persons
              .map(person => 
              <Person person={person} key={person.name} onRemove={removeHandler(person)} />) 
          : persons
              .filter(person => (person.name.indexOf(findText) >= 0))
              .map(person => 
              <Person person={person} key={person.name} onRemove={removeHandler(person)} />) 
      }
      </ul>

    </div>
  )

}

export default App