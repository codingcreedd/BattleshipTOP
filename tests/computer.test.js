import Player from "../src/Player";
import Ship from "../src/Ship";
import Gameboard from "../src/Gameboard";

describe('Computer', () => {
    it('should place ships on its grid correctly', () => {
        const ship = new Ship(3);
        const computerBoard = new Gameboard();
        const computer = new Player();

        computer.computerPlaceShips(computerBoard, )

    })
})