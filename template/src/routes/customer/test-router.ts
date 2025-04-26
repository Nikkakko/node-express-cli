import { Router } from "express";

export const route1Router = Router();
route1Router.get("/", async (req, res) => {
  res.send("Hello from route 1!");
});
