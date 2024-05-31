const express = require("express");
const app = express();
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const bcrypt = require('bcrypt');
const fs = require('fs');
const CookieParser = require('cookie-parser');
const { log, error } = require("console");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const multer = require("multer");
require("dotenv").config()
const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const Place = require("./models/Place");
const Booking = require("./models/Bookings");
const { resolve } = require("path");
const bcryptSalt = bcryptjs.genSaltSync(10)
const jwtSecret = "asdasdasfsdfasgd"
console.log(__dirname);
app.use(express.json());
app.use(CookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGO_URL)


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.get('/test', (req, res) => {
    res.send("Hello World")
})
// Ep2IqlaK4j11FDD8
app.post('/register', async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password: bcryptjs.hashSync(password, bcryptSalt) })

        res.status(200).json({ user })
    }
    catch (error) {

        res.status(422).json({ status: "error", message: error });
    }
})

app.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            res.status(500).json({ status: "error", message: "User Not Found" });
            return;
        }
        const passOk = bcrypt.compareSync(password, user.password)
        if (passOk) {
            jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;

                res.cookie('token', token).json(user)
            })
        }
        else {
            res.status(422).json({
                status: "error",

            })
            return;
        }
    }
    catch (err) {
        throw new Error(err);
    }
})

app.get('/profile', async (req, res) => {

    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;

            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null)
    }



})

app.post("/logout", (req, res) => {
    res.cookie('token', '').json(true);
})


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + ".jpg";
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName)

})
const photosMiddlewear = multer({ dest: "uploads" })
app.post('/upload', photosMiddlewear.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];

        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];

        const newName = path + "." + ext;
        fs.renameSync(path, newName)
        uploadedFiles.push(newName.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);

})




app.post("/places", async (req, res) => {
    const { token } = req.cookies
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, price, maxGuests } = req.body

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;

        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price

        })
        res.json(placeDoc)
    });

})


app.get('/places', async (req, res) => {

    res.json(await Place.find())

})

app.get('/user-places', (req, res) => {


    const { token } = req.cookies


    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;

        res.json(await Place.find({ owner: id }))
    });
})


app.get('/places/:id', async (req, res) => {
    const { id } = req.params;

    res.json(await Place.findById(id));
})

app.put('/places', async (req, res) => {


    const { token } = req.cookies
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, price, maxGuests } = req.body


    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                owner: userData.id,
                title, address, photos: addedPhotos,
                description, perks, extraInfo, checkIn, price,
                checkOut, maxGuests

            })
            await placeDoc.save()
            res.json('ok')
        }


    });

})


function getuserDataFromToken(req) {
    return new Promise((resolve, reject) => {

        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    })

}


app.post('/bookings', async (req, res) => {
    const { place, checkIn, checkOut, numberOfGuests,
        name, phone } = req.body;
    const { id } = await getuserDataFromToken(req);


    const bookingDoc = await Booking.create({
        user: id,
        place, checkIn, checkOut, numberOfGuests,
        name, phone
    })

    res.json(bookingDoc)
})


app.get('/bookings', async (req, res) => {
    const userData = await getuserDataFromToken(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'))

})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})