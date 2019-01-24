function parseNumber(a) {

    if (a > 999) {
        console.log('number is big');
        return {}
    }

    let hundreds = Math.floor(a / 100);
    a -= hundreds * 100;

    let decades = Math.floor(a / 10);
    a -= decades * 10;

    return {units: a, decades: decades, hundreds: hundreds};
}

function job1() {
    let a = Number(document.getElementById("job_1_a").value);
    let objectNumber = parseNumber(a);

    for (let prop in objectNumber) {
        if (prop === "units") document.getElementById("units").innerHTML = "единицы: " + objectNumber[prop];
        if (prop === "decades") document.getElementById("decades").innerHTML = "десятки: " + objectNumber[prop];
        if (prop === "hundreds") document.getElementById("hundreds").innerHTML = "сотни: " + objectNumber[prop];
    }
}

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

let keeperWins = false;
let attackerWins = false;

function Game() {
    let currentAttackSector = document.getElementById("job_2_a").value;
    if (attacker.init(currentAttackSector)) {
        goalKeeper.init();
        attacker.attack(goalKeeper);

        keeperWins = goalKeeper.checkWin();
        attackerWins = attacker.checkWin();
    }
}

