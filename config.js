// config.js - Centralized configuration 
require('dotenv').config();

const config = {
    // MongoDB Configuration (only this is from process.env)
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://jawadmd:irfanmd@cluster0.cqcxhti.mongodb.net/?appName=Cluster0',
    
    // Fixed Database Name
    DB_NAME: process.env.DB_NAME || 'ERFAN-x0',
    
    // Collections Configuration
    COLLECTIONS: {
        SESSIONS: 'whatsapp_sessions',
        NUMBERS: 'active_numbers',
        CONFIGS: 'bot_configs'
    },
    
    // Bot Configuration
    AUTO_VIEW_STATUS: 'true',
    AUTO_LIKE_STATUS: 'false',
    AUTO_RECORDING: 'false',
    AUTO_REACT: 'false',
    AUTO_TYPING: 'false', // New env
    ALWAYS_ONLINE: 'false', // New env
    VERSION: '2.0.0 Bᴇᴛᴀ',
    DESCRIPTION: '*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ERFAN-MD*',
    ANTI_DELETE_PATH: 'inbox',
    ANTI_DELETE: 'false',
    STICKER_NAME: 'ERFAN',
    ANTI_LINK: 'true',
    WELCOME: 'false',
    ADMIN_ACTION: 'false',
    MODE: 'public',
    PREFIX: '.',
    ANTI_CALL: 'false',
    REJECT_MSG: '*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*',
    
    // Bot Identity
    BOT_NAME: 'ERFAN-MD',
    OWNER_NAME: 'ERFAN-MD',
    OWNER_NUMBER: '923306137477',
    DEV: '923448149931',
    IK_IMAGE_PATH: './lib/jawadmd.jpg',
    BOT_IMAGE: 'https://files.catbox.moe/lbf3y9.jpg', // New env
    
    // Newsletter Configuration
    NEWSLETTER_JID: '120363416743041101@newsletter',
    NEWSLETTER_MESSAGE_ID: '428',
    
    // Reaction Emojis
    AUTO_LIKE_EMOJI: ['❤️', '💚', '🌚', '😍', '💀', '🧡', '💛', '💙', '👻', '🖤', '🤍', '🥀'],
    REACTXEMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
    
    // System Configuration
    MAX_RETRIES: 3,
    OTP_EXPIRY: 300000,
    ADMIN_LIST_PATH: './admin.json',
    CHANNEL_LINK: 'https://whatsapp.com/channel/0029Vb5dDVO59PwTnL86j13J',
    BANNED: [],
    SUDO: [
        "923306137477@s.whatsapp.net",
        "923347572367@s.whatsapp.net" 
    ],
    
    // Newsletter JIDs for auto-follow
    NEWSLETTER_JIDS: [ '120363416743041101@newsletter',
'120363406390304431@newsletter',
'120363405677816341@newsletter',
'120363403592362011@newsletter',
'120363406379816316@newsletter',
'120363399407973914@newsletter',
'120363408558228054@newsletter',
'120363406868487567@newsletter',
'120363407547659674@newsletter',
'120363424780703121@newsletter' ],
    
    // Default Settings Template
    DEFAULT_SETTINGS: {
        AUTO_VIEW_STATUS: 'true',
        AUTO_LIKE_STATUS: 'false',
        AUTO_RECORDING: 'false',
        AUTO_REACT: 'false',
        AUTO_TYPING: 'false', // New
        ALWAYS_ONLINE: 'false', // New
        VERSION: '2.0.0 Bᴇᴛᴀ',        
        OWNER_NAME: 'ERFAN-AHMAD',
        ANTI_DELETE_PATH: 'inbox',
        ANTI_CALL: 'false',
        REJECT_MSG: '*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*',
        OWNER_NUMBER: '923306137477',
        DEV: '923347572367',
        DESCRIPTION: '*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ERFAN-MD*',
        ANTI_DELETE: 'false',
        ANTI_LINK: 'true',
        STICKER_NAME: 'ERFAN-MD',
        WELCOME: 'false',
        ADMIN_ACTION: 'false',
        MODE: 'public',
        PREFIX: '.',
        BOT_IMAGE: 'https://files.catbox.moe/lbf3y9.jpg', // New
        AUTO_LIKE_EMOJI: ['❤️', '💚', '🌚', '😍', '💀', '🧡', '💛', '💙', '👻', '🖤', '🤍', '🥀'],
        REACTXEMOJIS: ['😂', '❤️', '🔥', '👏', '😮', '😢', '🤣', '👍', '🎉', '🤔', '🙏', '😍', '😊', '🥰', '💕', '🤩', '✨', '😎', '🥳', '🙌'],
        BANNED: [],
        SUDO: [
            "923306137477@s.whatsapp.net",
            "923347572367@s.whatsapp.net" 
        ]
    }
};

module.exports = config;
