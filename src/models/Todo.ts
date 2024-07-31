import mongoose, { Schema } from "mongoose";
import { ITodo } from "../types/todo.types";

const TodoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model<ITodo>("Todo", TodoSchema);