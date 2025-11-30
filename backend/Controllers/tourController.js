import Tour from '../models/Tour.js'
import { uploadOnCloudinary } from '../services/cloudinary.js';

//create new tour
export const createTour = async (req, res) => {
  try {
    let photoUrl;
    if (req.file) {
  
      const localFilePath = req.file.path;

      // Upload to Cloudinary
      const uploadResponse = await uploadOnCloudinary(localFilePath);

      if (uploadResponse) {

        photoUrl = uploadResponse.secure_url;

      } else {
       
        return res.status(500).json({ 
            success: false, 
            message: "Failed to upload image to Cloudinary" 
        });
      }
    }

   
    const tourData = {
      ...req.body,
    price: Number(req.body.price),
    distance: Number(req.body.distance),
      ...(photoUrl && { photo: photoUrl }),
    };

    const newTour = new Tour(tourData);

    // 4. Save to Database
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: savedTour,
    });

  } catch (err) {
    console.error(err); // Good to log the actual error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to Create. Try Again",
      error: err.message, // Optional: send specific error message back
    });
  }
};



//update tours
export const updateTour=async(req,res)=>{
    const id=req.params.id
    try {
      const updatedTour = await Tour.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
);
         res.status(200).json({
            success:true, message:'Successfully updated',
            data:updatedTour,})
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to update',
           })
        
    }
}

//delete tours
export const deleteTour=async(req,res)=>{
     const id=req.params.id
    try {
       await Tour.findByIdAndDelete(id);
         res.status(200).json({
            success:true,message:'Deleted Successfully',
          })
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to delete',
           })
        
    }
}
//getSingle tours
export const getSingleTour=async(req,res)=>{
   const id=req.params.id
    try {
      const tour= await Tour.findById(id).populate('reviews');
         res.status(200).json({
            success:true,message:'Found Tour SuccessFully',
            data:tour
          })
        
    } catch (err) {
        res.status(404).json({
            success:false,
            message:'Not Found',
           })
        
    }
}
//getAll tours
export const getAllTour=async(req,res)=>{

    try {
        const tours=await Tour.find().populate('reviews');

        res.status(200).json({
             success:true,
             count:tours.length,
             message:'SuccessFully getting all tours',
            data:tours
        })
    } catch (err) {
         res.status(404).json({
            success:false,
            message:'Not Found',
           })
    }
}

//get Tour By search
export const getTourBySearch = async (req, res) => {

  const city = new RegExp(req.query.city, 'i'); // case-insensitive
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  

  try {
    // Find tours matching search criteria
    const tours = await Tour.find({
      city: city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize }
    }).populate('reviews'); // populate outside find()

    if (!tours || tours.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tours found',
        data: []
      });
    }


    res.status(200).json({
      success: true,
      message: 'Successfully fetched tours by search',
      data: tours
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

//get featured tours
export const getFeaturedTour=async(req,res)=>{
    
    try {
        const tours=await Tour.find({featured:true}).populate('reviews').limit(8)
        res.status(200).json({
             success:true,
             message:'SuccessFull',
            data:tours
        })
    } catch (err) {
         res.status(404).json({
            success:false,
            message:'Not Found',
           })
    }
}  

//get tour counts
export const getTourCount=async(req,res)=>{
    try {
        const tourCount=await Tour.estimatedDocumentCount()
        res.status(200).json({success:true,data:tourCount})
    } catch (err) {
        res.status(500).json({success:false,message:"failed to fetch"})
    }

}