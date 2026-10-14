import {v2 as cloudinary} from 'cloudinary'
import {HttpsProxyAgent} from 'https-proxy-agent'
import 'dotenv/config'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDE_NAME,
    api_key:process.env.CLOUDINARY_CLOUDE_KEY,
    api_secret:process.env.CLOUDINARY_CLOUDE_SECRET
})

export const proxyAgent=process.env.PROXY_URL ? new HttpsProxyAgent(process.env.PROXY_URL):undefined
export default cloudinary