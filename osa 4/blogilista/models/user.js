const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:  {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    }
  }).set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

module.exports = mongoose.model('User', userSchema)