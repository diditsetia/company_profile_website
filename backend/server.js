const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const connectDB = require("./db.js");
const User = require("./models/User.js");
const Article = require("./models/Article");
const Project = require("./models/Project");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

// Connect MongoDB
connectDB();

// MULTER SETUP
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // simpan file lokal
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ---------------------- REGISTER ----------------------
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Semua field wajib diisi!" });

  try {
    // Cek email / username sudah dipakai
    const existing = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existing)
      return res.status(400).json({
        success: false,
        message: "Email atau username sudah digunakan!",
      });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Simpan user
    await User.create({ username, email, password: hashed });

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Kesalahan server", error: err });
  }
});

// ---------------------- LOGIN ----------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Email dan password wajib diisi",
    });

  try {
    // Cari user
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Email tidak ditemukan",
      });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Password salah",
      });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Simpan cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Login berhasil",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
      error: err.message,
    });
  }
});

// ---------------------- PROTECTED ROUTE ----------------------
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan. Silakan login.",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Token tidak valid atau sudah kadaluarsa",
    });
  }
};

app.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Berhasil mengambil data profil",
    data: req.user,
  });
});

// ---------------------- CHECK AUTH ----------------------
app.get("/api/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ valid: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.json({ valid: false });

    return res.json({ valid: true, user: decoded });
  });
});

// ---------------------- LOGOUT ----------------------
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logout berhasil",
  });
});

// ---------------------- SERVER ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// CREATE ARTICLE
app.post(
  "/articles",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "contentImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, category, content, status, author } = req.body;

      const thumbnail = req.files.thumbnail
        ? "/uploads/" + req.files.thumbnail[0].filename
        : null;

      const contentImage = req.files.contentImage
        ? "/uploads/" + req.files.contentImage[0].filename
        : null;

      const article = await Article.create({
        title,
        category,
        content,
        status,
        author,
        thumbnail,
        contentImage,
      });

      // Response sukses
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Artikel berhasil dibuat!",
        data: article,
      });
    } catch (err) {
      // Response error
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Gagal membuat artikel",
        error: err.message,
      });
    }
  }
);

// GET all articles with status response
app.get("/articles", async (req, res) => {
  try {
    // Optional filter: ?status=Active
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const articles = await Article.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching articles",
      data: [],
    });
  }
});

// ---------------------- UPDATE ARTICLE ----------------------
app.put(
  "/articles/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "contentImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, category, content, status, author } = req.body;

      // Cari article berdasarkan id
      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "Artikel tidak ditemukan",
        });
      }

      // Update field jika dikirim
      if (title) article.title = title;
      if (category) article.category = category;
      if (content) article.content = content;
      if (status) article.status = status;
      if (author) article.author = author;

      // Update thumbnail jika ada file baru
      if (req.files?.thumbnail) {
        article.thumbnail = "/uploads/" + req.files.thumbnail[0].filename;
      }

      // Update contentImage jika ada file baru
      if (req.files?.contentImage) {
        article.contentImage = "/uploads/" + req.files.contentImage[0].filename;
      }

      // Simpan perubahan
      await article.save();

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Artikel berhasil diupdate",
        data: article,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Gagal mengupdate artikel",
        error: err.message,
      });
    }
  }
);

// GET article by ID
app.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Artikel tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Artikel ditemukan",
      data: article,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching article",
      error: err.message,
    });
  }
});

// DELETE article by id beserta file gambar
app.delete("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Cari artikel berdasarkan ID
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Artikel tidak ditemukan",
      });
    }

    // Hapus file thumbnail jika ada
    if (article.thumbnail) {
      const thumbnailPath = path.join(
        process.cwd(),
        "uploads",
        path.basename(article.thumbnail)
      );
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    // Hapus file contentImage jika ada
    if (article.contentImage) {
      const contentImagePath = path.join(
        process.cwd(),
        "uploads",
        path.basename(article.contentImage)
      );
      if (fs.existsSync(contentImagePath)) {
        fs.unlinkSync(contentImagePath);
      }
    }

    // Hapus artikel dari database
    await Article.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Artikel berhasil dihapus beserta file gambarnya",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus artikel",
      error: err.message,
    });
  }
});

// CREATE PROJECT
app.post(
  "/projects",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "contentImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, category, content, status, team, client, videoProject } =
        req.body;

      const thumbnail = req.files.thumbnail
        ? "/uploads/" + req.files.thumbnail[0].filename
        : null;

      const contentImage = req.files.contentImage
        ? "/uploads/" + req.files.contentImage[0].filename
        : null;

      const project = await Project.create({
        title,
        category,
        content,
        status,
        team,
        client,
        thumbnail,
        contentImage,
        videoProject, // langsung dari string link
      });

      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Project berhasil dibuat!",
        data: project,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Gagal membuat project",
        error: err.message,
      });
    }
  }
);

// GET all projects with optional status filter
app.get("/projects", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching projects",
      data: [],
    });
  }
});

// GET project by ID
app.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project ditemukan",
      data: project,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error saat mengambil project",
      error: err.message,
    });
  }
});

// UPDATE PROJECT
app.put(
  "/projects/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "contentImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, category, content, status, team, client, videoProject } =
        req.body;

      // Cari project berdasarkan id
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "Project tidak ditemukan",
        });
      }

      // Update field jika dikirim
      if (title) project.title = title;
      if (category) project.category = category;
      if (content) project.content = content;
      if (status) project.status = status;
      if (team) project.team = team;
      if (client) project.client = client;
      // if (videoProject) project.videoProject = videoProject;

      if (videoProject !== undefined) {
        project.videoProject = videoProject;
      }

      // Update thumbnail jika ada file baru
      if (req.files?.thumbnail) {
        project.thumbnail = "/uploads/" + req.files.thumbnail[0].filename;
      }

      // Update contentImage jika ada file baru
      if (req.files?.contentImage) {
        project.contentImage = "/uploads/" + req.files.contentImage[0].filename;
      }

      // Simpan perubahan
      await project.save();

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Project berhasil diupdate",
        data: project,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Gagal mengupdate project",
        error: err.message,
      });
    }
  }
);

app.delete("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Cari project berdasarkan ID
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project tidak ditemukan",
      });
    }

    // Hapus file thumbnail jika ada
    if (project.thumbnail) {
      const thumbnailPath = path.join(
        process.cwd(),
        "public/uploads",
        path.basename(project.thumbnail)
      );
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    // Hapus file contentImage jika ada
    if (project.contentImage) {
      const contentImagePath = path.join(
        process.cwd(),
        "public/uploads",
        path.basename(project.contentImage)
      );
      if (fs.existsSync(contentImagePath)) {
        fs.unlinkSync(contentImagePath);
      }
    }

    // Hapus project dari database
    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Project berhasil dihapus beserta file gambarnya",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus project",
      error: err.message,
    });
  }
});

// ---------------------- RESET PASSWORD ----------------------
app.put("/reset-password", verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password dan new password wajib diisi",
      });
    }

    // Ambil user berdasarkan token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // Cek old password benar atau tidak
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password salah",
      });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password berhasil diupdate",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
      error: err.message,
    });
  }
});
