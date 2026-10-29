import express from "express";
import { getDb } from "../db.js"; // If using a DB helper, else use MongoClient here

const router = express.Router();

router.post("/submit-form", async (req, res) => {
  try {
    const db = getDb(); // तुमचा existing DB connection वापरा
    await db.collection("formSubmissions").insertOne({ ...req.body, createdAt: new Date() });
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ success: false, message: "Failed to save" });
  }
});

router.get("/form-submissions", async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("formSubmissions").find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;
