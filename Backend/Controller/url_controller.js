const URL = require("../Model/url");
const { nanoid } = require("nanoid");

async function createShortURL(req, res) {
  const shortURLID = nanoid(8);
  if (req.body.url) {
    await URL.create({
      shortId: shortURLID,
      redirectUrl: req.body.url,
      visitedHistory: [],
    });
    res.status(201).json({
      message: "success",
      id: shortURLID,
    });
  } else {
    res.status(400).json({
      message: "failed",
      error: "URL is required",
    });
  }
}

module.exports = {
  createShortURL,
};
