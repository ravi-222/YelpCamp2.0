// const Review = require("./review");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

UserSchema.plugin(passportLocalMongoose);

// UserSchema.post("findOneAndDelete", async function (doc) {
//   if (doc) {
//     await Review.deleteMany({ _id: { $in: doc.reviews } });
//   }
// });

module.exports = mongoose.model("User", UserSchema);
