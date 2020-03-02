const { Client } = require("pg");

let clientData = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
};

const client = new Client(clientData);
client.connect();
console.log(clientData);
module.exports = () => {
  return client;
};
