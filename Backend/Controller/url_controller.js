const URL = require("../Model/url");
const shortId = require("shortid");

async function createShortURL(req, res) {
  const shortURLID = shortId();
  if (req.body.url) {
    await URL.create({
      shortId: shortURLID,
      redirectUrl: req.body.url,
      name: req.body.name,
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
async function getbyShortId(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  // res.redirect(entry.redirectUrl);
  res.json({
    message: "sucsess",
    Result: entry,
  });
}
async function getAll(req, res) {
  // const shortId = req.params.shortId;
  const getA = await URL.find();
  res.json({
    message: "success",
    Result: getA,
  });
}

async function getAnalyticByShortId(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  console.log(result.visitedHistory.lenght);
  return res.json({
    message: "success",
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}
async function updateRedirectUrl(req, res) {
  const _id = req.params._id;
  const entry = await URL.findByIdAndUpdate(
    { _id },
    {
      // $set: { redirectUrl: req.body.redirectUrl, name: req.body.name },
      $set: req.body,
    }

    // ((redirectUrl = req.body.redirectUrl), (shortId = shortURLID))
  );
  return res.json({
    message: "success",
    Result: entry,
  });
}
module.exports = {
  createShortURL,
  getbyShortId,
  getAnalyticByShortId,
  getAll,
  updateRedirectUrl,
};
