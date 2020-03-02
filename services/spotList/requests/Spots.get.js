// user = {id, latitude, longitude}
// create new field "saved" boolean
const GetSpotList = async user => {
  let query = `SELECT spot_id, spot_title, spot_images, spot_type, distance, latitude, longitude
  FROM (
      SELECT *,
          (6371 * acos( cos( radians(${
            user.latitude
          }) ) * cos( radians( spots.latitude ) )
          * cos( radians( spots.longitude ) - radians(${user.longitude}) )
          + sin( radians(${
            user.latitude
          }) ) * sin( radians( spots.latitude ) ) ) ) AS distance
      FROM (
        SELECT *
        FROM spots
        left join spot_types on spot_types.spot_type_id = spots.spot_id
          ) AS spots
      ) sub
  WHERE distance <= ${user.distance}
  ORDER BY distance asc`;
  return query;
};

module.exports = {
  GetSpotList
};
