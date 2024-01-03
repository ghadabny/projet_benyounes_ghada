const Sequelize = require('sequelize');

const sequelize = new Sequelize('cnamdocker_zsq0', 'cnamdocker_zsq0_user', 'NaVoN4poZmzY2bfEQzGuqevBHGWRC928', {
    host: 'dpg-cm23hoq1hbls73bu48ig-a.frankfurt-postgres.render.com',
    dialect: 'postgres',
    port: '5432',
    dialectOptions: {
        ssl: {
          require: true, // si votre base de données nécessite SSL
          rejectUnauthorized: false // nécessaire si le certificat SSL n'est pas validé
        }
      }
});

module.exports = sequelize;

