
require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('type', function (req, res) {
    return req.method ==="POST" ? JSON.stringify(req.body) : undefined
})

//app.use(morgan('tiny'))
//app.use(morgan('type'))

app.use(morgan('tiny'))
app.use(morgan(':type'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    response.json(person)
  })
  .catch(error => next(error))
})

/*
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
*/

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
    return Math.floor(Math.random() * 100000) + 1;
}

/*
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
    response.json(person)
   
})
*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
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

/*app.get('/api/persons', (req, res) => {
  res.json(persons)
})
*/

/*
app.get('/api/persons', (req, res) => {
  
  console.log('phonebook:')

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    //mongoose.connection.close()
  })

})
*/

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

/*
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.error(`Oma virhe : ${error.name}`)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.error(`Validointivirhe`)
    return response.status(400).json({ error: error.message })  
    //return response.status(400).send({ error: 'Validointivirhe' })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

//const PORT = process.env.PORT || 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})