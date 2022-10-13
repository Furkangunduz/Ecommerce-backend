const express = require("express")
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001
const connectDb = require("./config/db")
require("dotenv").config()

connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))

app.get("/", (req, res) => {
    res.status(200)
        .send(

            "<h1>Succesfully connected. List of endpoints =></h1>\n\
            \n<ul><li> Post    /user/register            -> kullanıcı adı şifre ve email ile üye kaydetme.</li>\
            \n<li>POST    /user/login               -> JWT ile beraber giriş yapacak </li>\
            \n------------- \
            \n<li> POST    /categories               -> Kullanıcı kategori eklemesi yapabilecek </li>\
            \n<li>GET     /categories               -> Eklediği kategorileri listeleyebilecek</li>\
            \n<li>GET     /categories/:categoryId   -> Eklediği kategoriyi idsine göre listeleyebilecek</li>\
            \n<li> PATCH   /categories/:categoryId   -> Eklediği kategoriyi idsine göre güncelleyebilecek</li>\
            \n<li>DELETE  /categories/:categoryId   -> Eklediği kategoriyi idsine göre silebilecek (Eğer bir kategori silinirse, o kategoriye ait -varsa- ürünler silinecek)</li>\
            \n------------- \
            \n<li>POST    /products                 -> Bir kategoriye, yeni ürün kaydı oluşturabilecek</li>\
            \n<li> GET     /products                 -> Kullanıcı eklediği ürünler listeleyebilecek</li>\
            \n<li>GET     /products/:productId      -> Kullanıcı eklediği ürünü idsine göre listeleyebilecek</li>\
            \n<li>PATCH   /products/:productId      -> Kullanıcı eklediği ürünü idsine göre güncelleyebilecek</li>\
            \n<li> DELETE  /products/:productId      -> Kullanıcı eklediği ürünü idsine göre silebilecek</li></ul>")
})

app.use("/user", require("./routes/userRoutes"))
app.use("/categories", require("./routes/categoryRoutes"))
app.use("/products", require("./routes/productRoutes"))


app.listen(PORT, () => { console.log("App start and listen on " + PORT) })