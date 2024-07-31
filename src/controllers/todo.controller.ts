import { Request, Response } from "express";
import Todo from "../models/Todo";
import { todoSchema } from "../validation/todo.validation";


// Get all todos by user ID
export const getTodosByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const todos = await Todo.find({ userId });

        if (!todos || todos.length === 0) {
            return res.status(404).json({ message: 'No todos found for this user' });
        }

        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createTodo = async (req: Request, res: Response) =>{
    try {
        const { error } = todoSchema.validate(req.body);
        if(error){
            return res.status(400).send({ message: error.message });
        }

        const { userId, title } = req.body;
        const todo = new Todo({ userId, title });
        await todo.save();
        res.status(201).json({ message: 'Todo created successfully', todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });  
    }
}


export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { error } = todoSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        const { id } = req.params;
        const { title, completed } = req.body;

        const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};