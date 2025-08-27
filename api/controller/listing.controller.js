import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    console.log("Listing Created successfully");
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
    console.log("Listing not created ");
  }
};
export const uploads = async (req, res, next) => {
  try {
    const urls = req.files.map(
      (file) => `/uploads/listingImages/${file.filename}`
    );

    // ✅ Just return uploaded URLs, do NOT update DB here
    res.json({ urls });
  } catch (error) {
    next(error);
    console.log("images not uploaded");
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    console.log("👉 Request user:", req.user); // debug
    console.log("👉 Request body:", req.body);
    console.log("👉 Params ID:", req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    if (listing.userRef.toString() !== req.user.id.toString()) {
      return next(errorHandler(401, "You can only update your own Listing"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
