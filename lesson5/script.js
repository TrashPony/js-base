window.onload = function () {
    InitGrid();
};

function InitGrid() {
    let root = document.getElementById("root");

    let headRowSymbol = 'A,B,C,D,E,F,G,H'.split(',');
    let headRow = document.createElement("div");
    headRow.className = "rowGrid";
    headRow.innerHTML = "<div class='cellGridNumberRow' style='height: 20px'></div>";
    for (let i = 0; i < headRowSymbol.length; i++) {
        let cell = document.createElement("div");
        cell.className = "cellGridSymbolRow";
        cell.innerHTML = headRowSymbol[i];
        headRow.appendChild(cell);
    }
    root.appendChild(headRow);

    for (let i = 0; i < 8; i++) {
        let row = document.createElement("div");
        row.className = "rowGrid";

        let cell = document.createElement("div");
        cell.className = "cellGridNumberRow";
        cell.innerHTML = i + 1;
        row.appendChild(cell);

        for (let j = 0; j < 8; j++) {
            let cell = document.createElement("div");
            cell.className = "cellGrid";

            // пешки
            if (i === 1) {
                cell.className += " blackPawn"
            }

            if (i === 6) {
                cell.className += " whitePawn"
            }

            // ферзи
            if (i === 0 && j === 0 || i === 0 && j === 7) {
                cell.className += " blackRook"
            }

            if (i === 7 && j === 0 || i === 7 && j === 7) {
                cell.className += " whiteRook"
            }

            // кони
            if (i === 0 && j === 1 || i === 0 && j === 6) {
                cell.className += " blackHorse"
            }

            if (i === 7 && j === 1 || i === 7 && j === 6) {
                cell.className += " whiteHorse"
            }

            // офицеры
            if (i === 0 && j === 2 || i === 0 && j === 5) {
                cell.className += " blackOfficer"
            }

            if (i === 7 && j === 2 || i === 7 && j === 5) {
                cell.className += " whiteOfficer"
            }

            // королевы
            if (i === 0 && j === 3) {
                cell.className += " blackQueen"
            }

            if (i === 7 && j === 3) {
                cell.className += " whiteQueen"
            }

            // короли
            if (i === 0 && j === 4) {
                cell.className += " blackKing"
            }

            if (i === 7 && j === 4) {
                cell.className += " whiteKing"
            }

            if (j % 2 === 1 && i % 2 === 0) {
                cell.style.backgroundColor = "#1b99a7"
            } else if (j % 2 === 0 && i % 2 === 1) {
                cell.style.backgroundColor = "#1b99a7"
            } else {
                cell.style.backgroundColor = "#dad5d5"
            }

            row.appendChild(cell);
        }
        root.appendChild(row)
    }
}