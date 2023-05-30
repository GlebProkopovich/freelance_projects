const { Schema, model } = require('mongoose');

const breakfastsSchema = new Schema({
  imgSrc: { type: String, required: true },
  altImg: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  headline: { type: String, required: true },
});

module.exports = model('breakfasts', breakfastsSchema);
