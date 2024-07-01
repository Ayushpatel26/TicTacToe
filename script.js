
console.log("js");
let player = "O";
let turn = true;
let isGameOver = false;
//Variable for checking draw
let draw = 0;
// for sound when clicked
let music = new Audio("beep.mp3")

let boxes = document.querySelectorAll(".box");
// Add click event listener to each box
boxes.forEach(dibba => {
    dibba.addEventListener('click', function (event) {
        if (dibba.innerText == "" && !isGameOver) {
            // Get the ID of the clicked element
            let clickedId = event.target.id;
            document.getElementById(`${clickedId}`).innerText = player;
            // clickedId.innerText = player;//not works
            music.play();
            checkWin();
            turn = !turn;
            turn ? player = "O" : player = "X";
            if (!isGameOver) {
                document.getElementsByClassName("status")[0].innerHTML = `<b>Turn for ${player}</b>`;
            }
        }
    });
});

// Logic for the winner
function checkWin() {
    draw++;         
    let boxes = document.querySelectorAll(".box");
    let wins = [[0, 1, 2, 0, 5, 0, 0, 10],
    [3, 4, 5, 0, 15, 0, 0, 30],
    [6, 7, 8, 0, 25, 0, 0, 50],
    [0, 3, 6, -10, 15, 90, -20, 30],
    [1, 4, 7, 0, 15, 90, 0, 30],
    [2, 5, 8, 10, 15, 90, -20, 30],
    [0, 4, 8, 0, 15, 45, 0, 30],
    [2, 4, 6, 0, 15, -45, 0, 30]];

    wins.forEach(e => {
        if (boxes[e[0]].innerHTML == boxes[e[1]].innerHTML && boxes[e[1]].innerHTML == boxes[e[2]].innerHTML && boxes[e[0]].innerHTML != "") {
            document.getElementsByClassName("status")[0].innerHTML = `<b>${player} Won the Match</b>`;
            isGameOver = true;
            if (window.innerWidth <= 800) {
                document.querySelector(".line").style.width = "60vw"
                document.querySelector(".line").style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[5]}deg)`;
            } else {
                document.querySelector(".line").style.width = "30vw"
                document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            }
            document.getElementsByTagName("img")[0].style.width = "200px";
        }
    })
    if (draw == 9) {
        isGameOver = true;
        document.querySelector(".status").innerHTML = "Match Draw!";
    }
}

// Add an event listener to the reset button
document.querySelector("button").addEventListener("click", () => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(dibba => {
        dibba.innerHTML = "";
    })
    document.getElementsByClassName("status")[0].innerHTML = `<b>Turn for O</b>`;
    document.querySelector(".line").style.width = "0";
    document.getElementsByTagName("img")[0].style.width = 0;
    turn = true;
    player = "O";
    isGameOver = false;
    draw = 0;
})