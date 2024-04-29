import mongoose from 'mongoose';

export const connect =  async () => {
    try {

        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('Connected', ()=>{
            console.log('MongoDb connected');
        })
        connection.on('error', (err)=>{
            console.log('MongoDb connection error,Please make sure db is up and running',err);  
            process.exit();          
        })
        
    } catch (error) {
        console.log('Something went wrong in connecting to DB : ', error);
        
    }
}