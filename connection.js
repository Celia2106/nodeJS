
const databaseConfig= {
    user:'postgres',
    password: 'postgre',
    database: 'agilia',
    host: 'localhost',
    port: 5432,
};

const pgp = require("pg-promise")({});
const db = pgp(databaseConfig);

db.connect()
    .then(obj => {
        return db;
    })
    .catch(error => {
        console.log("ERROR:", error.message || error);
    });

module.exports = {
    query: (text, params, callback)  => {
        db.connect()
            .then(data => {

                callback(data);
            })
            .catch(error => {
                console.log("ERROR:", error.message || error);
            });
    }
}