var axios = require("axios");
require("dotenv").config();

const APIKEY = process.env.APIKEY;

const url = `https://api.rawg.io/api/games?key=${APIKEY}&ordering=-added`;

let nextGameListUrl = null;

const controller = {
  getGamesFirstPage: async (req, res, next) => {
    try {
      const response = await axios.get(url);
      const games = response.data.results;
      nextGameListUrl = response.data.next ? response.data.next : null;

      res.json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },

  getGamesNextPage: async (req, res, next) => {
    try {
      const response = await axios.get(nextGameListUrl);
      const games = response.data.results;
      nextGameListUrl = response.data.next ? response.data.next : null;

      res.json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
  
  getMainPageGame: async (req, res, next) => {
    const id = req.params.id;
    const url = `https://api.rawg.io/api/games/${id}?key=${APIKEY}`;
    try {
      const response = await axios.get(url);
      const game = response.data;
      res.json(game);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

module.exports = controller;
