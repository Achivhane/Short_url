const express = require("express");
const urlRoute = require("./Routes/url_router");
const mongoose = require("mongoose");
const DB_URL =
  "mongodb+srv://admin:admin@cluster0.lphttf9.mongodb.net/ShortURL?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection successful"));
const app = express();
app.use(express.json());
app.use("/url", urlRoute);
app.use('/', urlRoute)
// app.use('/analytic/:shortId', urlRoute.getAnalyticByShortId)

const PORT = 8001;

app.listen(PORT, () => {
  console.log("server started on Port " + PORT);
});
