import { NextResponse } from "next/server";
import connectdb from "@/app/lib/database";
import Cart from "@/app/lib/modals/Cart";
import mongoose from "mongoose";


export const GET = async (request: Request)=> {

   try{
            const {searchParams} = new URL(request.url);
            const userId = searchParams.get("userId");

            if (!userId) 
                return NextResponse.json({ error: "Missing userId" }, { status: 400 });

            await connectdb();

            const cartItems = await Cart.find({userId});
        return NextResponse.json(cartItems);

        } catch(error:unknown){
         if (error instanceof Error) {
             return NextResponse.json({ error: "Error in fetching Cakes: " + error.message },
                { status: 500 })
            }
}
}
export const POST = async(request: Request)=>{
    try{
        const { userId, cakeId, name, price, imageUrl, quantity } = await request.json();
        if(!userId || !cakeId || !name || !price || !imageUrl)
            return NextResponse.json({error: "Missing required fields"}, {status:400})
        await connectdb();
        const exists = await Cart.findOne({userId, cakeId});

        if(exists){
            exists.quantity += 1;
            await exists.save();
            return NextResponse.json({message: "Cart updated"})
        }
        const createdCart = new Cart({ userId:new mongoose.Types.ObjectId(userId), cakeId:new mongoose.Types.ObjectId(cakeId), name, price, imageUrl, quantity:typeof quantity === "number" ? quantity : 1});
        await createdCart.save()

    return NextResponse.json({message: "Added to Cart"});

    } catch(error: unknown){
         if (error instanceof Error) {
              return NextResponse.json(
            { error: "Error in Adding Cart items: " + error.message },
            { status: 500 }
        );
         }

       
    }
}