const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8090

app.use(cors());
app.use(bodyParser.json());

const url = process.env.MONGODB_URL;
global.URI = url;

mongoose.connect(url, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false
})

const connection = mongoose.connection;

connection.once("open", () => {
  console.log('MongoDB Connection Success!!!');
})



const donaters_register = require('./routes/Donater/Dregister_routes')

app.use("/donaters_register" , donaters_register);

// const teacher_register = require('./routes/Register/teachers_register')  
// app.use("/teacher_register" , teacher_register);

// const edit_Proifile = require('./routes/Register/student_profile')  
// app.use("/edit_Proifile" , edit_Proifile);


app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`)
});

