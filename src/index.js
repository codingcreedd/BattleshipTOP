import DOM from "./DOM";
import Gameboard from "./Gameboard";
import Ship from "./Ship";
import Player from "./Player";
import '../style.css';

const playerBoard = new Gameboard();
const computerBoard = new Gameboard();

const computer = new Player();
const shipSizeObj = {shipSize: 5, shipSizeCounter: 1};

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
        const warningMessage = document.getElementById('warning');
        if(warningMessage.style.display === 'block')
            warningMessage.style.display = 'none';
    
        const ship = new Ship(dom.currentShip);
        const coordinates = dom.calculateCoordinateOnClick(e, playerBoard, '.board-select-wrapper');
        if(playerBoard.ships.length < 5) {
            const shipPlaced = playerBoard.placeShip(ship, coordinates.row, coordinates.col, axis, 'player');
            if(shipPlaced === 'added') {
                if(dom.currentShip > 3)
                    dom.currentShip--;
                else if(dom.currentShip === 3 && shipSizeCounter < 2)
                    shipSizeCounter++;
                else if(dom.currentShip === 3 && shipSizeCounter >= 2)
                    dom.currentShip--;
    
                playerBoard.renderPlayerShips(ship, coordinates.row, coordinates.col, axis, 'player', e);
            }
        }
    });
});

document.querySelector('.start-button').addEventListener('click', () => {
    if(playerBoard.ships.length === 5){
        const setterBoardContainer = document.querySelector('.board-select-wrapper');
        setterBoardContainer.classList.add('hidden');
        dom.copyShipsToPlayerBoard('.setter-board');

        //Computer
        for(let i = 1; i <= 5; i++)
            computer.placeShipComputer(computerBoard, shipSizeObj);

        //computer.renderComputerShips(computerBoard);
        dom.startGame(computer, computerBoard, playerBoard);
    }
    else
    {
        const warningMessage = document.getElementById('warning');
        warningMessage.style.cssText = 'display: block; color: red; font-size: 1.1rem;';
    }
});


