import { useState } from 'react'

const Person = ({person}) => {  
  return (<div>{person.name} {person.number}</div>)
}

const Input = ({value, onChange, text}) => { 
  return ( 
    <div>
        {text} :  
        <input 
        value={value} 
        onChange={onChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+31-231-12314' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if(persons.find((p)=>(p.name===newName))===undefined){
      let newPerson = {
          name: newName, 
          number: newNumber 
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }else{
      alert(`${newName} on jo listassa`)
    }
  }

  const changeHandler = (hander) => ((event) => hander(event.target.value))

  console.log(persons);

  return (
    <div>

      <h2>Puhelinluettelo</h2>
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
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numerot</h2>
      {persons.map(person => 
          <Person person={person} key={person.name} />
      )}

    </div>
  )

}

export default App
