import express, { Request, Response } from 'express';

const app = express();
const cors = require('cors');

const port = 3000;

app.use(express.json())
app.use(cors());

const data: string = "teddst"

// GET retrieves data FROM the server
app.get('/', (req, res) => {
    try {
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// POST creates new data ON the server
app.post('/api/getScore', (req, res) => {
  const user_input: string = req.body;
  console.log(user_input);

  // TODO: Dummy data 10. replace with actual result from ml model
  res.status(201).send(10);
});

app.post('/api/rate_user_input', (req, res) => {

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
