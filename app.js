const express = require('express')
const models = require('./models')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const settings = require('./settings.json')

mongoose.connect(`mongodb://${settings.dbuser}:${settings.dbpassword}@${settings.dburl}`)

const app = express()
app.set('port', (process.env.PORT || 5000))
app.use( bodyParser.json()) 

app.post('/persons', function (req, res) {
  console.log(req)
  let person = new models.Person({
    name: req.body.name,
    age: req.body.age
  })
  person.save(function (err, person) {
    if (err) {
      res.json({error: err})
    } else {
      res.json(person)
    }
  })
})

app.get('/persons', function (req, res) {
  models.Person.find(function (err, persons) {
    if (err) {
      res.json({error: err})
    } else {
      res.json(persons)
    }
  })
})

app.listen(app.get('port'), function() {
  console.log('Things are happening on port: ', app.get('port'));
});
