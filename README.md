# e28886.tech

# TODO

[✅] Bun support
[✅] AI Images for new papers

steps:

1. remove package-lock.json file
2. install bun and add that in package.json
3. go inside db.js file and port from bettersqlite to bun:sqlite
4. make change in create-paper POST route and add cloudflare fetch function
5. add all the env variables inside .env file (cf account_id, api_token)

```
PORT=
JWTSECRET=""
ACCOUNT_ID=""
MODEL_NAME="@cf/black-forest-labs/flux-1-schnell"
CLOUDFLARE_API_TOKEN=""
```

6. Inside our paper table don't forget to add `image blob`

# Planned

1. Implement bun sqlite: https://bun.sh/docs/api/sqlite
2. In our paper navigation buttons (moving between prev and next) stop next for the last paper
3. Add comments functionality

# Commands

1. npm install better-sqlite3
2. const db = require("better-sqlite3")("database.db")
3. add the performance code
4. db.transaction(() => {
   db.prepare(`CREATE users TABLE if not there with schema`).run()
   })()
