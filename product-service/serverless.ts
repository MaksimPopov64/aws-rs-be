import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: 'product-service',
  frameworkVersion: '3',
  custom: {
    documentation: {
      version: '1',
      title: 'My API',
      description: 'This is my API',
      models: {}
    },
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
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      PG_HOST: 'lesson-4-instance.cgsfeqwrordx.us-east-1.rds.amazonaws.com',
      PG_PORT: '5432',
      PG_DATABASE: 'lesson4',
      PG_USERNAME: 'postgres',
      PG_PASSWORD: 'v864vu0szQLzIgrbQqYH',
    }
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue',
          ReceiveMessageWaitTimeSeconds: 20,
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic',
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'maximsc1285@gmail.com',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
        }
      }
    },
    Outputs: {
      SQSUrl: {
        Value: { Ref: 'SQSQueue' }
      },
      SQSArn: {
        Value: { 'Fn::GetAtt': ['SQSQueue', 'Arn'] },
      },
    }
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
    },
    createProduct: {
      handler: 'products.createProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true,
          },
        }]
    },
    catalogBatchProcess: {
      handler: 'catalogBatchProcess.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: { 'Fn::GetAtt': ['SQSQueue', 'Arn'] },
            enabled: true,
          },
        },
      ],
    },
  },
}

module.exports = serverlessConfiguration;
