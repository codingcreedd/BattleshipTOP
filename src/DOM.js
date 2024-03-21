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

    calculateCoordinateOnClick = (e, playerBoard, targetBoard) => {
        const cell = e.target;
        const board = document.querySelector(`${targetBoard}`);
    
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


    startGame(computer, computerBoard, playerBoard) //THIS IS THE MAIN FUNCTION THAT WILL LET THE PLAYER AND THE COMPUTER STRIKE EACH OTHER
    {

        //initial starting screen
        const startGameWrapper = document.getElementById('start-game-wrapper');
        startGameWrapper.style.display = 'flex';

        startGameWrapper.innerText = 'Game Started';
        setTimeout(() => {
            startGameWrapper.style.display = 'none';
        }, 1500);

        const computerGrid = document.querySelector('.computer-board');
        const gameFinishedDiv = document.querySelector('.game-finished');
        
        //PLAYER'S TURN
        document.querySelector('.computer-board').addEventListener('click', e => {
            if(!computer.computer_turn && !(e.target.style.backgroundColor === 'red' || e.target.style.backgroundColor === 'lightgray')){

                computerGrid.classList.remove('no-event');

                let coordinates = this.calculateCoordinateOnClick(e, computerBoard, '.computer-board');
                computerBoard.recieveAttack(coordinates.row, coordinates.col);
                console.log(computerBoard.sunkShips);
                computer.renderHitOnComputer(computerBoard, coordinates.row, coordinates.col);
                computer.computer_turn = true;

                if(computerBoard.shipsSunk()){
                    gameFinishedDiv.style.display = 'flex';
                    gameFinishedDiv.innerText = 'You win !';
                }

                if(computer.computer_turn){
                    //computerGrid.classList.add('no-event');
        
                    computer.attack(playerBoard);
                    computer.computer_turn = false;

                    if(playerBoard.shipsSunk()){
                        gameFinishedDiv.style.display = 'flex';
                        gameFinishedDiv.innerText = 'Computer wins !';
                    }
        
                }

                if(gameFinishedDiv.style.display === 'flex'){
                    setTimeout(() => {
                        gameFinishedDiv.style.display = 'none';
                        location.reload();
                    }, 2000);
                }

            }
        });

    }

}