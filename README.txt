Eviternite Static Website

Open locally:
index.html

This is a clean static HTML/CSS/JS website. It works locally by double-clicking index.html and can deploy on Vercel as a static project.

Main contact email:
poqimedia@gmail.com

Form email setup:
1. Create a Formspree or Getform form endpoint.
2. Set the receiving email to poqimedia@gmail.com.
3. Open index.html.
4. Find the form action:
   PASTE_FORMSPREE_OR_GETFORM_ENDPOINT_HERE
5. Replace it with your real Formspree/Getform endpoint.
6. Deploy to Vercel.
7. Test the form.
8. Client submissions will arrive by email.

Local preview behavior:
If the form endpoint is still the placeholder, submissions are saved only in this browser with localStorage and the page shows a local-preview message.

Vercel settings:
Framework Preset: Other
Build Command: leave empty
Install Command: leave empty
Output Directory: ./

If the GitHub repo contains the folder website creation, set Vercel Root Directory to website creation.
If the GitHub repo is created from inside website creation, no root directory change is needed.

Files:
index.html
assets/css/style.css
assets/js/main.js
assets/images/eviternite-logo.png

No database or fake dashboard is included in this version. A real admin dashboard can be added later with a database.
