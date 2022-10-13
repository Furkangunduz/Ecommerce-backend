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
            "Succesfully connected. List of endpoints =>\n\
            \n-------------\
            \n Post    /user/register            -> kullanıcı adı şifre ve email ile üye kaydetme.\
            \n POST    /user/login               -> JWT ile beraber giriş yapacak \
            \n------------- \
            \n POST    /categories               -> Kullanıcı kategori eklemesi yapabilecek \
            \n GET     /categories               -> Eklediği kategorileri listeleyebilecek\
            \n GET     /categories/:categoryId   -> Eklediği kategoriyi idsine göre listeleyebilecek\
            \n PATCH   /categories/:categoryId   -> Eklediği kategoriyi idsine göre güncelleyebilecek\
            \n DELETE  /categories/:categoryId   -> Eklediği kategoriyi idsine göre silebilecek (Eğer bir kategori silinirse, o kategoriye ait -varsa- ürünler silinecek)\
            \n------------- \
            \n POST    /products                 -> Bir kategoriye, yeni ürün kaydı oluşturabilecek\
            \n GET     /products                 -> Kullanıcı eklediği ürünler listeleyebilecek\
            \n GET     /products/:productId      -> Kullanıcı eklediği ürünü idsine göre listeleyebilecek\
            \n PATCH   /products/:productId      -> Kullanıcı eklediği ürünü idsine göre güncelleyebilecek\
            \n DELETE  /products/:productId      -> Kullanıcı eklediği ürünü idsine göre silebilecek")
})

app.use("/user", require("./routes/userRoutes"))
app.use("/categories", require("./routes/categoryRoutes"))
app.use("/products", require("./routes/productRoutes"))


app.listen(PORT, () => { console.log("App start and listen on " + PORT) })