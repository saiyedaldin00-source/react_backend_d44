import express from "express"
import {addUser,getUser,getSingleUser,deleteUSer,login,updateUser} from "../controller/userDataController.js"
import AuthenticateToken from "../utils/authMiddleware.js"
import upload from "../utils/uploadMiddleware.js"

const router = express.Router()

router.post('/api/add-user',upload.single('image'),addUser)
router.get('/api/get-user',AuthenticateToken,getUser)
router.get('/api/get-singleuser/:uid',AuthenticateToken,getSingleUser)
router.delete('/api/delete-user/:uid',AuthenticateToken,deleteUSer)
router.put('/api/update-user/:uid',updateUser)
router.post('/api/login',login)


export default router