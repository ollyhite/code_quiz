var mainEl = document.querySelector(".main");
var viewScorebtn = document.querySelector(".high-scores");
var text1 = "Try to answer the following code-related questions within the time limit."
var text2 = "Keep in mind that incorrect answers will penalize your score/time"
var text3 = "by ten seconds!"
var titleEl = document.createElement("h1");
titleEl.textContent = "Code Quiz Chellenage";


var introEl1 = document.createElement("h3");
var introEl2 = document.createElement("h3");
var introEl3 = document.createElement("h3");

startPage();
function startPage(){
mainEl.innerHTML = ''
mainEl.appendChild(titleEl);
introEl1.textContent = text1;
introEl2.textContent = text2;
introEl3.textContent = text3;
mainEl.appendChild(introEl1);
mainEl.appendChild(introEl2);
mainEl.appendChild(introEl3);

var starPlayBtn=document.createElement("button");
starPlayBtn.setAttribute("class", "start-btn")
starPlayBtn.textContent = "Start";
mainEl.appendChild(starPlayBtn);

starPlayBtn.addEventListener("click", startGame)
}


var quizQnA = [
    {
        question:"Where is the correct place to insert a JavaScript?",
        options:["The <head> section", "The <body> section", "Both the <head> and <body> section are correct","Use <link> to conect with it"],
        answer:"The <body> section"
    },{
        question:"Which operator is used to assign a value to a variable?",
        options:["x", "=", "*" , "-"],
        answer:"="

    },{
        question:"Which of the following print content on the browser window?",
        options:["document.write(“print content”);", "response.write(“print content”);", "document.write(print content);" , "-"],
        answer:"write(“print content”);"
    }

]

var qustionTitle = document.createElement("h1");

var showAnswer = document.createElement("h1");
var optionsBtn;
var answer="";
var num = 0;

function startGame(){
    //remove all item
    num = 0;
    mainEl.innerHTML = ''
    timerStart()
    showQnA(num)
}

var timeEl=document.querySelector(".timer-count");
var secondsLeft = 75;

function timerStart(){
        var timerInterval = setInterval(function(){
            secondsLeft--;
            timeEl.textContent = secondsLeft;
            if(secondsLeft === 0){

                clearInterval(timerInterval)
            }
        }, 1000)
}

function showQnA(num){
    console.log("here again");
    console.log(num);
    mainEl.innerHTML = ''
    qustionTitle.textContent=quizQnA[num].question;
    mainEl.appendChild(qustionTitle);
    var optionItem ='';
    for(var i=0; i<quizQnA[num].options.length; i++){
        optionItem=quizQnA[num].options[i];
        // console.log(optionItem);
        optionsBtn = document.createElement("button");
        optionsBtn.setAttribute("class", "option-btn");
        optionsBtn.textContent = optionItem;
        mainEl.appendChild(optionsBtn)
        optionsBtn.addEventListener("click", checkAnswer)
    }
    answer = quizQnA[num].answer;
}

function checkAnswer(event){
    event.preventDefault()
    num = num + 1;
    console.log(num);
    // console.log(event.target);
    var thisValue= event.target.innerText;
    console.log("user choose",thisValue);
    console.log("answer",answer);
    if(thisValue===answer){
        console.log("CORRECT!!!!");
        showAnswer.textContent = "CORRECT!!!!"
        mainEl.appendChild(showAnswer);
        //checkIfEnd(num);

    }else{
        console.log("WRONG!!!!");
        showAnswer.textContent = "WRONG!!!!"
        mainEl.appendChild(showAnswer);
        secondsLeft-5;
        //checkIfEnd(num);

    }
    setTimeout(() => {
        checkIfEnd(num);
    }, 500)

}




function checkIfEnd(num){
    if(num === quizQnA.length){
        console.log("end");
        showScore();
    }else{
        showQnA(num)
    }
}

var score;
var playerInitial;

function showScore(){
    mainEl.innerHTML = ''
    var titleEl = document.createElement("h1");
    titleEl.textContent = "All Done!!!";
    mainEl.appendChild(titleEl);
    var scoreEl = document.createElement("h3");
    scoreEl.textContent = "Your final score is " +secondsLeft+ " .";
    score=secondsLeft;
    mainEl.appendChild(scoreEl);

    var enterIniEl = document.createElement("form");
    enterIniEl.setAttribute("class", "enter-initial-form")
    mainEl.appendChild(enterIniEl);

    var enterIniTitle =document.createElement("h2");
    enterIniTitle.textContent="Enter initials:"
    enterIniEl.appendChild(enterIniTitle);
    var enterIniInput =document.createElement("input");
    enterIniInput.setAttribute("id","initail");
    enterIniEl.appendChild(enterIniInput);
    var enterIniBtn = document.createElement("button");
    enterIniBtn.textContent="Submit"
    enterIniBtn.setAttribute("class", "submit-btn")
    enterIniEl.appendChild(enterIniBtn);

    enterIniEl.addEventListener("submit", saveScore);
}

function saveScore(event){
    event.preventDefault()
    console.log("saveScore");
    var enterIniInputVal = document.getElementById('initail').value;
    console.log(enterIniInputVal);
    console.log(score);
    var data ={"userinitail":enterIniInputVal,"score":score}
    var scoreListArray = [];
    scoreListArray = JSON.parse(localStorage.getItem('scoreList')) || [];
    scoreListArray.push(data);
    console.log(scoreListArray);
    localStorage.setItem('scoreList', JSON.stringify(scoreListArray));
    
    showScoreList();
}

function showScoreList(){
    mainEl.innerHTML = ''
    var titleEl = document.createElement("h1");
    titleEl.textContent = "High Scores";
    mainEl.appendChild(titleEl);
    let newScoreList =localStorage.getItem("scoreList")
    newScoreList=JSON.parse(newScoreList);
    console.log(newScoreList);
    for(var i=0; i<newScoreList.length; i++){
        // console.log(optionItem);
        var list = i+1;
        var userName = newScoreList[i].userinitail;
        var userScore = newScoreList[i].score;
        eachScore = document.createElement("h3");
        eachScore.textContent = list+ ". "+ userName+userScore;
        mainEl.appendChild(eachScore)
    }
    var btmFrame = document.createElement("div");
    btmFrame.setAttribute("class", "btn-frame")
    mainEl.appendChild(btmFrame);

    var goHomeBtn = document.createElement("button");
    var clearScoreBtn = document.createElement("button");
    goHomeBtn.textContent = "Play Again";
    clearScoreBtn.textContent = "Clear high scores";
    goHomeBtn.setAttribute("class", "back-btn")
    clearScoreBtn.setAttribute("class", "clear-btn")
    btmFrame.appendChild(goHomeBtn);
    btmFrame.appendChild(clearScoreBtn);

    goHomeBtn.addEventListener("click",startPage)
    clearScoreBtn.addEventListener("click",clearScore)
}

function clearScore(){
    localStorage.clear()
    startPage();
}
viewScorebtn.addEventListener("click",showScoreList);