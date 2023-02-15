var gameState = {
    player1: '',
    player2: '',
    turn: 0
}
let gameBoard = {
    "col6": [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ],
    "col5": [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ],
    "col4": [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ],
    "col3": [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ],
    "col2": [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ],
    "col1": [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ],
    "col0": [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ]
}

//Picking Color
$(".picks").on("click", (event) => {
    gameState.player1 = $(event.currentTarget).text().toLowerCase();
    gameState.player2 = $(event.currentTarget).attr("not")
    $(".pickColor").hide();
    turn(gameState.player1, 1)
})

function turn(player, turn) {
    $(`.${player}Piece`).on("click", (event) => {
        //Setting column event
        $(".col").on("click", (event) => {
            dropPiece(player, event.currentTarget)
        }).on("mouseenter", (event) => {
            applyHover(event.currentTarget)
        }).on("mouseleave", () => { $(".current").removeClass("current") })
    })
}

function applyHover(col) {
    let colName = $(col).attr("id")
    let dropRow = 0;
    for (let i in gameBoard[colName]) {
        if (gameBoard[colName][i] !== "empty") {
            dropRow += 1
        }
    }
    $(col).children(`#row${dropRow}`).addClass("current")
}

function dropPiece(player, col) {
    let colName = $(col).attr("id")
    let dropRow = 0;
    for (let i in gameBoard[colName]) {
        if (gameBoard[colName][i] !== "empty") {
            dropRow += 1
        }
    }

    //If the column is not full
    if (dropRow < 6) {
        //Update gameBoard
        gameBoard[colName][dropRow] = player
        gameState.turn += 1

        //Drops Piece
        $(col).children(`#row${dropRow}`).css("background", player).attr("player", player)

        let win = checkWin(player, colName, dropRow)
        $(`.${player}Piece, .col`).off("click").off("mouseenter").off("mouseleave");
        $(".current").removeClass("current")
        if (win == false) {
            //End Turn
            turn($(`.${player}`).attr("not"), gameState.turn);
        } else {
            //End Game
            endGame(player)
        }
    } else {
        alert("No room in col")
    }
}

function checkWin(player, col, row) {
    console.log(arguments)
    let left = parseInt(col.replaceAll("col", ""));
    let right = 7 - left;
    let bottom = row;
    let top = 5 - bottom;
    let match = {
        matchLeft: 0,
        matchRight: 0,
        matchBottom: 0,
        matchTop: 0,
        matchTopLeft: 0,
        matchBottomLeft: 0,
        matchTopRight: 0,
        matchBottomRight: 0
    }
    console.log("left", left, "right", right, "top", top, "bottom", bottom)
    for (let i = 0; i < 7; i++) {

        switch (i) {
            case 0:
                for (let k = left - 1; k > -1; k--) {
                    if ($(`#col${k}`).children(`#row${row}`).attr("player") == player) {
                        match.matchLeft += 1
                    } else {//if($(`#col${k}`).children(`#row${row}`).attr("player") == $(`.${player}`).attr("not")){
                        console.log("breaking")
                        break;
                    }
                }
                break;

            case 1:
                for (let k = 8 - right; k < 7; k++) {
                    if ($(`#col${k}`).children(`#row${row}`).attr("player") == player) {
                        match.matchRight += 1
                    } else {//if($(`#col${k}`).children(`#row${row}`).attr("player") == $(`.${player}`).attr("not")){
                        break;
                    }
                }
                break;

            case 2:
                for (let k = bottom - 1; k > -1; k--) {
                    if ($(`#${col}`).children(`#row${k}`).attr("player") == player) {
                        match.matchBottom += 1;
                    } else {//if($(`#${col}`).children(`#row${k}`).attr("player") == $(`.${player}`).attr("not")){
                        break;
                    }
                }
                break;

            case 3:
                let x = left - 1;
                for (let y = row + 1; y < 7; y++) {
                    if ($(`#col${x}`).children(`#row${y}`).attr("player") == player) {
                        match.matchTopLeft += 1
                    } else {
                        break;
                    }
                    if (x > -1) {
                        x -= 1
                    } else {
                        break;
                    }
                }
                // console.log("top")
                // for(let k = 6 - top; k < 6; k++){
                //     if($(`#${col}`).children(`#row${k}`).attr("player") == player){
                //         match.matchTop += 1
                //     }else {//if($(`#${col}`).children(`#row${k}`).attr("player") == $(`.${player}`).attr("not")){
                //         console.log("breaking")
                //         break;
                //     }
                // }
                break;

            case 4:
                let x1 = left - 1;
                for (let y = bottom - 1; y > -1; y--) {
                    if ($(`#col${x1}`).children(`#row${y}`).attr('player') == player) {
                        match.matchBottomLeft += 1
                    } else {
                        break;
                    }
                    if (x1 > -1) {
                        x1 -= 1
                    } else {
                        break;
                    }
                }
                break;

            case 5:
                let x2 = left + 1;
                for (let y = bottom + 1; y < 7; y++) {
                    if ($(`#col${x2}`).children(`#row${y}`).attr("player") == player) {
                        match.matchTopRight += 1
                    } else {
                        break;
                    }
                    if (x2 < 7) {
                        x2 += 1
                    } else {
                        break;
                    }
                }
                break;

            case 6:
                let x3 = left + 1;
                for (let y = bottom - 1; y > -1; y--) {
                    if ($(`#col${x3}`).children(`#row${y}`).attr("player") == player) {
                        match.matchBottomRight += 1;
                    } else {
                        break;
                    }
                    if (x3 < 7) {
                        x3 += 1;
                    } else {
                        break;
                    }
                }
                break;
        }
    }
    console.log(match)
    for (let i in match) {
        if (match[i] == 3) {
            return true;
        } else if (match.matchLeft + match.matchRight == 3 || match.matchTopLeft + match.matchBottomRight == 3 || match.matchBottomLeft + match.matchTopRight == 3) {
            return true;
        }
    }
    return false;
}

function endGame(winner) {
    let player;
    if (gameState.player1 == winner) {
        player = "Player 1"
    } else {
        player = "Player 2"
    }
    let winMessage = $("<div/>").addClass("winMessage").append($("<h1/>").text(`${player} Wins!!`), $("<button/>").text("Play Again?").on("click", reset)).css({ "background-color": winner, "border-color": winner })
    let overlay = $("<div/>").addClass("overlay").append(winMessage)
    $("body").append(overlay)
}

function reset() {
    gameState.turn = 0;
    gameState.player1 = ''
    gameState.player2 = ''
    for (let i = 0; i < 7; i++) {
        for (let k in gameBoard[`col${i}`]) {
            gameBoard[`col${i}`][k] = 'empty';
        }
    }
    $(".cell").css("background-color", 'white')
    $(".overlay").remove();
    $(".pickColor").show();
}