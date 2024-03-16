function createGameboard() {
    const blocks = 10;

    function renderInitialBoards(board) {
        const boardContainer = document.querySelector(`.${board}`);
        
        for (let i = 1; i <= 100; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            boardContainer.appendChild(cell);
        }
    }

    return {
        renderInitialBoards
    };
}

function Ship(){

    function setShipPositionsOnBoard(){
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

    return{
        setShipPositionsOnBoard
    }
}

const gameboard = createGameboard();
gameboard.renderInitialBoards('player-board');
gameboard.renderInitialBoards('computer-board');

const ship = Ship();
ship.setShipPositionsOnBoard();
