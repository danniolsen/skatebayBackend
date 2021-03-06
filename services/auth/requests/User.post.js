/*
const query = {
  name: "",
  text: "",
  values: []
}
return query;
*/

const GetUser = user => {
  const query = {
    name: "get-user",
    text: "SELECT * FROM users WHERE uid = $1 LIMIT 1",
    values: [user.uid]
  };
  return query;
};

const CreateUser = user => {
  const query = {
    name: "create-user",
    text: `INSERT INTO users (uid, email, photo)
          VALUES ($1,$2,$3)
          RETURNING *`,
    values: [user.uid, user.email, user.photo]
  };
  return query;
};

module.exports = {
  CreateUser,
  GetUser
};
