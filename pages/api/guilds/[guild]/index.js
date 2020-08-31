import axios from "axios"

export default async (req, res) => {
    const { guild } = req.query
    const { access, refresh } = req.body;

    let { data } = await axios.post("https://receptioni.st/api/guilds/", { access, refresh })

    let serverData = data.filter(c => { return c.id == guild })

    if (serverData.length == 0) {
        res.statusCode = 401;
        res.json({ success: false, message: "401 Unauthorized Access" })
        res.end();
    }

    res.json({ success: true })
    res.end()
}