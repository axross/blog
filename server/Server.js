import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import serveFavicon from 'serve-favicon';
import serveIndex from 'serve-index';
import serveStatic from 'serve-static';
import {
  createSessionRoute,
  createUserRoute,
} from './routes';

export const createServer = ({ config, sequelize, models }) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(serveStatic(path.resolve(__dirname, './public')));
  // app.use(serveFavicon(path.resolve(__dirname, './public/favicon.ico')));
  // app.use(serveIndex());
  app.use(bodyParser.json());
  // app.use((req, res, next) => {
  //   if (Object.prototype.toString.call(req.body) !== '[object Object]') {
  //     req.body = {};
  //   }
  //
  //   next();
  // });

  app.use('/api/session', createSessionRoute({ sequelize }));
  app.use('/api/user', createUserRoute({ sequelize, models }));

  app.use((err, req, res, next) => {
    console.log(res.locals);

    if (err) {
      console.error(err.stack);

      return res
        .status(500)
        .json({
          error: err.message,
          result: {},
        });
    }

    return res
      .json({
        error: null,
        result: res.locals.result || {},
      });
  });

  return app;
};
