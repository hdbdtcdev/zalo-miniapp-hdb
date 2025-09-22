import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post("/api/sdk/v1/dop-card-list-available", async (req, res) => {
  try {
    console.log('---namph7 ---', JSON.stringify(req.headers))
    const response = await fetch(
      "https://di-bank-uat.hdbank.com.vn/api/sdk/v1/dop-card-list-available",
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const data = await response.json();
    console.log('----namph7--- success ', JSON.stringify(data))
    res.json(data);
  } catch (error) {
    console.error("BFF error:", error);
    res.status(500).json({ message: "BFF proxy failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 BFF running at http://localhost:${PORT}`);
});
