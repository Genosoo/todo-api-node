import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User from "../models/User";
import { userSchema } from '../validation/user.validation'; // Adjust the path as needed

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.message });
        }
        const { username, email, firstname, lastname, password } = req.body;
        
         // Check if user with the same username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                message: existingUser.username === username
                    ? 'Username already exists'
                    : 'Email already exists'
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, firstname, lastname, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, firstname, lastname, password } = req.body;

        // Validate the request body
        const { error } = userSchema.validate({ username, email, firstname, lastname, password });
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if username or email is being updated and if they already exist
        const existingUser = await User.findOne({
            $or: [
                { username, _id: { $ne: id } },
                { email, _id: { $ne: id } }
            ]
        });
        if (existingUser) {
            return res.status(400).json({
                message: existingUser.username === username
                    ? 'Username already exists'
                    : 'Email already exists'
            });
        }

        // Update user details
        if (password) {
            // Hash the new password if provided
            user.password = await bcrypt.hash(password, 10);
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}




export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find and delete the user by ID
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}