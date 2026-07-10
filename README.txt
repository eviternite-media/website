Eviternite Static Website

Open this file locally:
index.html

You can double-click index.html to preview the website. The static site uses only relative asset paths:
assets/css/style.css
assets/js/main.js
assets/images/eviternite-logo.png

This version is a clean static website.
It does not use Next.js, Node.js, Supabase, backend routes, or payment checkout.
The package form validates required fields, saves the request to browser localStorage, and shows a thank-you summary.

Vercel settings for static version:
Framework Preset: Other
Build Command: leave empty
Install Command: leave empty
Output Directory: ./

If the GitHub repo contains the folder website creation, set Vercel Root Directory to website creation.
If the GitHub repo is created from inside website creation, no root directory change is needed.

Use this folder for static deployment:
C:\Users\Eviternite\OneDrive\Desktop\Video\Music\website creation

The old Next.js/full-stack files were moved out of this static folder so Vercel does not try to build this as a Next.js app.
