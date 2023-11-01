const express = require("express");
const router = express.Router();

const { admin_collection, rating_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

// =================SETTING UP ROUTES=================
// prefix: /v1/ratings

// 1. POST A RATING
router.post("/", async (req, res) => {
    try {
        const { admin_id, star, comment } = req.body;
        const data = {
            ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            timestamp: new Date().getTime(),
            admin_id,
            star,
            comment
        }
        const result = await rating_collection.insertOne(data);

        const admin = await admin_collection.findOne({ _id: new ObjectId(admin_id) });
        const updateAdmin = await admin_collection.updateOne({ _id: new ObjectId(admin_id) }, {
            $set: {
                total_star: admin.total_star + star,
                total_review: admin.total_review + 1
            }
        });
        res.json({ message: "Rating successfully", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ====================================================
module.exports = router;