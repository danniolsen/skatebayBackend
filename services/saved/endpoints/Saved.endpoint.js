"use-strict";
const { GetSavedList, SaveSpot, UnsaveSpot } = require("../requests/Saved");
const client = require("../../../server/db/dbConnection");

const Saved = (app, admin) => {
  // save spot
  app.post("/savespot", async (req, res) => {
    const { user, spot } = req.body; // user = user_id, idToken

    let query = await SaveSpot(user, spot);
    client()
      .query(query)
      .then(result => {
        res.status(200).json({ msg: "spot saved" });
      })
      .catch(e => {
        res.status(400).json({ msg: "error while saving spot" });
      });
  });

  // get list of saved spots
  app.post("/savedlist", async (req, res) => {
    const { user } = req.body; // user = user_id, idToken

    let query = await GetSavedList(user);
    client()
      .query(query)
      .then(result => {
        let queryResponse = result ? result.rows : [];
        res.status(200).json(queryResponse);
      })
      .catch(e => {
        res.status(400).json({ msg: "Coulden't get list of saved spots" });
      });
  });

  // unsave spot
  app.post("/unsavespot", async (req, res) => {
    const { user, spot } = req.body; // user = user_id, idToken

    let query = await UnsaveSpot(user, spot);
    client()
      .query(query)
      .then(result => {
        res.status(200).json({ msg: "spot unsaved" });
      })
      .catch(e => {
        res.status(400).json({ msg: "error while unsaving spot" });
      });
  });
}; // endpoint function ends

module.exports = Saved;
