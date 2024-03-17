class Gameboard{
    constructor(){
        this.ships = [];
        this.grid = Array.from({ length: 10 }, () => Array(10).fill(null)); //10x10 Array
    }

    placeShip(ship, row, col, orientation){
        for(let i = 0, coordinate = 0; i < ship.length; i++){
            if(orientation === 'horizontal')
            {
                coordinate = col;

            }
            else if(orientation === 'vertical')
            {
                coordinate = row;
            }
        }
    }

}

module.exports = Gameboard;