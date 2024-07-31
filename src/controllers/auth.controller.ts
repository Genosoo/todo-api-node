import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from "../types/user.types";
import User from "../models/User";
import { SECRET_KEY, NODE_ENV } from "../config/config";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const login = async (req: Request, res: Response) => {
    try {
       const { email, password } = req.body;
       const user = await User.findOne({ email });

       if (!user) {
           return res.status(400).send({ message: 'Invalid credentials' });
       } 

       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
           return res.status(400).send({ message: 'Invalid credentials' });
       }

       const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

       res.cookie('token', token, { httpOnly: true, secure: true,  sameSite: 'strict', maxAge: 3600000 });
       res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const protect = (req: Request, res: Response, next: Function) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded as IUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ message: 'Unauthorized' });
    }
}


export const logout = (req: Request, res: Response) => {
    res.clearCookie('token', { httpOnly: true, secure: NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logout successful' });
  };
  
