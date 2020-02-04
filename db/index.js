const fs = require("fs");
const R = require("ramda");

let db = { games: { rps: {} } };

const write = (path = [], obj) => {
  db = R.set(R.lens(R.path(path), R.assocPath(path)), obj, db);
  fs.writeFileSync("./db/data.json", JSON.stringify(db));
};

const get = (path = []) =>
  R.path(path, JSON.parse(fs.readFileSync("./db/data.json")));

module.exports = {
  db,
  write,
  get
};
