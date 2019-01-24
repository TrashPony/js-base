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