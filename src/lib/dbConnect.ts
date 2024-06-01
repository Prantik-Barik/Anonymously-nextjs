import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number,
}

const connection : ConnectionObject = {}

async function dbConnect() : Promise<void> {
    //check if we already have a database connection
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }

    try{
        const db = await await mongoose.connect(process.env.MONGODB_URI || '', {})

        connection.isConnected = db.connections[0].readyState

        console.log("Connected to database successfully")
        console.log(db)

    }catch(err){
        console.log("Error connecting to database", err)
        process.exit(1)
    }

}

export default dbConnect;