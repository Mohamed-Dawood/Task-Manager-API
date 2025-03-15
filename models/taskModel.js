import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Task must have name'],
      trim: true,
      maxLength: [20, "Name can't be more than 20 characters"],
    },
    complete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
