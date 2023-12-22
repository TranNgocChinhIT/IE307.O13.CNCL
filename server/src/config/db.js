import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log(
      `Connected To DATABASE ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`error in connection DB ${error}`);
  }
};

export default connectDB;