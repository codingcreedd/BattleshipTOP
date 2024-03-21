import Ship from "./Ship";
import Gameboard from "./Gameboard";

export default class Player {
    constructor(){
        this.computer_turn = false; 
    }

    #getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
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
        
        //PICK RIGHT COORDINATES
        const coordinates = this.#computerPickCoordinates(computerBoard, ship); //will hold an object of coordinates

        //PLACE SHIP ON COMPUTER BOARD AFTER RIGHT COORDINATES WERE PICKED

        //Decrement shipsizeobj.shipSize


    }

}
