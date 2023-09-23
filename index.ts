import express, { Application, Request, Response } from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import router from "./router";

const app: Application = express();
const port: number = 2567;

const URL: string = "https://www.jumia.com.ng/mlp-appliances/";

app.use(express.json());
app.use(cors());

// const mainScript = async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   try {
//     const page = await browser.newPage();

//     await page.goto(URL, { waitUntil: "load" });

//     await page.waitForTimeout(5000);

//     const scrollDOwn = async () => {
//       await page.evaluate(() => {
//         window.scrollBy(0, window.innerHeight);
//       });
//     };

//     scrollDOwn();
//     await page.waitForTimeout(2000);
//     for (let i: number = 0; i < 20; i++) {
//       await scrollDOwn();
//       await page.waitForTimeout(2000);
//     }

//     await page.screenshot({
//       path: path.join(
//         __dirname,
//         "images",
//         `./dribbleFull ${Math.floor(Math.random() * 1000) + Date.now()}.png`
//       ),
//       fullPage: true,
//     });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log("");
//     await browser.close();
//     console.log("done ❤ ❤");
//   }
// };
// mainScript();

app.use("/", router)

app.listen(port, () => {
  console.log("");
  console.log("server is listening");
});
