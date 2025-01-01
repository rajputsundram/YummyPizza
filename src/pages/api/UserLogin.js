import Users from "../../models/Users";
import db from "../../utils/db";
import bcrypt from "bcryptjs"
import jwt from  "jsonwebtoken"
export default async function handler(req,res)
{
    const jwtSecret=process.env.jwtSecret;
    let success =false;
    if(req.method==="POST")
    {
        await db.connect();

        const {email,password}=req.body;
        try{
            let user=await Users.findOne({email});
            if(!user){
              return res.status(400).json({success,error:"Try Login with righ username"});  
            }
            const pwdCompare=await bcrypt.compare(password,user.password);
            if(!pwdCompare){
                return res.status(400).json({success,error:"Try Login with righ username"}); 
            }
            const data={
                user:{
                    id:user["_id"]
    
                }
            };
            const authToken=jwt.sign(data,jwtSecret);
            success=true;
            return res.json({success:success,authToken:authToken});
        }catch(error){

        }
    }


    res.status(200).json({name:"Sundram rajput"})
}