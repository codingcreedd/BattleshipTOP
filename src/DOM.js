import Gameboard from "../src/Gameboard";
import Player from "../src/Player";
import Ship from "../src/Ship";

import '../style.css';

export default class DOM{

    constructor(playerBoard, computerBoard){
        this.playerBoard = playerBoard;
        this.computerBoard = computerBoard;
        this.currentShip = 5;
    }

    renderBoards = board => {
        const boardContainer = document.querySelector(`.${board}`);
        
        for (let i = 1; i <= 100; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            boardContainer.appendChild(cell);
        }
    }    
    
    setShipBoard = () => {
        const setterBoardContainer = document.querySelector('.board-select-wrapper');
        setterBoardContainer.classList.remove('hidden');

        const setterBoard = setterBoardContainer.querySelector('.board');
        for(let i = 1; i <= 100; i++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            setterBoard.appendChild(cell);
        }

        const startGameButton = document.querySelector('.start-button');
        startGameButton.addEventListener('click', () => {
            setterBoardContainer.classList.add('hidden');
            copyShipsIntoMainBoard();
        });



    }

    calculateCoordinateOnClick = (e, playerBoard) => {
        const cell = e.target;
        const board = document.querySelector('.board-select-wrapper');
    
        // Calculate row and column based on the cell's index within the board
        const cells = Array.from(board.querySelectorAll('.cell'));
        const index = cells.indexOf(cell);
        const row = Math.floor(index / playerBoard.grid[0].length);
        const col = index % playerBoard.grid[0].length;
    
        return { row, col };
    }
    

}

const playerBoard = new Gameboard();
const computerBoard = new Gameboard();

const dom = new DOM(playerBoard, computerBoard);
dom.renderBoards('player-board');
dom.renderBoards('computer-board');
dom.setShipBoard();

let shipSizeCounter = 1;

document.querySelectorAll('.player-board .cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const ship = new Ship(dom.currentShip);
        const coordinates = dom.calculateCoordinateOnClick(e, playerBoard);
        const board = document.querySelector('.player-board')
        if(playerBoard.ships.length < 5)
        {
            const shipPlaced = playerBoard.placeShip(ship, coordinates.row, coordinates.col, 'horizontal', e, board);
        
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

