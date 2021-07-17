// Variables Declaration
var isGameOn = true;
var player1, player2;
var turn = "";
var p1Color = "#4cc9f0";
var p2Color = "#f28482";
//var emptyColor = $(".buttons").eq(0).css("background-color");
var emptyColor = "#606c38";

// Add id to each button
for(var i = 0; i < 7 * 5 ; i++){
  $(".buttons").eq(i).attr("id", i+1);
  $(".buttons").eq(i).attr("text", "empty");
}

// Start of the Game
player1 = prompt("Enter name for first player:");
player2 = prompt("Enter name for second player:");
alert("Good luck and enjoy! :)");
updateTurn();

// Events
$(".buttons").click(function(){
  if(isGameOn){
    var result = makeMove($(this).attr("id"));

    if(result === true){
      if(checkWin() === true){
        alert("We have a winner! Refresh page to play again. :)");
        isGameOn = false;
      }
      else{
        updateTurn();
      }
    }
  }
})

// Functions
function updateTurn(){
  if(turn === p1Color){
    turn = p2Color;
    $("#turnAnnounce").text(player2 + ", it's your turn now! Empty slots: " + countEmpty());
    $("#turnAnnounce").css("color", p2Color);
  }
  else{
    turn = p1Color;
    $("#turnAnnounce").text(player1 + ", it's your turn now! Empty slots: " + countEmpty());
    $("#turnAnnounce").css("color", p1Color);
  }
}

function makeMove(id){
  for(var i = 1; i <= 7; i++){
    for(var j = 0; j <= 4; j++){
      if(id == (i + 7*j)){
        // A button of the [id] column has been clicked! Now check for available slot.
        for(var k = 4; k >= 0; k--){
          if($(".buttons").eq((i+7*k)-1).attr("text") === "empty"){
            // Found empty slot!
            $(".buttons").eq((i+7*k)-1).css("background-color", turn);
            $(".buttons").eq((i+7*k)-1).attr("text", turn);
            return true;
          }
        }

        // If code reached here - there was no slot available.
        return false;
      }
    }
  }

  // If code reached here - there was no slot available.
  return false;
}

function countEmpty(){
  var count = 0;

  for(var i = 0; i < 7*5; i++){
    if($(".buttons").eq(i).attr("text") === "empty"){
      count++;
    }
  }

  return count;
}

function checkWin(){
  var btn = $(".buttons");

  // Check Horizontal Win
  for(var i = 0; i <= 7 * 4; i+=7){
    for(var j = 0; j < 4; j++){
      if(btn.eq(i+j).attr("text") === turn && btn.eq(i+j+1).attr("text") === turn && btn.eq(i+j+2).attr("text") === turn && btn.eq(i+j+3).attr("text") === turn){
        return true;
      }
    }
  }

  // Check Vertical Win
  for(var i = 0; i < 7; i++){
    for(var j = 0; j < 3; j++){
      if(btn.eq(i+j*7).attr("text") === turn && btn.eq(i+(j+1)*7).attr("text") === turn && btn.eq(i+(j+2)*7).attr("text") === turn && btn.eq(i+(j+3)*7).attr("text") === turn){
        return true;
      }
    }
  }

  return false;
}
