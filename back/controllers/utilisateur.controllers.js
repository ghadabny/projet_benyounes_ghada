const { v4: uuidv4 } = require ("uuid");
const bcrypt = require('bcrypt');
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");
const Utilisateur = require('../database/models/utilisateur.model');
const Sequelize = require('sequelize');



const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
  }

// Find a single Utilisateur with an login
// exports.login = (req, res) => {
//   const utilisateur = {
//     login: req.body.login,
//     password: req.body.password
//   };

//   // Test
//   let pattern = /^[A-Za-z0-9]{1,20}$/;
//   if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {

//         const uuid = uuidv4 ();
//         const utilisateur = {
//           nom: "Martin",
//           prenom: "Jean",
//           login: "emma",
//           email : "martin.jean@gmail.com",
//           password : "toto",
//           id : uuid
//         };

//         const user = {
//           id: utilisateur.id,
//           name: utilisateur.nom,
//           email: utilisateur.email
//         };

//         if(utilisateur.login!=req.body.login && utilisateur.password != req.body.password)
//         {
//           console.log("mauvais mdp");
//           res.send();
//         }
      
        
//         let accessToken = generateAccessToken(user);
//         res.setHeader('Authorization', `Bearer ${accessToken}`);

//         console.log (accessToken);

      
//         res.send(utilisateur);
//     };    
// };

exports.login = (req, res) => {
    const { login, password } = req.body;

    Utilisateur.findOne({ where: { login } })
        .then(utilisateur => {
            if (!utilisateur) {
                return res.status(401).send({ message: "Utilisateur non trouvé" });
            }

            // Comparez le mot de passe avec le hachage stocké
            bcrypt.compare(password, utilisateur.password, function(err, result) {
                if (result) {
                    // Les mots de passe correspondent
                    const userForToken = {
                        id: utilisateur.id,
                        email: utilisateur.email
                    };

                    let accessToken = generateAccessToken(userForToken);
                    res.setHeader('Authorization', `Bearer ${accessToken}`);
                    res.send(utilisateur);
                } else {
                    // Les mots de passe ne correspondent pas
                    return res.status(401).send({ message: "Mot de passe incorrect" });
                }
            });
        })
        .catch(err => {
            console.error('Erreur de connexion:', err);
            res.status(500).send({ message: "Erreur lors de la connexion" });
        });
};



// let utilisateurs = [];

// exports.inscrire = (req, res) => {
//   const nouveauUtilisateur = {
//       nom: req.body.nom,
//       prenom: req.body.prenom,
//       email: req.body.email,
//       login: req.body.login,
//       password: req.body.password, // En production, assurez-vous de hasher le mot de passe
//       id: uuidv4()
//   };

 
//   utilisateurs.push(nouveauUtilisateur);

 
//   const userForToken = {
//       id: nouveauUtilisateur.id,
//       email: nouveauUtilisateur.email
//   };

//   let accessToken = generateAccessToken(userForToken);
//   res.setHeader('Authorization', `Bearer ${accessToken}`);

//   console.log("Nouvel utilisateur enregistré", nouveauUtilisateur);
//   res.status(201).send(nouveauUtilisateur);
// };

exports.inscrire = async (req, res) => {
  try {
      const { nom, prenom, email, login, password, adresse, codepostal, ville, sexe, telephone  } = req.body;
      // Validation de l'email

      if (!nom || !prenom || !email || !password || !login) {
        return res.status(400).send({ message: "Tous les champs obligatoires doivent être remplis" });
    }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).send({ message: "Format de l'email invalide" });
      }

      // Validation du code postal (pour un code postal français)
      const codePostalRegex = /^[0-9]{5}$/;
      if (codepostal && !codePostalRegex.test(codepostal)) {
          return res.status(400).send({ message: "Format de code postal invalide" });
      }

      // Validation du numéro de téléphone (pour un numéro français)
      const telephoneRegex = /^[0-9]{10}$/;
      if (telephone && !telephoneRegex.test(telephone)) {
          return res.status(400).send({ message: "Format de numéro de téléphone invalide" });
      }


      const emailExists = await Utilisateur.findOne({ where: { email } });
      const loginExists = await Utilisateur.findOne({ where: { login } });
      
      if (emailExists || loginExists) {
        return res.status(400).send({ message: "L'email ou le login est déjà utilisé" });
    }

      // Hachage du mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const nouveauUtilisateur = await Utilisateur.create({
          nom,
          prenom,
          email,
          login,
          password: hashedPassword,
          adresse,
          codepostal,
          ville,
          sexe,
          telephone
      });

      const userForToken = {
          id: nouveauUtilisateur.id,
          email: nouveauUtilisateur.email
      };

      let accessToken = generateAccessToken(userForToken);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.status(201).send(nouveauUtilisateur);
  } catch (err) {
      console.error('Erreur d’inscription:', err);
      res.status(500).send({ message: "Erreur lors de l'inscription" });
  }
};






