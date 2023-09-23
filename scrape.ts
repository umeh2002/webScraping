import express, { Request, Response } from "express";
import puppeteer from "puppeteer";

const URL: string = "https://www.jumia.com.ng/mlp-appliances/";

export const readData = async(req: Request, res: Response) => {
    const browser = await puppeteer.launch({ headless: false });
    try {
      const page = await browser.newPage();
      await page.goto(URL, { waitUntil: "load" });

      await page.waitForTimeout(2000);

      const scroll = async () => {
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight);
        });
      };
      scroll();
      await page.waitForTimeout(2000);

      for (let i: number = 0; i < 17; i++) {
        scroll();
        await page.waitForTimeout(2000);
      }

      const data = await page.evaluate((URL) => {
        const data = Array.from(document.querySelectorAll("article"));

        return data.map((props) => ({
          title: props.querySelector("div.name")?.textContent,
          img: props.querySelector("img")?.getAttribute("src"),
          price: props.querySelector("div.prc")?.textContent,
          url: URL + props.querySelector("a.core")?.getAttribute("href"),
        }));
      }, URL);

      console.log(data);
      return res.status(404).json({
        message: "success",
        data: data,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: "error",
        data: error.message,
      });
    } finally {
      console.log();
      await browser.close();
      console.log("done");
    }
  };
;
