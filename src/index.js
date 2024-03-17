class Ship{
    constructor(length){
        this.length = length;
        this.hitNumber = 0;
        this.sunk = false;
    }

    hit(){
        this.hitNumber++;
    }

    isSunk(){
        return this.length === this.hitNumber;
    }

    

}

class Gameboard{

    

    placeShips(){
        
    }
}