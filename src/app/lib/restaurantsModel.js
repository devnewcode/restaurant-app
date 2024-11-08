import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema ({
    name:String,
    email:String,
    password:String,
    city:String,
    address:String,
    contact:String,
});
export const restaurantSchema = mongoose.models.restaurants || mongoose.model("restaurants",restaurantModel);
