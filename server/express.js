import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import MainRouter from "../client/MainRouter";
import journalRoutes from "./routes/journal.routes"
import pageRoutes from "./routes/page.routes"
import paymentRutes from "./routes/payment.routes"

import { config } from "../config/config";
import fileUpload from "express-fileupload";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

app.use("/dist", express.static(path.join(config.rootDir, "dist")));
app.use(`/public`, express.static(config.publicDir));
app.use('/', journalRoutes)
app.use('/', pageRoutes)
app.use('/', paymentRutes)
app.use('/ping',(req,res)=>{
  return res.status(200).json({
    success:true,
  })
})

app.get("*", (req, res) => {
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <MainRouter />
    </StaticRouter>
  );

  if (context.url) {
    return res.redirect(303, context.url);
  }

  res.status(200).send(
    Template(markup)
  );
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;