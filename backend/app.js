require("./models/db")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
var app = express();
const exampleRouter = require("./controllers/example");
const middleware = require("./utils/middleware");
//const logger = require("./utils/logger");
const axios = require('axios');

var indexRouter = require('./index');
var connectRouter = require('./connect');
var gameRouter = require('./game');

const gamesRouter = require("./routes/games.router");
const usersRouter = require("./routes/users.router");
const commentsRouter = require('./routes/comments.router');

const aiRouter = require('./routes/ai.router');



app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

//app.use(middleware.requestLogger);

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', connectRouter);
app.use('/index', indexRouter);
app.use('/game', gameRouter);


/*
app.get('/', function (req, res, next) {
  res.render('../app/index.html', { title: 'Express' });
});
*/
app.use('/games', gamesRouter);

app.use("/users", usersRouter);

app.use("/comments", commentsRouter);

app.use("/openAI", aiRouter)


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}, http://localhost:${config.PORT}/login`);
});

module.exports = app;

//app.use("/api/example", exampleRouter);

// Catch-all route (so when the user refreshes the page, it doesn't return a 404)
/*
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
*/

/*
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


// Get games by custom URL
app.get('/getGames/:url', async function (req, res, next) {
  const customUrl = req.params.url;
  try {
    const response = await axios.get(customUrl);
    const games = response.data.results;
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Receive URL
app.post('/receiveUrl', function (req, res, next) {
  const url = req.body.url;
  // Process the URL
  // ...
  res.json({ message: 'URL received successfully' });
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

*/

