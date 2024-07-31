import { Router } from "express";
import {  createUser, deleteUser, getUsers, updateUser  } from "../controllers/user.controller";

const router = Router();

router.get('/users', getUsers)
router.post('/create-user', createUser)
router.delete('/delete-user/:id', deleteUser)
router.put('/update-user/:id', updateUser)


export default router;