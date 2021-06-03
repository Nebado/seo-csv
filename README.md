# Seo Csv Module

This is a very simple seo module for set meta tags from csv file on Nodejs.

## Installation

```console
$ npm install seo-csv
```

## Configuration

### CSV file with your seo meta

```console
url;title;description;keywords
/;Home;Home;Home
/about;About;About;About
```

### Add middleware in your app.js

```js
app.use(
  require("seo-csv")({
    ignore: /^\/(images|js|css)/,
    namespace: "meta",
  })
);

app.get("/", function (req, res) {
  res.render("index", {
    title: req.meta["title"],
    description: req.meta["description"],
    keywords: req.meta["keywords"],
  });
});

```