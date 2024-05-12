var em = ["🏵️","🌺","🌴","🌈","🍓","🍒","🍎","🍉","🍊","🥭","🍍","🍋","🍏","🍐","🥝","🍇","💐","🌹","🌻","🥥","🍅","🌶️","🍄","🧅","🥦"];
//Shuffling above array
var tmp, c, p = em.length;
if(p) while(--p) {
   c = Math.floor(Math.random() * (p + 1));
   tmp = em[c];
   em[c] = em[p];
   em[p] = tmp;
}

//Variables
var pre="", pID, ppID=0, turn=0, t="transform", flip="rotateY(180deg)", flipBack="rotateY(0deg)", time, mode;



//Showing instructions
window.onload = function() {
    $("#ol").html(`<center><div id="inst">
    <h2>Welcome to the Game</h2>Instructions!<br/><br/>
    
    <li>Make pairs of same blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:12px;">Click any one pair to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button></center>`);
}

//Starting the game
function start(r,l) {
    //Timer and moves
    min=0, sec=0, moves=0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function() {
      sec++;
      if(sec==60) {
          min++; sec=0;
      }
      if(sec<10) 
          $("#time").html("Time: 0"+min+":0"+sec);
      else 
        $("#time").html("Time: 0"+min+":"+sec);
    }, 1000);
    rem=r*l/2, noItems=rem;
    mode = r+"x"+l;
    //Generating item array and shuffling it
    var items = [];
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    var tmp, c, p = items.length;
    if(p) while(--p) {
        c = Math.floor(Math.random() * (p + 1));
        tmp = items[c];
        items[c] = items[p];
        items[p] = tmp;
    }
    
    //Creating table
    $("table").html("");
    var n=1;
    for (var i = 1;i<=r;i++) {
        $("table").append("<tr>");
        for (var j = 1;j<=l;j++) {
           $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${items[n-1]}</p></div></div></td>`);
           n++;
         }
         $("table").append("</tr>");
    }
    
    //Hiding instructions screen
    $("#ol").fadeOut(500);
}

//Function for flipping blocks
function change(x) {
  //Variables
  let i = "#"+x+" .inner";
  let f = "#"+x+" .inner .front";
  let b = "#"+x+" .inner .back";
  
  //Dont flip for these conditions
  if (turn==2 || $(i).attr("flip")=="block" || ppID==x) {}
  
  //Flip
  else {
    $(i).css(t, flip);
    if (turn==1) {
      //This value will prevent spam clicking
      turn=2;
      
      //If both flipped blocks are not same
      if (pre!=$(b).text()) {
         setTimeout(function() {
            $(pID).css(t, flipBack);
            $(i).css(t, flipBack);
            ppID=0;
         },1000);
      }
      
      //If blocks flipped are same
      else {
          rem--;
          $(i).attr("flip", "block");
          $(pID).attr("flip", "block");
      }
      
      setTimeout(function() {
         turn=0;
         //Increase moves
         moves++;
         $("#moves").html("Moves: "+moves);
      },1150);
      
    }
    else {
      pre = $(b).text();
      ppID = x;
      pID = "#"+x+" .inner";
      turn=1;
    }
    
    //If all pairs are matched
    if (rem==0) {
          clearInterval(time);
          if (min==0) {
              time = `${sec} seconds`;
          }
          else {
              time = `${min} minute(s) and ${sec} second(s)`;
          }
          setTimeout(function() {
              $("#ol").html(`<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You won the game  in ${moves} moves. </p><br/>Play Again ?<button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)">4 x 4</button><button onclick="start(4, 5)">4 x 5</button></div></center>`);
              $("#ol").fadeIn(750);
          }, 1500);
    }
  }
}
// // Function to save score to local storage
// function saveScore(moves, time, mode) {
//     // Get existing scores from local storage or initialize an empty array
//     let scores = JSON.parse(localStorage.getItem('memoryGameScores')) || [];
    
//     // Add current score to scores array
//     scores.push({ moves: moves, time: time, mode: mode });
    
//     // Save scores array back to local storage
//     localStorage.setItem('memoryGameScores', JSON.stringify(scores));
// }

// // Showing instructions and checking for existing scores in local storage
// window.onload = function() {
//     $("#ol").html(`<center><div id="inst">
//     <h2>Welcome to the Game</h2>Instructions!<br/><br/>
    
//     <li>Make pairs of same blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:12px;">Click any one pair to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button></center>`);

//     // Check for existing scores in local storage
//     let scores = JSON.parse(localStorage.getItem('memoryGameScores'));
//     if (scores && scores.length > 0) {
//         // Display existing scores or perform any other action
//     }
// }

// // Function for completing the game
// function gameCompleted(moves, time, mode) {
//     // Save the score to local storage
//     saveScore(moves, time, mode);

//     // Display game completion message or perform any other action
//     $("#ol").html(`<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You won the game in ${moves} moves.</p><br/>Play Again?<button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)">4 x 4</button><button onclick="start(4, 5)">4 x 5</button></div></center>`);
//     $("#ol").fadeIn(750);
// }

// // If all pairs are matched
// if (rem == 0) {
//     clearInterval(time);
//     let completionTime;
//     if (min == 0) {
//         completionTime = `${sec} seconds`;
//     } else {
//         completionTime = `${min} minute(s) and ${sec} second(s)`;
//     }
//     // Call function to handle game completion
//     gameCompleted(moves, completionTime, mode);
// }
