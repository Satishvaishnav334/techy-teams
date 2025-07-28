

import mongoose from 'mongoose';
const uri = process.env.MONGODB_URI;  

let isConnected = false;
async function connectToDatabase() {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }

}


mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);  
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
connectToDatabase().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});


export default connectToDatabase;