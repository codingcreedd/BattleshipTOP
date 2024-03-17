import Gameboard from "../src/Gameboard";
import Player from "../src/Player";
import Ship from "../src/Ship";

import '../style.css';

class DOM{
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

    shipPlacementHandler = () => {
        
    }

}

const dom = new DOM();
dom.renderBoards('player-board');
dom.renderBoards('computer-board');
dom.setShipBoard();

document.querySelectorAll('.player-board .cell').forEach(cell => {
    cell.addEventListener('click', shipPlacementHandler);
});

