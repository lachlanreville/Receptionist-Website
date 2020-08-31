import * as mysql from 'mysql-await';

async function Connect() {
    var con = mysql.createConnection({
        host: "db.receptioni.st",
        user: "lachlan",
        password: "88VLp1d42tpEdPSR",
        database: "application bot",
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
    con.end()

    return data[0];
}

export const getApplications = async (guildid) => {

    let con = await Connect();

    let sql = "SELECT applicationName, type, applicationLogChannel, applicationStartRole, applicationChannelName, applicationCategoryId, multipleChannelLogs, applicationResponseWait, applicationStartChannel FROM applications WHERE guildid = ?";

    let data = await con.awaitQuery(sql, [guildid]);

    return data;
}