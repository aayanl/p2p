'use strict';

var fs = require('fs'),
    path = require('path'),
    url = require('url');

var crew = require('crew');

var instance;

var getDockWorker = function (callback) {
  if (instance) {
    return process.nextTick(function () {
      callback(null, instance);
    });
  }

  crew({
    /* eslint-disable no-process-env */
    host: url.parse(process.env.DOCKER_HOST).hostname,
    port: url.parse(process.env.DOCKER_HOST).port,
    keys: {
      privateKey: fs.readFileSync(path.join(process.env.DOCKER_CERT_PATH, 'key.pem')),
      certificate: fs.readFileSync(path.join(process.env.DOCKER_CERT_PATH, 'cert.pem')),
      caCertificate: fs.readFileSync(path.join(process.env.DOCKER_CERT_PATH, 'ca.pem'))
    }
    /* eslint-enable no-process-env */
  }, function (errCrew, dockWorker) {
    if (errCrew) {
      return callback(errCrew);
    }

    dockWorker.ping(function (errPing) {
      if (errPing) {
        return callback(errPing);
      }

      dockWorker.buildImage({
        directory: path.join(__dirname, '..', '..', '..'),
        dockerfile: path.join(__dirname, '..', 'p2p-test', 'Dockerfile'),
        dockerignore: path.join(__dirname, '..', 'p2p-test', '_dockerignore'),
        name: 'thenativeweb/p2p-test'
      }, function (errBuildImage) {
        if (errBuildImage) {
          return callback(errBuildImage);
        }

        instance = dockWorker;
        return callback(null, instance);
      });
    });
  });
};

module.exports = getDockWorker;
