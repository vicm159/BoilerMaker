# BoilerMaker

This BoilerMaker uses its own Sessions Model and all Models (_including the Sessions
Model_) are stored in a **test** Postgres Schema. Also, the Postgres database is stored on
a home Ubuntu Server. So the Sequelize constructor function has some different
input paramters.

## Changes to Babel and webpack

Async and await were not working with the babel **@babel/preset-env** preset the solution
for this was to install babel-polyfill and that plugin.

```bash
npm install --save-d babel-polyfill babel-plugin-transform-regenerator
```

Then i had to add this to webpack in the module.export object.

```js
{
  entry: ['babel-polyfill', './client/app.js'];
}
```

Finally, I added this to the .babelrc file

```js
{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  "plugins": ["transform-regenerator"]
}
```
