const mongoose = require("mongoose");

// Check if the Product model already exists
let Product;

try {
  Product = mongoose.model("Product");
} catch (error) {
  // Define the schema if the model doesn't exist
  const productSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      sold: {
        type: Number,
        default: 0,
      },
      images: [
        {
          public_id: String,
          url: String,
        },
      ],
      color: [],
      tags: [],
      ratings: [
        {
          star: Number,
          comment: String,
          postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
      ],
      totalrating: {
        type: String,
        default: 0,
      },
    },
    { timestamps: true }
  );

  // Compile the model if it doesn't exist
  Product = mongoose.model("Product", productSchema);
}

module.exports = Product;
