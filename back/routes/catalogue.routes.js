const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const catalogue = require("../controllers/catalogue.controllers.js");
  
    var router = require("express").Router();
   
 

    //router.post("/getSearchCatalogue",catalogue.getSearchCatalogue);
    router.get("/get", catalogue.get);
    router.get("/getSearchCatalogue",catalogue.getSearchCatalogue);


  
    app.use('/api/catalogue', router);

    router.get("/test", (req, res) => {
      res.send("Route Test Réussie");
  });


  };
