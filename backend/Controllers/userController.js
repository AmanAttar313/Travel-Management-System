import User from '../models/User.js'
import jwt from 'jsonwebtoken';


//create new User => register
export const registerUser=async(req,res)=>{
    // const newUser=new User(req.body);
    const { username ,  email, password } = req.body;

    console.log("data  :" , username , email , password);

    try {

        const savedUser= await User.create({
            username : username,
            email  :email,
            password : password,
        })

        if (!savedUser) {
            return res.status(404).json({
                success: false,
                message: 'User register error!'
            });
        }

        


        res.status(200).json({
            success:true,message:'Successfully Created',

        })
    } catch (err) {
        res.status(500).json({success:false,message:'Failed to Create .Try Again'})
    }
}


//login => eamil and password




export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

      
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

       
        if (!(user.password === password)) {

            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // 3. Create a Token (JWT)
        // Ensure you have process.env.JWT_SECRET_KEY in your .env file
        const token = jwt.sign(
            { id: user._id, role: user.role , email : user.email , username : user.username }, 
            process.env.JWT_SECRET_KEY, 
        );

    
        res
        .cookie("token" , token)
        .status(200).json({
            success: true,
            message: "Successfully logged in",
            token,
            username : user.username,
            email : user.email
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to login"
        });
    }
};


export const logoutUser = async(req , res) =>{

    return res.clearCookies("token")
     .status(200)
     .json({
            success: true,
       message : "user logout successfully!"
     })
    
}



export const getUser = async(req , res) =>{
      
    try {
         const user = await User.findOne({ email  : req.user.email}).select("-password");
    
         
         console.log("user : " , user );


            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }



  return res.status(200)
     .json({
            success: true,
            message : "user fetched successfully!",
            user
     })
    
    } catch (error) {
   
    return res.status(400)
     .json({
            success: true,
            message : "user fetched error!",

     });

        
    }
    
    
}






//update User
export const updateUser=async(req,res)=>{
    const id=req.params.id
    try {
      const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
);
         res.status(200).json({
            success:true, message:'Successfully updated',
            data:updatedUser,})
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to update',
           })
        
    }
}

//delete User
export const deleteUser=async(req,res)=>{
     const id=req.params.id
    try {
       await User.findByIdAndDelete(id);
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
//getSingle User
export const getSingleUser=async(req,res)=>{
   const id=req.params.id
    try {
      const user= await User.findById(id);
         res.status(200).json({
            success:true,message:'Found Tour SuccessFully',
            data:user
          })
        
    } catch (err) {
        res.status(404).json({
            success:false,
            message:'Not Found',
           })
        
    }
}
//getAll Users
export const getAllUsers=async(req,res)=>{
  
    
    try {
        const users=await User.find({})
        res.status(200).json({
             success:true,
             message:'SuccessFully getting all tours',
            data:users
        })
    } catch (err) {
         res.status(404).json({
            success:false,
            message:'Not Found',
           })
    }
}