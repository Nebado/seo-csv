"use strict";
const fs = require("fs");
const csv = require("csv-parser");

module.exports = function (opts) {
  opts.namespace = opts.namespace || "meta";

  return function (req, res, next) {
    async function getDataCsv() {
      try {
        const data = await getData("seo.csv", {});
        let newData = [];

        for (let i = 0; i < data.length; ++i) {
          if (req.url == data[i]["0"]) {
            newData["title"] = data[i]["1"];
            newData["description"] = data[i]["2"];
            newData["keywords"] = data[i]["3"];
          }
        }

        if (newData) {
          req[opts.namespace] = newData;
        }

        next();
      } catch (error) {
        console.error("getData: An error occurred: ", error.message);
      }
    }
    getDataCsv();
  };

  function getData(file, type) {
    let list = [];
    const data = "";
    return new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .on("error", (error) => {
          reject(error);
        })
        .pipe(csv({ headers: false, separator: ";" }))
        .on("data", function (data) {
          list.push(data);
        })
        .on("end", () => {
          resolve(list);
        });
    });
  }
};
