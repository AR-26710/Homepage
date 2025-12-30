import fs from "fs";
import path from "path";
import config from "../astro.config.mjs";

const mode = config.siteMode;
const site = config.site;
const indexHtmlPath = path.resolve("./dist/index.html");
const indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");

// updateCSSPaths
const regex = /\/_astro\/(.*)\.css/;
let updatedIndexHtml = indexHtml.replace(regex, `${site}/_astro/$1.css`);

// 非cn场景删除备案信息
if(mode !== "cn") {
  const beian = /\<div class="beian".*?京.*号.*京.*号.*\<\/div\>/;
  updatedIndexHtml = updatedIndexHtml.replace(beian, "")
}

updatedIndexHtml = updatedIndexHtml.replaceAll("\n", "")

fs.writeFileSync(indexHtmlPath, updatedIndexHtml, "utf-8");
