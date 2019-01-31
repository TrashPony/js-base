function myProcessor() {
    function showBig(event) {
        const element = event.target;
        const src = element.getAttribute('data-big-src');
        setImage(src)
    }

    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        element.addEventListener('click', showBig);
    }
}

function setImage(src) {
    if (checkImg(src)) {
        const bigElement = document.getElementById('bigPicture');
        bigElement.setAttribute('data-big-src', src);
        bigElement.innerHTML = '' +
            '<div id="arrowLeft" class="arrow" onclick="leftImage()"></div>' +
            '<img height="200" src="./' + src + '"/>' +
            '<div id="arrowRight" class="arrow" onclick="rightImage()"></div>';
    }
}

function rightImage() {
    let bigImage = document.getElementById("bigPicture").getAttribute('data-big-src');
    let images = document.getElementsByClassName('smallImg');

    for (let i = 0; i < images.length; i++) {
        let element = images[i];
        let src = element.getAttribute('data-big-src');

        if (src === bigImage) {
            if (i === images.length - 1) {
                setImage(images[0].getAttribute('data-big-src'))
            } else {
                setImage(images[i + 1].getAttribute('data-big-src'))
            }
        }
    }
}

function leftImage() {
    let bigImage = document.getElementById("bigPicture").getAttribute('data-big-src');
    let images = document.getElementsByClassName('smallImg');

    for (let i = 0; i < images.length; i++) {
        let element = images[i];
        let src = element.getAttribute('data-big-src');

        if (src === bigImage) {
            if (i === 0) {
                setImage(images[images.length - 1].getAttribute('data-big-src'))
            } else {
                setImage(images[i - 1].getAttribute('data-big-src'))
            }
        }
    }
}

function checkImg(url) {
    let img = new Image();
    img.src = url;
    return img.height !== 0;
}

function myClick() {
    console.log('click');
}

window.onload = myProcessor;