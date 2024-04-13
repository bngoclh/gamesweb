var express = require("express");
const controller = require("../controllers/games.controller");
const router = express.Router();

/*
var axios = require('axios');

var app = express.Router();

const APIKEY = 'b5aaf4f7aabb44f29c004df92253368a';
const url = `https://api.rawg.io/api/games?key=${APIKEY}&ordering=-added`

let nextGameListUrl = null;


app.get('/', function (req, res, next) {
  res.render('app.index.html', { title: 'Express' });
});

app.get('/getGames', async function (req, res, next) {
  try {

    const response = await axios.get(url);
    const games = response.data.results;
    nextGameListUrl = response.data.next ? response.data.next : null;
   
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Get games by custom URL
app.get('/getGames/nextPage', async function (req, res, next) {

    try {

        const response = await axios.get(nextGameListUrl);
        const games = response.data.results;
        nextGameListUrl = response.data.next ? response.data.next : null;
       
        res.json(games);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
});



// Get game by ID
app.get('/getGameById/:id', async function (req, res, next) {
  // Check if the id is valid
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}`);
    const game = response.data;
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Game not found' });
  }
});

module.exports = app;
*/
//////////////////////////////////////////////////////////////
router.route("/FirstPage").get(controller.getGamesFirstPage);

router.route("/NextPage").get(controller.getGamesNextPage);

router.route("/MainPageGame/:id").get(controller.getMainPageGame);

module.exports = router;
