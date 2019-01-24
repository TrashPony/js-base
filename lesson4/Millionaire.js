const questions = [
    {
        question: 'Что имел ввиду идущий на гильотину французский политик Верньо, когда сказал, что она «подобно Сатурну пожирает собственных детей»?',
        rightAnswer: 4,
        answers: ['свободу', 'веру', 'войну', 'революцию']
    },
    {
        question: 'Сегодня эти московские пруды называются Чистыми. Раньше же в них сливали отходы с окрестных скотобоен и они носили совсем другое имя. Какое?',
        rightAnswer: 1,
        answers: ['Поганые', 'Черные', 'Мясные', 'Красные']
    },
    {
        question: 'Как называется жилище эскимосов, построенное из блоков смерзшегося снега?',
        rightAnswer: 4,
        answers: ['типии', 'вигвам', 'юрта', 'иглу']
    },
    {
        question: 'Какое животное древние египтяне учили прислуживать себе за столом?',
        rightAnswer: 4,
        answers: ['шакала', 'кошку', 'попугая', 'бабуина']
    },
    {
        question: 'Согласно мифологии африканского племени бушменов человек произошел от…',
        rightAnswer: 1,
        answers: ['обезьяны', 'пришельцев со звезд', 'грибов', 'электрического разряда']
    }
];


let player = {
    prize: 0,
    inGame: false,
    currentQuestion: {}
};

function Answer() {
    if (!player.inGame) {
        document.getElementById("AnswerInput").value = "Ответить";
        player.inGame = true;
        fillQuestion();
    } else {
        let answer = document.getElementById("job_3_a").value;

        if (answer === "a" && player.currentQuestion.rightAnswer === 1) {
            rightQuestion()
        } else if (answer === "b" && player.currentQuestion.rightAnswer === 2) {
            rightQuestion()
        } else if (answer === "c" && player.currentQuestion.rightAnswer === 3) {
            rightQuestion()
        } else if (answer === "d" && player.currentQuestion.rightAnswer === 4) {
            rightQuestion();
        } else if (answer === "a" || answer === "b" || answer === "c" || answer === "b") {
            alert("Ответ не верный, выйгрышная сумма сгорает!");
            player.prize = 0;
            document.getElementById("question").innerHTML = "";
            document.getElementById("answers").innerHTML = "";
            document.getElementById("prize").innerHTML = "";
            document.getElementById("AnswerInput").value = "Начать игру";
            document.getElementById("job_3_a").value = '';
            player.inGame = false;
            return
        } else {
            alert("Неправильно введен ответ!");
        }
    }

    document.getElementById("job_3_a").value = '';
    document.getElementById("prize").innerHTML = "Сумма выйгрыша: " + player.prize;
}

function rightQuestion() {
    alert("Ответ верный!");
    if (player.prize === 0) {
        player.prize = 100;
    } else {
        player.prize *= 2;
    }
    fillQuestion();
}

function fillQuestion() {
    let question = questions[Math.round(Math.random() * (questions.length - 1))];
    document.getElementById("question").innerHTML = question.question;

    document.getElementById("answers").innerHTML = "";
    for (let i = 0; i < question.answers.length; i++) {
        if (i === 0) {
            document.getElementById("answers").innerHTML += " A: " + question.answers[i]
        }
        if (i === 1) {
            document.getElementById("answers").innerHTML += " B: " + question.answers[i]
        }
        if (i === 2) {
            document.getElementById("answers").innerHTML += " C: " + question.answers[i]
        }
        if (i === 3) {
            document.getElementById("answers").innerHTML += " D: " + question.answers[i]
        }
    }
    player.currentQuestion = question;
}