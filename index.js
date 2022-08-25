const express = require('express')
var morgan = require('morgan')

const cors = require('cors')


morgan.token('requestbody', function (req, res) { return JSON.stringify(req.body) })




const app = express()

app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestbody'))

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
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]


/********************************************************************/


app.get('/info', (req,res) => {

    const date = new Date()

    const html = `<p>Phonebook has info for ${persons.length} people</p>` + 
                 `<p> ${date.toString()}</p>`
    return res.send(html)
})


app.get('/api/persons', (req, res) => {
    return res.json(persons)
})

app.post('/api/persons', (req,res) => {
    if (req.body.name && req.body.number && req.body.name.length>0 && req.body.number.length>0) {
        const found = persons.find(p => p.name === req.body.name)
        if (!found) {
            const person = {
                name:req.body.name, 
                number:req.body.number,
                id:Math.floor(Math.random()*10**12)
            }
            persons.push(person);
            return res.json(person)
        } else {
            return res.status(400).json({error:'Person already in phonebook!'})
        }
    } else {
        return res.status(400).json({error:'Both name and number are required!'})
    }
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const found = persons.find(p => p.id === id)

    if (found) {
        return res.json(found)
      } else {
        return res.status(404).end()
      }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
  
    return res.status(204).end()
})

/********************************************************************
 Jos mikään määritellyistä routeista ei vastaa requestia, niin 
   tämä after-middleware tulee hätiin : */

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

/********************************************************************/

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})