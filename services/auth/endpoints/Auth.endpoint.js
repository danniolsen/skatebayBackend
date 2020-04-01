"use-strict";
const { VerifyIdToken } = require("../controllers/Auth.controller.Post");
const client = require("../../../server/db/dbConnection");
const { CreateUser, GetUser } = require("../requests/User.post");

const Auth = (app, admin) => {
  // verify firebase idToeken.
  app.post("/auth", async (req, res) => {
    const { idToken } = req.body;

    const user = await VerifyIdToken(admin, idToken);
    const getQuery = await GetUser(user);
    const createUser = await CreateUser(user);

    client()
      .query(getQuery)
      .then(existingUser => {
        if (existingUser.rows.length === 1) {
          let userData = existingUser.rows[0];
          res.status(200).json(userData);
        } else {
          client()
            .query(createUser)
            .then(newUser => {
              let newUserData = newUser.rows[0];
              res.status(200).json(newUserData);
            })
            .catch(err => {
              res
                .status(500)
                .json({ msg: "could not create user", err: err.stack });
            });
        }
      })
      .catch(err => {
        res.status(200).json({});
      });
  });
};

module.exports = Auth;

/*

*/
