function Job1() {
    let i = 1;
    let result = '';

    while (i < 100) {
        let find = false;

        for (let j = 2; j < i; j++) {
            if (i % j === 0) find = true;
        }

        if (!find && i !== 1) {
            result += i + ", "
        }
        i++
    }

    document.getElementById("job_1_res").innerHTML = result
}

function Job2() {
    let i = 0;
    let result = ' ';

    do {
        result += i;

        if (i === 0) {
            result += ' - это ноль'
        } else if (i % 2 === 1) {
            result += ' - нечетное число'
        } else if (i % 2 === 0) {
            result += ' - четное число'
        }

        result += '<br>';
        i++
    } while (i < 10);

    document.getElementById("job_2_res").innerHTML = result
}

function Job3() {
    for (let i = 0; i < 10; document.getElementById("job_3_res").innerHTML += i++) {
    }
}

function Job4() {
    document.getElementById("job_4_res").innerHTML = '';
    for (let i = 1; i <= 20; i++) {
        let result = '';
        for (let j = 0; j < i; j++) {
            result += 'x'
        }
        console.log(result);
        result += '<br>';
        document.getElementById("job_4_res").innerHTML += result
    }
}