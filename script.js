const question=document.querySelector("#question")
const button_1=document.querySelector("#button1")
const button_2=document.querySelector("#button2")
const button_3=document.querySelector("#button3")
const button_4=document.querySelector("#button4")
const round=document.querySelector("#round")
const playerTurn=document.querySelector("#playerTurn")
const window1=document.querySelector('#Amount-of-players')
let correctAnswer=""
const questionWindow=document.querySelector("#questionwindow")
const leaderButton=document.querySelector("#leaderButton")
const divBut=document.querySelector("#buttonDiv")
const leaderboard=document.querySelector("#leaderboard")
var c_audio = new Audio('correct.mp3');
var w_audio= new Audio('wrong.mp3');
const p2box=document.querySelector('#p2box')
const p3box=document.querySelector('#p3box')
const p4box=document.querySelector('#p4box')
const p1button=document.querySelector('#p1but')
const p2button=document.querySelector('#p2but')
const p3button=document.querySelector('#p3but')
const p4button=document.querySelector('#p4but')
const window2=document.querySelector('#playerNames')
const gobut=document.querySelector('#startbutton')
const p1name=document.quer
// player objects


const player1 = {
  name: "",
  score: 0
}

const player2 = {
  name: "",
  score: 0
}

const player3 = {
  name: "",
  score: 0
}

const player4 = {
  name: "",
  score: 0
}




// array of players
const allPlayers=[player1,player2,player3,player4]

let x=1
let y=0
let z=1

const letsgo = () => {
  player1.name = document.getElementById("p1name").value
  player2.name = document.getElementById("p2name").value
  player3.name = document.getElementById("p3name").value
  player4.name = document.getElementById("p4name").value
  windowswap()
}
 const windowswap= () => {
  getRandomQuestion_playerturn()
  window2.classList.add("hidden")
  questionWindow.classList.remove("hidden")
 }

const soloGame = (allPlayers) => {
  allPlayers.pop()
  allPlayers.pop()
  allPlayers.pop()
  window1.classList.add("hidden")
  p2box.classList.add("hidden")
  p3box.classList.add("hidden")
  p4box.classList.add("hidden")
  window2.classList.remove("hidden")
  console.log(allPlayers)
  
}

const duoGame = (allPlayers) => {
  allPlayers.pop()
  allPlayers.pop()
  window1.classList.add("hidden")
  p3box.classList.add("hidden")
  p4box.classList.add("hidden")
  window2.classList.remove("hidden")
  console.log(allPlayers)
}

const trioGame = (allPlayers) => {
  allPlayers.pop()
  window1.classList.add("hidden")
  p4box.classList.add("hidden")
  window2.classList.remove("hidden")
  console.log(allPlayers)
}

const quadGame = (allPlayers) => {
  window1.classList.add("hidden")
  window2.classList.remove("hidden")
  console.log(allPlayers)
}


const checkAnswer_getQuestion = (ans) =>{
  if(ans===correctAnswer){
    allPlayers[y].score+=1
    c_audio.play()
  }else{
    w_audio.play()
  }
  
  
  limit=allPlayers.length*10
  if (x<limit){
    y=y+1
    y=y%allPlayers.length
    getRandomQuestion_playerturn()
    x=x+1
    if (allPlayers.length!=1){
      if (y===0){
        z=z+1
        round.innerHTML=("ROUND "+z) 
      }
    }else{
      z=x
      round.innerHTML=("ROUND "+z) 
    }

  }else{
    get_leaderbutton()
  }
}

const get_leaderbutton = () => {
  questionWindow.classList.add("hidden")
  allPlayers.sort(compare_score);
  allPlayers.reverse()
  console.log(allPlayers)
  divBut.classList.remove("hidden")
}

function compare_score( a, b )
  {
  if ( a.score < b.score){
    return -1;
  }
  if ( a.score > b.score){
    return 1;
  }
  return 0;
}

//shows the leaderboard
function leaderboard_display()
  {
    divBut.classList.add("hidden")
    leaderboard.classList.remove("hidden");
    let j=0
    let temp=""
    for(i=0;i<allPlayers.length;i++){
      temp=("#name"+i)
      const name=document.querySelector(temp)
      name.innerHTML=((i+1)+". "+allPlayers[i].name)
      temp=("#score"+i)
      const score=document.querySelector(temp)
      score.innerHTML=(allPlayers[i].score)
    }
  }
  

const getRandomQuestion_playerturn = async () => {
  var name=allPlayers[y].name
  playerTurn.innerHTML=(name+"'s TURN")
  const query=  await fetch("https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=1");
  const data = await query.json();
  question.innerHTML=data[0].question
  answers=[]
  answers.push(data[0].incorrectAnswers[0], data[0].incorrectAnswers[1], data[0].incorrectAnswers[2],data[0].correctAnswer)

  
  let i=0
  let b=1

  while (answers.length >0){
    i=Math.floor(Math.random() * answers.length)
    if (i===answers.length){
      i=i-1
    }
    bgenerated=document.querySelector("#button"+b);
    b=b+1
    bgenerated.innerHTML=answers[i]
    answers.splice(i,1)
  }
  correctAnswer = data[0].correctAnswer

}



gobut.addEventListener("click", e=> letsgo())

button_1.addEventListener("click", e => checkAnswer_getQuestion(button_1.innerHTML));
button_2.addEventListener("click", e => checkAnswer_getQuestion (button_2.innerHTML));
button_3.addEventListener("click", e => checkAnswer_getQuestion (button_3.innerHTML));
button_4.addEventListener("click", e => checkAnswer_getQuestion (button_4.innerHTML));
leaderButton.addEventListener("click", e=> leaderboard_display())

p1button.addEventListener("click", e=> soloGame(allPlayers))
p2button.addEventListener("click", e=> duoGame(allPlayers))
p3button.addEventListener("click", e=> trioGame(allPlayers))
p4button.addEventListener("click", e=> quadGame(allPlayers))
