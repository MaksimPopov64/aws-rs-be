import 'source-map-support/register';
import { getProductRow } from './pg-client';

export const productById = async (event, _context) => {
  console.log('createProduct', JSON.stringify(event.body));

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: '',
  };

  const { id } = event.pathParameters;

  try {
    const item = await getProductRow(id);
    const product = item[0];
    response.body = JSON.stringify(product, null, 2);
    console.log(id, item[0]);
  } catch (err) {
    response.statusCode = 500;
    response.body = JSON.stringify(err, null, 2);
  }

  return response;
};
