/**
 * MONTHSARY KEEPSAKE - CONFIGURATION DATA
 * You can edit this file directly or use admin/admin.html to customize settings.
 */
window.ANNIVERSARY_CONFIG = {
  partnerName: "Hon",
  yourName: "Seller ng longanisa",
  monthsaryDate: "2026-06-30T02:08:00",
  letterTitle: "Happy 2nd monthsary, hon! 🎉",
  letterParagraphs: [
    "Okay so this is officially the first time I'm giving you something like this, and honestly, I wanted it to be something you'd actually feel not just words on a screen, but a little piece of how much you mean to me.",
    "Two months in, and I still lowkey can't believe I'm the one who makes you laugh, who gets your good morning texts, who gets to call you mine. Sorry to everyone else, but I'm not sharing.",
    "I know you've been working so hard with your OJT lately juggling that on top of everything else and I just want you to know I see it, and I'm proud of you for pushing through even when it's tiring.",
    "And I'm sorry, hon. I know I've made the same mistake again, and I know that's frustrating, especially when you're already carrying so much. I'm not going to make excuses, I just want to do better, and I'm working on it, for real.",
    "I love you, hon. I always love you even on the hard days, even when I mess up, even when things get a little rocky. That doesn't change how much you mean to me.",
    "So here's to us, to more monthsaries, more random conversations that somehow turn into an hour long chismis session, more rants that turn into laughing about nothing, more inside jokes no one else will ever get, and to figuring things out together, one day at a time.",
    "I love you. Always have, always will."
  ],
  timeline: [
    { date: "Day One", title: "The Day We Met", desc: "A simple follow on IG that somehow changed everything." },
    { date: "First Journey", title: "Our First Getaway", desc: "Late night talks that turned into our favorite memories, filled with endless laughter." },
    { date: "Milestone", title: "Making It Official", desc: "Deciding that every tomorrow would be better together." },
    { date: "Today", title: "Another Beautiful Chapter", desc: "Celebrating us and all the moments yet to come." }
  ],
  reasons: [
    { num: "01", short: "Your Laugh", full: "The warm sound that makes any difficult day instantly lighter." },
    { num: "02", short: "Your Kindness", full: "How softly and deeply you care for everyone around you." },
    { num: "03", short: "Your Beauty", full: "Not just how you look, but the light you bring into every room you walk into." },
    { num: "04", short: "Just Being You", full: "Simply because you are my favorite person in the entire world." },
    { num: "05", short: "Your 'Evil' Side", full: "The playful chaos, the teasing, the pambubully the villain arc I somehow fell for too." },
    { num: "06", short: "Just You", full: "No explanation needed, just the fact that you exist is already enough." }
  ],
  photos: [
    { url: "picture/photo1.jpg", caption: "First Meet Up 🌟" },
    { url: "picture/photo2.jpg", caption: "Cute Pic Kiss 💋" },
    { url: "picture/photo3.jpg", caption: "First Date 🌹" }
  ],
  musicUrl: "picture/music.mp4",
  musicTitle: "Our Special Melody",
  musicSubtitle: "Special Keepsake Song • Playing for you"
};

// Load admin saved custom data from localStorage if available
try {
  const saved = localStorage.getItem('ANNIVERSARY_CUSTOM_CONFIG');
  if (saved) {
    const custom = JSON.parse(saved);
    window.ANNIVERSARY_CONFIG = { ...window.ANNIVERSARY_CONFIG, ...custom };
  }
} catch (e) {
  console.warn("Could not load custom local config", e);
}

// Ensure musicUrl is always defined
if (!window.ANNIVERSARY_CONFIG.musicUrl) {
  window.ANNIVERSARY_CONFIG.musicUrl = "picture/music.mp4";
}
