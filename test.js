// const multer = require('multer');

//set your desired file destination and the name you wanna give your files

// const multerStorage = multer.diskStorage(

//     {
//         destination : (req , file , cb) =>

//         {
//             cb(null , './public/img/users')
//         },

//         filename : (req , file , cb) =>

//         {
//             const ext = file.mimetype.split('/')[1];

//             cb(null , `user-${req.user.id}-${Date.now()}.${ext}`);

//         }
//     }
// )

// req.body.images = [];

// req.files.map(el => {

//     let currentImage = el.filename

//     req.boby.images.push(currentImage)

// })

// console.log(req.boby.images)

// //for imgages this filter will check if the files set for uploads are all images

// const multerFilter = (req , file , cb) =>

// {
//     if(file.mimetype.startsWith('image'))

//     {
//         cb(null , true)
//     }

//     else

//     {
//         cb(new AppError('Not An Image ! Please Upload Only Images' , 400) , false);
//     }
// }

// //Pass your configurations into the multer function

// exports.upload = multer(

//     {
//         storage : multerStorage,

//         fileFilter : multerFilter
//     }
// )

//in the below line of code image is the name of the form and 5 is the max number of files you wanna upload

// exports.uploadUserData = upload.array('image' , 5);

// in your routes add this code below to your middleware stack

// router.post('/users , test.uploadUserData , test.upload)

/////////////////////////////////////////////////////////////////////////////////////////

// const express = require('express');
// const bodyparser = require('body-parser');
// const exphbs = require('express-handlebars');
// const multer = require('multer');
// const path = require('path');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// const env = require('dotenv').config();
// const hbs = require('nodemailer-express-handlebars'); //for nodemailer html template
//require('./test');
// const app = express();

// mongoose
//   .connect('mongodb://localhost/uploading', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('mongodb fully connected'))
//   .catch((err) => console.log(err));

// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json()); // const ext = file.mimetype.split('/')[1]; // cb(null , `uploading-${Date.now()}.${ext}`);

// app.engine('handlebars', exphbs({
//     defaultLayout:'main'
// }))
// app.set('view engine', 'handlebars');

// require('./models/Uploading');
// require('./models/Contact');
// require('./models/Banner');
//require('./models/Comment');

// var storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null, 'public/uploads')
//     },
//     filename: function(req, file, cb){
//      cb(null,  file.fieldname +'_'+ Date.now());
//     }
// });
//   function fileFilter (req, file,cb){
//       if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'
//        || file.mimetype === 'image/png'){
//           cb(null, true)
//       }else{
//           cb(new Error ('image uploaded is not of jpeg/jpg or png'), false);
//       }

// }

// var upload = multer({storage:storage, fileFilter:fileFilter})
/*var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb){
    // const ext = file.mimetype.split('/')[1];

     cb(null,  file.originalname +'_'+ Date.now() );
    }
});
var upload = multer({storage:storage})*/

// app.post('/uploadings',  upload.array('image', 5),(req, res)=>{
//     const newUploading={
//         title:req.body.title,
//         url:req.body.url,
//
//         image:'/uploads/' + req.files['image']
//     }

//     new Uploading (newUploading)
//     .save ()
//     .then(uploading=>{
//         res.redirect('/uploadings')
//         //res.send(image)
//     })

// })

// const postSchema = new mongoose.Schema({
//   name: String,
//   views: { type: Number, default: 0 },

//   viewedBy: [String],
// });

// postSchema.methods.increment = async function (user) {
//   this.views = this.views + 1;

//   user != ''
//     ? (this.viewedBy = this.viewedBy.push(user.Username))
//     : (this.viewedBy = this.viewedBy.push('guest'));

//   await this.save({ validateBeforeSave: false });

//   return this.viewedBy;
// };

// const Post = mongoose.model('post', postSchema);

const array = [[1], [2], [3], [[[4]]], [[[5]]]];

// console.log(array.flat(2));

const greeting = [
  ['Hello', 'young', 'grasshopper!'],
  ['you', 'are'],
  ['learning', 'fast!'],
];

// console.log(greeting.flatMap((el) => el.join(' ')).join(' '));

const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];

// console.log(trapped.flat(Infinity));

const userEmail3 = '     cannotfillemailformcorrectly@gmail.com   ';

// console.log(userEmail3.trimStart().trimEnd().length);

const users = { user1: 18273, user2: 92833, user3: 90315 };

const update = Object.entries(users);

const multiVal = update.map((el) => [el[0], el[1] * 2]);

console.log(multiVal);
