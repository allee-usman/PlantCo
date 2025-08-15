import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`⚙️ Server is up and listening on port : ${PORT}`);
		});
	})
	.catch((err: any) => {
		console.log('MONGO_DB connection failed! ', err);
	});
