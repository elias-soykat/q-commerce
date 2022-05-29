const { asyncHandler } = require("../middleware/errorMiddleware");
const countryList = require("../utils/countryDB");

exports.getAllCountry = asyncHandler(async (req, res) => {
  res.json(countryList);
});
