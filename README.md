# Seo Csv Module

This is a very simple seo module for set meta tags from csv file on Nodejs.

## Installation

```console
$ npm install seo-csv
```

## Configuration

### Your seo.csv file with your seo meta in directory public/.

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

app.use(function (req, res, next) {
    res.locals.meta = req.meta;
    next();
});

app.get("/", function (req, res) {
  res.render("index", res.locals.meta);
});

```

### In view

```html
<title>{{title}}</title>
<meta name="description" content="{{description}}" />
<meta name="keywords" content="{{keywords}}" />
```