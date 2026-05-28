const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());

app.get("/download", (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send("Missing URL");
    }

    const command = `yt-dlp -g "${url}"`;

    exec(command, (err, stdout) => {
        if (err) {
            return res.status(500).send("Failed");
        }

        res.json({
            download: stdout.trim()
        });
    });
});

app.listen(3000, () => {
    console.log("Running");
});
