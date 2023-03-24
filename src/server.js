/* eslint-disable import/no-extraneous-dependencies */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const PORT = 5000;
const HOST = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
