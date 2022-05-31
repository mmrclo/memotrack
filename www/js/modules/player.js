const PLAYER_NAME = "PlayerOne"

const Player = (() => {
    let Gamer = function (namePlayer) {
        this.namePlayer = namePlayer ? namePlayer : PLAYER_NAME;
        this.round = 1;
        this.bestScore = 0;
        this.level = 1;
        this.sum = 0;
        this.speed = 0;

        Gamer.prototype.saveScorelocal = () => {
            let bestLocalScore = localStorage[`${this.namePlayer}`];
            if(this.bestScore > bestLocalScore) {
                localStorage[`${this.namePlayer}`] = this.bestScore + 1;
            }
        };

        Gamer.prototype.setName = (name) => {
            this.namePlayer = name;
        }
    };

    return {
        newPlayer: (playerName) => {
            let player = new Gamer(playerName);
            return player;
        },
    };

})();

export default Player;