# 🔗[Ecommerce-backend](https://ecommercecase.herokuapp.com/)

# live demo link : https://ecommercecase.herokuapp.com/

# Beklenen Senaryolar

* Kullanıcı sisteme JWT token ile giriş yapacak.
* Kullanıcı kendi ürünleri üzerinden CRUD işlemleri yapabilecek.
* Kullanıcı ürünlerine resim yüklemesi yapabilir (Opsiyonel).
* Joi ile istekte gelen alanların kontrolü için kullanılması gerekmektedir.

# Endpoints

# 

* POST   /user/login              -> JWT ile beraber giriş yapacak
* POST   /user/register           -> username password ve email ile beraber kayıt yapacak
#
* POST   /categories              -> Kullanıcı kategori eklemesi yapabilecek
* GET    /categories              -> Eklediği kategorileri listeleyebilecek
* GET    /categories/:categoryId  -> Eklediği kategoriyi idsine göre listeleyebilecek
* PATCH  /categories/:categoryId  -> Eklediği kategoriyi idsine göre güncelleyebilecek
* DELETE /categories/:categoryId  -> Eklediği kategoriyi idsine göre silebilecek (Eğer bir kategori silinirse, o kategoriye ait -varsa- ürünler silinecek)
#
* POST   /products                -> Bir kategoriye, yeni ürün kaydı oluşturabilecek
* GET    /products                -> Kullanıcı eklediği ürünler listeleyebilecek
* GET    /products/:productId     -> Kullanıcı eklediği ürünü idsine göre listeleyebilecek
* PATCH  /products/:productId     -> Kullanıcı eklediği ürünü idsine göre güncelleyebilecek
* DELETE /products/:productId    -> Kullanıcı eklediği ürünü idsine göre silebilecek

