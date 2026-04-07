const URL = require("../models/url");
const { getNextId } = require("../utilities/counter");
const { encode } = require("../utilities/shortner");

const shortenUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            return res.status(400).json({ error: "Long URL is required" });
        }

        // 1. Check if the long URL already exists in the database
        let urlEntry = await URL.findOne({ longUrl });

        if (urlEntry) {
            // If it exists, return the existing short code
            return res.status(200).json({
                message: "Short URL already exists",
                shortCode: urlEntry.shortCode,
                longUrl: urlEntry.longUrl
            });
        }

        // 2. If it doesn't exist, generate a new unique ID
        const nextId = await getNextId();

        // 3. Encode the unique ID to a short code
        const shortCode = encode(nextId);

        // 4. Save the new URL entry to the database
        urlEntry = await URL.create({
            shortCode,
            longUrl
        });

        res.status(201).json({
            message: "New short URL created",
            shortCode: urlEntry.shortCode,
            longUrl: urlEntry.longUrl
        });

    } catch (error) {
        console.error("Error in shortenUrl:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // Find the long URL entry correspondig to the short code
        const urlEntry = await URL.findOne({ shortCode });

        if (!urlEntry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // (Optional) Increment click count
        urlEntry.clicks += 1;
        await urlEntry.save();

        // Redirect to the original long URL
        return res.redirect(urlEntry.longUrl);

    } catch (error) {
        console.error("Error in redirectUrl:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    shortenUrl,
    redirectUrl
};
