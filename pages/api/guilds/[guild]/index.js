import axios from "axios"

export default async (req, res) => {
    const { guild } = req.query
    const { access, refresh } = req.body;

    let { data } = await axios.post("https://receptioni.st/api/guilds/", { access, refresh })

    console.log(data)

    res.json({ success: true })
    res.end()
}