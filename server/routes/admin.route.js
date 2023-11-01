const express = require("express");
const router = express.Router();

const { admin_collection, rating_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

// =================SETTING UP ROUTES=================
// prefix: /v1/admins

// 1. GET ALL ADMINS
router.get("/", async (req, res) => {
    try {
        const admins = await admin_collection.find({}).toArray();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. GET ADMIN BY ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await admin_collection.findOne({ _id: new ObjectId(id) });
        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ====================================================
module.exports = router;