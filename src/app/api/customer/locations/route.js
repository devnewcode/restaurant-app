import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connectionStr);
    let result = await restaurantSchema.find();
    result = result.map((item)=>item.city.charAt(0).toUpperCase()+ item.city.slice(1));
    result = [...new Set(result.map((item)=>item))]



    //this code can be useful if the item.city is undefined or null for any item in the 'result' array.
    // result =result.filter(item=>item.city).map(item=>item.city.charAt(0).toUpperCase()+item.city.slice(1));
    // result = [...new Set(result)];

    
    return NextResponse.json({success:true, result})
}