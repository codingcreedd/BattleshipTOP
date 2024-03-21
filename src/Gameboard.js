import DOM from "./DOM";

export default class Gameboard{
    constructor(){
        this.ships = [];
        this.missedShots = []; //array of coordinates for missed shots
        this.grid = Array.from({ length: 10 }, () => Array(10).fill(null)); //10x10 Array
    }

    renderPlayerShips(ship, row, col, orientation, e)
    {
        let cell = e.target;
        let board = cell.parentNode;

        
        for(let i = 0; i < ship.length; i++){
            if(orientation === 'horizontal')
            {
                cell.style.backgroundColor = 'lightgray';
                cell = cell.nextElementSibling;
            }
            else
            {
                cell.style.backgroundColor = 'lightgray';
                cell = board.querySelector(`.cell:nth-child(${col + 1 + row * 10})`);
            }
        }
    }

    placeShip(ship, row, col, orientation, player = 'player'){

        if(player === 'player'){
            if((10 - col < ship.length && orientation === 'horizontal') || (10 - row < ship.length && orientation === 'vertical') || (row >= this.grid.length || col >= this.grid[0].length))
            {console.log('SHIP cant be here');return "Cant place this ship in these coordinates";}


            if(this.#coordinatesTaken(ship.length, row, col, orientation)){
                console.log('ship taken')
                return 'Place already taken';
            }
        }

        this.ships.push(ship);

        for(let i = 0; i < ship.length; i++){
            if(orientation === 'horizontal')
                this.grid[row][col++] = ship;
            else
                this.grid[row++][col] = ship;
        }

        return 'added';
    }

    #coordinatesTaken(shipSize,row, col, orientation) {
        for (let i = 0; i < shipSize; i++) {
          if (this.grid[row][col] !== null)
            return true;
        
          if (orientation === 'horizontal')
            col++;
          else
            row++;
        }
        
        return false;
        }

    revieveAttack(row, col){
        if(this.grid[row][col] === null)
        {
            this.missedShots.push({row: row, col: col});
        }
        else
        {
            this.grid[row][col].hit();
        }
    }

    shipsSunk(){
        
        for(let i = 0; i < this.ships.length; i++){
            if(!this.ships[i].isSunk())
                return false;
        }

        return true;
    }

}
