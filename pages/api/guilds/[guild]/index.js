import axios from "axios"

export default async (req, res) => {
    const { guild } = req.query
    console.log(guild)
    const { access, refresh } = req.body;

    let allGuilds = await axios.post("https://receptioni.st/api/guilds/", { access, refresh })

    console.log(allGuilds)

    res.json({ success: true })
    res.end()
}