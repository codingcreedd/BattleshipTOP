class Ship{
    constructor(length){
        this.length = length;
        this.hitCount = 0;
        this.sunk = false;
    }

    hit(){
        this.hitCount++;
    }

    isSunk(){
        return this.length === this.hitCount;
    }

    

}

module.exports = Ship;