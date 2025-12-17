# alotofads.com — MVP (static demo)

This repository contains a simple MVP demo showing:

- Topic-driven context (search updates title/meta/url).
- Vertical list of ad networks (Google, Ezoic placeholders).
- Horizontal scroller per ad format (banner, video, sidebar).
- Rotation of ad unit IDs per format/zone to help avoid repeated ads.
- Future updates dashboard and filters.

Important: This is a demo. Replace placeholder ad unit IDs and network scripts with your real IDs and follow each ad network's integration procedures and policy.

How to run locally
1. Clone/download these files.
2. Serve with a static server. Examples:
   - `npx http-server`
   - `npx serve`
   - Or open `index.html` in the browser (note: some ad scripts require HTTPS).

Files
- index.html — main UI
- styles.css — basic styles
- app.js — client logic (topic handling, ad slot rendering, rotation)
- README.md — this file

Where to replace with real ad code
- app.js contains placeholders and example comments showing where to insert AdSense or Ezoic scripts and ad unit IDs.
- For Google non-personalized ads you may use GPT and setRequestNonPersonalizedAds(1) in GPT or follow the AdSense docs.
- For Ezoic you must enroll in their platform and follow their integration instructions.

Privacy & policy
- Do not encourage invalid clicks.
- Do not modify ad code in ways disallowed by a network.
- Respect each network's TOS and local laws (e.g., GDPR/CCPA). Provide non-personalized ad options and disclosures if needed.

Next steps you can ask me for:
- I can walk you through creating the GitHub repo and pushing these files,
- or I can generate a zip you can download,
- or I can later help replace mock slots with safe test ad units for development.
