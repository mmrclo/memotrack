import Board from "./board.js";
import Player from "./player.js";
import StorageManager from "./storageManager.js";
import formElement from "./inputTextField.js";

const MemoryGame = ((bord, playng) => {
    const BOARD = document.querySelector(".board");
    let playr = playng.newPlayer();

    const displayMenu = () => {
        BOARD.innerHTML =  `<div id="menu">
                                <h1 class="title">Memotrack</h1>
                                <ul>
                                    <li><a href="#" id="continueMenu" class="op">Continue</a></li>
                                    <li><a href="#" id="newGameMenu" class="op">New Game</a></li>
                                    <li><a href="#" id="showTopPlayersMenu" class="op">Top Players</a></li>
                                </ul>
                            </div>`;
    };

    const setMenuListeners = () => {
        const continueElMenu = document.getElementById("continueMenu");
        continueElMenu.addEventListener("click", MemoryGame.continue, false);
        const newGameElMenu = document.getElementById("newGameMenu");
        newGameElMenu.addEventListener("click", MemoryGame.newGame, false);
        const showTopPlaysElMenu = document.getElementById("showTopPlayersMenu");

        if(showTopPlaysElMenu) showTopPlaysElMenu.addEventListener("click", MemoryGame.showBestScores, false);
    };

    const waitforName = () => {
        BOARD.innerHTML = ` <div id="menu"> 
                                <h3 class="title">Name Player</h3>
                            </div>`
        BOARD.appendChild(formElement);

        const insertNameElMenu = document.getElementById("insertName-btn");
        insertNameElMenu.addEventListener("click", MemoryGame.saveName, false);
    };

    const getSpeed = () => {
        BOARD.innerHTML = ` <div id="menu">
                                <ul>
                                <li><label for="speed" class="title" >- Speed +</label></li>
                                <li><input type="range" class="speed" id="speed" name="speed" min="0" max="100"></li>
                                <li><button type="button" id="saveSpeed-btn">Ok</button></li>
                                </ul>
                            </div>`;

        const saveSpeedElMenu = document.getElementById("saveSpeed-btn");
        saveSpeedElMenu.addEventListener("click", MemoryGame.saveSpeed, false);
    };

    return {
        startMenu: () => {
            displayMenu();
            setMenuListeners();
        },

        newGame: () => {
            waitforName();
        },

        saveName: () => {
            let iname = document.getElementById("iname").value;
            playr.setName(iname);

            localStorage.setItem('lastWhoPlyd', playr.namePlayer );

            if(!localStorage[`${playr.namePlayer}`]) 
                localStorage[`${playr.namePlayer}`] = 1;

            BOARD.innerHTML = `<div class="container" id="grid"> </div>`;
            getSpeed();
        },

        saveSpeed: () => {
            let speed = document.getElementById("speed").value;
            speed = 100 - speed;
            playr.speed = speed;

            BOARD.innerHTML = `<div class="container" id="grid"> </div>`;

            MemoryGame.init();
        },

        continue: () => {
            let grabName = StorageManager.lastWhoPlyd();
            let playr = playng.newPlayer(grabName);

            if (localStorage.length > 0) {
                let topsa = StorageManager.getBestScoresFromStorage();
                StorageManager.newStorage(topsa);
            }
            BOARD.innerHTML = ` <div class="popup">
                                    <span class="popuptext" id="myPopup">${playr.namePlayer} continues . . . </span>
                                </div>`

            setTimeout( () => { BOARD.innerHTML = `<div class="container" id="grid"> </div>` },2000);
            setTimeout(MemoryGame.init,3000);
        },

        showBestScores: () => {
            let tops = [];
            let nOfPlayers, ulParent, liSon, somePlayer;
            
            if (localStorage.length > 0) {
                const optionsMenu = `<ul id="cfScores">                
                                <li><a href="#" id="continueMenu" class="op">Continue</a></li>
                                <li><a href="#" id="newGameMenu" class="op">New Game</a></li>
                            </ul>`
                let topsas = StorageManager.getBestScoresFromStorage();
                topsas.forEach((element) => { tops.push(JSON.parse(element)); });
                
                nOfPlayers = topsas.length - 1;
                
                StorageManager.bubbleSortStorage(tops);

                if (tops[0] != null) {
                    BOARD.innerHTML = `<h2 class="title">Top Plays</h2>
                                        <ul class="topscores">
                                        </ul>
                                        ${optionsMenu}`;
                    do {
                        ulParent = document.querySelector(".topscores");
                        liSon = document.createElement('li');
                        somePlayer = `bestOf @${tops[nOfPlayers].name}: ${tops[nOfPlayers].score}`;
                        liSon.innerText = somePlayer;
                        ulParent.appendChild(liSon);
                        nOfPlayers--;
                    } while (nOfPlayers >= 0);
                }
            } else {
                BOARD.innerHTML = `<h2 class="title">No top Plays</h2> ${optionsMenu}`;
            }
            setMenuListeners();
            bord.setReturnMenu();
        },

        init: () => {
            playr.saveScorelocal();
            bord.createBoard();
            let cells = bord.randomGen(10 * playr.level);
            bord.popNumbers(playr, cells);
            let forThisSeconds = playr.level * 3010 + playr.speed * 1;
            setTimeout(bord.hideNumbers, forThisSeconds, playr, cells);
            bord.setListeners(playr, cells, MemoryGame.init);
        }
    };

})(Board, Player);

export default MemoryGame;