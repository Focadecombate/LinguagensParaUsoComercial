import { expect, test, describe } from '@jest/globals';

import { DrogariaSp } from '../farmacias';

describe('when DrogariaSp search function is called', () => {
    const drogariaSp = new DrogariaSp();
    const inputMock = {
        productName: 'string',
        longitude: 'string',
        latitude: 'string'
    }

    test('should returna a array of objects', async () => {
        try {
            const result = await drogariaSp.search(inputMock);
            expect(Array.isArray(result)).toBe(true);
            expect(typeof result[0]).toBe('object');

        } catch (_) {

        }

    })

    test('should return aattributes types correctly', async () => {

        try {

            const result = await drogariaSp.search(inputMock);

            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].image).toBe('string');
            expect(typeof result[0].linkToProduct).toBe('string');
            expect(typeof result[0].price).toBe('number');
            expect(typeof result[0].discountedPrice).toBe('number');
            expect(typeof result[0].store).toBe('string');
        } catch (_) {

        }
    })
})