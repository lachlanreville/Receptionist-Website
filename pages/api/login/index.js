export default (req, res) => {
    res.writeHead(301, {
        Location: "https://discord.com/api/oauth2/authorize?client_id=697932571601797130&redirect_uri=https%3A%2F%2Freceptioni.st%2Fapi%2Flogin%2Fredirect&response_type=code&scope=guilds%20identify"
        //add other headers here...
    });
    res.end();

}