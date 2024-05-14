const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');
const adminConfig = require('./config/admin');
const authRoutes = require('./routes/authr');
const bookRoutes = require('./routes/bookr');
const parkRoutes = require('./routes/parkr');
const mpesaRoutes = require('./routes/mpesar');
const adminRoutes = require('./routes/adminr');
const bodyParser = require('body-parser');

require('./models/car'); 
require('./models/parkSlot');
require('./models/user'); 

//sync the DB after changes/eq=laravel seeders
db.sync({alert:true});

require('dotenv').config(); 
const {authenticateUser} = require('./middlewares/authm');

const app = express(); //!app initialization

//!
const corsOptions = {
  origin: 'http://localhost:3009', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};


app.use(bodyParser.json());
app.use(cors(corsOptions)); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes//paths
app.use('/user', authRoutes);
app.use('/book', bookRoutes);
app.use('/park', parkRoutes);
app.use('/mpesa',mpesaRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => { 
  res.send('Welcome to the server! Swift Slot Allocation, Seamless Mobile Payments',);
});

// Database Connection
db.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });


app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err,req,res,next)=>{
  res.status(err.status || 500);
  res.send({
      error:{
          status:err.status || 500,
          Message:err.Message
      }
  })
})

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
