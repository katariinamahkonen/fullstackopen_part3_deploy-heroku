
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: { type: String, minLength: 3, required: true, unique:true },
    number: { 
      type: String, 
      validate: {
        validator: function(v) {
          return /^(\d|\d\s*){8,15}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number. Must be 8-15 digits!`
      },
      required:true
    }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  })
})

module.exports = mongoose.model('Person', personSchema)