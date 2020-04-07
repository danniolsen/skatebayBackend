/*const query = {
  name: "",
  text: ``,
  values: []
  return query
}*/

const GetUserById = async user_id => {
  const query = {
    name: "get-user-by-id",
    text: `select displayname, photo from users where user_id = $1`,
    values: [user_id]
  };
  return query;
};

module.exports = {
  GetUserById
};
