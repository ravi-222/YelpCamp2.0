const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelpcamp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    let randNo = Math.floor(Math.random() * 1000);
    const newCamp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[randNo].city}, ${cities[randNo].state}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ea ex aliquam. Delectus exercitationem aperiam itaque, repellendus fuga totam doloremque tempora odio quo obcaecati voluptatem similique! Dolores, quidem non. Velit.",
      price: Math.floor(Math.random() * 20),
    });
    await newCamp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
