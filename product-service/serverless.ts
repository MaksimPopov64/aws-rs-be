import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service:'product-service',
  frameworkVersion: '3',
  custom: {
    documentation: {
    version: '1',
    title: 'My API',
    description: 'This is my API',
    models: {}},
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-auto-swagger', 'serverless-webpack', 'serverless-offline', 'serverless-openapi-documentation-v2'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    products: {
      handler: 'products.getProducts',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true,
          },
        }
      ]
    },
    productById: {
      handler: 'getProductById.productById',
      events: [
        {
          http: {
            method: 'get',
            path: 'product/{id}',
            cors: true,
            }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
