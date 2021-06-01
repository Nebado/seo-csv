"use strict";
const fs = require("fs");
const csv = require("csv-parser");

module.exports = function (opts) {
  opts.namespace = opts.namespace || "meta";

  return function (req, res, next) {
    async function getDataCsv() {
      try {
        const data = await getData("seo.csv", {});

        if (data) {
          req[opts.namespace] = data;
        }

        next();
      } catch (error) {
        console.error("getData: An error occurred: ", error.message);
      }
    }
    getDataCsv();
  };

  function getData(file, type) {
    let data = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .on("error", (error) => {
          reject(error);
        })
        .pipe(csv({ headers: false, separator: ";" }))
        .on("data", function (res) {
          data = res;
        })
        .on("end", () => {
          resolve(data);
        });
    });
  }
};
