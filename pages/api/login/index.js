export default (req, res) => {
    res.writeHead(301, {
        Location: "https://discord.com/api/oauth2/authorize?client_id=697932571601797130&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin%2Fredirect&response_type=code&scope=identify%20guilds"
        //add other headers here...
    });
    res.end();

}