import express from 'express'
import { deleteUser, getAllUsers, getSingleUser, updateUser } from '../Controllers/userController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router=express.Router()

//update User
router.put('/:id',verifyUser,updateUser)

//delete user
router.delete('/:id',verifyUser,deleteUser)

//get single user
router.get('/:id',verifyUser,getSingleUser)

//getAll user
router.get('/',verifyAdmin,getAllUsers)



export default router