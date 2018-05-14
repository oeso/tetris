"use strict";

/* document key Code check */
document.onkeyup=function(e){console.log(e.keyCode);}

/* 현재레벨 카운팅, 속도 지정 */
let level = 1;
let speed = 300;
let max = 19;
let cood = 5;

var newBlock; //계속적으로 새로 업데이트 될 신규 블럭

/* 블록 종류 지정 */
var block4;
var i = 0;
var before1,before2,before3,before4;
/* 블록이 떨어지는 로직 : 매순간 4개의 블록이 동시에 변화되어야 함  */

var current;
var blocks = {
    init : function(a,b,c,d,e,f,g,h){
        this.arr = [a,b,c,d,e,f,g,h];
        var that = this;
        current = setInterval( function(){
            that.default();
        }, speed)
    },
    default : function(){
        
        if(  ){
           max = max-1;
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
        if( i ===  ){
            clearInterval(current);
        }
        
    }
}

// var BlockJ = blocks.init(0,1,2,2,1,1,1,0);
// var BlockL = blocks.init(0,1,2,2,0,0,0,1);
 var BlockO = blocks.init(0,0,1,1,0,1,0,1);
// var BlockT = blocks.init(0,1,2,1,0,0,0,1);
// var BlockT = blocks.init(0,1,1,2,0,0,1,1);
//  var BlockZ = blocks.init(0,1,1,2,1,1,0,0);


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
}

/* 좌측 화살표 누름 keycode37 - 좌측으로 한칸씩 이동. 좌표 0 에 도달시 더이상 움직이지 않음 */
function leftMove(){
    if(cood===0){return;}
    cood--;
}

/* 우측 화살표 누름 keycode39 - 우측으로 한칸씩 이동. 좌표 11에 도달시 더이상 움직이지 않음 */
function rightMove(){
    if(cood===19){return;}
    cood++;
}


document.onkeydown = function(e){
    if( e.keyCode === 37 ){//좌
        leftMove();
    }else if( e.keyCode === 39 ){//우
        rightMove();
    }else if( e.keyCode === 38 ){//위

    }else if( e.keyCode === 40 ){//아래
    }
}

/* 쌓인 블럭에 닿으면 비활성화 */
// 블럭에 닿았다는 것을 어떻게 체크할 것인가.
// 블럭 생성시 메모리 차지함.블럭이 쌓일 때 메모리 해제 하는 내용도 포함할 것


// 블럭에 닿으면 호출되는 펑션
function blocked(){}




/* 쌓인 블럭에 닿으면 12줄 다 쌓인 줄이 있는지 체크 */


/* 12줄 다 쌓인 줄이 있으면 해당 줄 삭제하고 최상단 빈 줄 추가 */

