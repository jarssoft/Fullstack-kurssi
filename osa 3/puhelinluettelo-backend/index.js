const express = require('express')
var morgan = require('morgan')

const app = express()

morgan.token('type', function (req, res) {
    return req.method ==="POST" ? JSON.stringify(req.body) : undefined
})

//app.use(morgan('tiny'))
//app.use(morgan('type'))

app.use(morgan('tiny'))
app.use(morgan(':type'))

app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendick",
      "number": "39-23-6423122",
      "id": 4
    }
]

app.get('/api/persons/:id', (request, response) => {    
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()  
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)  
    response.status(204).end()
  })



const generateId = () => {
    return Math.floor(Math.random() * 100000) + 1;
}

app.post('/api/persons', (request, response) => {

    const body = request.body
    
    if (!body.name) {
        return response.status(400).json({ 
            error: 'Nimi puuttuu!' 
        })
    }

    if (!body.number) {
        return response.status(400).json({ 
            error: 'Numero puuttuu!' 
        })
    }
    
    if(persons.find(person => person.name === body.name)){
        return response.status(400).json({ 
            error: 'Nimi on jo luettelossa!' 
        })
    }
 
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(persons)
   
})

app.get('/info', (req, res) => {

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  res.send(
    `Phonebook has info for ${persons.length} people.
    <br/>
    ${today.toISOString()}
    `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})