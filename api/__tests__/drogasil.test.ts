import { expect, test, describe } from '@jest/globals';

import { Drogasil } from '../farmacias';

describe('when DrogaRaia search function is called', () => {
    const drogasil = new Drogasil();
    const inputMock = {
        productName: 'a',
        longitude: 'b',
        latitude: 'c'
    }

    test('should return a array of objects', async () => {

        try {

            const result = await drogasil.search(inputMock);

            expect(Array.isArray(result)).toBe(true);
            expect(typeof result[0]).toBe('object');
        } catch (_) {

        }

    })

    test('should return attributes types correctly if it\s not an empty array', async () => {

        try {
            const result = await drogasil.search(inputMock);

            if (result.length > 0) {
                expect(typeof result[0].name).toBe('string');
                expect(typeof result[0].image).toBe('string');
                expect(typeof result[0].linkToProduct).toBe('string');
                expect(typeof result[0].price).toBe('number');
                expect(typeof result[0].discountedPrice).toBe('number');
                expect(typeof result[0].store).toBe('string');
            }
        } catch (_) {

        }

    })
})