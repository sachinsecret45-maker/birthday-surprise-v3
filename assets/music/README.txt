HOW TO ADD MUSIC
================

The site already has a complete, working music system wired up —
it's just waiting for an actual audio file. No code changes needed.

To turn it on:

1. Drop an MP3 file in this folder named exactly: theme.mp3
   (full path: assets/music/theme.mp3)

2. That's it. The next time the site loads, it will detect the
   track automatically and a small speaker toggle will appear in
   the top-right corner of every screen.

How it behaves:
- Starts muted by default — nothing plays until the toggle is tapped.
- Tapping Start (the very first button) "arms" playback inside that
  same tap, so when music is later unmuted it can play immediately
  without hitting a browser autoplay block.
- Loops automatically once playing.
- Volume is preset to a gentle 35% — edit the `bgMusic.volume` line
  near the top of js/app.js (search "AUDIO SYSTEM") if you want it
  louder or softer.

If no file is present (like right now), the toggle button simply
stays hidden and nothing else is affected — no errors, no broken
layout, just an inert feature waiting to be switched on.
