import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service:  'import-service',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: `\$\{cf:product-service-dev.SQSUrl\}`,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: 'arn:aws:s3:::import-bucket-rs'
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: 'arn:aws:s3:::import-bucket-rs/*'
      },
      {
        Effect: 'Allow',
        Action: ['sqs:SendMessage'],
        Resource: [`\$\{cf:product-service-dev.SQSArn\}`],
      },
    ]
  },
  functions: {
    importProductsFile :{
      handler: 'importProductsFile.importProductsFile',
      events: [
        {
          http: {
            method: 'get',
            path: 'import',
            request: {
              parameters: { querystrings: { name: true } },
            },
            cors: {
              origins: '*',
              headers: ['Authorization']
            },
          },
        },
      ],
    }
  }
}

module.exports = serverlessConfiguration;
