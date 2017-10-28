
// var modal = document.getElementById('myModal');


// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(nn) {
//     if (nn.target == modal) {
//         modal.style.display = "none";
//     }
// }



















//################################################################
// start Section table of minesweeper game************************
//################################################################


//################################################################
// define global viable;
//################################################################
var dataOfTable = [];
var CoordinatOfBomb = [];
var flag = 0;
var winRecord = 0;
var loseRecord = 0;
var gameEnd = false;

//################################################################
// when onLoad game Start Create the Table of Game
//################################################################
window.onload = function (){
createTableDate();
declareNeighbor();
create_set_Bomb();
createTable();
getLocation();
markdown();


}
//################################################################
// following function cleared dataoftable array and coordinateOfbomb
//################################################################
function clear(input){
    var i;
    var lenght = input.length;
    for(i = 0;i < lenght;i++){
        input.pop();
    }

}
//################################################################
// following function for new game
//################################################################
function newGame(){
clear(dataOfTable);
clear(CoordinatOfBomb);
createTableDate();
declareNeighbor();
create_set_Bomb();
createTable();
getLocation();
updateStatus();
markdown();
gameEnd = false;


}









//################################################################
// create cells of table and give defult data them
//################################################################
function createTableDate(){
    var i;
    for(i = 0;i<100 ; i++){
        dataOfTable.push({
            north: -1,
            south: -1,
            west: -1,
            east: -1,
            northEast: -1,
            northWest: -1,
            southEast: -1,
            southWest: -1,
            bomb: false,
            nearBomb: 0 ,
            clickable: true,
            checked: false,
            position:{
                row:0,
                cell:0

            }
        })

    }

}
//################################################################
// create cells of table and give defult data them
//################################################################
function declareNeighbor(){
    var i,n,s,w,e,nw,ne,se,sw;
    for(i = 0 ;i < dataOfTable.length;i++){
        n = i - 10;
        s = i + 10;
        w = i - 1;
        e = i + 1;
        nw = i - 11;
        ne = i - 9;
        sw = i + 9;
        se = i + 11;

    

    if(i === 0){
        dataOfTable[i].east = e;
        dataOfTable[i].south = s;
        dataOfTable[i].southEast = se;
    }
    else if(i > 0 && i < 9){
        dataOfTable[i].west = w;
        dataOfTable[i].east = e;
        dataOfTable[i].south = s;
        dataOfTable[i].southEast = se;
        dataOfTable[i].southWest = sw;
    }
    else if(i === 9){
        dataOfTable[i].west = w;
        dataOfTable[i].south = s;
        dataOfTable[i].southWest = sw;
    }
    else if ((i % 10) === 9 && i != 9 && i != 99) {
        dataOfTable[i].south = s;
        dataOfTable[i].southWest = sw;
        dataOfTable[i].west = w;
        dataOfTable[i].northWest = nw;
        dataOfTable[i].north = n;
    }
    else if(i === 90){
        dataOfTable[i].north = n;
        dataOfTable[i].east = e;             
        dataOfTable[i].northEast = ne;
    }
    else if ((i % 90) > 0 && (i % 90) < 9) {
        dataOfTable[i].west = w;
        dataOfTable[i].northWest = nw;
        dataOfTable[i].north = n;
        dataOfTable[i].northEast = ne;
        dataOfTable[i].east = e;
    }
    else if (i === 99) {
        dataOfTable[i].west = w;
        dataOfTable[i].northWest = nw;
        dataOfTable[i].north = n;
    }
    else if ((i % 10) === 0 && i != 0 && i != 90) {
        dataOfTable[i].north = n;
        dataOfTable[i].northEast = ne;
        dataOfTable[i].east = e;
        dataOfTable[i].southEast = se;
        dataOfTable[i].south = s;
    }
    else{
        dataOfTable[i].north = n;
        dataOfTable[i].south = s;
        dataOfTable[i].west = w;
        dataOfTable[i].east = e;
        dataOfTable[i].northEast = ne;
        dataOfTable[i].northWest = nw;
        dataOfTable[i].southWest = sw;
        dataOfTable[i].southEast = se;
    }
}
}



//################################################################
// create Bomb by Random location 
//################################################################


function create_set_Bomb(){
flag = 0;
var bombNumber;
var answer;
    while (CoordinatOfBomb.length < 20){
        // bombNumber = Math.floor(Math.random() * 100 + 0);
        bombNumber = parseInt((Math.random() * 100) - 1);
        answer = checkBomb(bombNumber);
        if(answer === false){
            dataOfTable[bombNumber].bomb = true;
            CoordinatOfBomb.push(bombNumber);
            signAllNeighbor(bombNumber);
            flag++;

        }

    }


return;
}

//################################################################
// checking bomb for don't repeadtive 
//################################################################
function checkBomb(location_bomb){
    var i;
    for(i = 0;i < CoordinatOfBomb.length ;i++){
        if(location_bomb === CoordinatOfBomb[i]){
            return true;
        }
    }
return false;
}

//################################################################
//  Notify the neighbor cell who this is Bomb 
//################################################################

function signAllNeighbor(input){
var n,s,w,e,nw,ne,se,sw;
n = dataOfTable[input].north;
s = dataOfTable[input].south;
w = dataOfTable[input].west;
e = dataOfTable[input].east;
nw = dataOfTable[input].northWest;
ne = dataOfTable[input].northEast;
se = dataOfTable[input].southEast;
sw = dataOfTable[input].southWest;

if (n != -1){
    dataOfTable[n].nearBomb += 1; 
}
else if(s != -1){
    dataOfTable[s].nearBomb += 1;
}
else if(w != -1){
    dataOfTable[w].nearBomb += 1;
}
else if(e != -1){
    dataOfTable[e].nearBomb += 1;
}
else if(nw != -1){
    dataOfTable[nw].nearBomb += 1;
}
else if(ne != -1){
    dataOfTable[ne].nearBomb += 1;
}
else if(se != -1){
    dataOfTable[se].nearBomb += 1;
}
else if(sw != -1){
    dataOfTable[sw].nearBomb += 1;
}
}


//################################################################
//  create table of Game and set property row and cell for position 
//################################################################


function createTable(){
    var table = document.getElementById("table_mine");
    table.innerHTML = "";
    var i , j , temp;
    var row , cell;
    var k = 0;
    for(i = 0;i < 10;i++){
        row = table.insertRow(i);
        for(j = 0;j <= 9 ; j++){
            cell = row.insertCell(j);
            dataOfTable[k].position.row = i;
            dataOfTable[k].position.cell = j;
            temp = dataOfTable[k].nearBomb;
            k++;

        }
    }
}

//################################################################
//get location of mouse when Click on cells of table and check 
//status location and run this cell
//################################################################
function getLocation(event){
    $('td').click(function () {
        var result;
        var table = document.getElementById("table_mine");
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        var position = (row * 10) + col;
        if(gameEnd === true){
            return;
        }
        if(dataOfTable[position].clickable === false){
            table.rows[row].cells[col].className = "";
            dataOfTable[position].clickable = true;
            flag++;
            updateStatus();
            return ;
        }
        if(gameEnd === false){
            checkRoom(position);
            result = checkForWin();
            if(result === true){
                alert("you are Win");
                winRecord++;
                updateStatus();
                gameEnd = true;
            }            

        }
    });
    }
    




//################################################################
// checking and run cell 
//################################################################
function checkRoom(position){
    var table = document.getElementById("table_mine");
    var row = dataOfTable[position].position.row;
    var col = dataOfTable[position].position.cell;

    if(position === -1){
        return;
    }
    if(dataOfTable[position].checked === true && dataOfTable[position].clickable === false){
        return;

    }
    dataOfTable[position].checked = true;
    if(dataOfTable[position].bomb === true){
        table.rows[row].cells[col].className = "bomb";
        showAllTable();
        showBomb(-1);
        loseRecord++;
        updateStatus();
        gameEnd = true;
        return;

    }
    if(dataOfTable[position].nearBomb > 0){
        if(dataOfTable[position].clickable === true){
            temp = dataOfTable[position].nearBomb ;
            table.rows[row].cells[col].className = "checked";
            if(temp === 1){
                table.rows[row].cells[col].innerHTML = "<h3 class='roomNumber code_0'"> + temp + "</h3>";
            }
            if(temp > 1 && temp <= 3){
                table.rows[row].cells[col].innerHTML = "<h3 class='roomNumber code_1'"> + temp + "</h3>";
            }
            if(temp > 3){
                table.rows[row].cells[col].innerHTML = "<h3 class='roomNumber code_2'"> + temp + "</h3>";
            }
            }
        }
        if(dataOfTable[position].nearBomb === 0){
                table.rows[row].cells[col].className = "checked";
                // var dt = dataOfTable[position];
                // var coor = [dt.north , dt.south , dt.west , dt.east , dt.northWest , dt.northEast , dt.southWest , dt.southEast];
                // var f;
                // for(f = 0; f < coor.length ; f++){
                //     if(coor[f] != -1){
                //         if(dataOfTable[coor[f]].checked === false){
                //             checkRoom(coor[f]);
                //         }

                //     }
                // }
                if(dataOfTable[position].north != -1){
                    if(dataOfTable[dataOfTable[position].north].checked === false){
                        checkRoom(dataOfTable[position].north);
                    }
                }
                if(dataOfTable[position].south != -1){
                    if(dataOfTable[dataOfTable[position].south].checked === false){
                        checkRoom(dataOfTable[position].south);
                    }
                
                }
                if(dataOfTable[position].west != -1){
                    if(dataOfTable[dataOfTable[position].west].checked === false){
                        checkRoom(dataOfTable[position].west);
                    }
                
                }
                if(dataOfTable[position].east != -1){
                    if(dataOfTable[dataOfTable[position].east].checked === false){
                        checkRoom(dataOfTable[position].east);
                    }
                
                }
                if(dataOfTable[position].northWest != -1){
                    if(dataOfTable[dataOfTable[position].northWest].checked === false){
                        checkRoom(dataOfTable[position].northWest);
                    }
                
                }
                if(dataOfTable[position].northEast != -1){
                    if(dataOfTable[dataOfTable[position].northEast].checked === false){
                        checkRoom(dataOfTable[position].northEast);
                    }
                
                }
                if(dataOfTable[position].southWest != -1){
                    if(dataOfTable[dataOfTable[position].southWest].checked === false){
                        checkRoom(dataOfTable[position].southWest);
                    }
                
                }
                if(dataOfTable[position].southEast != -1){
                    if(dataOfTable[dataOfTable[position].southEast].checked === false){
                        checkRoom(dataOfTable[position].southEast);
                    }
              
                }

                
            }   
        }

    
//################################################################
//following function show All bombs 
//################################################################
function showBomb(locationNo) {
    if (locationNo === -1) {
        locationNo = 0;
    }
    if (locationNo === CoordinatOfBomb.length) {
        return;
    }
    var temp = CoordinatOfBomb[locationNo];
    var table = document.getElementById("table_mine");
    var row = dataOfTable[temp].position.row;
    var col = dataOfTable[temp].position.cell;
    table.rows[row].cells[col].className = "bomb";
    locationNo++;
    setTimeout(showBomb,50, locationNo);
    console.log("loop show bomb" , locationNo , CoordinatOfBomb);
    
    return;
}
//################################################################
//following function display all data of table 
//################################################################
function showAllTable(){
    var i,row,col;
    var length = dataOfTable.length;
    var table = document.getElementById("table_mine");
    var audio = document.getElementById("myAudio");
    audio.play();


    for(i = 0;i < length;i++){
        row = dataOfTable[i].position.row;
        col = dataOfTable[i].position.cell;

        if(dataOfTable[i].nearBomb === 0 && dataOfTable[i].bomb === false){
            table.rows[row].cells[col].className = "checked";
        }
        if(dataOfTable[i].nearBomb > 0 && dataOfTable[i].bomb === false){
            table.rows[row].cells[col].className = "checked";
            var temp = dataOfTable[i].nearBomb;
            if(temp === 1){
                table.rows[row].cells[col].innerHTML = "<h3 class='roomNumber code_0'>" + temp + "</h3>";
            }
            if(temp > 1 && temp <= 3){
                table.rows[row].cells[col].innerHTML = "<h3 class='roomNumber code_1'>" + temp + "</h3>";
            
            }
            if(temp > 3){
                table.rows[row].cells[col].innerHTML = "<h3 class='roomNumber code_2'>" + temp + "</h3>";

            }
        }



    }



}

//################################################################
//checking the cell of table where not bomb is clicked 
//################################################################
function checkForWin(){
    var i;
    var length = dataOfTable.length;
    for(i = 0;i < length ; i++){
        if(dataOfTable[i].checked === false && dataOfTable[i].bomb === false){
            return false;
        }
    }
    return true;
}
//################################################################
// following function for when do right clicked 
//################################################################
function markdown(){
//  var table = document.getElementById("table_mine");
//  table.oncontextmenu = function(e){
//      var col = e.target;
//      var row = col.parentElement;
//      var i,j;
     
//          for(j = 0;j < table.rows.length;j++){
//           if(table.rows[j] === row){
//               row = j;
//           }
 
//          }
//              for(i = 0;i < row.childElementCount;i++){
//              if(table.rows[row].cells[i] === col){
//                  col = i ;
//              }
//          }
$('td').contextmenu(function () {
    if (gameEnd === true) {
        return;
    }
    var table = document.getElementById("table_mine");
    var col = $(this).parent().children().index($(this));
    var row = $(this).parent().parent().children().index($(this).parent());

         var position = (row * 10) + col;
         if(flag > 0 && dataOfTable[position].checked === false){
             dataOfTable[position].clickable = false;
             table.rows[row].cells[col].className = "flag";
             flag--;
             updateStatus();
         }
         return false;
        });
        
}
//################################################################
//get location of mouse when Click on cells of table and check 
//status location and run this cell
//################################################################

function updateStatus(){
    document.getElementById("bombDemo").innerHTML = flag;
    document.getElementById("winDemo").innerHTML = winRecord;
    document.getElementById("loseDemo").innerHTML = loseRecord;


}
