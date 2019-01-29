/*

**************GOALKEEPER****************

  -------------------------------------
  |  topleft   |  top   |  topright   |
  --------------------------
  |    left    | center |   right     |
  --------------------------
  | bottomleft | bottom | bottomright |
  --------------------------------------
*/

const sectors = [
    'topleft',
    'top',
    'topright',
    'left',
    'center',
    'right',
    'bottomleft',
    'bottom',
    'bottomright',
];

let gameLog = [];

const goalKeeper = {
    defendSector: null,
    savesToWin: 2,
    saves: 0,
    init() {
        console.log('HERE');
        const sectorNum = Math.trunc(Math.random() * 9);
        this.defendSector = sectors[sectorNum];
        console.log(this.defendSector);
    },
    checkWin() {
        if (this.saves === this.savesToWin) {
            console.log('Goalkeeper wins!!!');
            return true;
        }
        console.log('Goalkeeper need ' + (this.savesToWin - this.saves) + ' more saves');
        return false;
    },
};


/* eslint no-param-reassign: 0 */
const attacker = {
    sectorToAttack: null,
    goals: 0,
    goalsToWin: 10,
    init(sector) {
        if (sectors.indexOf(sector) >= 0) {
            this.sectorToAttack = sector;
            return true;
        }
        return false;
    },
    attack(keeper) {
        console.log(keeper.defendSector, this.sectorToAttack);
        if (keeper.defendSector === this.sectorToAttack) {
            console.log('SAVE!!!');
            keeper.saves++;
            return false;
        }
        console.log('GOAL!!!');
        this.goals++;
        return true;
    },
    checkWin() {
        if (this.goals === this.goalsToWin) {
            console.log('Attacker wins!!!');
            return true;
        }
        console.log('Attacker need ' + (this.goalsToWin - this.goals) + ' more goals');
        return false;
    },
};

function Game() {
    let currentAttackSector = document.getElementById('job_2_a').value;
    if (attacker.init(currentAttackSector)) {

        let event = '';
        !goalKeeper.init();

        if (attacker.attack(goalKeeper)) {
            document.getElementById('attacker').innerHTML = attacker.goals;
            event = 'GOAL!!!'
        } else {
            document.getElementById('goalKeeper').innerHTML = goalKeeper.saves;
            event = 'SAVE!!!'
        }

        if (goalKeeper.checkWin()) {
            document.getElementById('goalKeeper').innerHTML = 'Win!';
            ResetGame()
        }

        if (attacker.checkWin()) {
            document.getElementById('attacker').innerHTML = 'Win!';
            ResetGame()
        }

        let logLine = {attack: currentAttackSector, defend: goalKeeper.defendSector, event: event};
        gameLog.push(logLine);
        addLog(gameLog.length - 1)
    } else {
        alert('неверный сектор')
    }
}

function addLog(line) {
    document.getElementById('log').innerHTML += line + ': Attacker attack ' + gameLog[line].attack +
        ' goalKeeper defend ' + gameLog[line].defend + ' and ' + gameLog[line].event + '<br>';
}

function filterLog() {

    let filter = document.getElementById('logFilter').value;
    document.getElementById('log').innerHTML = '';

    if (!isNaN(Number(filter)) && gameLog.length > filter && filter !== "") {
        addLog(Number(filter));
    } else {
        for (let i in gameLog) {
            addLog(i);
        }
    }
}

function ResetGame() {
    attacker.goals = 0;
    goalKeeper.saves = 0;
}