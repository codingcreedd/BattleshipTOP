export default class Player{
    constructor(){
        this.computer_turn = false; 
    }

    #getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }
      

    #computerPickCoordinates(computerBoard){
        const row = 0, col = 0;
        for(let i = 1; i <= 5; i++){
            while(true){
                row = this.#getRandomNumber(0, 9);
                col = this.#getRandomNumber(0,9);
                if(computerBoard.grid[row][col] === null)
                    break;
            }
        }

        return {row, col};
    }

    computerPlaceShips(computerBoard, shipSize){
        const ship = new Ship(shipSize);
        const orientation = (this.#getRandomNumber(1, 2) === 1) ? 'horizontal' : 'vertical';

        const computerCoordinates = this.#computerPickCoordinates(computerBoard);
        const placedShip = null;
        
        while(true){
            placedShip = computerBoard.placeShip(ship, computerCoordinates.row, computerCoordinates.col, orientation, e, 'computer');
            if(placedShip === 'added')
                break;
        }
    }

}
