import Ship from "./Ship";
import Gameboard from "./Gameboard";

export default class Player {
    constructor(){
        this.computer_turn = false; 
        this.current_hit = false;
    }

    #getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
      
    #checkValidationVH(orientation, ship, row, col) //checks if a row and col is valid for 10 rows and 10 columns vertically (V) and horizontally (H)
    {
        return ((10 - col < ship.length && orientation === 'horizontal') || (10 - row < ship.length && orientation === 'vertical'));
    }

    #checkValidationOutOfBounds(board, row, col)
    {
        return row >= board.grid.length || col >= board.grid[0].length;
    }

    #checkEmptyPlaces(board, row, col, orientation, ship) //the places from row - col to ship.length row or col must be empty for a ship to be placed
    {
        if(orientation === 'horizontal')
        {
            for(let i = 1; i <= ship.length; i++){
                if(board.grid[row][col++] !== null)
                    return false;
            }

            return true;
        }
        else
        {
            for(let i = 1; i <= ship.length; i++){
                if(board.grid[row++][col] !== null)
                    return false;
            }

            return true;
        }
    }

    #computerPickCoordinates(computerBoard, orientation, ship){
        let row = 0, col = 0;
        while(true){
            row = this.#getRandomNumber(0,9);
            col = this.#getRandomNumber(0,9);

            if(!this.#checkValidationVH(orientation, ship, row, col) && !this.#checkValidationOutOfBounds(computerBoard, row, col)
            && this.#checkEmptyPlaces(computerBoard, row, col, orientation, ship))
            {
                break;
            }

        }

        return {row: row, col: col};
    }
    

    placeShipComputer(computerBoard, shipSizeObj) {
        const ship = new Ship(shipSizeObj.shipSize);

        //Pick orientation
        let orientation;
        (this.#getRandomNumber(1,2) === 1) ? orientation = 'horizontal' : orientation = 'vertical'; 
        
        //PICK RIGHT COORDINATES
        let coordinates = this.#computerPickCoordinates(computerBoard, orientation, ship); //will hold an object of coordinates

        //PLACE SHIP ON COMPUTER BOARD AFTER RIGHT COORDINATES WERE PICKED
        let shipPlaced = computerBoard.placeShip(ship, coordinates.row, coordinates.col, orientation, null, 'computer');

        //Decrement shipsizeobj.shipSize
        if(shipPlaced === 'added')
        {
            if(shipSizeObj.shipSize > 3)
                shipSizeObj.shipSize--;
            else if(shipSizeObj.shipSize === 3 && shipSizeObj.shipSizeCounter < 2)
                shipSizeObj.shipSizeCounter++;
            else if(shipSizeObj.shipSize === 3 && shipSizeObj.shipSizeCounter >= 2)
                shipSizeObj.shipSize--;
            
        }
        
    }

    renderHitOnComputer(computerBoard, row, col)
    {
        const computerGridCells = document.querySelector('.computer-board').children;
        if(computerBoard.grid[row][col] !== null)
            computerGridCells[(10 * row) + col].style.backgroundColor = 'red';
        else
            computerGridCells[(10 * row) + col].style.backgroundColor = 'lightgray';
    }

    attack(playerBoard)
    {
        const row = this.#getRandomNumber(0,9);
        const col = this.#getRandomNumber(0,9);

        playerBoard.recieveAttack(row, col);

        const playerGridCells = document.querySelector('.player-board').children;
        if(playerBoard.grid[row][col] !== null){
            playerGridCells[(10 * row) + col].style.backgroundColor = 'red';
            this.current_hit = true;
        }
        else{
            playerGridCells[(10 * row) + col].style.backgroundColor = 'blue';
            this.current_hit = false;
        }
        

    }

}
