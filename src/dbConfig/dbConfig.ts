import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/nextauth`);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDb connected');
    });
    connection.on('error', (err) => {
      console.log(
        'MongoDb connection error, Please make sure db is up and running' + err
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong in connecting to DB : ', error);
  }
}

// import mongoose from 'mongoose';
// export const connect = async () => {
//   try {
//     const { connection } = await mongoose.connect(
//       process.env.MONGODB_URL as string,
//       {
//         dbName: 'nextauth',
//       }
//     );

//     console.log('db connected...');

//     console.log('connected with host ', connection.host);
//   } catch (error) {
//     console.log('failed  to connect with database');
//     console.log(error);
//   }
// };
