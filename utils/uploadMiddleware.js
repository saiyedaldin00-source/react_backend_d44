import multer from "multer";

const storage=multer.memoryStorage()


const upload=multer({
    storage:storage,
   // fileFilter:fileFilter,
    //limits:{ fileSize:5*1024*1024}
})
export default upload