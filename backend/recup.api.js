
const express = require('express');
const mongoose = require('mongoose');
const https = require('https');

const app = express();
const port = 3000;

// Définition du schéma de jeu
const gameSchema = new mongoose.Schema({
  name: String,
  released: String,
  background_image: String,
});

// Création du modèle de jeu
const Game = mongoose.model('Game', gameSchema);

function get_all_games(api_key) {
  let url = "https://api.rawg.io/api/games?key=" + api_key;
  let all_games = [];

  return new Promise((resolve, reject) => {
    const recursiveFetch = (url) => {
      https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const response = JSON.parse(data);
          all_games = all_games.concat(response.results);

          if (response.next) {
            recursiveFetch(response.next);
          } else {
            resolve(all_games);
          }
        });
      }).on('error', (err) => {
        reject(err);
      });
    };

    recursiveFetch(url);
  });
}

app.get('/fetchGames', async (req, res) => {
  try {
    const games = await get_all_games('b5aaf4f7aabb44f29c004df92253368a');
    games.forEach(async (game) => {
      const gameDoc = new Game({
        name: game.name,
        released: game.released,
        background_image: game.background_image,
      });

      await gameDoc.save();
    });

    res.send('Jeux récupérés et sauvegardés dans la base de données avec succès !');
  } catch (err) {
    res.status(500).send('Une erreur s\'est produite lors de la récupération des jeux : ' + err.message);
  }
});
/*
mongoose.connect('mongodb://localhost:27017/gamesDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Le serveur fonctionne sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Échec de la connexion à MongoDB', error);
  });
*/
/////////////////////////////////
/*
const express = require('express');
const mongoose = require('mongoose');

const url = "https://api.rawg.io/api/games?key=b5aaf4f7aabb44f29c004df92253368a"

mongoose.connect('mongodb://localhost:27017/games');

let nextGameListUrl = null;

fetch(url)
    .then(response => response.json())
    .then(data => {
        // Process the data here
        //console.log(data);

        nextGameListUrl = data.next ? data.next : null;
        let gamesList = [];

        while (nextGameListUrl !== null) {
            gamesList = data.results;

            
            
        } 

    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });
*/


/*
const express = require('express');
//const fetch = require('node-fetch');

const app = express();
const port = 3002;

app.get('/', (req, res) => {
    const APIKEY = 'b5aaf4f7aabb44f29c004df92253368a';
    const url = `https://api.rawg.io/api/games?key=${APIKEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const games = data.results;

            const gameItems = games.map(game => {
                const platformStr = getPlatformStr(game.parent_platforms);
                return
                
                `
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="item">
                            <img src="${game.background_image}" alt="${game.name} image">
                            <h4 class="game-name">${game.name}<br><span class="platforms">${platformStr}</span></h4>
                            <ul>
                                <li><i class="fa fa-star"></i> <span class="rating">${game.rating}</span></li>
                                <li><i class="fa-regular fa-calendar"></i> <span class="date">${game.released}</span></li>
                            </ul>
                        </div>
                    </div>
                `;
            });

            res.send(gameItems.join(''));
        })
        .catch(error => {
            console.log("An error occurred:", error);
            res.status(500).send('An error occurred');
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function getPlatformStr(platforms) {
    const platformStr = platforms.map(pl => pl.platform.name).join(", ");
    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr;
}
*/
 