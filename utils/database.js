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
    if (!guildid) {
        return { success: false }
    }

    let con = await Connect();

    let sql = "SELECT prefix, premium, configRole, applicationsChannel, reviewerRole FROM servers WHERE guildid = ?";

    let data = await con.awaitQuery(sql, [guildid]);

    return data[0];
}

export const getApplicationNames = async (guildid) => {
    if (!guildid) {
        return { success: false }
    }
    let con = await Connect();

    let sql = "SELECT applicationName, applicationId, type FROM applications WHERE guildid = ?";

    let data = await con.awaitQuery(sql, [guildid]);

    return data;
}


export const getApplication = async (guildid, applicationId) => {
    if (!guildid || !applicationId) {
        return { success: false }
    }
    let con = await Connect();

    let sql = "SELECT a.guildID, a.applicationID, a.applicationName, a.`type`, a.applicationLogChannel, a.applicationStartRole, a.applicationAcceptRole, a.applicationReviewRole, a.enabled, a.applicationChannelName, a.applicationCategoryId, a.applicationResponseWait, a.applicationStartChannel, a.applicationAcceptMessage, a.applicationDenyMessage, q.applicationQuestions FROM applications a, questions q WHERE a.applicationID = ? AND a.guildid = ? AND q.guildID = a.guildID AND q.applicationID = a.applicationId";

    let data = await con.awaitQuery(sql, [applicationId, guildid]);

    return data;
}