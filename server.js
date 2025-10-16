/**
 * Midterm API Project - COMP229
 *
 * Challenge: Implement the API logic for managing a collection of video games!
 *
 * Here's the setup:
 * A server is already running on port 3000 with an array of game objects.
 * Your mission is to implement the missing logic for each of the endpoints below.
 *
 * Endpoints:
 * 1. GET /api/games       - Retrieve the full list of games.
 * 2. GET /api/games/filter?genre=[genre name] - Retrieve games by genre match.
 * 3. GET /api/games/:id   - Retrieve a game by its index.
 * 4. POST /api/games      - Add a new game to the library.
 * 5. PUT /api/games/:id   - Update a game by its index.
 * 6. DELETE /api/games/:id - Remove a game from the library by its index.
 *
 * The array of games is already defined for you, but you need to bring the logic
 * to life. Test your work using tools like Postman, Thunder Client, or Insomnia.
 *
 * Submission Requirements:
 * 1. Screenshots: Provide one per endpoint, showing the request details and a
 *    successful response with the correct status code.
 * 2. Code Submission: Zip your project, share the repo link, and ensure your
 *    personalized games are present.
 *
 * Good luck, and may your code be bug-free!
 */

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of game objects
let games = [
  { title: 'The Legend of Zelda: Breath of the Wild', genre: 'Adventure', platform: 'Nintendo Switch', year: 2017, developer: 'Nintendo' },
  { title: 'God of War', genre: 'Action', platform: 'PlayStation 4', year: 2018, developer: 'Santa Monica Studio' },
  { title: 'Hollow Knight', genre: 'Metroidvania', platform: 'PC', year: 2017, developer: 'Team Cherry' },
  { title: 'Forza Horizon 5', genre: 'Racing', platform: 'Xbox Series X|S', year: 2021, developer: 'Playground Games' },
  { title: 'Stardew Valley', genre: 'Simulation', platform: 'Nintendo Switch', year: 2016, developer: 'ConcernedApe' },

  // Personalized additions
  { title: 'CyberQuest', genre: 'RPG', platform: 'PC', year: 2022, developer: 'Suha Od' },
  { title: 'SkyRunners', genre: 'Action', platform: 'Xbox', year: 2023, developer: 'Suha Od' }
];

// Set the port for the server
const PORT = 3000;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints

// GET /api/games
// Description: Get all games
// Task: Implement logic to return the full list of games
app.get('/api/games', (req, res) => {

  // TODO: Add logic to return all games

  // ***************************************************************
  // ***************************************************************
  // ***************  Implement your code here  ********************
  // ***************************************************************
  // ***************************************************************

  // Don't forget to remove the line below:
  //res.status(501).send('Not Implemented');
  res.json(games);
});

// GET /api/games/filter?genre=[genre name]
// Description: Filter games by genre
app.get('/api/games/filter', (req, res) => {
  const genreQuery = req.query.genre; // get the genre from query string

  // Check if genre parameter is provided
  if (!genreQuery) {
    return res.status(400).json({ error: 'Genre query parameter is required' });
  }

  // Filter games by genre (case-insensitive)
  const filteredGames = games.filter(
    game => game.genre.toLowerCase() === genreQuery.toLowerCase()
  );

  res.json(filteredGames);
});



// GET /api/games/:id
// Description: Get a specific game by ID
app.get('/api/games/:id', (req, res) => {
  const id = parseInt(req.params.id); // get the index from the URL

  // Validate the ID
  if (isNaN(id) || id < 0 || id >= games.length) {
    return res.status(404).json({ error: 'Game not found' });
  }

  // Return the game at the specified index
  res.json(games[id]);
});


// POST /api/games
// Description: Add a new game
app.post('/api/games', (req, res) => {
  const newGame = req.body;

  // Validate required fields
  if (
    !newGame.title ||
    !newGame.genre ||
    !newGame.platform ||
    !newGame.year ||
    !newGame.developer
  ) {
    return res.status(400).json({ error: 'All fields (title, genre, platform, year, developer) are required' });
  }

  // Add the new game to the array
  games.push(newGame);

  // Return the newly added game with status 201
  res.status(201).json(newGame);
});


// PUT /api/games/:id
// Description: Update a game by ID
app.put('/api/games/:id', (req, res) => {
  const id = parseInt(req.params.id); // get the index from URL
  const updatedData = req.body;       // get updated fields from request body

  // Validate the ID
  if (isNaN(id) || id < 0 || id >= games.length) {
    return res.status(404).json({ error: 'Game not found' });
  }

  // Update the game object with provided fields
  games[id] = { ...games[id], ...updatedData };

  // Return the updated game
  res.json(games[id]);
});


// DELETE /api/games/:id
// Description: Remove a game by ID
app.delete('/api/games/:id', (req, res) => {
  const id = parseInt(req.params.id); // get the index from URL

  // Validate the ID
  if (isNaN(id) || id < 0 || id >= games.length) {
    return res.status(404).json({ error: 'Game not found' });
  }

  // Remove the game from the array
  const deletedGame = games.splice(id, 1); // returns an array with the deleted game

  // Return a confirmation message with the deleted game
  res.json({
    message: 'Game deleted',
    deleted: deletedGame
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
