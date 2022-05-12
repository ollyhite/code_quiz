var mainEl = document.querySelector(".main");
var viewScorebtn = document.querySelector(".high-scores");
var text = "Try to answer the following code-related questions within the time limit." + "\nKeep in mind that incorrect answers will penalize your score/time" +"\nby ten seconds!"
var titleEl = document.createElement("h1");
titleEl.textContent = "Code Quiz Chellenage";


var introEl = document.createElement("h2");


startPage();
function startPage(){
mainEl.innerHTML = ''
mainEl.appendChild(titleEl);

introEl.innerText = text;
mainEl.appendChild(introEl);


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
var timerInterval;

function timerStart(){
        secondsLeft = 75;
        timerInterval = setInterval(function(){
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
        showAnswer.setAttribute("class","correct");
        mainEl.appendChild(showAnswer);
        //checkIfEnd(num);

    }else{
        console.log("WRONG!!!!");
        showAnswer.textContent = "WRONG!!!!"
        showAnswer.setAttribute("class","wrong");
        mainEl.appendChild(showAnswer);
        //decreaseScore(-5);
        secondsLeft-=5;
        //checkIfEnd(num);

    }
    setTimeout(() => {
        checkIfEnd(num);
    }, 500)

}



var score;

function checkIfEnd(num){
    if(num === quizQnA.length){
        score=timeEl.textContent;
        clearInterval(timerInterval);
        console.log("end");
        showScore(score);
    }else{
        showQnA(num)
    }
}

var playerInitial;

function showScore(score){
    mainEl.innerHTML = ''
    var titleEl = document.createElement("h1");
    titleEl.textContent = "All Done!!!";
    mainEl.appendChild(titleEl);
    var scoreEl = document.createElement("h3");
    scoreEl.setAttribute("class", "score-text")
    scoreEl.textContent = "Your final score is " + score + " .";
    mainEl.appendChild(scoreEl);

    var enterIniEl = document.createElement("form");
    enterIniEl.setAttribute("class", "enter-initial-form")
    mainEl.appendChild(enterIniEl);

    var enterIniTitle =document.createElement("h3");
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
    timeEl.textContent=0;
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
    timeEl.textContent=0;
    clearInterval(timerInterval)
    var titleEl = document.createElement("h1");
    titleEl.textContent = "High Scores";
    mainEl.appendChild(titleEl);
    let newScoreList =localStorage.getItem("scoreList")
    newScoreList=JSON.parse(newScoreList);
    console.log(newScoreList);
    var showScoreList = document.createElement("div");
    showScoreList.setAttribute("class", "score-list");
    mainEl.appendChild(showScoreList);

    var btmFrame = document.createElement("div");
    btmFrame.setAttribute("class", "btn-frame")
    mainEl.appendChild(btmFrame);

    var goHomeBtn = document.createElement("button");
    var clearScoreBtn = document.createElement("button");
    goHomeBtn.textContent = "Go Back";
    clearScoreBtn.textContent = "Clear scores";
    goHomeBtn.setAttribute("class", "back-btn")
    clearScoreBtn.setAttribute("class", "clear-btn")
    btmFrame.appendChild(goHomeBtn);
    btmFrame.appendChild(clearScoreBtn);

    //newScoreList probly is null(clean storage);
    if(newScoreList){
        //sort arry first score high -> low
        var sortScoreList = newScoreList.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        console.log("sortScoreList",sortScoreList);
        for(var i=0; i<sortScoreList.length; i++){
        var list = i+1;
        var userName = sortScoreList[i].userinitail;
        var userScore = sortScoreList[i].score;
        eachScore = document.createElement("h3");
        eachScore.setAttribute("class","list-iem")
        eachScore.textContent=list+ ". "
        showScoreList.appendChild(eachScore)
        var eachUserName = document.createElement("span");
        var eachUserScore = document.createElement("span");
        eachUserName.textContent=userName;
        eachUserScore.textContent=userScore;
        eachScore.appendChild(eachUserName)
        eachScore.appendChild(eachUserScore)
        }
    var setWinner1Red = document.querySelector(".score-list").children[0];
    setWinner1Red.setAttribute("style","color: var(--pink)");
    if(newScoreList.length===2){
        var setWiiner2Green = document.querySelector(".score-list").children[1];
        setWiiner2Green.setAttribute("style","color: var(--green)");
    }else if(newScoreList.length>2){
        var setWiiner2Green = document.querySelector(".score-list").children[1];
        setWiiner2Green.setAttribute("style","color: var(--green)");
        var setWiiner2Green = document.querySelector(".score-list").children[2];
        setWiiner2Green.setAttribute("style","color: var(--green)");
    }
}
    
    goHomeBtn.addEventListener("click",startPage)
    clearScoreBtn.addEventListener("click",clearScore)
}

function clearScore(){
    localStorage.clear()
    alert("The Scores History all Cleared")
    startPage();
}
viewScorebtn.addEventListener("click",showScoreList);