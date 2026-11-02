# Doctor X (dr.x) v2

React 19 + Vite, no backend. Works offline after the first visit (PWA). Everything the user enters
(profile, appointment requests) is stored in the browser's localStorage on that device.

## Run
    npm install
    npm run dev        # development
    npm run build      # outputs /dist
    npm run preview    # serve the build locally

`dist/` is already built. Host it on any static host (Vercel, Netlify, GitHub Pages) or serve it with
`npx serve dist`. Service workers need http://localhost or https, not file://.

## Where things are
- src/data/        conditions, doctors (sample data), symptom topics
- src/lib/         symptom matching logic, localStorage hook, constants (clinic WhatsApp number)
- src/views/       Splash (logo animation), Home, Check, Conditions, Doctors, Hospitals, Booking, Appointments, Profile, Feedback (last)
- src/data/hospitals.js  97 hospitals (name, city, state) from India_Hospital_Doctor_Detailed_Database.xlsx
- public/anim-*.png      logo layers used by the splash animation (cut from logo-full.png)
- src/styles.css   design tokens at the top (light blue + white palette, fonts)

Booking opens WhatsApp with the request pre-written (number set in src/lib/store.js).
Doctor listings are sample data; replace before real use. Symptom results are informational, not a diagnosis.

## Device (Hive)
public/hive.html is the RIY3.0 Hive 3D device viewer. It is the main, first page of the app (first menu item, opens on launch), and is also reachable directly at /hive.html. It loads three.js from a CDN, so it needs internet the first time.
