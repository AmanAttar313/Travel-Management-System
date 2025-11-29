
import Booking from '../models/Booking.js'

// Create new booking
export const createBooking=async(req,res)=>{


    // const newBooking=new Booking(req.body);
//       tourName:{
//        type:String,
//        required:true,     
//     },
//     fullname: {
//       type: String,
//       required: true,
//     },
//    guestSize:{
//     type:Number,
//     required:true,
//    },
//     phone:{
//     type:Number,
//     required:true,
//    },
//     bookingAt:{
//     type:Date,
//     required:true,
//    }

    const {  tourName ,fullname ,  guestSize , phone , bookingAt ,totalAmount } = req.body;


    try {


        const savedBooking= await Booking.create({
            userId  : req.user.id,
            userEmail : req.user.email,
            tourName : tourName,
            fullname : fullname,
            guestSize : guestSize,
            phone : phone,
            bookingAt : bookingAt,
            totalAmount : totalAmount
        });


        res.status(200).json({success:true,message:"your tour is booked",data:savedBooking})
    } catch (err) {
        res.status(500).json({success:false,message:"internal server error"})
        
    }
}

//get single booking
export const getBooking=async(req,res)=>{


    try {
        const booking=await Booking.find({
            userEmail : req.user.email
        })
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