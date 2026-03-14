
const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

cmd({
    pattern: "ytv",
    alias: ["ytmp4", "video"],
    desc: "Download YouTube video (MP4)",
    category: "download",
    react: "📹",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎥 Please provide a YouTube video name or URL!\n\nExample: `.ytv alone marshmello`");

        let url = q;
        let videoInfo = null;

        // 🔍 Detect URL or search by title
        if (q.startsWith('http://') || q.startsWith('https://')) {
            if (!q.includes("youtube.com") && !q.includes("youtu.be")) {
                return await reply("❌ Please provide a valid YouTube URL!");
            }
            const videoId = getVideoId(q);
            if (!videoId) return await reply("❌ Invalid YouTube URL!");
            const searchFromUrl = await yts({ videoId });
            videoInfo = searchFromUrl;
        } else {
            const search = await yts(q);
            videoInfo = search.videos[0];
            if (!videoInfo) return await reply("❌ No video results found!");
            url = videoInfo.url;
        }

        // 🎯 Extract YouTube video ID
        function getVideoId(url) {
            const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            return match ? match[1] : null;
        }

        // 🖼️ Send thumbnail + video info
        await conn.sendMessage(from, {
            image: { url: videoInfo.thumbnail },
            caption: `*🎬 VIDEO DOWNLOADER*\n\n🎞️ *Title:* ${videoInfo.title}\n📺 *Channel:* ${videoInfo.author.name}\n🕒 *Duration:* ${videoInfo.timestamp}\n\n*Status:* Downloading Video...\n\n*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇʀғᴀɴ-ᴍᴅ*`
        }, { quoted: mek });

        // ⚙️ Fetch from JawadTech API
        const apiUrl = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(url)}`;
        const { data } = await axios.get(apiUrl);

        if (!data?.status || !data?.result?.mp4) {
            return await reply("❌ Failed to fetch download link! Try again later.");
        }

        const vid = data.result;

        // 📹 Send as video
        await conn.sendMessage(from, {
            video: { url: vid.mp4 },
            caption: `🎬 *${vid.title}*\n\n*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇʀғᴀɴ-ᴍᴅ*`
        }, { quoted: mek });

        // ✅ Success Reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("❌ Error in .ytv command:", e);
        await reply("⚠️ Something went wrong! Try again later.");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});


// 


cmd({
    pattern: "music",
    alias: ["play", "song", "audio", "roohi", "ayezal"],
    desc: "Searches a song on YouTube and downloads it as MP3",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const query = q ? q.trim() : '';

        if (!query) {
            return await reply(`╭━〔 🎵MUSIC ENGINE 〕━⬣
┃ ⚠️ .play pal pal 
╰━━━━━━━━━━━━━━━━━━⬣
> 🚀 DARKZONE-MD`);
        }

        await conn.sendMessage(from, {
            react: { text: '⌛', key: m.key }
        });

        const isYoutubeLink =
            /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)?)([a-zA-Z0-9_-]{11})/i.test(query);

        let videoUrl = query;
        let title = 'Unknown YouTube Song';
        let thumbnail = '';
        let duration = '';
        let author = 'Unknown';
        let views = 0;

        if (!isYoutubeLink) {
            const search = await yts(query);

            if (!search?.videos?.length) {
                await conn.sendMessage(from, {
                    react: { text: '❌', key: m.key }
                });

                return await reply(`╭━〔 🔎 NO RESULTS FOUND 〕━⬣
┃ No matching results for:
┃ ➤ "${query}"
┃
┃ Try:
┃   • Different keywords
┃   • Artist name + song title
╰━━━━━━━━━━━━━━━━━━⬣
> 🎵 Search Engine`);
            }

            const video = search.videos[0];
            videoUrl = video.url;
            title = video.title || title;
            thumbnail = video.thumbnail || '';
            duration = video.timestamp || '';
            author = video.author?.name || 'Unknown';
            views = video.views || 0;
        } else {
            const videoId = query.match(/([a-zA-Z0-9_-]{11})/i)?.[1];
            const search = await yts({ videoId: videoId });

            if (search) {
                title = search.title || title;
                thumbnail = search.thumbnail || '';
                duration = search.timestamp || '';
                videoUrl = search.url || query;
                author = search.author?.name || 'Unknown';
                views = search.views || 0;
            }
        }

        const apiUrl = `https://api.giftedtech.co.ke/api/download/ytmp3v2?apikey=gifted&url=${encodeURIComponent(videoUrl)}&quality=128`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        const result = data.result || data.results || data;

        const audioUrl =
            result.download_url ||
            result.downloadUrl ||
            result.url ||
            result.audio ||
            result.link;

        // Update title and thumbnail from API if available
        title = result.title || result.name || title || 'Unknown YouTube Song';
        thumbnail = result.thumbnail || result.image || thumbnail || '';

        if (!audioUrl) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });

            return await reply(`╭━〔 ❌ DOWNLOAD FAILED 〕━⬣
┃ Unable to process your request.
┃
┃ ➤ Possible Reasons:
┃   • Song not found
┃   • Video unavailable
┃   • API returned no audio URL
┃
┃ Please try again.
╰━━━━━━━━━━━━━━━━━━⬣
> 🎵 DmlDownloader`);
        }

        const safeTitle = title.replace(/[<>:"/\\|?*]/g, '_').trim();

        // ✅ First: Send Thumbnail Image with Song Info
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: `🎧 *DARKZONE-MD AUDIO DOWNLOADER*
╭━━━━━━━━━━━━━━━⬣
┃ 🎵 *Title:* ${safeTitle}
┃ 👤 *Author:* ${author}
┃ ⏱️ *Duration:* ${duration}
┃ 👁️ *Views:* ${views.toLocaleString()}
┃ 📥 *Status:* Downloading...
╰━━━━━━━━━━━━━━━⬣
> ⚡ *DARKZONE-MD*`
        }, { quoted: mek });

        // ✅ Second: Send Audio File
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${safeTitle}.mp3`
        }, { quoted: mek });

        // ✅ Success Reaction
        await conn.sendMessage(from, {
            react: { text: '✅', key: m.key }
        });

    } catch (error) {
        console.error('Play error:', error);

        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });

        await reply(`╭━〔 🚨 PLAY ERROR 〕━⬣
┃ Something went wrong while processing.
┃
┃ Error:
┃ ${error.message}
┃
┃ Please try again later.
╰━━━━━━━━━━━━━━━━━━⬣
> 🛠️ DARKZONE-MD System`);
    }
});
