//importing dotenv for node env variables

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

//catching uncaught errors

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);

  console.log('UNCAUGHT EXCEPTOIN! Shutting Down');

  process.exit(1);
});

// console.log(x)

//end of third party and custon initialisations

const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,

    useCreateIndex: true,

    useUnifiedTopology: true,

    useFindAndModify: false,
  })
  .then(() => console.log('Database Connected Successfullly'));

//creating the variable for the port

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening To Requests On Port ${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);

  console.log('UNHANDLED REJECTION! Shutting Down');

  server.close(() => {
    process.exit(1);
  });
});
