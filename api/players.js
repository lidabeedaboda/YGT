let players = global.players || {};
global.players = players;

const RESET = 7 * 24 * 60 * 60 * 1000;

if (!global.resetTime) {
    global.resetTime = Date.now() + RESET;
}

export default function handler(req, res) {

    // RESET SYSTEM (every 7 days)
    if (Date.now() > global.resetTime) {
        global.players = {};
        players = global.players;
        global.resetTime = Date.now() + RESET;
    }

    // ================= POST (ROBLOX SENDS DATA) =================
    if (req.method === "POST") {

        const { username, userId, minutes, rank } = req.body;

        if (!username || !userId) {
            return res.status(400).json({ error: "Missing data" });
        }

        // CREATE PLAYER IF NOT EXISTS
        if (!players[userId]) {
            players[userId] = {
                username,
                userId,
                minutes: 0,
                rank: rank && rank !== "" ? rank : "Loading..."
            };
        }

        // UPDATE MINUTES
        if (typeof minutes === "number") {
            players[userId].minutes += minutes;
        }

        // UPDATE RANK ONLY IF VALID
        if (rank && rank !== "" && rank !== "Guest") {
            players[userId].rank = rank;
        }

        return res.json({ ok: true });
    }

    // ================= GET (LEADERBOARD) =================
    if (req.method === "GET") {

        const list = Object.values(players)
            .sort((a, b) => b.minutes - a.minutes)
            .slice(0, 100);

        return res.json({
            players: list,
            resetAt: global.resetTime
        });
    }

    return res.status(405).end();
}
