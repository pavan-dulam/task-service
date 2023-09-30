const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const log4js = require('log4js');
const path = require('path');
const http = require('http');
const cors = require('cors');

const logger = log4js.getLogger(`${path.basename(__filename).split('.')[0]}`);
dotenv.config({ path: './.env' });

const APIRouter = require('./routes/router');

const BACKEND_API_PORT = process.env.BACKEND_API_PORT;

logger.info('Initiating server');

const app = express();
const Router = express.Router();

// Declaring Access Control
app.use(cors());
app.use(Router);
app.use('/', Router);
app.use('/', APIRouter);

Router.use(express.urlencoded({ extended: false }));
Router.use(express.json());

const server = http.createServer(app);

server.listen(BACKEND_API_PORT, () => {
  logger.info(`server listening on port: ${BACKEND_API_PORT}`);
  const SERVICE_LOG_LEVEL = process.env.SERVICE_LOG_LEVEL;

  log4js.configure({
    appenders: {
      file: {
        type: 'file',
        filename: `logs/${path.basename(__filename).split('.')[0]}.log`,
      },
      console: { type: 'console' },
    },
    categories: {
      default: { appenders: ['file', 'console'], level: SERVICE_LOG_LEVEL },
    },
  });
});

// global error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  const response = {
    message: err?.data?.message || 'Internal server error',
    status: err.status || 500,
  };
  if (response.status === 500) logger.error(err);
  res.send(response);
});
