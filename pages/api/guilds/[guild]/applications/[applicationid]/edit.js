const axios = require('axios')
const { getApplication } = require('../../../../../../utils/database')

export default async (req, res) => {
    const { guild, applicationid } = req.query;
    const { access, refresh, data } = req.body;
    console.log(data)
    res.statusCode = 200;
    res.end();
    // let adminCheck;

    // try {
    //     adminCheck = await axios.post("https://receptioni.st/api/guilds/" + guild + "/hasAdmin", { access, refresh });
    // }
    // catch (err) {
    //     if (err.response.status == 401) {
    //         res.statusCode = 401;
    //         res.json({ success: false, message: "401 Unauthorized Access" })
    //         res.end();
    //     }
    //     if (err.response.status == 429) {
    //         res.statusCode = 429;
    //         res.json({ success: false, message: "429 Rate Limited" })
    //         res.end();
    //     }
    // }
    // adminCheck = adminCheck.data;
    // if (adminCheck.success == true) {
    //     res.statusCode = 200;
    //     res.json({ success: true });
    //     res.end();
    // } else {
    //     res.statusCode = 401;
    //     res.json({ success: false, message: "401 Unauthorized Access" })
    //     res.end();
    // }

}