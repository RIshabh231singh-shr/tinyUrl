const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { initCounter } = require("./utilities/counter");
const urlRoutes = require("./routes/urlRoutes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/", urlRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connected to MongoDB");
        
        // ✅ Initialize counter here (only once)
        await initCounter();
        
        // ✅ Start server only after DB and counter are ready
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);  // Exit if DB connection fails
    });