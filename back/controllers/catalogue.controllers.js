
exports.get = (req, res) => {
        const catalogue = [
            { image: "LeParrain.png", ref: "X001", titre: "Le Parrain", prix: 10 },
            { image: "ForrestGump.png", ref: "X002", titre: "Forrest Gump", prix: 11 },
            { image: "Inception.png", ref: "X003", titre: "Inception", prix: 12 },
            { image: "Matrix.png", ref: "X004", titre: "Matrix", prix: 13 },
            { image: "SeigneurDesAnneaux.png", ref: "X005", titre: "Le Seigneur des Anneaux", prix: 14 },
            { image: "Interstellar.png", ref: "X006", titre: "Interstellar", prix: 15 },
            { image: "Titanic.png", ref: "X007", titre: "Titanic", prix: 16 },
            { image: "Gladiator.png", ref: "X008", titre: "Gladiator", prix: 17 },
            { image: "LeSilencedesAgneaux.png", ref: "X009", titre: "Le Silence des Agneaux", prix: 18 },
            { image: "JurassicPark.png", ref: "X010", titre: "Jurassic Park", prix: 19 },
            { image: "FightClub.png", ref: "X012", titre: "Fight Club", prix: 21 },
            { image: "PulpFiction.png", ref: "X013", titre: "Pulp Fiction", prix: 22 },
            { image: "TheDarkKnight.png", ref: "X014", titre: "The Dark Knight", prix: 23 },
            { image: "StarWars.png", ref: "X015", titre: "Star Wars", prix: 24 },
            { image: "Avatar.png", ref: "X016", titre: "Avatar", prix: 25 },
            { image: "LeRoiLion.png", ref: "X017", titre: "Le Roi Lion", prix: 26 },
            { image: "BraveHeart.png", ref: "X018", titre: "Braveheart", prix: 27 },
            { image: "ToyStory.png", ref: "X019", titre: "Toy Story", prix: 28 },
            { image: "ArrêteMoSiTuPeux.png", ref: "X020", titre: "Arrête Moi Si Tu Peux", prix: 29 }
		];
		
    	
	res.setHeader('Content-Type', 'application/json');
      
    res.send(catalogue);
   };    

exports.optionsCatalogue = (req, res) => {
    res.setHeader('Access-Control-Max-Age', 600);
    // Ajouter d'autres en-têtes si nécessaire
    res.send();
};

// hello.js
exports.hello = (req, res) => {
    let responseObj = { nom: req.params.name };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(responseObj));
};

exports.getSearchCatalogue = (req, res) => {
    console.log("Requête reçue avec le paramètre : ", req.query.filtre);
    const filtre = req.query.filtre; 
    const catalogue = 
    [   
        { image: "LeParrain.png", ref: "X001", titre: "Le Parrain", prix: 10 },
        { image: "ForrestGump.png", ref: "X002", titre: "Forrest Gump", prix: 11 },
        { image: "Inception.png", ref: "X003", titre: "Inception", prix: 12 },
        { image: "Matrix.png", ref: "X004", titre: "Matrix", prix: 13 },
        { image: "SeigneurDesAnneaux.png", ref: "X005", titre: "Le Seigneur des Anneaux", prix: 14 },
        { image: "Interstellar.png", ref: "X006", titre: "Interstellar", prix: 15 },
        { image: "Titanic.png", ref: "X007", titre: "Titanic", prix: 16 },
        { image: "Gladiator.png", ref: "X008", titre: "Gladiator", prix: 17 },
        { image: "LeSilencedesAgneaux.png", ref: "X009", titre: "Le Silence des Agneaux", prix: 18 },
        { image: "JurassicPark.png", ref: "X010", titre: "Jurassic Park", prix: 19 },
        { image: "FightClub.png", ref: "X012", titre: "Fight Club", prix: 21 },
        { image: "PulpFiction.png", ref: "X013", titre: "Pulp Fiction", prix: 22 },
        { image: "TheDarkKnight.png", ref: "X014", titre: "The Dark Knight", prix: 23 },
        { image: "StarWars.png", ref: "X015", titre: "Star Wars", prix: 24 },
        { image: "Avatar.png", ref: "X016", titre: "Avatar", prix: 25 },
        { image: "LeRoiLion.png", ref: "X017", titre: "Le Roi Lion", prix: 26 },
        { image: "BraveHeart.png", ref: "X018", titre: "Braveheart", prix: 27 },
        { image: "ToyStory.png", ref: "X019", titre: "Toy Story", prix: 28 },
        { image: "ArrêteMoSiTuPeux.png", ref: "X020", titre: "Arrête Moi Si Tu Peux", prix: 29 }
    ];

    let data = filtre ? catalogue.filter(obj => obj.titre.toLowerCase().includes(filtre.toLowerCase())) : catalogue;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
};


