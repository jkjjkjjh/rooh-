const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "story",
    alias: ["kahani", "lovestory"],
    desc: "Generate a story based on your text",
    category: "fun",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {
    try {
        // Check if text is provided
        if (!text) {
            return reply("📖 Please provide a story topic!\n\nExample:\n.story Ali ki love story\n.story Ahmed ka safar")
        }

        // Send waiting message
        await reply("📝 Generating your story... Please wait!")

        // Call API
        const apiUrl = `https://eliteprotech-apis.zone.id/story?text=${encodeURIComponent(text)}`
        const response = await axios.get(apiUrl, { timeout: 60000 })

        // Check response
        if (!response.data?.success || !response.data?.story) {
            return reply("❌ API Error! Please try again later.")
        }

        // Get story
        const story = response.data.story

        // Send story with styled message
        const storyMessage = `*╭───────────────────╮*
*│      📖 STORY GENERATOR      │*
*╰───────────────────╯*

*📝 Topic:* ${text}

━━━━━━━━━━━━━━━━━━━━━

${story}

━━━━━━━━━━━━━━━━━━━━━
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ DARKZONE-MD`

        await conn.sendMessage(from, {
            text: storyMessage
        }, { quoted: mek })

        // Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error("❌ Story Error:", err)
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } })
        reply("❌ API Error! Please try again later.")
    }
})
