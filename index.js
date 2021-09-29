require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const BSON = require('bson');

/*
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
*/
const app = express()
const cors = require('cors')



//==================================================================================================//
//  MIDDLEWARE:

app.use(cors())
app.use(express.json())
morgan.token('requestbody', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestbody'))



const Person = require('./models/person')
//const { Mongoose } = require('mongoose')

//==================================================================================================//
//  ROUTES:

app.use(express.static('UIbuild'))

app.get('/info', (request, response, next) => {
  const timestamp = Date.now()
  const date_obj = new Date(timestamp)
  Person.find({})
  .then(persons => {
    let len = 0
    if (persons) {
      len = persons.length
    }
    response.send(`<p>Phonebook has info for ${len} people.</p> 
    <p>${date_obj.toString()}</p>`)
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
})

app.get('/api/persons', (request,response,next) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        response.json(persons)
      } else {
        response.status(404).end()  // 404: 'not found'
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
      //response.status(500).end()  // 500: 'internal server error'  // 400:'bad request'
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.find({ _id: BSON.ObjectId(request.params.id)})
  .then(person => {
    response.json(person)
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
})

app.put('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndUpdate(request.params.id, { number: request.body.number }, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

/*
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
*/
//--------------------------------------------------------------------------------------------------//
app.delete('/api/persons/:id', (request, response) => {

  Person.findByIdAndRemove(request.params.id)
  .then(person => {
    response.status(204).end()
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
})
/*
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)
  response.status(204).end()
})
*/
//--------------------------------------------------------------------------------------------------//
app.post('/api/persons', (request, response, next) => {
  if (request.body.name && request.body.number) {
    const person = new Person({
        "name":request.body.name,
        "number":request.body.number
    })
    person.save()
      .then(result => {
        console.log('New person saved.')
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
})
/*
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
*/

//==================================================================================================//
//  MIDDLEWARE:

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

//==================================================================================================//

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


