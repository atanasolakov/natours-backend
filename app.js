const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController')
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use((req,res,next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers)
  next();
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// app.all('*', (req, res,next) => {


//   // res.status(404).json({
//   //   status: 'fail',
//   //   message: `Cant find ${req.originalUrl} on the server`
//   // })

//   // const err = new Error(`Cant find ${req.originalUrl} on the server`);
//   // err.status = 'fail';
//   // err.statusCode = 404;

//   // next(err);

//    next(new AppError(`Cant find ${req.originalUrl} on the server`), 404);
// });

app.use(globalErrorHandler);

module.exports = app;
