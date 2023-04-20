const http = require('http')

let notes = [
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

const app = http.createServer((request, response) => {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(notes))
    })
    
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
