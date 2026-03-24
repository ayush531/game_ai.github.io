let score = 0;
let level = 1;
let time = 30;
let timer;
let username = "";

function startGame() {
    username = document.getElementById("username").value;
    generateQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = "Time: " + time;

        let percent = (time / 30) * 100;
        document.getElementById("progress-bar").style.width = percent + "%";

        if (time <= 0) {
            clearInterval(timer);
            saveScore();
            alert("Game Over!");
        }
    }, 1000);
}

function generateQuestion() {
    let num1 = Math.ceil(Math.random() * level);
    let den1 = Math.ceil(Math.random() * level) + 1;

    let num2 = Math.ceil(Math.random() * level);
    let den2 = Math.ceil(Math.random() * level) + 1;

    let correct = (num1 / den1) / (num2 / den2);

    document.getElementById("question").innerText =
        `${num1}/${den1} ÷ ${num2}/${den2}`;

    let options = [
        correct.toFixed(2),
        (correct + 1).toFixed(2),
        (correct - 1).toFixed(2)
    ];

    shuffle(options);

    let html = "";
    options.forEach(opt => {
        html += `<div class="option" onclick="checkAnswer(${opt}, ${correct})">${opt}</div>`;
    });

    document.getElementById("options").innerHTML = html;
}

function checkAnswer(selected, correct) {
    if (Math.abs(selected - correct) < 0.01) {
        score += 10;
        document.getElementById("result").innerText = "✅ Correct!";
        playSound(true);
    } else {
        document.getElementById("result").innerText = "❌ Wrong!";
        playSound(false);
    }

    document.getElementById("score").innerText = "Score: " + score;
    level++;
    generateQuestion();
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function playSound(correct) {
    let audio = new Audio(correct ? "correct.mp3" : "wrong.mp3");
    audio.play();
}

function saveScore() {
    fetch("submit.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `name=${username}&score=${score}`
    }).then(() => loadLeaderboard());
}

function loadLeaderboard() {
    fetch("leaderboard.php")
    .then(res => res.text())
    .then(data => {
        document.getElementById("leaderboard").innerHTML = data;
    });
}

loadLeaderboard();