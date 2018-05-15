"use strict";

/* document key Code check */
document.onkeyup=function(e){console.log(e.keyCode);}

/* mino별 기본 좌표 */
var minoList = [[0,1,2,2,1,1,1,0],[0,1,2,2,0,0,0,1],[0,0,1,1,0,1,0,1],[0,0,0,1,0,1,2,1],[0,1,1,2,0,0,1,1],[0,1,1,2,1,1,0,0],[0,1,2,3,1,1,1,1]]

/* 현재레벨 카운팅, 속도 지정 */
let level = 1;
let defaultSpeed = 100;
let speed = defaultSpeed;
let max = 18;
let cood = 5;

var newBlock; //계속적으로 새로 업데이트 될 신규 블럭

/* 블록 종류 지정 */
var block4;
var i = 0;
var before1,before2,before3,before4;

/* 블록이 떨어지는 로직 : 매순간 4개의 블록이 동시에 변화되어야 함  */
var current;
var blocks = {
    init : function(arr,isOmino){
        this.arr = arr;
        max = isOmino ? (max+1) : 18;
        var that = this;
        current = setInterval( function(){
            that.default();
        }, speed)
    },
    default : function(){        
        //첫째 줄 부터 OFF상태인 블럭이 하나라도 있으면 GAME OVER
        var firstLine = document.getElementById("box0");
        for( var j =0; j<12; j++){
            if(firstLine.getElementsByClassName("dot")[j].classList.contains("off")){
                alert("GAME OVER");
                this.putOut(true);
                return false;
            }
        }

        if(before1){ before1.classList.remove("on") }
        if(before2){ before2.classList.remove("on") }
        if(before3){ before3.classList.remove("on") }
        if(before4){ before4.classList.remove("on") }
        

        before1 = document.getElementById("box"+( i + this.arr[0] )).getElementsByClassName("dot")[ cood + this.arr[4] ];
        before2 = document.getElementById("box"+( i + this.arr[1] )).getElementsByClassName("dot")[ cood + this.arr[5] ];
        before3 = document.getElementById("box"+( i + this.arr[2] )).getElementsByClassName("dot")[ cood + this.arr[6] ];
        before4 = document.getElementById("box"+( i + this.arr[3] )).getElementsByClassName("dot")[ cood + this.arr[7] ];

        before1.classList.add("on");
        before2.classList.add("on");
        before3.classList.add("on");
        before4.classList.add("on");
        
        i++;
        if(i === max  ){ // 바닥에 닿을 시 off처리.
            this.putOut();
            return false;
        }
               
        //떨어지다가 다음 모눈이 off상태이면 그자리에서 stop하고 off처리.
        if( 
            document.getElementById("box"+( i + this.arr[0] )).getElementsByClassName("dot")[ cood + this.arr[4]].classList.contains("off") || 
            document.getElementById("box"+( i + this.arr[1] )).getElementsByClassName("dot")[ cood + this.arr[5]].classList.contains("off") || 
            document.getElementById("box"+( i + this.arr[2] )).getElementsByClassName("dot")[ cood + this.arr[6]].classList.contains("off") || 
            document.getElementById("box"+( i + this.arr[3] )).getElementsByClassName("dot")[ cood + this.arr[7]].classList.contains("off")){ 
            this.putOut();
            return false;
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
        var wrapElement = document.getElementById("wrap");
        

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
        }
    },
    showNewBlock : function(){
        var randomBlock = Math.floor(Math.random()*10);
        
        switch(randomBlock){
            case 1  : this.init(minoList[0]);   this.blockName = "J"; break;
            case 2  : this.init(minoList[1]);   this.blockName = "L"; break;
            case 3  : this.init(minoList[2],1); this.blockName = "O"; break;
            case 4  : this.init(minoList[3],1); this.blockName = "T"; break;
            case 5  : this.init(minoList[4]);   this.blockName = "S"; break;
            case 6  : this.init(minoList[5]);   this.blockName = "Z"; break;
            case 7  : this.init(minoList[6]);   this.blockName = "l"; break;
            default : this.init(minoList[5]);   this.blockName = "Z"; break;
        }
    },
    
}

/* 최초시작 */
blocks.init(minoList[3],1);


/* 블록이 움직일 수 있는 한계 지정 */

/* 블록이 떨어지는 방식 지정 */


/* 랜덤으로 블록 생성, 떨어짐 */
// 생성된 new object를 전역변수에 계속 새로 담음.
// 키 작업시 항상 전역에 있는 객체를 움직이고 변형하고 빨리 내림


/* 위쪽 화살표 누름 - 블록 모양 바꾸기 */
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


document.onkeydown = function(e){
    if( e.keyCode === 37 ){//좌
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

