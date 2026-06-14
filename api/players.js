let players = global.players || {};
global.players = players;

const RESET_TIME = 7 * 24 * 60 * 60 * 1000;

// reset system
if (!global.resetTime) {
    global.resetTime = Date.now() + RESET_TIME;
}

export default function handler(req, res) {

    // RESET CHECK
    if (Date.now() > global.resetTime) {
        global.players = {};
        players = global.players;
        global.resetTime = Date.now() + RESET_TIME;
    }

    // ADD PLAYER DATA
    if (req.method === "POST") {

        const { username, userId, minutes, rank } = req.body;

        if (!username || !userId) {
            return res.status(400).json({ error: "Missing data" });
        }

        if (!players[userId]) {
            players[userId] = {
                username,
                userId,
                minutes: 0,
                rank: rank || "Guest"
            };
        }

        players[userId].minutes += minutes || 0;
        players[userId].rank = rank || players[userId].rank;

        return res.json({ success: true });
    }

    // GET LEADERBOARD
    if (req.method === "GET") {

        const list = Object.values(players)
            .sort((a, b) => b.minutes - a.minutes)
            .slice(0, 100);

        return res.json({
            resetAt: global.resetTime,
            players: list
        });
    }

    return res.status(405).json({ error: "Method not allowed" });
}
