import { Router } from "express";
import { createTodo, deleteTodo, getTodosByUserId, updateTodo } from "../controllers/todo.controller";

const router = Router();


router.post('/todo', createTodo);
router.get('/todo/user/:userId', getTodosByUserId);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

export default router