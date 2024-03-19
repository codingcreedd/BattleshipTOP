import DOM from "./DOM";
import Gameboard from "./Gameboard";
import Ship from "./Ship";
import Player from "./Player";
import '../style.css';

const playerBoard = new Gameboard();
const computerBoard = new Gameboard();

const dom = new DOM(playerBoard, computerBoard);
dom.renderBoards('player-board');
dom.renderBoards('computer-board');
dom.setShipBoard();

let shipSizeCounter = 1;

let axis = 'horizontal';
const rotateButton = document.querySelector('.rotate-axis');


//EVENT LISTENERS

rotateButton.addEventListener('click', () => {
    console.log(axis)
    if(axis === 'horizontal')
        axis = 'vertical';
    else
        axis = 'horizontal';
})

document.querySelectorAll('.setter-board .cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const ship = new Ship(dom.currentShip);
        const coordinates = dom.calculateCoordinateOnClick(e, playerBoard);
        const board = document.querySelector('.player-board')
        if(playerBoard.ships.length < 5)
        {
        
            const shipPlaced = playerBoard.placeShip(ship, coordinates.row, coordinates.col, axis, e, 'player');
        
            if(shipPlaced === 'added')
            {
                if(dom.currentShip > 3)
                    dom.currentShip--;
                else if(dom.currentShip === 3 && shipSizeCounter < 2)
                    shipSizeCounter++;
                else if(dom.currentShip === 3 && shipSizeCounter >= 2)
                    dom.currentShip--;
                
            }
        }
        
    });
});

document.querySelector('.start-button').addEventListener('click', () => {
    dom.copyShipsToPlayerBoard('.setter-board');
    dom.renderComputerShips(computerBoard);
    dom.startGame();
});

