import axios from "axios"

export default async (req, res) => {
    const { body } = req;

    let data
    res.setHeader("Content-Type", "application/json")

    try {
        data = await axios.get("http://discordapp.com/api/users/@me/guilds",
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

    if (!data) {
    } else {
        res.statusCode = 200
        const newData = [];

        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].permissions == 2147483647) {
                newData.push(data.data[i])
            }
        }

        res.json(newData)
        res.end();
    }
}