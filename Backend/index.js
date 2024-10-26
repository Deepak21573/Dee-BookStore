import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from "./route/book.route.js"; // Keep the .js extension
import userRoute from "./route/user.route.js"; // Keep the .js extension

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDBURI;

const startServer = async () => {
    // Connect to MongoDB
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        return; // Exit the server if unable to connect
    }

    // Define routes
    app.use("/book", bookRoute);
    app.use("/user", userRoute);

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

// Start the application
startServer();
