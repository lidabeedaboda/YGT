let players = global.players || [];
global.players = players;

export default function handler(req, res) {

    // ADD PLAYER (from Roblox)
    if (req.method === "POST") {

        const { username, userId } = req.body;

        if (!username || !userId) {
            return res.status(400).json({ error: "Missing data" });
        }

        // prevent duplicates
        const existing = players.find(p => p.userId === userId);

        if (existing) {
            existing.lastSeen = Date.now();
        } else {
            players.push({
                username,
                userId,
                score: Math.floor(Math.random() * 5000),
                lastSeen: Date.now()
            });
        }

        return res.json({ success: true });
    }

    // GET TOP 100 (for website)
    if (req.method === "GET") {

        const sorted = players
            .sort((a, b) => b.score - a.score)
            .slice(0, 100);

        return res.json(sorted);
    }

    return res.status(405).json({ error: "Method not allowed" });
}
