const express = require('express');
const app = express();
const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
// backend entertain the front request
// CORS stands for Cross-Origin Resource Sharing. It's a way to allow web pages from one 
// website (or origin) to request resources (like data or files) from a different website (or origin). 
// Think of it like giving permission for one website to talk to another.
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connect
database.connect();

// Middleware
app.use(express.json());
// This line sets up your application to handle JSON data.
//  It means that when your server receives requests with JSON data in 
// the body, it can automatically parse that data and make it available in your code.

// simpally ,it converts the json data into a JavaScript object that you can work with.

app.use(cookieParser());

app.use(
    cors({
        origin: 'https://studynotion-mern-project-frontend.onrender.com',
        credentials: true,
    })
);
// origin: 'http://localhost:3000': This means only requests coming from 
// http://localhost:3000 are allowed.
// https://studynotion-mern-project-frontend.onrender.com
// credentials: true: This allows cookies and other credentials
//  (like authentication tokens) to be sent along with the requests.


app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running..."
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
