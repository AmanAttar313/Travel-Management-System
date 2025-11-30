import mongoose from "mongoose";
const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      default : "https://res.cloudinary.com/mudemoenv/image/upload/v1764500085/tour_jmg6sz.jpg"
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
