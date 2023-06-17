let question=document.querySelector("#question")
const button_1=document.querySelector("#button1")
const button_2=document.querySelector("#button2")
const button_3=document.querySelector("#button3")
const button_4=document.querySelector("#button4")
const round=document.querySelector("#round")
const playerTurn=document.querySelector("#playerTurn")
let correctAnswer=""
const questionWindow=document.querySelector("#questionwindow")
const leaderButton=document.querySelector("#leaderButton")
const divBut=document.querySelector("#buttonDiv")
const leaderboard=document.querySelector("#leaderboard")
var c_audio = new Audio('correct.mp3');
var w_audio= new Audio('wrong.mp3')
// player objects

const player1 = {
  name: "p1",
  score: 0
}

const player2 = {
  name: "p2",
  score: 0
}

const player3 = {
  name: "p3",
  score: 0
}

const player4 = {
  name: "p4",
  score: 0
}

// array of players

let allPlayers = [player1, player2, player3,player4];
console.log(allPlayers[0].name)
let x=1
let y=0
let z=1

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
  allPlayers=allPlayers.reverse()
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

getRandomQuestion_playerturn()

button_1.addEventListener("click", e => checkAnswer_getQuestion(button_1.innerHTML));
button_2.addEventListener("click", e => checkAnswer_getQuestion (button_2.innerHTML));
button_3.addEventListener("click", e => checkAnswer_getQuestion (button_3.innerHTML));
button_4.addEventListener("click", e => checkAnswer_getQuestion (button_4.innerHTML));
leaderButton.addEventListener("click", e=> leaderboard_display())


