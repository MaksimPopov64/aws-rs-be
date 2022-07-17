import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as data from './productList.json';

export const getProducts: APIGatewayProxyHandler = async (event) => {
  console.log("getProducts", JSON.stringify(event.body));
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: '',
  };

  try {
    response.body = JSON.stringify(data, null, 2);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(error, null, 2);
  }

  return response;
};
