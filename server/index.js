const express = require('express');
const app = express();
const { SERVER_PORT } = require("./env");

const mongoose = require('mongoose');
const morgan = require("morgan")
app.use(morgan("combined"))

const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb' }));

const cors = require("cors");
app.use(cors());

app.listen(SERVER_PORT, () => {
    console.log(`Server-Fashion listening on port ${SERVER_PORT}`)
})

// ====== ROUTES ======
const adminRouter = require("./routes/admin.route");
app.use("/v1/admins", adminRouter);

const ratingRouter = require("./routes/rating.route");
app.use("/v1/ratings", ratingRouter);