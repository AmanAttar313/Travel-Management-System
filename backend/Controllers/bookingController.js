
import Booking from '../models/Booking.js'

// Create new booking
export const createBooking=async(req,res)=>{
    const newBooking=new Booking(req.body)
    try {
        const savedBooking= await new newBooking.save()
        res.status(200).json({success:true,message:"your tour is booked",data:savedBooking})
    } catch (err) {
        res.status(500).json({success:false,message:"internal server error"})
        
    }
}

//get single booking
export const getBooking=async(req,res)=>{
    const id=req.params.id

    try {
        const booking=await Booking.findById(id)
        res.status(200).json({success:true,message:"succesful",data:booking})

    } catch (err) {
        res.status(404).json({success:false,message:"Not Found"})
        
    }
}
//get All booking
export const getAllBooking=async(req,res)=>{
    

    try {
        const books=await Booking.find()
        res.status(200).json({success:true,message:"succesful",data:books})

    } catch (err) {
        res.status(500).json({success:false,message:"Internal server error"})
        
    }
}