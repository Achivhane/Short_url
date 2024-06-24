const URL = require("../Model/url");
const shortId = require("shortid");

async function createShortURL(req, res) {
  const shortURLID = shortId();
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
async function getbyShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
      $push :{
        visitedHistory:{
            timestamp: Date.now()
        }
      } 
    });
    res.redirect(entry.redirectUrl)
}

async function getAnalyticByShortId(req, res){
const shortId = req.params.shortId;
const result = await URL.findOne({shortId});
console.log(result.visitedHistory.lenght);
return res.json({
    message: 'success',
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory
})
}
module.exports = {
  createShortURL,
  getbyShortId,
  getAnalyticByShortId
}