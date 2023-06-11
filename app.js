const express = require("express");
const session = require("express-session");
const store = new session.MemoryStore();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//session should be set up before passport
app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
    store,
  })
);

//passport
const passport = require('passport')
const passportConfig = require('./passport/passportConfig');
passportConfig(passport);
app.use(passport.initialize())
app.use(passport.session())

//routers
const userRouter = require('./routes/userRouter')
const captionRouter = require('./routes/captionRouter')
app.use('/', userRouter);
app.use('/caption', captionRouter);



app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

