export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { discord, roblox, reason, future, tos } = req.body;

        const webhook = process.env.DISCORD_WEBHOOK_URL;

        const embed = {
            title: "🎤 New Ban Appeal",
            color: 0x5865F2,
            thumbnail: {
                url: "https://cdn-icons-png.flaticon.com/512/727/727245.png"
            },
            fields: [
                { name: "👤 Discord", value: discord || "N/A" },
                { name: "🎮 Roblox", value: roblox || "N/A" },
                { name: "📌 Reason", value: reason || "N/A" },
                { name: "🎊 Improvement ", value: future || "N/A" },
                { name: "📜 TOS Agreement", value: tos || "N/A" }
            ],
            footer: {
                text: "You've Got Talent | Website | aloha-development.vercel.app"
            },
            timestamp: new Date().toISOString()
        };

        await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [embed] })
        });

        return res.status(200).json({
            success: true,
            message: "Appeal submitted successfully"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}
