import express from 'express'
import { deleteUser, getAllUsers, getSingleUser, getUser, loginUser, logoutUser, registerUser, updateUser } from '../Controllers/userController.js'
import { verifyAdmin ,  verifyUser } from '../utils/verifyToken.js'
import { authcheck } from '../utils/auth.js';

const router=express.Router()

router.post("/register" , registerUser);
router.post("/login" , loginUser);
// router.get("/logout" , verifyUser ,  logoutUser);
router.get("/logout" , authcheck,  logoutUser);
router.get("/profile" , authcheck, getUser);


//update User
router.put('/:id',verifyUser,updateUser)

//delete user
router.delete('/:id',verifyUser,deleteUser)

//get single user
router.get('/:id',verifyUser,getSingleUser)

//getAll user
router.get('/',verifyAdmin,getAllUsers)



export default router