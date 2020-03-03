"use-strict";
const {
  GetSavedList,
  SaveSpot,
  UnsaveSpot,
  CheckSavedStatus
} = require("../requests/Saved");
const client = require("../../../server/db/dbConnection");

const Saved = (app, admin) => {
  app.post("/check", async (req, res) => {
    const { spot, user } = req.body;
    let query = await CheckSavedStatus(user, spot);
    client()
      .query(query)
      .then(result => {
        console.log(result.rows[0].count);
        if (result.rows[0].count !== 1) {
          res.status(200).send("do nothing");
        } else {
          res.status(200).send("insert spot");
        }
      })
      .catch(e => {
        res.status(400).json({ msg: "error while finding spot" });
      });
  });

  // save spot
  app.post("/savespot", async (req, res) => {
    const { user, spot } = req.body; // user = user_id, idToken

    let queryCheck = await CheckSavedStatus(user, spot);
    let query = await SaveSpot(user, spot);

    client()
      .query(queryCheck)
      .then(savedStatus => {
        let status = savedStatus.rows[0].count;
        if (status === "0") {
          client()
            .query(query)
            .then(saved => {
              res.status(400).json({ msg: "Spot is saved" });
            })
            .catch(err => {
              res.status(400).json({ msg: "Could not save spot" });
            });
        } else {
          res.status(200).json({ msg: "Spot is already saved" });
        }
      })
      .catch(e => {
        res.status(400).json({ msg: "Error while checkin saved status" });
      });
  });

  /*
  client()
    .query(query)
    .then(result => {
      res.status(200).json({ msg: "spot saved" });
    })
    .catch(e => {
      res.status(400).json({ msg: "error while saving spot" });
    });
  */

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
