/**
 * ANNIVERSARY KEEPSAKE - CONFIGURATION DATA
 * You can edit this file directly or use admin/admin.html to customize settings.
 */
window.ANNIVERSARY_CONFIG = {
  partnerName: "Hon",
  yourName: "Always You",
  anniversaryDate: "2023-08-11",
  letterTitle: "Every year, the same answer: you.",
  letterParagraphs: [
    "I keep trying to find a new way to say it, and I keep landing on the same old truth: I would choose you again, every single time, in every version of this life. Another year has folded into the last, and somehow you are still the best part of all of them.",
    "I think about the small things most — the way you laugh before the joke is even finished, the way you know exactly what I need before I've said a word. Those are the things I never want to take for granted, and today I'm making sure I don't.",
    "Thank you for building this life with me, one ordinary day at a time. Here's to the years we've had, and to every one still coming."
  ],
  timeline: [
    { date: "Day One", title: "The Day We Met", desc: "A simple hello that changed everything forever." },
    { date: "First Journey", title: "Our First Getaway", desc: "Late night talks under starry skies and endless laughter." },
    { date: "Milestone", title: "Making It Official", desc: "Deciding that every tomorrow would be better together." },
    { date: "Today", title: "Another Beautiful Chapter", desc: "Celebrating us and all the moments yet to come." }
  ],
  reasons: [
    { num: "01", short: "Your Laugh", full: "The warm sound that makes any difficult day instantly lighter." },
    { num: "02", short: "Your Kindness", full: "How softly and deeply you care for everyone around you." },
    { num: "03", short: "Our Teamwork", full: "How we navigate challenges side-by-side, never apart." },
    { num: "04", short: "Just Being You", full: "Simply because you are my favorite person in the entire world." }
  ],
  photos: [
    { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80", caption: "Our first spark" },
    { url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80", caption: "Our favorite trip" },
    { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80", caption: "Quiet moments" }
  ]
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
