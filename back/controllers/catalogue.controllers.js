const Catalogue = require('../database/models/catalogue.model');
const Sequelize = require('sequelize');





   exports.get = (req, res) => {
    Catalogue.findAll()
        .then(catalogue => {
            res.setHeader('Content-Type', 'application/json');
            res.send(catalogue);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération du catalogue:', err);
            res.status(500).send({ message: "Erreur lors de la récupération du catalogue" });
        });
}


exports.optionsCatalogue = (req, res) => {
    res.setHeader('Access-Control-Max-Age', 600);
    res.send();
};

// hello.js
exports.hello = (req, res) => {
    let responseObj = { nom: req.params.name };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(responseObj));
};



exports.getSearchCatalogue = (req, res) => {
    const filtre = req.query.filtre; 

    Catalogue.findAll({
        where: {
            titre: { [Sequelize.Op.iLike]: `%${filtre}%` }
        }
    })
    .then(data => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    })
    .catch(err => {
        console.error('Erreur lors de la recherche dans le catalogue:', err);
        res.status(500).send({ message: "Erreur lors de la recherche" });
    });
};
