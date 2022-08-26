const express = require('express')
const cors = require('cors')
const Person = require('./models/person')


/* Loggaus jokaisen kutsun yhteydessä: */
var morgan = require('morgan')
morgan.token('requestbody', function (req, res) { return JSON.stringify(req.body) })


const app = express()

app.use(cors())
app.use(express.json()) 
app.use(express.static('build'))   /* UI/frontend */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestbody'))
 
 

/********************************************************************/


app.get('/info', (req,res) => {

    Person.find({})
    .then(resp => {
        const date = new Date()
        const html = `<p>Phonebook has info for ${resp.length} people</p>` + 
                    `<p> ${date.toString()}</p>`
        return res.send(html)
    })
    .catch(error => next(error))
})


app.get('/api/persons', (req, res, next) => {
    Person.find({})
    .then(resp => {
        res.json(resp)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req,res,next) => {
    if (req.body.name && req.body.number && req.body.name.length>0 && req.body.number.length>0) {
        /* const found = persons.find(p => p.name === req.body.name)  */
        if (true/*!found*/) {
            const person = new Person({
                name:req.body.name, 
                number:req.body.number 
            })
            person.save(person)
            .then((reply) => {
                console.log(reply)
                return res.json(person)
            })
            .catch(err => next(err))

        } else {
            return res.status(400).json({error:'Person already in phonebook!'})
        }
    } else {
        return res.status(400).json({error:'Both name and number are required!'})
    }
})

app.get('/api/persons/:id', (req,res,next) => {
    const id = req.params.id
    Person.findById(id)
    .then(reply => res.json(reply))
    .catch(err => next(err))
})

app.put('/api/persons/:id',(req,res,next) => {
    const id = req.params.id
    const person = req.body
    if (person) {
       Person.findByIdAndUpdate(id,person,{new:true})
       .then(updated => {
            res.json(updated)
       })
       .catch(err => next(err))
    } 
})

app.delete('/api/persons/:id', (req,res,next) => {
    const id = req.params.id
    console.log(id)
    Person.findByIdAndRemove(id)
    .then( res.send())
    .catch(err => next(err))  
})

/********************************************************************
 Jos mikään määritellyistä routeista ei vastaa requestia, niin 
   tämä after-middleware tulee hätiin : */

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

/********************************************************************/
// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!

const mongoOperationErrorHandler = (error, request, response, next) => {
    console.error('Error from  mongoOperationErrorHandler middleware:')
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name === 'ValidationError') {
        
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
  
app.use(mongoOperationErrorHandler)

/********************************************************************/

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})