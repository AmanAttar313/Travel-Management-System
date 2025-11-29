import express from 'express'

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
import { createBooking, getAllBooking, getBooking } from '../Controllers/bookingController.js'
import { authcheck } from '../utils/auth.js'

const router=express.Router()

router.post('/create',authcheck,createBooking);
router.get('/get',authcheck,getBooking);

router.get('/all',getAllBooking);


export default router