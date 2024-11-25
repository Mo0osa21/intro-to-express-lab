const express = require('express')
const val = require('validator')
const app = express()

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

app.get('/greetings/:name', (req, res) => {
  res.send(`<h1>Hello there, ${req.params.name}!</h1>`)
})

app.get('/roll/:num', (req, res) => {
  if (val.isNumeric(req.params.num)) {
    const number = Math.floor(Math.random() * (req.params.num - 1 - 1 + 1) + 1)
    res.send(`${number}`)
  } else {
    res.send('You must specify a number')
  }
})

app.get('/shoes', (req, res) => {
  const minPrice = req.query.min
  const maxPrice = req.query.max
  const type = req.query.type

  let filteredArray = []

  shoes.forEach((shoe) => {
    let valid = true

    if (minPrice && shoe.price < minPrice) {
      valid = false
    }

    if (maxPrice && shoe.price > maxPrice) {
      valid = false
    }

    if (type && shoe.type !== type) {
      valid = false
    }

    if (valid) {
      filteredArray.push(shoe)
    }
  })

  res.json(filteredArray.length > 0 ? filteredArray : shoes)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
