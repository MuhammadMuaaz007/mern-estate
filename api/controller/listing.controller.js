import Listing from "../models/listing.model.js";

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
export const uploads = async (req, res) => {
  try {
    const { listingId } = req.body;
    const urls = req.files.map(
      (file) => `/uploads/listingImages/${file.filename}`
    );
    const listing = await Listing.findByIdAndUpdate(
      listingId,
      { $push: { imageUrls: { $each: urls } } },
      { new: true }
    );
    res.json({ urls, listingId });
  } catch (error) {
    next(error);
    console.log("images not uploaded ");
  }
};
