import mongoose from "mongoose";

const mongoURI=process.env.DB_URL;

const  connection={};

async function connect(){
    if(connection.isConnected)
    {
        console.log("Already connected");
        return
    }
    if(mongoose.connection.length>0){
        connection.isConnected=mongoose.connections[0].readyState;
        if(connection.isConnected===1){
            console.log("Use previous");
            return;
        }
        await mongoose.disconnect();
    }

    const db=await mongoose.connect(mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        connectTimeoutMS:3000,
        socketTimeoutMS:3000, 
    });
    

    console.log("New Connection");
}

async function disconnect(){
    if(connection.isConnected)
    {
        if(process.env.NODE_ENV==="production"){
            await mongoose.disconnect();
            connection.isConnected=false;
        }
        else{
            console.log("not disconnected");
        }
    }

}

const db={connect,disconnect}
export default db;



