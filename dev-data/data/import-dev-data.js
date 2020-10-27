const fs = require('fs');

//end of importing node core modules

//importing third party and custom modules

//importing our data model

const Tour = require('./../../Models/tourModel');
const User = require('./../../Models/userModel');
const Review = require('./../../Models/reviewModel');

//importing dotenv for node env variables

const dotenv = require('dotenv');

dotenv.config({path: './../../config.env'});

//end of third party and custon initialisations

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_LOCAL , {


    useNewUrlParser: true,

    useCreateIndex: true,

    useUnifiedTopology: true,

    useFindAndModify: false

}).then(() => console.log('Database Connected Successfullly'));

//loading the ffile using the fs module

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json` , 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json` , 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json` , 'utf-8'));


//importing the data to the database

const importData = async () => 

{
    //load the data

    try

    {

      await Tour.create(tours);

      await User.create(users , { validateBeforeSave : false });

      await Review.create(reviews);
      
      console.log('Data Imported Succesfully!!!');

    }

    catch(err)

    {
        console.log(err)
    }

    //exit the process

    process.exit();
}

const deleteData = async () =>

{

    try

    {

      await Tour.deleteMany();
      await User.deleteMany();
      await Review.deleteMany();
      
      console.log('Data Deleted Succesfully!!!');

    }

    catch(err)

    {
        console.log(err)
    }

    //exit the process

    process.exit();
}

if(process.argv[2] === '--import')

{
    importData()
}

else

if(process.argv[2] === '--delete')

{
    deleteData();
}