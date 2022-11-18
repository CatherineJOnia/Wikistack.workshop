//REQUIRE AND INITIAL SETUP
const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require('./models');
const PORT = 1337;
// const routes = require('./routes');
// const wikiRouter = require('./routes/wiki');
// const userRouter = require('./routes/users');
const layout = require('./views/layout')

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
// app.use(routes);
// app.use('/wiki', wikiRouter);
// app.use('/user', userRouter);

//FIRST GET
app.get("/", (req, res, next) => {
  res.send(layout(' '));
  next();
});

// ASYNC AWAIT FUNCTION
const init = async () => {
  try {
    await db.sync({ force: true });
    await Page.sync();
    await User.sync();
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  } catch(err) {
    console.error(err)
  }
}

init();

//VERIFY CONNECTION IS WORKING
db.authenticate()
  .then(() => {
    console.log('connected to the database');
});
