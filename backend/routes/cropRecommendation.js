const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const router = express.Router();

const datasetPath = path.join(
  __dirname,
  "..",
  "AgriPal_Maharashtra_Crop_Reference_Dataset.csv"
);

function loadCropDataset() {
  return new Promise((resolve, reject) => {
    const rows = [];

    if (!fs.existsSync(datasetPath)) {
      return reject(new Error("Crop dataset CSV file was not found."));
    }

    fs.createReadStream(datasetPath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

router.get("/crop-recommendations", async (req, res) => {
  try {
    const { state, district, season } = req.query;

    if (!state || !district || !season) {
      return res.status(400).json({
        success: false,
        message: "Please provide state, district, and season.",
        example:
          "/api/crop-recommendations?state=Maharashtra&district=Ratnagiri&season=Kharif"
      });
    }

    if (state.trim().toLowerCase() !== "maharashtra") {
      return res.status(400).json({
        success: false,
        message:
          "This starter dataset currently supports Maharashtra only."
      });
    }

    const validSeasons = ["kharif", "rabi", "summer"];

    if (!validSeasons.includes(season.trim().toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Season must be Kharif, Rabi, or Summer."
      });
    }

    const rows = await loadCropDataset();

    const matches = rows.filter((row) => {
      const rowDistrict = (row.District || "").trim().toLowerCase();
      const rowSeason = (row.Season || "").trim().toLowerCase();

      return (
        rowDistrict === district.trim().toLowerCase() &&
        rowSeason === season.trim().toLowerCase()
      );
    });

    if (matches.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No matching district and season found in the current reference dataset.",
        note: "Check the spelling of the district and season."
      });
    }

    return res.json({
      success: true,
      source: "AgriPal Maharashtra Crop Reference Dataset",
      state: "Maharashtra",
      district: matches[0].District,
      season: matches[0].Season,
      recommendations: matches.map((row) => ({
        regionType: row["Region Type"],
        typicalSoilGroups: row["Typical Soil Groups"],
        seasonalCandidateCrops: row["Seasonal Candidate Crops"],
        districtMajorCrops: row["District/Region Major Crops"],
        waterGuidance: row["Water Guidance"],
        recommendationStatus: row["Recommendation Status"]
      })),
      advisory:
        "These are regional candidate crops, not guaranteed recommendations. Confirm soil suitability with a soil test and current local agricultural guidance before planting."
    });
  } catch (error) {
    console.error("Crop recommendation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to load crop recommendations."
    });
  }
});

module.exports = router;