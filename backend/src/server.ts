import express, { Request, Response } from 'express';
import getPopularFeeds from './app/page';

const app = express();
const cors = require('cors');

const port = 3000;

app.use(express.json())
app.use(cors());

// GET retrieves data FROM the server
app.get('/', (req, res) => {
    try {
        const data = getPopularFeeds()
        console.log(data)
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// POST creates new data ON the server
app.post('/api/items', (req, res) => {
  // Logic to add a new item
  // Use req.body to access posted data
  console.log(req.body);
  res.status(201).send('Item created');
});

// PUT updates existing data on server ENTIRELY
app.put('/api/items/:id', (req, res) => {
  // Logic to update an item ENTIRELY
  // Access the item id with req.params.id
  res.send(`Item ${req.params.id} updated`);
});

// PATCH updates existing data on server PARTIALLY
app.patch('/api/items/:id', (req, res) => {
  // Logic to partially update an item
  res.send(`Item ${req.params.id} partially updated`);
});

// DELETE deletes data from the server
app.delete('/api/items/:id', (req, res) => {
  // Logic to delete an item
  res.send(`Item ${req.params.id} deleted`);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
