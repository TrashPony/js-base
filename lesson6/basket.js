let allPrice = 0;

function AddItemToBasket(event, price) {
    let clone = event.target.cloneNode(true);

    clone.onclick = function () {
        RemoveItemFromBasket(clone, price)
    };

    allPrice += price;
    document.getElementById("allPrice").innerHTML = "Общая стоимость товаров: " + allPrice;
    document.getElementById("basketPool").appendChild(clone)
}

function RemoveItemFromBasket(clone, price) {
    allPrice -= price;
    document.getElementById("allPrice").innerHTML = "Общая стоимость товаров: " + allPrice;
    clone.remove();
}