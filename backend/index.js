import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './route/tours.js'
import authRoute from './route/auth.js'
import userRoute from './route/user.js'
import reviewRoute from './route/reviews.js'
import bookingRoute from './route/booking.js'


dotenv.config();

const app = express();
const corsOptions={
    origin:true,
    credentials:true
}

const port = process.env.PORT || 8000

// Database connection
mongoose.set('strictQuery', false)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db connected")
    } catch (err) {
        console.log("Mongo db connection failed")
        console.log(err.message)
    }
}

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/tours',tourRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/review',reviewRoute)
app.use('/api/v1/booking',bookingRoute)



// Test API
app.get('/', (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    connect()
    console.log('server listing on port', port)
})
