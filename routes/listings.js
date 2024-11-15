const express = require("express");
const Listing = require("../models/Listing");
const router = express.Router();

// GET all listings with pagination, filtering, and sorting
router.get("/listings", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "price",
      order = "asc",
      ...filters
    } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Build the query object for filtering
    const query = {};
    if (filters.price) query.price = filters.price;
    if (filters.property_type) query.property_type = filters.property_type;
    if (filters.bedrooms) query.bedrooms = filters.bedrooms;

    // Build the sort object
    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    // Fetch listings with pagination, filtering, and sorting
    const listings = await Listing.find(query)
      .sort(sort)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Get total count for pagination
    const total = await Listing.countDocuments(query);

    res.json({
      listings,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching listings", error: error.message });
  }
});

module.exports = router;
