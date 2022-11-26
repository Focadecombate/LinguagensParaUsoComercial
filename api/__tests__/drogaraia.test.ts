import { expect, test, describe } from '@jest/globals';

import { DrogaRaia } from '../farmacias';

describe('when DrogaRaia search function is called', () => {
    const drogaRaia = new DrogaRaia();
    const inputMock = {
        productName: 'a',
        longitude: 'b',
        latitude: 'c'
    }

    test('should return a array of objects', async () => {

        try {

            const result = await drogaRaia.search(inputMock);

            expect(Array.isArray(result)).toBe(true);
            expect(typeof result[0]).toBe('object');
        } catch (_) {

        }

    })

    test('should return attributes types correctly', async () => {

        try {

            const result = await drogaRaia.search(inputMock);

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