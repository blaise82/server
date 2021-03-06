import express from 'express';
import bodyParser from 'body-parser';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}
app.get('/', (req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome to L.M.S - Your Library Managment System',
}));

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(req.i18n.__('NotFound'));
  err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;