var gameState = {
    player1 : '',
    player2 : '',
    turn:0,
    turns:{

    }
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
$(".picks").on("click",(event)=>{
    gameState.player1 = $(event.currentTarget).text().toLowerCase();
    gameState.player2 = $(event.currentTarget).attr("not")
    $(".pickColor").remove();
    turn(gameState.player1, 1)
})

function turn(player, turn){
    $(`.${player}Piece`).on("click",(event)=>{
        //Setting column event
        $(".col").on("click",(event)=>{
            dropPiece(player, event.currentTarget)
        })
    })
}

function dropPiece(player, col){
    let colName = $(col).attr("id")
    let dropRow = 0;
    for(let i in gameBoard[colName]){
        if(gameBoard[colName][i] !== "empty"){
            dropRow += 1
        }
    }

    //If the column is not full
    if(dropRow < 6){
        //Update gameBoard
        gameBoard[colName][dropRow] = player
        gameState.turn += 1
        
        //Drops Piece
        $(col).children(`#row${dropRow}`).css("background", player).attr("player", player)
        
        let win = checkWin(player, colName, dropRow)

        //End Turn
        $(`.${player}Piece, .col`).off("click");
        turn($(`.${player}`).attr("not"), gameState.turn);
    }else{
        alert("No room in col")
    }
}

function checkWin(player, col, row){
    console.log(arguments)
    let left = parseInt(col.replaceAll("col", ""));
    let right = 7 - left;
    let bottom = row;
    let top = 5 - bottom;

    let matchLeft = 0;
    let matchRight = 0;
    let matchBottom = 0;
    let matchTop = 0;
    let matchTopLeft = 0;
    let matchBottomLeft = 0;
    let matchTopRight = 0;
    let matchBottomRight = 0;
    
    console.log("left", left, "right", right, "top", top, "bottom", bottom)
    for(let i = 0; i < 4; i++){

        switch(i){
            case 0:
                console.log("left")
             for(let k = 0; k < left; k++){
                console.log($(`#col${k}`).children(`#row${row}`))
                if($(`#col${k}`).children(`#row${row}`).attr("player") == player){
                    matchLeft += 1
                }else if($(`#col${k}`).children(`#row${row}`).attr("player") == $(`.${player}`).attr("not")){
                    console.log("breaking")
                    break;
                }
             }
            break;

            case 1:
                console.log("right")
             for(let k = 8 - right; k < 7; k++){
                console.log($(`#col${k}`).children(`#row${row}`))
                if($(`#col${k}`).children(`#row${row}`).attr("player") == player){
                    matchRight += 1
                }else if($(`#col${k}`).children(`#row${row}`).attr("player") == $(`.${player}`).attr("not")){
                    console.log("breaking")
                    break;
                }
            }
            break;

            case 2:
                console.log("bottom")
                for(let k = 0; k < bottom; k++){
                    if($(`#${col}`).children(`#row${k}`).attr("player") == player){
                        matchBottom += 1;
                    }else if($(`#${col}`).children(`#row${k}`).attr("player") == $(`.${player}`).attr("not")){
                        console.log("breaking")
                        break;
                    }
                }
            break;

            case 3:
                console.log("top")
                for(let k = 6 - top; k < 6; k++){
                    if($(`#${col}`).children(`#row${k}`).attr("player") == player){
                        matchTop += 1
                    }else if($(`#${col}`).children(`#row${k}`).attr("player") == $(`.${player}`).attr("not")){
                        console.log("breaking")
                    }
                }
            break;
        }
    }
    console.log(matchLeft)
    console.log(matchRight)
    console.log(matchBottom)
    console.log(matchTop)
}