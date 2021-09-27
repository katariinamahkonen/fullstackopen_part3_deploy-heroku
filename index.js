const express = require('express')
const morgan = require('morgan')

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
  {
    "id": 5,
    "name": "Huu Haa",
    "number": "1234567"
  }
]

const app = express()
const cors = require('cors')

//==================================================================================================//
//  MIDDLEWARE:

app.use(cors())
app.use(express.json())
morgan.token('requestbody', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestbody'))
app.use(express.static('UIbuild'))

//==================================================================================================//
//  ROUTES:

app.get('/info', (request, response) => {
  const timestamp = Date.now()
  const date_obj = new Date(timestamp)
  response.send(`<p>Phonebook has info for ${phonebook.length} people.</p> 
  <p>${date_obj.toString()}</p>`)
})

app.get('/api/persons', (request,response) => {
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(person => person.id === id)  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
//--------------------------------------------------------------------------------------------------//
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)
  response.status(204).end()
})
//--------------------------------------------------------------------------------------------------//
app.post('/api/persons', (request, response) => {
  const newId = Math.floor(Math.random() * 1000)
  if (request.body.name && request.body.number) {
    const oldname =  phonebook.find(person => person.name === request.body.name)
    if (!oldname) {
      const person = {"id":newId,
      "name":request.body.name,
      "number":request.body.number}
      phonebook = phonebook.concat(person)
      response.json(person)
    } else {
      response.status(400).json({error:`${oldname.name} already exists in the phonebook.`})
    }
  } else {
    response.status(400).json({ error: `Person must have a name and number`})
  }
})

//==================================================================================================//
//  MIDDLEWARE:

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//==================================================================================================//

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})