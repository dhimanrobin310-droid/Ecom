const path = require("path")
const dns = require("dns")

// Fix SRV DNS lookup issues on Windows / Node 18+ for mongodb+srv://
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"])
} catch (_) { }

try {
    require("dotenv").config({ path: path.resolve(__dirname, "../.env"), quiet: true })
    require("dotenv").config({ quiet: true })
} catch (_) { }

const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const bcrypt = require("bcrypt")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const jwt = require("jsonwebtoken")

const app = express()

cloudinary.config({
    cloud_name: "qwzbf1ci",
    api_key: "731282279818113",
    api_secret: "CzgdOG48wsqFhOs19actclamqzg"
})
const corsfront = [
    "https://ecom-alpha-beryl.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:9000"
]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)
        if (
            origin.startsWith("http://localhost:") ||
            origin.startsWith("http://127.0.0.1:") ||
            origin.endsWith(".vercel.app") ||
            origin.endsWith(".onrender.com") ||
            corsfront.includes(origin) ||
            corsfront.includes(origin.replace(/\/$/, ""))
        ) {
            return callback(null, true)
        }
        return callback(null, true)
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"]
}

app.use(cors(corsOptions))

// Explicit CORS headers middleware to guarantee headers are set on all responses (including errors)
app.use((req, res, next) => {
    const origin = req.headers.origin
    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin)
        res.setHeader("Access-Control-Allow-Credentials", "true")
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*")
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin")

    if (req.method === "OPTIONS") {
        return res.sendStatus(204)
    }
    next()
})

app.use(express.json())

let cachedPromise = null
let lastDbError = null

const databaseUrl = process.env.MONGODB_URI || "mongodb+srv://dhimanrobin310_db_user:tJpQBivyvE5OCkTL@cluster0.ggwyxlr.mongodb.net/ecom"

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection
    }
    if (cachedPromise) {
        return cachedPromise
    }

    cachedPromise = mongoose.connect(databaseUrl, {
        serverSelectionTimeoutMS: 10000,
    }).then((conn) => {
        lastDbError = null
        console.log("Database is running: Mongoose connected successfully")
        return conn
    }).catch((err) => {
        cachedPromise = null
        lastDbError = err.message
        console.error("MongoDB connection error:", err.message)
        throw err
    })

    return cachedPromise
}

// Initiate connection immediately
connectDB().catch((err) => {
    console.error("Initial MongoDB connection attempt failed:", err.message)
})

// Health and root diagnostics
app.get("/", (req, res) => {
    res.send({
        status: "ok",
        message: "Multikart backend is running",
        dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        hasMongoUri: !!databaseUrl
    })
})

app.get("/api/health", (req, res) => {
    res.send({
        status: "ok",
        dbConnected: mongoose.connection.readyState === 1
    })
})

app.get("/api/db-status", (req, res) => {
    const states = ["disconnected", "connected", "connecting", "disconnecting"]
    const state = mongoose.connection.readyState

    let maskedUri = null
    if (databaseUrl) {
        try {
            maskedUri = databaseUrl.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, "mongodb$1://$2:****@")
        } catch (_) {
            maskedUri = "configured (hidden)"
        }
    }

    res.send({
        status: states[state] || "unknown",
        readyState: state,
        connected: state === 1,
        hasMongoUri: !!databaseUrl,
        mongoUri: maskedUri,
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasCloudinary: true,
        lastError: lastDbError,
        help: !databaseUrl
            ? "Action required: Set MONGODB_URI in Render Dashboard (Web Service -> Environment) with your MongoDB Atlas connection string."
            : (state !== 1 ? "Action required: Check MongoDB Atlas Network Access and ensure IP '0.0.0.0/0' (Allow Access from Anywhere) is added." : "Database is connected and ready.")
    })
})

// Database readiness check middleware for all /api database routes
app.use("/api", async (req, res, next) => {
    if (req.path === "/health" || req.path === "/db-status" || req.path === "/" || req.method === "OPTIONS") {
        return next()
    }

    if (!databaseUrl) {
        return res.status(503).send({
            statuscode: 0,
            message: "Database error: MONGODB_URI is not set in Render environment variables. Please configure MONGODB_URI in Render dashboard.",
            errorType: "MISSING_MONGODB_URI"
        })
    }

    if (mongoose.connection.readyState !== 1) {
        try {
            await connectDB()
            next()
        } catch (err) {
            return res.status(503).send({
                statuscode: 0,
                message: `Database connection failed: ${err.message}. Please verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0) and credentials.`,
                errorType: "DB_CONNECTION_ERROR"
            })
        }
    } else {
        next()
    }
})

const key = process.env.JWT_SECRET || "MYWEBSITE_DEFAULT_SECRET_KEY_12345"
if (!process.env.JWT_SECRET) {
    console.warn("JWT_SECRET is not set. Using default secret.")
}

const registerschema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String,
    UserType: String
})

const RegisterModel = new mongoose.model("register", registerschema, "register")

app.post("/api/register", async (req, res) => {
    try {
        const existing = await RegisterModel.findOne({ Email: req.body.email })
        if (existing) {
            return res.send({ statuscode: 0, message: "An account with this email already exists." })
        }

        const hash = bcrypt.hashSync(req.body.password, 10)
        const result = new RegisterModel({
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            Password: hash,
            Email: req.body.email,
            UserType: "User"
        })
        const response = await result.save()
        if (response) {
            res.send({ statuscode: 1 })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        console.error("Register error:", error)
        res.send({ statuscode: 0, message: error.message })
    }
})

app.post("/api/login", async (req, res) => {
    try {
        const result = await RegisterModel.findOne({
            Email: req.body.email
        })
        if (result) {
            let repass = result.Password
            let pass2 = bcrypt.compareSync(req.body.password, repass)
            if (pass2 == true) {
                let token = jwt.sign({ id: result._id, mail: result.Email, utype: result.UserType }, key, { expiresIn: "1h" })
                res.send({ statuscode: 1, data: result, jwtoken: token })
            } else {
                res.send({ statuscode: 0, message: "Invalid password" })
            }
        } else {
            res.send({ statuscode: 0, message: "User not found" })
        }
    } catch (error) {
        console.error("Login error:", error)
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/alluser", async (req, res) => {
    try {
        const result = await RegisterModel.find()
        if (result) {
            res.send({ statuscode: 1, data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

const contact = mongoose.Schema({
    Fullname: String,
    Email: String,
    Phone: Number,
    Subject: String,
    Message: String,
})

const Contact = new mongoose.model("Contactus", contact, "Contactus")

app.post("/api/contactus", async (req, res) => {
    try {
        const result = Contact({
            Fullname: req.body.fullname,
            Email: req.body.email,
            Phone: req.body.phone,
            Subject: req.body.subject,
            Message: req.body.message
        })
        const response = await result.save()
        if (response) {
            res.send({ statuscode: 1 })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
})

const saveUpload = async (file) => {
    if (!file) return "no img"

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "multikart_uploads",
                resource_type: "auto",
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error)
                    return reject(error)
                }
                resolve(result.secure_url)
            }
        )
        stream.end(file.buffer)
    })
}

const category = mongoose.Schema({
    Name: String,
    Image: String,
})

const Cat = mongoose.model("category", category)

app.post("/api/category", upload.single("pic"), async (req, res) => {
    try {
        const pic = await saveUpload(req.file)
        const result = Cat({
            Name: req.body.name,
            Image: pic
        })
        const response = await result.save()
        if (response) {
            res.send({ statuscode: 1 })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/getcategory", async (req, res) => {
    try {
        const result = await Cat.find()
        if (result) {
            res.send({ statuscode: 1, data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

const brand = mongoose.Schema({
    Name: String,
    Category: String,
    Image: String,
})
const brandname = mongoose.model("Brand", brand)

app.post("/api/addbrand", upload.single("pic"), async (req, res) => {
    try {
        const pic = await saveUpload(req.file)
        const result = brandname({
            Name: req.body.bname,
            Category: req.body.cat,
            Image: pic
        })
        const response = await result.save()
        if (response) {
            res.send({ statuscode: 1 })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/getallbrand", async (req, res) => {
    try {
        const result = await brandname.find()
        if (result) {
            res.send({ statuscode: 1, data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/getbrand/:id", async (req, res) => {
    try {
        const result = await brandname.find({ Category: req.params.id })
        if (result) {
            res.send({ statuscode: 1, data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

const Products = mongoose.Schema({
    Category: String,
    Brand: String,
    Name: String,
    Price: Number,
    Detail: String,
    Image: String,
    SalePrice: String,
    Sale: Boolean,
})

const addproduct = mongoose.model("productadd", Products)

app.post("/api/addpro", upload.single("pic"), async (req, res) => {
    try {
        const pic = await saveUpload(req.file)
        const result = new addproduct({
            Category: req.body.cate,
            Brand: req.body.brand,
            Name: req.body.name,
            Price: req.body.price,
            Detail: req.body.detail,
            Image: pic,
            SalePrice: req.body.saleprice,
            Sale: req.body.sale,
        })
        const response = await result.save()
        if (response) {
            res.send({ statuscode: 1 })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/getproducts", async (req, res) => {
    try {
        const result = await addproduct.find()
        if (result) {
            res.send({ statuscode: 1, data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/getproduct/:id", async (req, res) => {
    try {
        const result = await addproduct.findOne({ _id: req.params.id })
        if (result) {
            res.send({ statuscode: 1, data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/related/:id", async (req, res) => {
    try {
        const result = await addproduct.find({ Category: req.params.id })
        if (result) {
            res.send({ statuscode: 1, Data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

const Cart = mongoose.Schema({
    ProductId: String,
    Name: String,
    Price: String,
    Img: String,
    Quantity: Number,
    ProductBy: String,
    UserId: String,
})

const cartModel = mongoose.model("cartss", Cart)

app.post("/api/cartdata", async (req, res) => {
    try {
        const result = new cartModel({
            Name: req.body.name,
            Price: req.body.price,
            Img: req.body.img,
            Quantity: req.body.value,
            ProductBy: req.body.proby,
            UserId: req.body.id
        })
        const resp = await result.save()
        if (resp) {
            res.send({ statuscode: 1 })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/cartget/:id", async (req, res) => {
    try {
        const result = await cartModel.find({ UserId: req.params.id })
        if (result) {
            res.send({ statuscode: 1, Data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

const Wishlist = mongoose.Schema({
    UserId: String,
    Name: String,
    Price: String,
    Img: String,
    ProductBy: String
})

const WishlistModel = mongoose.model("wishlist", Wishlist, "wishlist")

app.post("/api/wishlistdata", async (req, res) => {
    try {
        const result = new WishlistModel({
            UserId: req.body.id,
            Name: req.body.name,
            Price: req.body.price,
            Img: req.body.img,
        })
        const resp = await result.save()
        if (resp) {
            res.send({ statuscode: 1 })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/wishlistget/:id", async (req, res) => {
    try {
        const result = await WishlistModel.find({ UserId: req.params.id })
        if (result) {
            res.send({ statuscode: 1, Data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

const Check = new mongoose.Schema({
    Email: String,
    FirstName: String,
    LastName: String,
    Address: String,
    Country: String,
    City: String,
    State: String,
    Zip: Number,
    Phone: Number,
    UserId: String,
    ProductId: String,
    Payment: String,
    Order: [{ ProductName: String, Quantity: Number, Price: Number, Img: String, ProBy: String }]
})

const checks = mongoose.model("Checkout", Check)

app.post("/api/checkout", async (req, res) => {
    try {
        const result = new checks({
            Email: req.body.mail,
            FirstName: req.body.fname,
            LastName: req.body.lname,
            Address: req.body.address,
            Country: req.body.country,
            City: req.body.city,
            State: req.body.state,
            Zip: req.body.zip,
            Phone: req.body.ph,
            Payment: req.body.payment,
            UserId: req.body.id,
            Order: req.body.data
        })
        const resp = await result.save()
        if (resp) {
            res.send({ statuscode: 1 })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/orders", async (req, res) => {
    try {
        const result = await checks.find()
        if (result) {
            res.send({ statuscode: 1, data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/myorder/:id", async (req, res) => {
    try {
        const result = await checks.find({ UserId: req.params.id })
        res.send({ statuscode: 1, data: result })
    } catch (error) {
        res.send({ statuscode: 0, message: error.message })
    }
})

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled server error:", err)
    if (!res.headersSent) {
        res.send({ statuscode: 0, message: err.message || "Internal server error" })
    }
})

if (require.main === module) {
    const port = process.env.PORT || 9000
    app.listen(port, () => console.log(`Server is running on port ${port}`))
}

module.exports = app
