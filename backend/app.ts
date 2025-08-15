import express from 'express';

const app = express();
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Import route files here

// Use imported routes here

// Testing Route
app.get('/', async (req, res) => {
	res.send('Hi, Welcome to PlantCo!');
});

export default app;
