import axios from "axios"

export default async (req, res) => {
    const { body } = req;

    let data

    res.setHeader("Content-Type", "application/json")

    try {
        data = await axios.get("http://discordapp.com/api/users/@me",
            { 'headers': { 'Authorization': `Bearer ${body.access}` } },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
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
    res.statusCode = 200
    res.json(data.data)
    res.end();
}