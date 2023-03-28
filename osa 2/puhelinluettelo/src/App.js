import { useState } from 'react'

const Person = ({name}) => {
  return (<div>{name}</div>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()    
    if(persons.find((p)=>(p.name===newName))===undefined){
      let newPerson = { name: newName }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }else{
      alert(`${newName} on jo listassa`)      
    }
  }

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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {persons.map(person => 
          <Person name={person.name} key={person.name} />
      )}
    </div>
  )

}

export default App
