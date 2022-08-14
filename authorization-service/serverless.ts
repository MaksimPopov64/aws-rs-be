import type { Serverless } from 'serverless/aws';
import { config } from '../config';

const serverlessConfiguration: Serverless = {
  service: 'authorization-service',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },

  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: config.region,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    'basic-authorizer': {
      handler: 'handler.basicAuthorizer',
    }
  }
}

module.exports = serverlessConfiguration;
