const express = request("express");
const urlRoute = require("./Routes/url_router");

const app = express();

app.use("/url", urlRoute);
const PORT = 8001;

app.listen(PORT, () => {
  console.log("server started on Port " + PORT);
});
