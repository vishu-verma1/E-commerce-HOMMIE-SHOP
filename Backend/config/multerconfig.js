const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
const fs = require("fs")


const uploadpath = path.resolve(__dirname, './..',  "public/multimedia")


if(!fs.existsSync(uploadpath)){
  fs.mkdirSync(uploadpath,{recursive:true});
}






const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadpath)
    
    },


    filename: function (req, file, cb) {
      crypto.randomBytes(12,(err,name)=>{
        let filename = name.toString('hex')+path.extname(file.originalname);
        cb(null, filename)
      })
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload.single("image");




  const memostorage = multer.memoryStorage()
  const uploadproducts = multer({ storage: memostorage })
  module.exports =  uploadproducts.array('products',5);