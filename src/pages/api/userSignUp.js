import bcrypt  from "bcryptjs"
import Users from "@/models/Users"
import jwt from  "jsonwebtoken"
import db from "../../utils/db"


const jwtSecret=process.env.jwtSecret
export default async function handler(req, res){
    let success=false;
    const salt= await  bcrypt.genSalt(10);

let securePass=await bcrypt.hash(req.body.password,salt);
if(req.method==="POST"){

  await db.connect(); 
  
  try{
    await Users.create({
        name:req.body.name,
        password:securePass,
        email:req.body.email,
        location:req.body.location,

        

    }).then((user)=>{
        const data={
            user:{
                id:user["_id"]

            }
        };
        const authToken=jwt.sign(data,jwtSecret);
        success=true;
        res.json({success,authToken});

    }).catch((error)=>{
        res.json({error:error.message})

    })
  }catch(error){
    console.log(error.message);

  }

}
await db.disconnect();

    res.status(200).json({name:"sundram"})

}