import Cake from '@/app/lib/modals/CakeCategoriest'
import { NextResponse } from "next/server"
import connectdb from "@/app/lib/database"
import { Types } from 'mongoose';

interface D_Cake extends Document {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

export const GET = async()=>{
    try{
        await connectdb();
        const cakes = await Cake.find();
        return new NextResponse(JSON.stringify(cakes))
    } catch(error:unknown){
        if (error instanceof Error) {
            return new NextResponse("Error in fetching Cakes"+ error.message,{
            status: 500,
        })
        }
    }
}

export const DELETE = async (request: Request)=>{
  try{
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id'); // Extract ID from query params

        if (!id) {
            return NextResponse.json({ error: "Missing cake ID" }, { status: 400 });
        } 
        if (!Types.ObjectId.isValid(id)) {  //if id is not a valid mongodb object
            return NextResponse.json(
                { error: "Invalid cake ID format" },
                { status: 400 }
            );
            }

        
        await connectdb();
        const deleted:D_Cake | null = await Cake.findByIdAndDelete(new Types.ObjectId(id));
         if(!deleted){
            return new NextResponse(
                JSON.stringify({message: "Cake not found in the database"}),
                { status:400 }
            )
        }
return new NextResponse(
    JSON.stringify({message:"Cake is deleted", Cake: deleted}),
    { status: 200 }
);

    }catch(error:unknown){
       if (error instanceof Error) {
         return new NextResponse(" Error in Deleting Cake" + error.message, {
            status: 500,
        });
       }
    }
}