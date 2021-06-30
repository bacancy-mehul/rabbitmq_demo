import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log(JSON.stringify(error));
    // Exit process with failure
    process.exit(1);
  }
})();
