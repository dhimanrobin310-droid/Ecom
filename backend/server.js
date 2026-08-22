const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const bcrypt = require("bcrypt")
const multer = require("multer")
const { put } = require("@vercel/blob")

const jwt = require("jsonwebtoken")

const app = express()

const corsfront = [
    "https://ecom-alpha-beryl.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:9000"
]

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, curl, server-to-server)
        if (!origin) return callback(null, true)
        
        // Allow Vercel, localhost, Render, and configured origins
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
app.options("*", cors(corsOptions))
app.use(express.json())

const key = process.env.JWT_SECRET || (process.env.NODE_ENV !== "production" ? "MYWEBSITE" : undefined)
if (!key) {
    console.warn("JWT_SECRET is not set. Authentication requests will fail until it is configured.")
}

const databaseUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Multikart"
mongoose.connect(databaseUrl)
    .then(() => {
        console.log("connected to mongoose")
    })
    .catch(() => {
        console.log("not connected")
    })

const registerschema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String,
    UserType:String
})

const RegisterModel = new mongoose.model("register", registerschema, "register")

app.post("/api/register", async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10)
    const result = await new RegisterModel({
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Password: hash,
        Email: req.body.email,
        UserType: "User"
    })
    const response = await result.save()
    if (response) {
        res.send({ statuscode: 1 })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

app.post("/api/login", async (req, res) => {

    const result = await RegisterModel.findOne({
        Email: req.body.email
    })
    if (result) {
        let repass = result.Password
        console.log(result.UserType)
        let pass2 = bcrypt.compareSync(req.body.password, repass)
        if (pass2 == true) {
            let token = jwt.sign({ id: result._id, mail: result.Email,utype: result.UserType }, key, { expiresIn: "1h" })
            res.send({ statuscode: 1 ,data: result, jwtoken: token })
        }
        else { 
            res.send({ statuscode: 0 })
        }
    }
    else { 
        res.send({ statuscode: 0 })
    }
})

app.get("/api/alluser", async (req, res) => {

    const result = await RegisterModel.find()
    if (result) {
        res.send({ statuscode: 1, data: result })
    }
    else {
        res.send({ statuscode: 0 })
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
    const result = await Contact({
        Fullname: req.body.fullname,
        Email: req.body.email,
        Phone: req.body.phone,
        Subject: req.body.subject,
        Message: req.body.message
    })
    const response = await result.save()
    if (response) {
        res.send({ statuscode: 1 })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

// Files are stored in Vercel Blob. Serverless filesystems are not persistent.
const upload = multer({ storage: multer.memoryStorage() })
const saveUpload = async (file) => {
    if (!file) return "no img"
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        throw new Error("BLOB_READ_WRITE_TOKEN is required to upload images")
    }

    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-")
    const blob = await put(`uploads/${Date.now()}-${safeName}`, file.buffer, {
        access: "public",
        contentType: file.mimetype,
        token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return blob.url
}

const category = mongoose.Schema({
    Name: String,
    Image: String,
})

const Cat = mongoose.model("category", category)

app.post("/api/category", upload.single("pic"), async (req, res) => {
    try {
        const pic = await saveUpload(req.file)
        const result = await Cat({
            Name: req.body.name,
            Image: pic
        })
        const response = await result.save()
        if (response) {
            res.send({ statuscode: 1 })
        }
        else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.status(500).send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/getcategory", async (req, res) => {
    const result = await Cat.find()
    if (result) {
        res.send({ statuscode: 1, data: result })
    }
    else {
        res.send({ statuscode: 0 })
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
        const result = await brandname({
            Name: req.body.bname,
            Category: req.body.cat,
            Image: pic
        })
        const response = await result.save()
        if (response) {
            res.send({ statuscode: 1 })
        }
        else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        res.status(500).send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/getallbrand", async (req, res) => {
    const result = await brandname.find()
    if (result) {
        res.send({ statuscode: 1, data: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

app.get("/api/getbrand/:id", async (req, res) => {
    const result = await brandname.find({ Category: req.params.id })

    if (result) {

        res.send({ statuscode: 1, data: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

const Products = mongoose.Schema({
    Category: String,
    Brand: String,
    Name: String,
    Price: Number,
    Detail:String,
    Image: String,
    SalePrice: String,
    Sale: Boolean,
})

const addproduct = mongoose.model("productadd", Products)
app.post("/api/addpro", upload.single("pic"), async (req, res) => {
    try {
        const pic = await saveUpload(req.file)
        const result = await new addproduct({
            Category: req.body.cate,
            Brand: req.body.brand ,
            Name: req.body.name,
            Price: req.body.price,
            Detail: req.body.detail,
            Image: pic ,
            SalePrice: req.body.saleprice ,
            Sale: req.body.sale,
        })
       if(result){
        const response = await result.save()
        if (response){
            res.send({statuscode:1})
        }
        else{
            res.send({statuscode:0})
        }
       }
    } catch (error) {
        res.status(500).send({ statuscode: 0, message: error.message })
    }
})

app.get("/api/getproducts", async (req, res) => {
    const result = await addproduct.find()
    if (result) {
        res.send({ statuscode: 1, data: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

app.get("/api/getproduct/:id", async (req, res) => {
    const result = await addproduct.findOne({ _id: req.params.id })
    if (result) {
        res.send({ statuscode: 1, data: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

app.get("/api/related/:id",async(req,res)=>{
    const result = await addproduct.find({Category:req.params.id })

    if(result){
        res.send({statuscode:1 ,Data:result})
    }
   else{
    res.send({statuscode:0})
   }
})

const Cart =mongoose.Schema({
    ProductId: String,
    Name: String,
    Price: String,
    Img: String,
    Quantity: Number,
    ProductBy:String,
    UserId:String,
})

const cartModel = mongoose.model("cartss",Cart)

app.post("/api/cartdata", async (req, res) => {
   

        const result = new cartModel({
            Name: req.body.name,
            Price: req.body.price,
            Img: req.body.img,
            Quantity: req.body.value,
            ProductBy:req.body.proby,
            UserId:req.body.id
        })
        if (result) {
            const resp = await result.save()
            if (resp) {
                res.send({ statuscode: 1 })
            }
            else {
                req.send({ statuscode: 0 })
            }
        
    }
})
app.get("/api/cartget/:id",async(req,res)=>{
    const result = await cartModel.find({UserId:req.params.id })
    console.log(result)
    if(result){
        res.send({statuscode:1 ,Data:result})
    }
   else{
    res.send({statuscode:0})
   } 
})

const Wishlist = mongoose.Schema({
    UserId: String,
    Name: String,
    Price: String,
    Img: String,
    ProductBy:String
})

const WishlistModel = mongoose.model("wishlist",Wishlist,"wishlist")

app.post("/api/wishlistdata", async (req, res) => {
    const result = new WishlistModel({
        UserId: req.body.id,
        Name: req.body.name,
        Price: req.body.price,
        Img: req.body.img,
    
    })
    if (result) {
        const resp = await result.save()
        if (resp) {
            res.send({ statuscode: 1 })
        }
        else {
            res.send({ statuscode: 0 })
        }
    }
})

app.get("/api/wishlistget/:id",async(req,res)=>{
    const result = await WishlistModel.find({UserId:req.params.id })
    console.log(result)
    if(result){
        res.send({statuscode:1 ,Data:result})
    }
   else{
    res.send({statuscode:0})
   } 
})

const Check = new mongoose.Schema({
    Email:String,
    FirstName: String,
    LastName: String,
    Address: String,
    Country:String,
    City: String,
    State: String,
    Zip: Number,
    Phone: Number,
    UserId: String,
    ProductId: String,
    Payment: String,
    Order: [{ ProductName: String, Quantity: Number, Price: Number, Img: String,ProBy:String }]
})

const checks = mongoose.model("Checkout", Check)

app.post("/api/checkout", async (req, res) => {
    const result = new checks({
        Email:req.body.mail,
        FirstName: req.body.fname,
        LastName: req.body.lname,
        Address:req.body.address,
        Country:req.body.country,
        City:req.body.city,
        State:req.body.state,
        Zip:req.body.zip,
        Phone:req.body.ph,
        Payment:req.body.payment,
        UserId:req.body.id,
        Order:req.body.data
    })
    const resp = await result.save()
    if (resp) {
        res.send({ statuscode: 1 })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

app.get("/api/orders", async (req, res) => {
    const result = await checks.find()
    if (result) {
        res.send({ statuscode: 1, data: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

app.get("/api/myorder/:id", async (req, res) => {
    const result = await checks.find({ UserId: req.params.id })
    res.send({ statuscode: 1, data: result })
})

if (require.main === module) {
    const port = process.env.PORT || 9000
    app.listen(port, () => console.log(`connected to server on port ${port}`))
}

module.exports = app


