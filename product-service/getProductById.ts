import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as data from './productList.json';

export const productById: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters;
  const item = data.find((item: any) => item.id === id );
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: '',
  };
  try {
    response.body = JSON.stringify(item, null, 2);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(error, null, 2);
  }

  return response;
}
