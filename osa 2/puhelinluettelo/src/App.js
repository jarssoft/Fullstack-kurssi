import personService from './services/persons'
import { useState, useEffect } from 'react'

const Person = ({person}) => {  
  return (<li>{person.name} {person.number}</li>)
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
  
  useEffect(() => {
    personService
      .getAll()      
      .then(response => {        
        setPersons(response.data)
      })
  }, [])    
  
  const addName = (event) => {
    event.preventDefault()
    if(persons.find((p)=>(p.name===newName))===undefined){
      let newPerson = {
          name: newName, 
          number: newNumber 
      }

      personService
        .create(newPerson)
        .then(returnedNote => {        
          //setNotes(notes.concat(returnedNote))        
          //setNewNote('')
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')    
      })

    }else{
      alert(`${newName} on jo listassa`)
    }
  }

  const changeHandler = (hander) => ((event) => hander(event.target.value))

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
              <Person person={person} key={person.name} />) 
          : persons
              .filter(person => (person.name.indexOf(findText) >= 0))
              .map(person => 
              <Person person={person} key={person.name} />) 
      }
      </ul>

    </div>
  )

}

export default App
