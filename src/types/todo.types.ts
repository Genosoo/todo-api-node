import mongoose, { Document } from "mongoose";

export interface ITodo extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    completed: boolean;
}