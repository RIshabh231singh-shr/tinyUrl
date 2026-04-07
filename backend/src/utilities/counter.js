const Counter = require("../models/Counter");

async function getNextId() {
    try {
        const counter = await Counter.findByIdAndUpdate(
            "url_id",
            { $inc: { seq: 1 } },
            { new: true, upsert: true }  // Creates if not exists (safe even without init)
        );
        return counter.seq;
    } catch (error) {
        console.error("Error generating next ID:", error);
        throw new Error("Failed to generate unique ID");
    }
}

async function initCounter(startSeq = 1000000) {
    const counter = await Counter.findById("url_id");
    if (!counter) {
        await Counter.create({ _id: "url_id", seq: startSeq });
        console.log(`Counter initialized at ${startSeq}`);
    }
}

module.exports = { getNextId, initCounter };