import express from "express";
import cors from "cors";

express()
  .use(cors())
  .get("/", (req, res) => {
    const start = new Date().toISOString();
    setTimeout(() => {
      res.json({
        start,
        end: new Date().toISOString(),
      });
    }, 2000);
  })
  .listen(8080, () => console.log("Listening on port http://localhost:8080/"));
