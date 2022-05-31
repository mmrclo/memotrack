const StorageManager = ( () => {
    return {
        getBestScoresFromStorage : () => {
            let tops = [], i = 0;

            let lastPlayerWas = localStorage.getItem('lastWhoPlyd');
            localStorage.removeItem('lastWhoPlyd');

            let localN = localStorage.length;

            do {
                let player = { name: String, score: Number };

                player.name = localStorage.key(localN - 1);
                player.score = localStorage.getItem(player.name);

                tops.push(JSON.stringify(player));

                localN--;
                i++;

            } while (localN > 0);

            localStorage.setItem('lastWhoPlyd', lastPlayerWas);

            return tops;
        },

        bubbleSortStorage : (arr = []) => {
            let swapped;
            do {
                swapped = false;
                for (let i = 0; i < arr.length - 1; i++) {
                    if (+arr[i].score > +arr[i + 1].score) {
                        let temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        swapped = true;
                    };
                };
            } while (swapped);
        },

        newStorage : (tops) => {
            let newTops = tops.map(x => JSON.parse(x));
            StorageManager.bubbleSortStorage(newTops);

            let lastPlayerWas = localStorage.getItem('lastWhoPlyd');
            localStorage.clear();

            let ntops = newTops.length;
            let i = 0;
            while (ntops > i) {
                localStorage.setItem(newTops[i].name, newTops[i].score);
                ntops--;
                i++;
            };

            localStorage.setItem('lastWhoPlyd', lastPlayerWas);
        },

        lastWhoPlyd: () => {
            if(localStorage.getItem('lastWhoPlyd')) return localStorage.getItem('lastWhoPlyd'); 
        },
    };
})();

export default StorageManager;