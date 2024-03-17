const Gameboard = require('../src/Gameboard');

describe('Gameboard', () => {
    describe('constructor', () => {
        it('should create an empty array of ships', () => {
            const gameboard = new Gameboard();
            expect(gameboard.ships.length).toBe(0);
        });

        it('should create a 2D Grid of 10 rows and 10 columns', () => {
            const gameboard = new Gameboard();
            expect(gameboard.grid.length).toBe(10);
            expect(gameboard.grid[0].length).toBe(10);
        });
    });
})