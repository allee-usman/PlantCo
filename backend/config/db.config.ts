import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			process.env.MONGODB_URI as string
		);
		console.log('\nMongoDB connected to DB: plantco');
	} catch (err) {
		console.log('MONGODB connection FAILED ', err);
		process.exit(1);
	}
};

export { connectDB };
