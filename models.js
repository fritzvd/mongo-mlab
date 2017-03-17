const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

module.exports = {
  Person: mongoose.model('Person', personSchema)
}
