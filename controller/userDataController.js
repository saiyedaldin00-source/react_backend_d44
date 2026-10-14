import userData from '../model/user.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/jwtUtils.js'
import cloudinary, { proxyAgent } from '../config/cloudinary.js'

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'divb_users', agent: proxyAgent },
            (error, result) => {
                if (error) return reject(error)
                resolve(result)
            }
        )
        stream.end(buffer)
    })
}

export const addUser = async (req,res) => {
    try {
        const password = await bcrypt.hash(req.body.password,10) 
        let imageURL=""
        if(req.file){
            const result=await uploadToCloudinary(req.file.buffer)
            imageURL=result.secure_url
        }
        const userDataval = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password: password,
            image:imageURL
       }
       const saveUSerData = await userData.create(userDataval)
        res.status(200).json({message:"user added successflly",data:saveUSerData})
    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getUser = async (req,res) => {
    try {
        const getuserData = await userData.find()
        res.status(200).json({message:"user get successfulyy",data:getuserData})
    } catch(error) {
        res.status(500).json({errorMessage:error.message})
    }

}

export const getSingleUser = async (req,res) =>{
    try{
        const id = req.params.uid
        const getsingleUserdata = await userData.findById(id)
        res.status(200).json({message:"user get successfully",data:getsingleUserdata})

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const deleteUSer = async (req,res) => {
    try{
        const id = req.params.uid
        const deleteuserData = await userData.findByIdAndDelete(id)
        res.status(200).json({message:"user deleted successfully",data:deleteuserData})

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const updateUser = async(req,res) => {
    try{
        const id = req.params.uid
        const userDataval = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
        }

        const updateUserData = await userData.findByIdAndUpdate(id,userDataval,{
            new: true,
            runValidators:true
        })
        res.status(200).json({message:"user Updated Successfully!",data:updateUserData})
    } catch(error){
        res.status(500).json({errorMessage:error.message})
    }
}

export const login = async(req,res) => {
    try{
        const uData = await userData.findOne({email:req.body.email})
        if(!uData){
            res.status(200).json({message:"User not found",status:0})
        }

        const passwordMatch = await bcrypt.compare(req.body.password,uData.password)
        if(passwordMatch){
            const token = await generateToken(uData)
            res.status(200).json({message:"Login success!",status:1,data:uData,token:token})
        } else {
            res.status(200).json({message:"failed!",status:0})
        }
    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}



