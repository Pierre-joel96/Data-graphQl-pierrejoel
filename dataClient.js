// Je me connecte à ma BDD
const { Pool } = require('pg');

console.log("URL",process.env.DATABASE_URL);
const client = new Pool({
    // Heroku nous met à disposition le DATABASE_URL
    connectionString: process.env.DATABASE_URL,
    ssl: {
      // on demande à accepter le fait de ne pas être en ssl
      rejectUnauthorized: false
    }
  });
  // client.connect();

module.exports = client;