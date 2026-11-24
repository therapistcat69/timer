# Still — Focus timer

A private focus stopwatch built with Next.js App Router, TypeScript, Tailwind CSS, and MongoDB/Mongoose. Its API routes and database access require a Node web service; deploy it as a **Render Web Service**, not as a Static Site.

## Deploy on Render

### 1. Put the project in GitHub

Render deploys from a Git repository. Create a GitHub repository, then upload/push this project to it. Do not upload `.env.local` or put passwords in GitHub. This project’s `.gitignore` excludes local `.env` files.

### 2. Allow the Render service to reach MongoDB Atlas

In MongoDB Atlas:

1. Open **Security → Network Access**.
2. Add the outbound IP ranges for your Render service. You can find them after creating the service in Render under the service’s **Connect → Outbound** menu. Add each range to Atlas’s IP access list. Render’s ranges depend on the service region.
3. Under **Database Access**, make sure a database user exists and has read/write access to the database. Use that user’s credentials in the connection string, not your Atlas website login.
4. From **Database → Connect → Drivers**, copy the MongoDB connection string. Replace any placeholders with your database username, password, and database name. Percent-encode special characters in the username or password.

Keep the complete URI private. Do not paste it in source code, README files, screenshots, or GitHub.

### 3. Create the Render service

1. Sign in at [Render](https://dashboard.render.com/) and click **New → Web Service**.
2. Connect the GitHub repository containing this project and select the branch to deploy (usually `main`).
3. Set these service fields:

   | Render field | Value |
   | --- | --- |
   | Name | A name you choose, such as `still-focus` |
   | Language | `Node` |
   | Branch | The branch containing this app, usually `main` |
   | Root Directory | Leave blank if `package.json` is at the repository root |
   | Build Command | `npm ci && npm run build` |
   | Start Command | `npm start` |

   Select a region near your MongoDB Atlas cluster when possible. Keep this as a **Web Service** because the timer uses server API routes and MongoDB.

### 4. Add the environment variables in Render

Before creating/deploying, open the service’s **Environment** section and add these four variables. Use **Add Environment Variable** for each row:

| Key | Value to enter |
| --- | --- |
| `MONGODB_URI` | The complete Atlas driver connection string from step 2, including the database name and options. Keep it secret. |
| `APP_PASSCODE` | The passcode you want to enter on the app’s login page. For example, use `Jivanshu` if you want the same local passcode. |
| `AUTH_SECRET` | A new, private random string of at least 32 characters. Generate one locally with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`, then paste its output into Render. |
| `NEXT_PUBLIC_TIMEZONE` | `Asia/Kolkata` (or another IANA timezone, such as `America/Los_Angeles`). |

Do not include quotation marks around values unless they are actually part of your secret. Do not upload `.env.local` to Render or commit it. These values belong in the Render service’s **Environment** settings. `NEXT_PUBLIC_TIMEZONE` is used by the browser bundle, so set it before the first build. If you change any value later, save and redeploy the service.

5. Click **Create Web Service**. Render will install dependencies, build the Next.js app, and start it. Follow **Events** or **Logs** in the service page while it deploys.

### 5. Confirm the deployed app works

1. Open the `onrender.com` URL shown on the Render service page.
2. Enter the value you set for `APP_PASSCODE`.
3. Start a short session, end it, refresh, and confirm the session appears in the app. This checks login, MongoDB access, and persistence.

If login is rejected, check that the Render `APP_PASSCODE` is spelled exactly as entered. If login succeeds but timer/log data fails to load, check `MONGODB_URI`, the Atlas database user permissions, and the Atlas IP access list. Check the Render service logs for the specific connection error. After changing environment variables, redeploy the service.

## Local development

1. Install Node.js 20 or newer and set up MongoDB Atlas or a local MongoDB instance.
2. Copy `.env.example` to `.env.local`, then replace its example values with your own `MONGODB_URI`, `APP_PASSCODE`, and random `AUTH_SECRET`. Set `NEXT_PUBLIC_TIMEZONE` to your preferred IANA timezone.
3. Run:

   ```sh
   npm install
   npm run dev
   ```

4. Open http://localhost:3000 and sign in with your `APP_PASSCODE`.

## Using the app

- Press Space to start or pause, Enter or S to end and log, and F to toggle Zen mode.
- Switch between the timer and Insights for history, the contribution heatmap, weekly chart, category totals, and missed-session entry.
- Export CSV or JSON from Insights. Change the daily goal from the history view.

The passcode is checked server-side. Successful login creates a signed, HTTP-only, SameSite=Strict cookie. `NEXT_PUBLIC_TIMEZONE` sets the logical calendar timezone independently of Render’s server timezone; the reset hour defaults to 5:00 AM.

## Official Render guides

- [Deploy a Next.js app](https://render.com/docs/deploy-nextjs-app)
- [Configure environment variables](https://render.com/docs/configure-environment-variables)
- [Connect to MongoDB Atlas](https://render.com/docs/connect-to-mongodb-atlas)
- [Find Render outbound IP ranges](https://render.com/docs/outbound-ip-addresses)
