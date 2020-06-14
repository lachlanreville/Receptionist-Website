import { useRouter } from 'next/router'
import axios from "axios"
import querystring from "query-string"
const client_id = "697932571601797130"
const client_secret = "gpl6dpG3vRLz1uQ2XMZ5zb2EwZc_Gddq"

export default async (req, res) => {
    const { code } = req.query;

    let data;

    try {
        data = await axios.post(
            "https://discord.com/api/oauth2/token",
            querystring.stringify({
                grant_type: "authorization_code",
                code: code,
                scope: "identify guilds",
                client_id,
                client_secret,
                redirect_uri: "https://receptioni.st/api/login/redirect",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
    } catch (err) {

    }

    if (!data) {
        res.writeHead(301, {
            Location: "https://receptioni.st/api/login"
            //add other headers here...
        });
        res.end();
    } else {
        res.writeHead(301, {
            Location: "https://receptioni.st/dashboard?access_token=" + data.data.access_token + "&refresh_token=" + data.data.refresh_token
            //add other headers here...
        });
        res.end();
    }
}