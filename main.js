const app = require('./server');
const { db } = require('./server/db');
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

db.sync({ force: false }) // if you update your db schemas, make sure you drop the tables first and then recreate them
  // by adding '{force: true}' inside of db.sync()
  .then(() => {
    console.log('db synced');
    app.listen(port, () => {
      console.log('Knock, knock');
      console.log("Who's there?");
      console.log(`Your server, listening on port ${port}`);
    });
  });
