const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  let beersFromApi
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render("beers", {beer: beersFromApi}))
  .catch((err) => console.log(err))
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromApi => res.render("random-beer", {beer: responseFromApi}))
  .catch((err) => console.log(err))
})

app.get('/beers/:id', (req, res) => {
  let beerId = (req.params.id)
  beerId.slice(5)

  punkAPI
  .getBeer(beerId)
  .then(beerPage => res.render("beer-page", {beer: beerPage}))
  .catch((err) => console.log(err))
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
