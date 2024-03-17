class Gameboard{
    constructor(){
        this.ships = [];
        this.missedShots = []; //array of coordinates for missed shots
        this.grid = Array.from({ length: 10 }, () => Array(10).fill(null)); //10x10 Array
    }



    placeShip(ship, row, col, orientation){


        if((10 - col < ship.length && orientation === 'horizontal') || (10 - row < ship.length && orientation === 'vertical') || (row >= this.grid.length || col >= this.grid[0].length))
            return "Cant place this ship in these coordinates";


        if(this.#coordinatesTaken(ship.length, row, col, orientation)){
                return 'Place already taken'
        }

        this.ships.push(ship);
        
        for(let i = 0; i < ship.length; i++){
            if(orientation === 'horizontal')
            {
                this.grid[row][col++] = ship;
            }
            else
            {
                this.grid[row++][col] = ship;
            }
        }
    }

    #coordinatesTaken(shipSize,row, col, orientation = 'horizontal'){
        for(let i = 1; i <= shipSize; i++){
            if(this.grid[row][col] !== null)
                return true;


            (orientation === 'horizontal') ? col++ : row++;
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

module.exports = Gameboard;