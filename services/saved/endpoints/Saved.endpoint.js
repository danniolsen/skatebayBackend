"use-strict";
const { GetSavedList } = require("../requests/Saved.get");
const client = require("../../../server/db/dbConnection");

const Saved = (app, admin) => {
  app.post("/savedlist", async (req, res) => {
    const { user } = req.body; // user = user_id, idToken
    try {
      let query = await GetSavedList(user);
      client().query(query, (err, result) => {
        let queryResponse = result ? result.rows : err;
        res.status(200).json(queryResponse);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
};

module.exports = Saved;
