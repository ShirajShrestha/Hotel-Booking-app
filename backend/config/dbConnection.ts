import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING as string
    );
    console.log(
      "Database connected. ",
      // "host:",
      // connect.connection.host,
      "db_name:",
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
