import mongoose from 'mongoose';

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('✅ DB Connected Successfully...');
  } catch (error) {
    console.log('❌ Error In Connecting MongoDB:', error);
    throw new Error('Database Connection Failed');
  }
};
