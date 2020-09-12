import * as mysql from 'mysql-await';

async function Connect() {
    var con = mysql.createConnection({
        host: "db.receptioni.st",
        user: "lachlan",
        password: "88VLp1d42tpEdPSR",
        database: "receptionist",
        flags: "COMPRESS",
        charset: "UTF8MB4_UNICODE_CI"
    });

    con.connect(function (err) {
        if (err) throw err;
    });

    return con;
}

export const getServerInfo = async (guildid) => {

    let con = await Connect();

    let sql = "SELECT prefix, premium, configRole, applicationsChannel, reviewerRole FROM servers WHERE guildid = ?";

    let data = await con.awaitQuery(sql, [guildid]);

    return data[0];
}

export const getApplicationNames = async (guildid) => {

    let con = await Connect();

    let sql = "SELECT applicationName, applicationid, type FROM applications WHERE guildid = ?";

    let data = await con.awaitQuery(sql, [guildid]);

    return data;
}