const { GetUserById } = require("../requests/User.get");
const client = require("../../../server/db/dbConnection");

const User = (app, admin) => {
  // get user by user id
  app.post("/getuserbyid", async (req, res) => {
    const { user_id } = req.body;

    let query = await GetUserById(user_id);
    client()
      .query(query)
      .then(result => {
        let queryResponse = result.rows.length !== 0 ? result.rows : {};
        console.log(queryResponse);
        res.status(200).json(queryResponse[0]);
      })
      .catch(e => {
        res.status(400).json({});
      });
  });
};

module.exports = User;
