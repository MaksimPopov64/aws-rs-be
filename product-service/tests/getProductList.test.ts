import * as data from '../productList.json';
import { getProducts } from '../products';
import { promisifyed } from '../promisifyed';

jest.mock('../productList.json');


describe('Test getProductList', () => {
    beforeEach(() => {
      promisifyed();
    });

    it('Check return products', async () => {
      promisifyed();

        const result = await getProducts(null, null, null);
        expect(result).toEqual({
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data),
        });
    });
});
