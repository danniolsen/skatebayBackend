const { Client } = require("pg");

let clientData = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 20
};

const client = new Client(clientData);
client.connect();

module.exports = () => {
  return client;
};
