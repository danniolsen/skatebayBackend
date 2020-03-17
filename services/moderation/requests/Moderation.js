/*
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const ReportSpot = report => {
  const { spot, user, reason } = report;

  const query = {
    name: "report-spot",
    text: `INSERT INTO reports (spot_fk, user_fk, reason_fk) VALUES ($1, $2, $3)`,
    values: [spot, user, reason]
  };

  return query;
};

module.exports = {
  ReportSpot
};
