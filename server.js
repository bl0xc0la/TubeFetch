const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.get("/download", (req, res) => {
    const videoURL = req.query.url;

    if (!videoURL) {
        return res.status(400).send("No URL provided");
    }

    const fileName = `video_${Date.now()}.mp4`;
    const outputPath = path.join(__dirname, "downloads", fileName);

    const command = `yt-dlp -f mp4 -o "${outputPath}" "${videoURL}"`;

    exec(command, (error) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Download failed");
        }

        res.download(outputPath, () => {
            fs.unlinkSync(outputPath);
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
