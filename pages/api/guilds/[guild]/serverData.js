import axios from "axios"
import { getServerInfo } from "../../../../utils/database"

export default async (req, res) => {
    const { guild } = req.query
    const { access, refresh } = req.body;
    let data
    try {
        data = await getServerInfo(guild);
        console.log(data)
    }
    catch (err) {
        res.statsuCode = 404;

        res.json({ status: false, error: err })
        res.end();
    }

    if (!data) {
        res.statusCode = 401;
        res.json({ success: false, message: "401 Unauthorized Access" })
        res.end();
    }

    res.json({ serverData: data });
    res.end();
}