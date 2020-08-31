import axios from "axios"

export default async (req, res) => {
    const { guild } = req.query
    const { access, refresh } = req.body;
    let data
    try {
        data = await axios.post("https://receptioni.st/api/guilds/", { access, refresh });
    }
    catch (err) {
        if (err.response.status == 401) {
            res.statusCode = 401;
            res.json({ success: false, message: "401 Unauthorized Access" })
            res.end();
        }
        if (err.response.status == 429) {
            res.statusCode = 429;
            res.json({ success: false, message: "429 Rate Limited" })
            res.end();
        }
    }

    data = data.data;

    let serverData = data.filter(c => { return c.id == guild })

    if (serverData.length == 0) {
        res.statusCode = 401;
        res.json({ success: false, message: "401 Unauthorized Access" })
        res.end();
    }

    res.json({ success: true, guildData: data[0], guild })
    res.end()
}