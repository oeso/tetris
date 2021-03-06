"use strict";

/* document key Code check */
document.onkeyup=function(e){console.log(e.keyCode);}

/* mino별 기본 좌표 */
// var minoList = [
//     [0,1,2,2,1,1,1,0], //Jmino
//     [0,1,2,2,0,0,0,1], //Lmino
//     [0,0,1,1,0,1,0,1],1, //Omino
//     [0,0,0,1,0,1,2,1],1, //Tmino
//     [0,1,1,2,0,0,1,1], //Smino
//     [0,1,1,2,1,1,0,0], //Zmino
//     [0,1,2,3,1,1,1,1]  //lmino
// ];

//회전1
// var minoList = [
//     [[0,1,1,1,0,0,1,2],0] //Jmino
//     [[0,0,0,1,0,1,2,0],0] //Lmino
//     [[0,0,1,1,0,1,0,1],0] //Omino 같음
//     [[0,1,1,0,0,0,1,0],0] //Tmino
//     [[0,0,1,2,1,1,0,0],1] //Smino
//     [[0,0,1,1,0,1,1,2],1] //Zmino
//     [[0,0,0,0,0,1,2,3],2]  //lmino
// ];

//회전2
// var minoList = [
//     [[0,1,1,1,0,0,1,2],0] //Jmino
//     [[0,0,0,1,0,1,2,0],0] //Lmino
//     [[0,0,1,1,0,1,0,1],0] //Omino 같음
//     [[0,1,1,0,0,0,1,0],0] //Tmino
//     [[0,0,1,2,1,1,0,0],1] //Smino
//     [[0,0,1,1,0,1,1,2],1] //Zmino
//     [[0,0,0,0,0,1,2,3],2]  //lmino
// ];

var minoJ  = [[0,1,2,2,1,1,1,0],[0,1,1,1,0,0,1,2],[0,1,2,2,0,0,0,1],[0,0,0,1,0,1,2,0]]
var minoL  = [[0,1,2,2,0,0,0,1],[0,1,1,1,2,2,1,0],[0,1,2,2,1,1,1,0],[0,0,0,1,0,1,2,2]]
var minoZ  = [[0,0,1,1,0,1,1,2],[0,1,1,2,1,1,0,0],[0,0,1,1,0,1,1,2],[0,1,1,2,1,1,0,0]]
var minoS  = [[0,0,1,1,1,2,1,0],[0,1,1,2,0,0,1,1],[0,0,1,1,1,2,1,0],[0,1,1,2,0,0,1,1]]
var mino_l = [[0,0,0,0,-1,0,1,2],[0,1,2,3,0,0,0,0],[0,0,0,0,-1,0,1,2],[0,1,2,3,0,0,0,0]]
var minoO  = [[0,0,1,1,0,1,0,1],[0,0,1,1,0,1,0,1],[0,0,1,1,0,1,0,1],[0,0,1,1,0,1,0,1]]
var minoT  = [[0,0,0,1,0,1,2,1],[0,1,1,2,0,0,1,0],[1,1,0,1,0,1,1,2],[0,1,2,1,2,2,2,1]]


let wrapElement = document.getElementById("wrap");
const cloneNodes = wrapElement.innerHTML;

/* 현재레벨 카운팅, 속도 지정 */
let level = 1;
let defaultSpeed = 130;
let speed = defaultSpeed;
let max = 18;
let cood = 5;

var newBlock; //계속적으로 새로 업데이트 될 신규 블럭

//0,1,2,3

/* 블록 종류 지정 */
var block4;
var i = 0;
var before1,before2,before3,before4;

/* 블록이 떨어지는 로직 : 매순간 4개의 블록이 동시에 변화되어야 함  */
var current;
var blocks = {
    init : function(arr,isOmino){
        cood = 5;
        this.arr = arr;
        //max = isOmino ? (isOmino===2?17:( isOmino === 1? 16 :(max+1))) : 18;
        var that = this;
        current = setInterval( function(){
            that.default(cood);
        }, speed)
    },
    default : function(cood){
        //첫째 줄 부터 OFF상태인 블럭이 하나라도 있으면 GAME OVER
        var firstLine = document.getElementById("box0");
        for( var j =0; j<12; j++){
            if(firstLine.getElementsByClassName("dot")[j].classList.contains("off")){
                styleGameOver();
                this.putOut(true);
                return false;
            }
        }

        if(before1){ before1.classList.remove("on") }
        if(before2){ before2.classList.remove("on") }
        if(before3){ before3.classList.remove("on") }
        if(before4){ before4.classList.remove("on") }

        if( i + this.arr[0]>=20 || i + this.arr[1]>=20 ||i + this.arr[2]>=20 ||i + this.arr[3]>=20 ){
            this.putOut();
            return false;
        }
    
        before1 = document.getElementById("box"+( i + this.arr[0] )).getElementsByClassName("dot")[ cood + this.arr[4] ];
        before2 = document.getElementById("box"+( i + this.arr[1] )).getElementsByClassName("dot")[ cood + this.arr[5] ];
        before3 = document.getElementById("box"+( i + this.arr[2] )).getElementsByClassName("dot")[ cood + this.arr[6] ];
        before4 = document.getElementById("box"+( i + this.arr[3] )).getElementsByClassName("dot")[ cood + this.arr[7] ];

        before1.classList.add("on");
        before2.classList.add("on");
        before3.classList.add("on");
        before4.classList.add("on");
        
        i++;
        // if(i === max  ){ // 바닥에 닿을 시 off처리.
        //     this.putOut();
        //     return false;
        // }
        var m0 = document.getElementById("box"+( i + this.arr[0] ));
        var m1 = document.getElementById("box"+( i + this.arr[1] ));
        var m2 = document.getElementById("box"+( i + this.arr[2] ));
        var m3 = document.getElementById("box"+( i + this.arr[3] ));
        
        if( m0 && m1 && m2 && m3 ){
            //떨어지다가 다음 모눈이 off상태이면 그자리에서 stop하고 off처리.
            if( 
                m0.getElementsByClassName("dot")[ cood + this.arr[4]].classList.contains("off") || 
                m1.getElementsByClassName("dot")[ cood + this.arr[5]].classList.contains("off") || 
                m2.getElementsByClassName("dot")[ cood + this.arr[6]].classList.contains("off") || 
                m3.getElementsByClassName("dot")[ cood + this.arr[7]].classList.contains("off")){ 

                this.putOut();
                return false;
            }
        }
    },
    putOut : function(certain){
        clearInterval(current);
        current = null;

        if(!before1){return false;}

        before1.classList.add("off");
        before2.classList.add("off");
        before3.classList.add("off");
        before4.classList.add("off");

        
        var fullBox = 0, arr=[];
        for( var k = i; k>=0; k--){
            for( var j =0; j<12; j++){
                if(document.getElementById("box"+k).getElementsByClassName("dot")[j].classList.contains("off")){
                    fullBox++;
                    if(fullBox===12){
                        arr.push(k);
                    }
                    if(j===12){
                        fullBox = 0;
                    }
                }
            }
        }
        function removeRow(arr){
            for( var k = 0; k<arr.length; k++){
                var newLine = document.createElement("div")
                    newLine.id ="box0";
                    newLine.className = "box";
                    newLine.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>'

                document.getElementById("box"+k).className = "on";
                wrapElement.removeChild(document.getElementById("box"+k));                        
                wrapElement.insertBefore(newLine,wrapElement.childNodes[0]);
            }
        }
        removeRow(arr);

        //box index 새로 세팅
        var boxs = wrapElement.getElementsByClassName("box");
        for(var l=0; l<boxs.length; l++){
            boxs[l].id = "box" + l;
        }
        before1=null;
        before2=null;
        before3=null;
        before4=null;

        i=0;

        //넘긴 인자가 true 이면 게임 종료, 없거나 false이면 계속 진행(새 블럭 생성)
        if(!certain){
            this.showNewBlock();
            styleGameStart();
        }
    },
    showNewBlock : function(){
        styleGameStart();
        var randomBlock = Math.floor(Math.random()*10);
        
        switch(randomBlock){
            case 1  : this.init(minoJ[0]);   this.blockName = "J"; break;
            case 2  : this.init(minoL[0]);   this.blockName = "L"; break;
            case 3  : this.init(minoO[0]);   this.blockName = "O"; break;
            case 4  : this.init(minoT[0]);   this.blockName = "T"; break;
            case 5  : this.init(minoS[0]);   this.blockName = "S"; break;
            case 6  : this.init(minoZ[0]);   this.blockName = "Z"; break;
            case 7  : this.init(mino_l[0]); this.blockName = "l"; break;
            default : this.init(minoS[0]);   this.blockName = "Z"; break;
        }
    },
    
}

/* 게임시작 */
function styleGameStart(){
    document.getElementById("dim").classList.remove("on");
    document.getElementById("theEnd").style.display = "none";
}
/* 게임종료 */
function styleGameOver(){
    document.getElementById("dim").classList.add("on");
    document.getElementById("theEnd").style.display = "block";
}

/* 최초시작 */
blocks.showNewBlock();

/* Replay button 클릭시 */
const btnReplay = document.getElementById("btnReplay");
btnReplay.onclick = rePlay;
function rePlay(){
    blocks.showNewBlock();
    wrapElement.innerHTML = cloneNodes;
}


/* 블록이 움직일 수 있는 한계 지정 */

/* 블록이 떨어지는 방식 지정 */


/* 랜덤으로 블록 생성, 떨어짐 */
// 생성된 new object를 전역변수에 계속 새로 담음.
// 키 작업시 항상 전역에 있는 객체를 움직이고 변형하고 빨리 내림


/* 위쪽 화살표 or 스페이스바 누름 - 블록 모양 바꾸기 */
function transferBlock(){

}

/* 아래쪽 화살표 누름 - 블록 빨리 내리기 */
function fastDown(){
    //speed+=100;
}

/* 좌측 화살표 누름 keycode37 - 좌측으로 한칸씩 이동. 좌표 0 에 도달시 더이상 움직이지 않음 */
function leftMove(){
    if(cood<=0){cood=0;return;}
    cood--;
}

/* 우측 화살표 누름 keycode39 - 우측으로 한칸씩 이동. 좌표 11에 도달시 더이상 움직이지 않음 */
function rightMove(){
    if(cood>=9){
        cood=9;
        return;
    }
    cood++;
}

var timer = { left:1,right:1 };
document.onkeydown = function(e){
    if( e.keyCode === 37 ){//좌
        if(!timer.left){
            return false;
        }
        console.log(1111)
        timer.left = 0;
        setTimeout(function(){
            timer.left = 1;
        },400);
        leftMove();
    }else if( e.keyCode === 39 ){//우
        rightMove();
    }else if( e.keyCode === 38 ){//위

    }else if( e.keyCode === 40 ){//아래
        fastDown();
    }
}
document.onkeyup=function(e){
    if( e.keyCode === 37 ){//좌
    }else if( e.keyCode === 39 ){//우
    }else if( e.keyCode === 38 ){//위
    }else if( e.keyCode === 40 ){//아래
        speed = defaultSpeed;
    }
}

/* 쌓인 블럭에 닿으면 12줄 다 쌓인 줄이 있는지 체크 */
/* 12줄 다 쌓인 줄이 있으면 해당 줄 삭제하고 최상단 빈 줄 추가 */

