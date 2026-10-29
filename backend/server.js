// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cropRecommendationRouter = require("./routes/cropRecommendation");
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
app.use("/api", cropRecommendationRouter);
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ MongoDB Connected');
});

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// ✅ Register User (POST)
app.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    // user आधीपासून आहे का ते check कर
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "❌ User already exists" });
    }

    // password hash करून save कर
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to register user" });
  }
});

// ✅ Login User (POST)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // user check कर
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "❌ User not found" });
    }

    // password verify कर
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "❌ Invalid credentials" });
    }

    // JWT token generate कर
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "✅ Login successful",
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to login" });
  }
});

// ✅ Middleware to verify JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "❌ No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info पुढे पाठव
    next();
  } catch (err) {
    return res.status(401).json({ error: "❌ Invalid or expired token" });
  }
}

// ✅ Get current user profile (Protected)
app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "❌ User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to fetch profile" });
  }
});

// ✅ Form Submission Schema & Model
const formSchema = new mongoose.Schema({
  state: String,
  district: String,
  soilType: String,
  waterAvailability: String,
  budgetRange: String,
  temperature: Number,
  soilPh: Number,
  humidity: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const FormSubmission = mongoose.model('FormSubmission', formSchema);

// ✅ Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, env: 'backend', time: new Date().toISOString() });
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("✅ Welcome to the Backend!");
});

// ✅ Get All Users (GET)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to fetch users" });
  }
});

// ✅ Submit Form Data (POST)
app.post("/submit-form", async (req, res) => {
  try {
    const formData = new FormSubmission(req.body);
    await formData.save();
    res.status(201).json({ message: "✅ Form data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to save form data" });
  }
});

// ✅ Get All Form Submissions (GET)
app.get("/form-submissions", async (req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to fetch form data" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
