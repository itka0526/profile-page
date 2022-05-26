const express = require("express");
const app = express();
const { Pool } = require("pg");
const fetch = require("node-fetch-commonjs");
const { v4: uuidv4 } = require("uuid");

const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const expresession = require("express-session");
const pgSession = require("connect-pg-simple")(expresession);

const sessionMiddleWare = expresession({
    secret: "profilepage",
    resave: false,
    saveUninitialized: false,
    //httpOnly: false,
    cookie: {
        maxAge: 604800000,
    },
    store: new pgSession({
        pool: pgPool,
        tableName: "session",
    }),
});

app.use(sessionMiddleWare);
app.use(express.json());

app.use(express.static("build"));

app.get("/visits", async (req, res) => {
    const previouslyVisited = req.session.user;
    if (previouslyVisited === undefined) {
        const gen = uuidv4();
        req.session.user = {
            user_id: gen,
        };

        await pgPool.query(
            `
            insert into users(user_id, visited) 
            values ($1, $2)
            `,
            [gen, 1]
        );

        const {
            rows: [{ visitors: totalVisitors }],
        } = await pgPool.query(
            `
            UPDATE visitors 
              SET visitors = visitors + 1
              RETURNING *;
            `
        );
        res.json({ current_user: 1, totalVisitors });
    } else {
        const {
            rows: [{ visited: current_user }],
        } = await pgPool.query(
            `
            UPDATE users 
              SET visited = visited + 1
              WHERE user_id = $1
              RETURNING *;
            `,
            [previouslyVisited.user_id]
        );
        const {
            rows: [{ visitors: totalVisitors }],
        } = await pgPool.query(
            `
            UPDATE visitors 
              SET visitors = visitors + 1
              RETURNING *;
            `
        );

        res.json({ current_user, totalVisitors });
    }
});

app.post("/reviews", async (req, res) => {
    const previouslyVisited = req.session.user;
    if (previouslyVisited === undefined) return;
    const review = req.body;
    console.log(review);
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const titleWriter = `${previouslyVisited.user_id} rated ${review.stars}! `;
    const wroteOn = `${day}/${month}/${year}`;

    await fetch(
        "https://itgelt-is-blogging.herokuapp.com/newpost?username=itgelt&password=itgeltissmart",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleWriter,
                date: wroteOn,
                body: review.message,
            }),
        }
    );

    res.json({
        sent: true,
    });
});
app.listen(process.env.PORT || 4000, () => console.log("*** server is up ***"));
