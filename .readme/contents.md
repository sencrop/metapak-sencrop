This `metapak` plug-in allows us to
 have consistent development environments
  across our various projects.

To use it:
```sh
npm i --save-dev metapak metapak-sencrop
```

Then add to your `package.json` file the
 following configurations:
```js
{
  // {...}
  "metapak": {
    "configs": [
      "main",
      "jsarch",
      "jsdocs",
      "readme",
      "tests"
    ],
    "data": {
      // Files to Lint
      "files": "src/**/*.js"
    }
  },
}
```
