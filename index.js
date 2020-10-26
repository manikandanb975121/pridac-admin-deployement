// const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); 

const app = express();
app.use(cors());

const category = require('./backend/routes/category');
const projects = require('./backend/routes/project');
const users = require('./backend/routes/users');
const teams = require('./backend/routes/teams');
const home = require('./backend/routes/home');
const activity = require('./backend/routes/activity');
const settings = require('./backend/routes/settings');

mongoose.connect('mongodb+srv://clixters:clixters@2020@cluster0.a9ouy.mongodb.net/pridac-Admin?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to Database!');
    })
    .catch(() => {
        console.log('Connections Failed !');
    })

    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/iconic_image', express.static(path.join('backend/iconic_image')));
app.use('/images', express.static(path.join('backend/images')));
app.use('/profile_pic', express.static(path.join('backend/profile_pic')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/api/category', category);
app.use('/api/projects', projects);
app.use('/api/users', users);
app.use('/api/teams', teams);
app.use('/api/home', home);
app.use('/api/activity', activity);
app.use('/api/settings', settings)

// module.exports = app;

app.use(express.static('pridac-admin'))
app.use('/*',function(req,res){
    res.sendFile(__dirname + 'index.html')
})

const normalizePort = val => {
  var PORT = parseInt(val, 10);

  if (isNaN(PORT)) {
    // named pipe
    return val;
  }

  if (PORT >= 0) {
    // port number
    return PORT;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof PORT === "string" ? "pipe " + PORT : "port " + PORT;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + PORT : "port " + PORT;
  debug("Listening on " + bind);
};

const PORT = normalizePort(process.env.PORT || 1205);
app.set("port", PORT);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(PORT);
