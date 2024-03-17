// ship.test.js

import Ship from "../src/Ship";

// Test suite for the Ship class
describe('Ship', () => {
    // Test case for Ship constructor
    describe('constructor', () => {
        it('should create a ship with the specified length', () => {
            const ship = new Ship(4);
            expect(ship.length).toBe(4);
        });

        it('should initialize hitCount to 0', () => {
            const ship = new Ship(3);
            expect(ship.hitCount).toBe(0);
        });

        it('should initialize sunk to false', () => {
            const ship = new Ship(2);
            expect(ship.sunk).toBe(false);
        });
    });

    // Test case for hit() method
    describe('hit()', () => {
        it('should increase hitCount by 1', () => {
            const ship = new Ship(3);
            ship.hit();
            expect(ship.hitCount).toBe(1);
        });
    });

    // Test case for isSunk() method
    describe('isSunk()', () => {
        it('should return false when hitCount is less than length', () => {
            const ship = new Ship(3);
            ship.hit();
            expect(ship.isSunk()).toBe(false);
        });

        it('should return true when hitCount equals length', () => {
            const ship = new Ship(2);
            ship.hit();
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        });
    });
});
