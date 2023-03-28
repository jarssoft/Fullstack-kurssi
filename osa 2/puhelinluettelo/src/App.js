import { useState } from 'react'

const Person = ({person}) => {  
  return (<div>{person.name} {person.number}</div>)
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

  console.log(persons);

  return (
    <div>

      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: <input 
              value={newName} 
              onChange={(event)=>(setNewName(event.target.value))} />
        </div>
        <div>
          numero: <input 
              value={newNumber} 
              onChange={(event)=>(setNewNumber(event.target.value))} />
        </div>

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
