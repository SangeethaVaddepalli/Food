import express from "express";
import {addFood, listFood, removeFood} from "../controllers/FoodController.js"
import multer from "multer"
// import { addFood, listFood, removeFood } from "../controllers/foodController.js";
    //-- new imports code for cloudinary
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
            // till here
/*--------------------------------------------------
const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload =  multer ({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;
------------------------------------------------- */

const foodRouter = express.Router();
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define Cloudinary storage

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'food_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `${Date.now()}_${file.originalname}`, // Unique filename
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;