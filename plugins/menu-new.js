const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');
const os = require('os');

cmd({
    pattern: "menu",
    desc: "Show complete menu",
    category: "menu",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Get real-time data
        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const platform = os.platform();
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();
        
        // Get values from config
        const botName = config.BOT_NAME || "ERFAN-MD";
        const ownerName = config.OWNER_NAME || "ERFAN-MD";
        const prefix = config.PREFIX || ".";
        const mode = config.MODE || "public";
        const botImage = config.BOT_IMAGE || "https://files.catbox.moe/lbf3y9.jpg";

        const menuCaption = `╔══════════════════╗
║  ${botName}
║  ᴜʟᴛɪᴍᴀᴛᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ
╚══════════════════╝

╔════❰ 🤖 ʙᴏᴛ ɪɴғᴏ ❱════╗
║ 👑 ᴏᴡɴᴇʀ: ${ownerName}
║ 📛 ʙᴏᴛ: ${botName}
║ 🔣 ᴘʀᴇғɪx: [ ${prefix} ]
║ 📳 ᴍᴏᴅᴇ: ${mode}
║ ⏱️ ᴜᴘᴛɪᴍᴇ: ${uptime}
║ 📚 ᴄᴍᴅs: ${totalCommands}
╚══════════════════╝

╔═════❰ 💻 sʏsᴛᴇᴍ ❱════╗
║ 🧠 ʀᴀᴍ: ${ramUsed}ᴍʙ / ${totalRam}ɢʙ
║ 🖥️ ᴘʟᴀᴛғᴏʀᴍ: ${platform}
║ 📅 ᴅᴀᴛᴇ: ${currentDate}
║ 🕐 ᴛɪᴍᴇ: ${currentTime}
╚══════════════════╝

╔══❰ 📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ ❱══╗
║
║ 🌐 sᴏᴄɪᴀʟ ᴍᴇᴅɪᴀ
║ ─ ${prefix}ғᴀᴄᴇʙᴏᴏᴋ
║ ─ ${prefix}ᴅᴏᴡɴʟᴏᴀᴅ
║ ─ ${prefix}ᴍᴇᴅɪᴀғɪʀᴇ
║ ─ ${prefix}ᴛɪᴋᴛᴏᴋ
║ ─ ${prefix}ᴛᴡɪᴛᴛᴇʀ
║ ─ ${prefix}ɪɴsᴛᴀ
║ ─ ${prefix}ᴀᴘᴋ
║ ─ ${prefix}ɪᴍɢ
║ ─ ${prefix}ᴘɪɴᴛᴇʀᴇsᴛ
║
║ 🎵 ᴍᴜsɪᴄ/ᴠɪᴅᴇᴏ
║ ─ ${prefix}sᴘᴏᴛɪғʏ
║ ─ ${prefix}ᴘʟᴀʏ
║ ─ ${prefix}ᴘʟᴀʏ2-10
║ ─ ${prefix}ᴀᴜᴅɪᴏ
║ ─ ${prefix}ᴠɪᴅᴇᴏ
║ ─ ${prefix}ʏᴛᴍᴘ3
║ ─ ${prefix}ʏᴛᴍᴘ4
║ ─ ${prefix}sᴏɴɢ
║ ─ ${prefix}sᴘʟᴀʏ
║ ─ ${prefix}sᴘᴏᴛɪғʏᴘʟᴀʏ
║
╚══════════════════╝

╔════❰ 👥 ɢʀᴏᴜᴘ ᴍᴇɴᴜ ❱══╗
║
║ 🔧 ᴍᴀɴᴀɢᴇᴍᴇɴᴛ
║ ─ ${prefix}ɢʀᴏᴜᴘʟɪɴᴋ
║ ─ ${prefix}ᴋɪᴄᴋᴀʟʟ
║ ─ ${prefix}ᴀᴅᴅ
║ ─ ${prefix}ʀᴇᴍᴏᴠᴇ
║ ─ ${prefix}ᴋɪᴄᴋ
║
║ ⚡ ᴀᴅᴍɪɴ ᴛᴏᴏʟs
║ ─ ${prefix}ᴘʀᴏᴍᴏᴛᴇ
║ ─ ${prefix}ᴅᴇᴍᴏᴛᴇ
║ ─ ${prefix}ᴅɪsᴍɪss
║ ─ ${prefix}ʀᴇᴠᴏᴋᴇ
║ ─ ${prefix}ᴍᴜᴛᴇ
║ ─ ${prefix}ᴜɴᴍᴜᴛᴇ
║ ─ ${prefix}ᵃᵘᵗᵒᵃᵖᵖʳᵒᵛᵉ
║
║ 🏷️ ᴛᴀɢɢɪɴɢ
║ ─ ${prefix}ᴛᴀɢ
║ ─ ${prefix}ʜɪᴅᴇᴛᴀɢ
║ ─ ${prefix}ᴛᴀɢᴀʟʟ
║ ─ ${prefix}ᴛᴀɢᴀᴅᴍɪɴs
║
╚══════════════════╝

╔════❰ 😄 ғᴜɴ ᴍᴇɴᴜ ❱════╗
║
║ ─ ${prefix}sʜᴀᴘᴀʀ
║ ─ ${prefix}ʀᴀᴛᴇ
║ ─ ${prefix}ɪɴsᴜʟᴛ
║ ─ ${prefix}ʜᴀᴄᴋ
║ ─ ${prefix}sʜɪᴘ
║ ─ ${prefix}ᴄʜᴀʀᴀᴄᴛᴇʀ
║ ─ ${prefix}ᴘɪᴄᴋᴜᴘ
║ ─ ${prefix}ᴊᴏᴋᴇ
║ ─ ${prefix}ʸᵗᶜᵒᵐᵐᵉⁿᵗ
║
╚══════════════════╝

╔════❰ 👑 ᴏᴡɴᴇʀ ᴍᴇɴᴜ ❱══╗
║
║ ─ ${prefix}ʙʟᴏᴄᴋ
║ ─ ${prefix}ᴜɴʙʟᴏᴄᴋ
║ ─ ${prefix}sᴇᴛᴘᴘ
║ ─ ${prefix}ʀᴇsᴛᴀʀᴛ
║ ─ ${prefix}sʜᴜᴛᴅᴏᴡɴ
║ ─ ${prefix}ᴜᴘᴅᴀᴛᴇᴄᴍᴅ
║ ─ ${prefix}ᴊɪᴅ
║ ─ ${prefix}ɢᴊɪᴅ
║
╚══════════════════╝

╔═════❰ 🤖 ᴀɪ ᴍᴇɴᴜ ❱════╗
║
║ ─ ${prefix}ᴀɪ
║ ─ ${prefix}ɢᴘᴛ
║ ─ ${prefix}ɢᴘᴛ2
║ ─ ${prefix}ɢᴘᴛ3
║ ─ ${prefix}ɢᴘᴛᴍɪɴɪ
║ ─ ${prefix}ᴍᴇᴛᴀ
║ ─ ${prefix}ʙᴀʀᴅ
║ ─ ${prefix}ɢɪᴛᴀ
║ ─ ${prefix}ɪᴍᴀɢɪɴᴇ
║ ─ ${prefix}ɪᴍᴀɢɪɴᴇ2
║ ─ ${prefix}ʙʟᴀᴄᴋʙᴏx
║
╚══════════════════╝

╔════❰ 🎎 ᴀɴɪᴍᴇ ᴍᴇɴᴜ ❱══╗
║
║ ─ ${prefix}ᴡᴀɪғᴜ
║ ─ ${prefix}ɴᴇᴋᴏ
║ ─ ${prefix}ᴍᴀɪᴅ
║ ─ ${prefix}ʟᴏʟɪ
║ ─ ${prefix}ᴀɴɪᴍᴇɢɪʀʟ
║ ─ ${prefix}ғᴏxɢɪʀʟ
║ ─ ${prefix}ɴᴀʀᴜᴛᴏ
║ ─ ${prefix}ᴅᴏɢ
║
╚══════════════════╝

╔═══❰ 🔄 ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ ❱══╗
║
║ ─ ${prefix}sᴛɪᴄᴋᴇʀ
║ ─ ${prefix}sᴛɪᴄᴋᴇʀ2
║ ─ ${prefix}ᴇᴍᴏᴊɪᴍɪx
║ ─ ${prefix}ᴛᴀᴋᴇ
║ ─ ${prefix}ᴛᴏᴍᴘ3
║ ─ ${prefix}ғᴀɴᴄʏ
║ ─ ${prefix}ᴛᴛs
║ ─ ${prefix}ᴛʀᴛ
║
╚══════════════════╝

╔════❰ 📌 ᴏᴛʜᴇʀ ᴍᴇɴᴜ ❱══╗
║
║ ─ ${prefix}ᴛɪᴍᴇɴᴏᴡ
║ ─ ${prefix}ᴅᴀᴛᴇ
║ ─ ${prefix}ᴄᴏᴜɴᴛ
║ ─ ${prefix}ᴄᴀʟᴄᴜʟᴀᴛᴇ
║ ─ ${prefix}ғʟɪᴘ
║ ─ ${prefix}ᴡᴇᴀᴛʜᴇʀ
║ ─ ${prefix}ɴᴇᴡs
║ ─ ${prefix}ғᴀᴋᴇᴄʜᴀᴛ
║ ─ ${prefix}𝚒𝚙𝚑𝚘𝚗𝚎𝚌𝚑𝚊𝚝
║ ─ ${prefix}ʷᵉˡᶜᵒᵐᵉⁱᵐᵍ
║ ─ ${prefix}ᶠᵒʳʷᵃʳᵈ
║ ─ ${prefix}ᶠᵒʳʷᵃʳᵈᵃˡˡ
║ ─ ${prefix}ᶠᵒʳʷᵃʳᵈᵍʳᵒᵘᵖ
║ ─ ${prefix}sᴀᴠᴇ
╚══════════════════╝

╔══❰ 💞 ʀᴇᴀᴄᴛɪᴏɴs ᴍᴇɴᴜ ❱══╗
║
║ ─ ${prefix}ʜᴜɢ
║ ─ ${prefix}ᴋɪss
║ ─ ${prefix}sʟᴀᴘ
║ ─ ${prefix}ᴘᴀᴛ
║ ─ ${prefix}ᴘᴏᴋᴇ
║ ─ ${prefix}ᴄᴜᴅᴅʟᴇ
║ ─ ${prefix}sᴍɪʟᴇ
║ ─ ${prefix}ᴡɪɴᴋ
║
╚══════════════════╝

╔════❰ 🏠 ᴍᴀɪɴ ᴍᴇɴᴜ ❱═══╗
║
║ ─ ${prefix}ᴘɪɴɢ
║ ─ ${prefix}ᴀʟɪᴠᴇ
║ ─ ${prefix}ʀᴜɴᴛɪᴍᴇ
║ ─ ${prefix}ᴏᴡɴᴇʀ
║ ─ ${prefix}ʀᴇᴘᴏ
║ ─ ${prefix}ᴍᴇɴᴜ
║
╚══════════════════╝

> ${config.DESCRIPTION || '© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ERFAN-MD'}`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: config.NEWSLETTER_JID || '120363416743041101@newsletter',
                newsletterName: botName,
                serverMessageId: 143
            }
        };

        // Send menu with BOT_IMAGE from config
        try {
            await conn.sendMessage(from, {
                image: { url: botImage },
                caption: menuCaption,
                contextInfo: contextInfo
            }, { quoted: mek });
        } catch (e) {
            await conn.sendMessage(from, {
                text: menuCaption,
                contextInfo: contextInfo
            }, { quoted: mek });
        }

    } catch (e) {
        console.error('Menu Error:', e);
        reply(`❌ ᴍᴇɴᴜ ᴇʀʀᴏʀ. ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ.`);
    }
});
