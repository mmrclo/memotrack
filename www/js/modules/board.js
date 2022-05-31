const backIcon = "&larr;";

const Board = ( () => {
    const resetBoard = () => {
        let e = document.querySelector(".container");
        e.innerHTML = "";
    };

    //Display number inside one box-cell on grid
    const aneX = (i, cells) => {
        var tempShow = document.getElementById(`box-${cells[i]}`);
        tempShow = tempShow.appendChild(document.createElement('p'));
        tempShow.innerText = i + 1;
    };

    const displayReturnToMenu = () => {
        let boardBody = document.querySelector(".board");
        let ancorMenu = document.createElement("a");
        ancorMenu.setAttribute("id", "backToMenu");
        ancorMenu.innerHTML = backIcon;	
        ancorMenu = boardBody.prepend(ancorMenu);
    };

    const setReturnToMenuListenner = () => {
        let ancorMenu = document.getElementById("backToMenu");
        ancorMenu.addEventListener("click", () => { location.reload() } , false);
    };

    return {
        createBoard: () => {
            let e = document.getElementById("backToMenu");
            if (e != null) { e.remove(); }
            displayReturnToMenu();

            const grid = document.querySelector(".container");

            for (let i = 1; i < 41; i++) {
                let box = document.createElement("div");
                grid.appendChild(box);
                box = box.setAttribute("id", `box-${i}`);
            }
        },

        randomGen: (n) => {
            let cells = [];
            for (let i = 0; i < n; i++) {
                let x = Math.floor(Math.random() * 39) + 1;
                if (!cells.includes(x)) {
                    cells.push(x);
                } else {
                    i--;
                }
            }
            return cells;
        },

        popNumbers: (obPlayer, cells) => {
            let i = 0;
            let intervaloop = setInterval(function () {
                aneX(i, cells);
                i++;
                if (i >= obPlayer.round)
                    clearInterval(intervaloop);

            }, 300 + obPlayer.speed * 1);
        },

        hideNumbers: (obPlayer, cells) => {
            let i = obPlayer.round - 1;
            do {
                let tempShow = document.getElementById(`box-${cells[i]}`);
                while (tempShow.firstChild) {
                    tempShow.removeChild(tempShow.firstChild);
                };
                i--;
            }
            while (i >= 0);
            //Allow user to return to menu by clicking '<-' on top right corner
            setReturnToMenuListenner();
        },

        setListeners: (obPlayer, cells, init) => {
            const reInit = () => {
                obPlayer.round = obPlayer.sum + 1;
                obPlayer.sum = 0;
                let gridEvnts = document.querySelector("#grid");
                gridEvnts.removeEventListener("click", handles, false);
                resetBoard();
                init();
            };

            const handles = (e) => {
                e = e.target;
                if (e === document.getElementById(`box-${cells[obPlayer.sum]}`)) {
                    if (!e.hasChildNodes()) {
                        aneX(obPlayer.sum, cells);
                        obPlayer.sum++;
                        if (obPlayer.sum > obPlayer.bestScore) {
                            obPlayer.bestScore = obPlayer.sum;
                        }
                        obPlayer.round--;
                        if (obPlayer.round == 0) {
                            if (obPlayer.sum >= (10 * obPlayer.level)) { obPlayer.level = obPlayer.level + 1; };
                            setTimeout(reInit, 1000);
                        }
                    }
                } else {
                    obPlayer.attempts++;
                    window.alert('try again! ');
                    setTimeout(reInit, 1000);
                }
            };
            let gridEvnts = document.querySelector("#grid");
            gridEvnts.addEventListener("click", handles, false);
        },

        setReturnMenu: () => {
            displayReturnToMenu();
            setReturnToMenuListenner(); 
        },
    };
})();

export default Board;