import axios from "axios"

export default async (req, res) => {
    const { guild } = req.query
    const { access, refresh } = req.body;
    let data
    try {
    }
    catch (err) {
        res.statsuCode = 404;

        res.json({ status: false, error: err })
        res.end();
    }

    data = data.data;

    let serverData = data.filter(c => { return c.id == guild })

    if (serverData.length == 0) {
        res.statusCode = 401;
        res.json({ success: false, message: "401 Unauthorized Access" })
        res.end();
    }

    res.json({ success: true, guildData: serverData[0], discordData: guildInfo });
    res.end();
}