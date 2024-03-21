export default class Ship{

    constructor(length){
        this.length = length;
        this.hitCount = 0;
        this.sunk = false;
        this.orientation = null;
    }

    hit(){
        this.hitCount++;
        console.log(`hit count: ${this.hitCount}`);
        if(this.length === this.hitCount)this.sunk = true
    }

}
