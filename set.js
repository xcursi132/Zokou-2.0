const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk4vNkZNTlduNFZtZzNnYmtkMXpkb01DNzRiOC95SzVxM2wrNlBiaTlrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGZGZjh1RW9VcjVqbVNDaXNYYVEybG9CdFhFaEd6NkplNkx4MGdaM2NGST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTjBJNEFQbFNlajRyaThWM1FtVnlNb0VhVTNwVkJNZ1d4NmJGUDB1OW1nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUK1FxY3lSdElSYTVHMThTNHhPdlZId2pnelJTOVRud2FSZ2R0SzU1YmdBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJOeWZoZE5GRHlDbThvVEhwQmFtdWE3YUN1OXZ6ekVucCtRWWFFeVVSRmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJMbDBiT29lRG9pMkFESW1INGx2Zm1yWHZkZnVJR3BFQW45VGJlUHY0SEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1AveUpmVmZhNFB1RjdZSkdQT0NGZTZWbmJ6bzQ2UkVPTCs1WE1kU1Zudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUZ1Yk1xc0RiSFlkZlM4Q1RuMVdBOWxPWjlMQ3JER2hFK1VPZHZNWlNBZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxPMzk2OXVWcHN3bGZGZWdyRnV1am4vdmVkczR2SDNqRk5va2NrblFtbmRMZFB4MnVzWGVTZjNyVVdERVlZYnlKZFZTc2FVWnZvenB0bGZZQ2tSc2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6IjZJcC9DY0R3R0I4ZWxXRjJJS05KWTlzYTI1NkM0ZEg1VEJXVldWbERnNzg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1B6aGxONElFTDYvcXNNR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjU5c256SmRFa2RCNkJ0TkF5REkrSUg2b2tmUDN2LzM4K1E5VmhGbm9vbWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNxd0FBK1BlNytrRmxNSk1UeG1ibjVjVU9aVmUweHhqUEE0MUtMaXM5UlcrTjZ1a2NSN1JTbGUvL3hjdnBON0VpZVpnRmE4SzhEdForY0FhelNKdGlRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYL0l4a1FiVk5IN3E0OEZmQ3VLclZOWUttbW9rdkpMMVdXZGNYNWxIS1cvTi9kN1BKRWZtTUdOckdEQ3BHcm9TVW50cFJTbnhaOEw1ZDZiKzZNaTloUT09In0sIm1lIjp7ImlkIjoiMjQyMDQxMDI5MTIyOjMyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiODk3Njk4NTAwNjA5OTozMkBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQyMDQxMDI5MTIyOjMyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVmYko4eVhSSkhRZWdiVFFNZ3lQaUIrcUpIejk3LzkvUGtQVllSWjZLSm4ifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVUUF4QUEifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxODE4MTc3LCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.Prefix,
    NOM_OWNER: process.env.NOM_OWNER || "xcursi",
    NUMERO_OWNER : process.env.242041029122,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PRIVEE,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'cursi',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'oui',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
