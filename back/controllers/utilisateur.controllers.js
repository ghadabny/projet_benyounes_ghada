const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
  }

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {

        const uuid = uuidv4 ();
        const utilisateur = {
          nom: "Martin",
          prenom: "Jean",
          login: "emma",
          email : "martin.jean@gmail.com",
          password : "toto",
          id : uuid
        };

        const user = {
          id: utilisateur.id,
          name: utilisateur.nom,
          email: utilisateur.email
        };

        if(utilisateur.login!=req.body.login && utilisateur.password != req.body.password)
        {
          console.log("mauvais mdp");
          res.send();
        }
      
        
        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        console.log (accessToken);

      
        res.send(utilisateur);
    };    
};

let utilisateurs = [];

exports.inscrire = (req, res) => {
  const nouveauUtilisateur = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      login: req.body.login,
      password: req.body.password, // En production, assurez-vous de hasher le mot de passe
      id: uuidv4()
  };

 
  utilisateurs.push(nouveauUtilisateur);

 
  const userForToken = {
      id: nouveauUtilisateur.id,
      email: nouveauUtilisateur.email
  };

  let accessToken = generateAccessToken(userForToken);
  res.setHeader('Authorization', `Bearer ${accessToken}`);

  console.log("Nouvel utilisateur enregistré", nouveauUtilisateur);
  res.status(201).send(nouveauUtilisateur);
};





