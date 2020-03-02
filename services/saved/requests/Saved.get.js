"use-strict";

// get saved spots
const GetSavedList = user => {
  let query = `select spots.*
               from saved
               left join spots on saved.spot_fk = spots.spot_id
               where saved.user_fk = ${user.user_id}
               order by saved.created_at desc;`;
  return query;
};

module.exports = {
  GetSavedList
};
