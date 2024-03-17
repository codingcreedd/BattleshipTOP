(function DOM(){

    const renderBoards = board => {
        const boardContainer = document.querySelector(`.${board}`);
        
        for (let i = 1; i <= 100; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            boardContainer.appendChild(cell);
        }
    }    

})();