"use-strict";
const { RemoveSpot } = require("../requests/Remove");
const client = require("../../../server/db/dbConnection");

const Remove = (app, admin) => {
  // remove spot
  app.post("/removespot", async (req, res) => {
    const { user, spot } = req.body;

    const queryRemove = await RemoveSpot(user, spot);

    client()
      .query(queryRemove)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(e => {
        res.status(400).json({ msg: "Could not remove spot" });
      });
  });
}; // endpoint function ends

module.exports = Remove;
