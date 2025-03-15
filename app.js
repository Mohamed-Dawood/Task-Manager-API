import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { connectDB } from './db/connect.js';
import taskRouter from './routes/taskRoute.js';
import { notFound } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

dotenv.config();

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV !== 'Production') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/tasks', taskRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;

const DB = process.env.MONGO_URL.replace(
  '<db_password>',
  process.env.MONGO_PASSWORD
);

const start = async () => {
  try {
    await connectDB(DB);
    app.listen(port, async () => {
      console.log(`✅ App listening on port ${port}...`);
    });
  } catch (error) {
    console.log("❌ Server Couldn't Start", error);
    process.exit(1);
  }
};

start();
