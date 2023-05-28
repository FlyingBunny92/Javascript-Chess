

var canvas;
var ctx;



var score_sum = 0;
var runs = 0;
var score = 0;
var highscore = 0;

var completed_board = [];
var board = [];



const C_HEIGHT = 300;
const C_WIDTH = 300;    


function createEnum(values) {
    const enumObject = {};
    for (const val of values) {
      enumObject[val] = val;
    }
    return Object.freeze(enumObject);
  }

class Piece {
    Type = {
        Pawn: 0,
        Bishop: 1,
        Knight: 2,
        Rook: 3,
        Queen: 4,
        King: 5,
        Empty: 6,
    }
    Color = {
        White: 0,
        Black: 1,
    }
   
    constructor(t, c, x, y) {
      this.piece = t;
      this.color = c;
      this.x = x;
      this.y = y;
    }
    toString() {
      return `type.${this.type}`+` x.${this.x}`+` y.${this.y}`+` color.${this.color}`;
    }
}



 
function go() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    score = 0;
    let p = new Piece(0, 0, 0);
    console.log(p);
    doDrawing();

}

async function printBoard(){
    var x0 = 15;
    var y0 = 25;
    var x_delta = 37;
    var y_delta = 37;
    for(var g = 0; g < board.length; g++){
        for(var h = 0; h < board[0].length; h++){
            var symbol = ' ';
            if(board[g][h].piece==0){
                symbol='Pa';
            }
            if(board[g][h].piece==1){
                symbol='Bi';
            }
            if(board[g][h].piece==2){
                symbol='Kn';
            }
            if(board[g][h].piece==3){
                symbol='Ro';
            }
            if(board[g][h].piece==4){
                symbol='Qu';
            }
            if(board[g][h].piece==5){
                symbol='Ki';
            }
            if(board[g][h].piece==6){
                symbol=' ';
            }
            var color = '#CDA1A1';
            if(board[g][h].color==0){
                color = '#CDA1A1';
            }
            if(board[g][h].color==0){
                color = '#0C0B0B';
            }
            console.log("board[g][h].piece:", board[g][h].piece);
            console.log("symbol:", symbol);
            ctx.fillStyle = color;
            ctx.fillText(symbol, x0+(g*x_delta), y0+(h*y_delta));
        }
    }
}

async function getBoard(){
    board = [];


    let row1 = [];
    let p1 = new Piece(3, 0, 0, 0);
    console.log(p1);
    row1.push(p1);
    let p3 = new Piece(2, 0, 0, 0);
    console.log(p3);
    row1.push(p3);
    let p4 = new Piece(1, 0, 0, 0);
    console.log(p4);
    row1.push(p4);
    let p5 = new Piece(4, 0, 0, 0);
    console.log(p5);
    row1.push(p5);
    let p6 = new Piece(5, 0, 0, 0);
    console.log(p6);
    row1.push(p6);
    let p7 = new Piece(1, 0, 0, 0);
    console.log(p7);
    row1.push(p7);
    let p8 = new Piece(2, 0, 0, 0);
    console.log(p8);
    row1.push(p8);
    let p9 = new Piece(3, 0, 0, 0);
    console.log(p9);
    row1.push(p9);
    board.push(row1);



    let row2 = [];
    for(var i = 0; i < 8; i++){
        let p = new Piece(0, 0, i, 0);
        console.log(p);
        row2.push(p);
    }
    board.push(row2);


    let row3 = [];
    for(var i = 0; i < 8; i++){
        let p = new Piece(6, 0, i, 3);
        console.log(p);
        row3.push(p);
    }
    board.push(row3);


    let row4 = [];
    for(var i = 0; i < 8; i++){
        let p = new Piece(6, 0, i, 4);
        console.log(p);
        row4.push(p);
    }
    board.push(row4);

    let row5 = [];
    for(var i = 0; i < 8; i++){
        let p = new Piece(6, 0, i, 5);
        console.log(p);
        row5.push(p);
    }
    board.push(row5);


    let row6 = [];
    for(var i = 0; i < 8; i++){
        let p = new Piece(6, 0, i, 6);
        console.log(p);
        row6.push(p);
    }
    board.push(row6);


    let row7 = [];
    for(var i = 0; i < 8; i++){
        let p = new Piece(0, 1, i, 0);
        console.log(p);
        row7.push(p);
    }
    board.push(row7);


    let row8 = [];
    let m1 = new Piece(3, 1, 0, 0);
    console.log(p1);
    row8.push(m1);
    let m3 = new Piece(2, 1, 0, 0);
    console.log(p3);
    row8.push(m3);
    let m4 = new Piece(1, 1, 0, 0);
    console.log(p4);
    row8.push(m4);
    let m5 = new Piece(4, 1, 0, 0);
    console.log(m5);
    row8.push(m5);
    let m6 = new Piece(5, 1, 0, 0);
    console.log(p6);
    row8.push(m6);
    let m7 = new Piece(1, 1, 0, 0);
    console.log(m7);
    row8.push(m7);
    let m8 = new Piece(2, 1, 0, 0);
    console.log(m8);
    row8.push(m8);
    let m9 = new Piece(3, 1, 0, 0);
    console.log(m9);
    row8.push(m9);

    board.push(row8);
}

function getHighscore() {
    if (localStorage.getItem("highscore") != null) {
        highscore = parseInt(localStorage.getItem("highscore"));
    }
    if(score > highscore){
        highscore = score;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  

function setRandomColor() {
    $("#colorpad").css("background-color", getRandomColor());
}

function copyBoard() {
    var new_board = [];
    for(var i = 0; i < board.length; i++){
        var row = [];
        for(var j = 0; j < board[0].length; j++){
            row.push(board[j][i]);
        }
        new_board.push(row);
    }
    return new_board;
}
function makeBoardCopy(new_board) {
    var board_copy = [];
    for(var i = 0; i < new_board.length; i++){
        var row = [];
        for(var j = 0; j < new_board[0].length; j++){
            row.push(new_board[j][i]);
        }
        board_copy.push(row);
    }
    return board_copy;
}

async function doDrawing(values=null) {
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,C_WIDTH, C_HEIGHT);



    ctx.fillStyle = '#0C0B0B';
    var w2 = C_WIDTH/8;
    var h2 = C_HEIGHT/8;
    ctx.fillRect(w2, 5, 5, C_HEIGHT);
    ctx.fillRect(2*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(3*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(4*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(5*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(6*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(7*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(8*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(5, h2, C_WIDTH, 5);
    ctx.fillRect(5, 2*h2, C_WIDTH, 5);
    ctx.fillRect(5, 3*h2, C_WIDTH, 5);
    ctx.fillRect(5, 4*h2, C_WIDTH, 5);
    ctx.fillRect(5, 5*h2, C_WIDTH, 5);
    ctx.fillRect(5, 6*h2, C_WIDTH, 5);
    ctx.fillRect(5, 7*h2, C_WIDTH, 5);
    ctx.fillRect(5, 8*h2, C_WIDTH, 5);


    // fillPieces(values);
    await getBoard();
    printBoard();

}

async function parseBoard(boardTxt){
    console.log("async function parseBoard(boardTxt){");
    board = [];
    const boardArray = boardTxt.split("\n");
    for(var i = 0; i < boardArray.length; i++){
        row = [];
        for(var j = 0; j < boardArray[i].length; j++){
            var num = boardArray[i][j];
            row.push(Number(parseInt(num)));
        }
        board.push(row);
    }
    return board;
}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loadFileAsText(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        console.log(textFromFileLoaded);
        doDrawing(textFromFileLoaded);
    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
}


function clearBoard() {
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,C_WIDTH, C_HEIGHT);

    ctx.fillStyle = '#0C0B0B';
    var w = C_WIDTH/3;
    var h = C_HEIGHT/3;
    ctx.fillRect(w, 5, 5, C_HEIGHT);
    ctx.fillRect(2*w, 5, 5, C_HEIGHT);
    ctx.fillRect(5, h, C_WIDTH, 5);
    ctx.fillRect(5, 2*h, C_WIDTH, 5);


    ctx.fillStyle = '#0C0B0B';
    var w2 = C_WIDTH/9;
    var h2 = C_HEIGHT/9;
    ctx.fillRect(w2, 5, 5, C_HEIGHT);
    ctx.fillRect(2*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(4*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(5*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(7*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(8*w2, 5, 5, C_HEIGHT);
    ctx.fillRect(5, h2, C_WIDTH, 5);
    ctx.fillRect(5, 2*h2, C_WIDTH, 5);
    ctx.fillRect(5, 4*h2, C_WIDTH, 5);
    ctx.fillRect(5, 5*h2, C_WIDTH, 5);
    ctx.fillRect(5, 7*h2, C_WIDTH, 5);
    ctx.fillRect(5, 8*h2, C_WIDTH, 5);
}

async function fillPieces(values=null) {
    board = [];
    console.log("async function fillNumbers(values=null) {");
    console.log("values:", values);
    var x0 = 15;
    var y0 = 25;
    var x_delta = 33;
    var y_delta = 33;
    ctx.font = "bold 12px verdana, sans-serif ";
    ctx.textAlign = "start";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "#0C0B0B"; 
    if(values==null){
        let response = await getBoard();
        console.log("response:", response);
    }else{
        let response = await Promise.resolve(parseBoard(values));
        console.log("response:", response);
        console.log("board:", board);
    }

    while(board.length < 1){
        await sleep(1000);
    }

}


