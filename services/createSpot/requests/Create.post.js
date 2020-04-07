/*
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const UploadSpot = (spot, user) => {
  const { title, location, tags, images } = spot;
  const { user_id } = user.user;
  const { latitude, longitude } = location;

  let jsonTags = JSON.stringify(tags);

  let imgNames = [];
  images.map((img, i) => {
    let ran = Math.random()
      .toString(36)
      .substring(2, 8);
    let newName = `skatebay-spot-${i}-${ran}.jpg`;
    imgNames.push(newName);
  });

  const query = {
    name: "upload-spot",
    text: `INSERT INTO spots
    (spot_title, latitude, longitude, user_fk, tags, spot_images)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    values: [title, latitude, longitude, user_id, jsonTags, imgNames]
  };
  return query;
};

const FinishSpot = spot_id => {
  const query = {
    name: "fisish-spot",
    text: `update spots set pending = 'false' where spot_id = $1`,
    values: [spot_id]
  };
  return query;
};

module.exports = { UploadSpot, FinishSpot };
