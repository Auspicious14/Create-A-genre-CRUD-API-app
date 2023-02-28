const express = require("express");
const Joi = require("joi");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "horror" },
  { id: 3, name: "romance" },
  { id: 4, name: "war" },
  { id: 5, name: "comedy" },
  { id: 6, name: "sci-fi" },
  { id: 7, name: "international" },
];

const validateSchema = (genre) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(15),
  });

  return schema.validate(genre);
};
app.get("/", (req, res) => {
  res.send("Hello, This is my first CRUD API project");
});

// Get list of genres

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Get a particular genre

app.get("/api/genres/:id", (req, res) => {
  const queryId = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === queryId);
  if (!genre)
    return res.status(400).send("Genre of the ID given was not found");
  res.send(genre);
});

// Create a genre

app.post("/api/genres", (req, res) => {
  const { error } = validateSchema(req.body);
  if (error) return res.status(400).send(error);
  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

// Update a genre

app.put("/api/genres/:id", (req, res) => {
  const { error } = validateSchema(req.body);
  if (error) return res.status(400).send(error);

  const queryId = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === queryId);
  if (!genre)
    return res.status(400).send("Genre of the ID given was not found");
  genre.name = req.body.name;
  res.send(genre);
});

// Delete a genre

app.delete("/api/genres/:id", (req, res) => {
  const queryId = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === queryId);
  if (!genre)
    return res.status(400).send("Genre of the ID given was not found");

  const genreIndex = genres.indexOf(genre);
  genres.splice(genreIndex, 1);
  res.send(genre);
});

app.listen(port, () => console.log(`Server is listening on port${port}`));
