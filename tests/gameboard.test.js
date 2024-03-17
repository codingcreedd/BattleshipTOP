import Gameboard from '../src/Gameboard';
import Ship from '../src/Ship';

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

    describe('placeShip', () => {
        it('should have the right coordinates', () => {
            const ship = new Ship(5);
            const gameboard = new Gameboard();
            expect(gameboard.placeShip(ship, 0, 6, 'horizontal')).toBe('Cant place this ship in these coordinates');
        });

        it('should have the right coordinates vertically', () => {
            const ship = new Ship(5);
            const gameboard = new Gameboard();
            expect(gameboard.placeShip(ship, 0, 6, 'horizontal')).toBe('Cant place this ship in these coordinates');
        });

        it('should add the ship into length amount of places', () => {
            const ship = new Ship(3);
            const gameboard = new Gameboard();
            gameboard.placeShip(ship, 0,4, 'horizontal');
            expect(gameboard.grid[0][4] && gameboard.grid[0][5] && gameboard.grid[0][6]).toBe(ship);
        });

        it('should be added only if the coordinates are empty', () => {
            const ship = new Ship(3);
            const gameboard = new Gameboard();
            gameboard.placeShip(ship, 0,4, 'horizontal');
            expect(gameboard.grid[0][4] && gameboard.grid[0][5] && gameboard.grid[0][6]).toBe(ship);

            const ship2 = new Ship(3);
            expect(gameboard.placeShip(ship2, 0,6, 'horizontal')).toBe('Place already taken');
        });

        it('should not have row or cols greater than their length', () => {
            const gameboard = new Gameboard();
            const ship = new Ship(4);
            expect(gameboard.placeShip(ship, 0,10,'vertical')).toBe('Cant place this ship in these coordinates');
        })
        
    });

    describe('recieveAttack', () => {
        it('should return the right ship that got hit', () => {
            const ship = new Ship(3);
            const ship2 = new Ship(3);
            const gameboard = new Gameboard();

            gameboard.placeShip(ship, 0, 3, 'horizontal');
            gameboard.revieveAttack(0,3);
            expect(ship.hitCount).toBe(1);
        });

        it('should record missed shots', () => {
            const ship = new Ship(3);
            const gameboard = new Gameboard(2);
            gameboard.placeShip(ship, 0,1,'vertical');

            gameboard.revieveAttack(2,1);
            expect(ship.hitCount).toBe(1);

            gameboard.revieveAttack(5,4);
            expect(gameboard.missedShots[0]).toEqual({row: 5, col: 4});
        
        });

    });

    describe('All ships are sunk', () => {
        it('should return if all ships are sunk or not', () => {
            const gameboard = new Gameboard();
            const ship = new Ship(2);
            const ship2 = new Ship(3);
            
            gameboard.placeShip(ship, 0,1, 'horizontal');
            gameboard.placeShip(ship2, 4,5, 'vertical');
            gameboard.revieveAttack(0,1);
            gameboard.revieveAttack(0,2);
            expect(ship.hitCount).toBe(2);
            expect(gameboard.shipsSunk()).toBe(false);
            
        });
    });

});