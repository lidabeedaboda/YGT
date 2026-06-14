export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const {
            discord,
            roblox,
            reason,
            future,
            tos
        } = req.body;

        const webhook = process.env.DISCORD_WEBHOOK_URL;

        const payload = {
            embeds: [{
                title: "🚨 New Ban Appeal",
                color: 16766720,
                fields: [
                    {
                        name: "Discord Username & ID",
                        value: discord || "Not provided"
                    },
                    {
                        name: "Roblox Username & ID",
                        value: roblox || "Not provided"
                    },
                    {
                        name: "Why were you moderated?",
                        value: reason || "Not provided"
                    },
                    {
                        name: "How will you improve?",
                        value: future || "Not provided"
                    },
                    {
                        name: "Agreed To TOS",
                        value: tos || "Not provided"
                    }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        return res.status(200).json({
            success: true
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: "Server Error"
        });

    }

}
