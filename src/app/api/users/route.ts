import connectdb from "@/app/lib/database"
import User from "@/app/lib/modals/users"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export const GET = async()=>{
    try{
        await connectdb();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users))
    } catch(error:unknown){
         if (error instanceof Error) {
           return new NextResponse("Error in fetching users"+ error.message,{
            status: 500,
        })
      }    
    }
}

export const POST  = async (request: Request)=>{
    try{
      const { username, email, password, role } = await request.json();

         if (!username || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
      await connectdb();
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
      return NextResponse.json({ error: 'Email or username already exists' }, { status: 400 });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = new User({ username, email, password: hashedPassword,role });
      await createdUser.save()

      return new NextResponse(JSON.stringify({
        message: "User is Successfully created",
        user: createdUser
      }), {status:200});
    } catch (error: unknown){
       if (error instanceof Error) {
        return new NextResponse("Error signing Up " + error.message, {
            status:500,
        })
       }
    }
}