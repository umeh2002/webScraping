import { Router } from "express";
import { readData } from "./scrape";

const router = Router()

router.route("/").get(readData)

export default router