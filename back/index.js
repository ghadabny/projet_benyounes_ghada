const express = require("express");
const cors = require("cors");
const sequelize = require('./database/sequelize'); 


const app  = express ();

var corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Content-Type, Authorization',
  exposedHeaders:'Authorization'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use('/images', express.static('./imgAng'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require("./routes")(app);

// set port, listen for requests
const PORT =  443;


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });
