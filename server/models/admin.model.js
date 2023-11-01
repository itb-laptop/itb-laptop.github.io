const mongoose = require("mongoose");

// create admin schema
const adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itb_name: String,
    name: String,
    department: String,
    image: String,
    description: String,
    total_star: Number,
    total_review: Number
});

// create admin model
const Admin = mongoose.model("Admin", adminSchema);

// create function to update total star and total review of model
async function updateTotalStarAndTotalReview(id, star) {
    const admin = await Admin.findById(id);
    admin.total_star += star;
    admin.total_review++;
    await admin.save();
}

// export model and function
module.exports = { Admin, updateTotalStarAndTotalReview };