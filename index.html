let players = global.players || {};
global.players = players;

const RESET = 7 * 24 * 60 * 60 * 1000;

if (!global.resetTime) {
    global.resetTime = Date.now() + RESET;
}

export default function handler(req,res){

    if(Date.now() > global.resetTime){
        global.players = {};
        players = global.players;
        global.resetTime = Date.now() + RESET;
    }

    if(req.method === "POST"){

        const {username,userId,minutes,rank} = req.body;

        if(!players[userId]){
            players[userId]={
                username,
                userId,
                minutes:0,
                rank:"Guest"
            };
        }

        if(minutes) players[userId].minutes += minutes;
        if(rank) players[userId].rank = rank;

        return res.json({ok:true});
    }

    if(req.method === "GET"){

        const list = Object.values(players)
        .sort((a,b)=>b.minutes-a.minutes)
        .slice(0,100);

        return res.json({
            players:list,
            resetAt:global.resetTime
        });
    }

    res.status(405).end();
}
