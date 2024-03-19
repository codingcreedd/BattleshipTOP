import Gameboard from "../src/Gameboard";
import Player from "../src/Player";
import Ship from "../src/Ship";

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

    copyShipsToPlayerBoard(setterBoard){ //setter board is the temp board where you place your ships
        const playerBoard = document.querySelector('.player-board');
        let setterBoardChildren = document.querySelector(`${setterBoard}`).children;
        let playerBoardChildren = playerBoard.children;
        for(let i = 0; i < 100; i++)
        {
            if(setterBoardChildren[i].style.backgroundColor === 'lightgray')
                playerBoardChildren[i].style.backgroundColor = 'lightgray';
        }
    }

    
    renderComputerShips(computerBoard){

    }

}