import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
      
    },
    tourName:{
       type:String,
       required:true,     
    },
    fullname: {
      type: String,
      required: true,
    },
   guestSize:{
    type:Number,
    required:true,
   },
    phone:{
    type:Number,
    required:true,
   },
    bookingAt:{
    type:Date,
    required:true,
   }
   ,
   totalAmount  :{
    type : Number,
    default : 100
   }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
