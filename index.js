const startup = document.querySelector('.strt-btn');
const popupinfo = document.querySelector('.popup-info');
const exitbtn =document.querySelector('.exit-btn');
const main= document.querySelector('.main');
const continuebtn= document.querySelector('.continue-btn');
const quizsection= document.querySelector('.quiz-section');
const quixbox= document.querySelector('.quiz-box');
const resultbox= document.querySelector('.result-box');
const tryAgainBtn= document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.gohome-btn')

startup.onclick= ()=>{
    popupinfo.classList.add('active');
    main.classList.add('active');
}
exitbtn.onclick=()=>{
    popupinfo.classList.remove('active');
    main.classList.remove('active');

}
continuebtn.onclick=()=>{
    quizsection.classList.add('active');
    popupinfo.classList.remove('active');
    main.classList.remove('active');
    quixbox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}
tryAgainBtn.onclick=()=>{
   quixbox.classList.add('active');
   nextbtn.classList.remove('active');
   resultbox.classList.remove('active');

   questionCount=0;
   questionNumb=1;
   userScore=0;

   showQuestions(questionCount);
   questionCounter(questionNumb);
   headerScore();
}

goHomeBtn.onclick=() =>{
    quizsection.classList.remove('active');
    nextbtn.classList.remove('active');
    resultbox.classList.remove('active');
 
    questionCount=0;
    questionNumb=1;
    userScore=0;
 
    showQuestions(questionCount);
    questionCounter(questionNumb);
}
let questionCount=0;
let questionNumb=1;
let userScore=0;


const nextbtn=document.querySelector('.next-btn');

nextbtn.onclick=()=>{

    if(questionCount < questions.length-1){
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);
    }
    else{
        // console.log('Question Completed');
        showResultBox();
    }
}
const optionList=document.querySelector('.option-list')
//getting questions and option from array
function showQuestions(index){
    const questionText= document.querySelector('.question-text');
    questionText.textContent=`${questions[index].numb}. ${questions[index].question}`;

    let optiontag=`<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

   optionList.innerHTML = optiontag;

   const option= document.querySelectorAll('.option');
   for(let i=0; i<option.length; i++){
    option[i].setAttribute('onclick','optionSelected(this)');

   }  
}
function optionSelected(answer){
    let userAnswer=answer.textContent;
    let corectAnswer=questions[questionCount].answer;
    let allOptions= optionList.children.length;

    if(userAnswer==corectAnswer){
        console.log('answer is correct');
        answer.classList.add('correct');
        userScore +=1;
        headerScore();
    }
    else{
        console.log('answer is not correct');
        answer.classList.add('incorrect');

        //if anser in incorrect the auto selected correct answer
        for(let i=0; i<allOptions; i++){
            if(optionList.children[i].textContent==corectAnswer){
                optionList.children[i].setAttribute('class','option correct');
            }
        }

    }

    //if we select one option then disable all option

    for(let i=0; i<allOptions; i++){
        optionList.children[i].classList.add('disable');
    }
    nextbtn.classList.add('active');
    
   }
function questionCounter(index){
    const questionTotal=document.querySelector('.question-total');
    questionTotal.textContent=`${index} of ${questions.length} Questions`;
}
function headerScore(){
    const headerScoreText=document.querySelector('.header-score');
    headerScoreText.textContent= `Score : ${userScore} / ${questions.length}`;
}
function showResultBox(){
    quixbox.classList.remove('active');
    resultbox.classList.add('active');

    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;

    const circularProgress=document.querySelector('.circular-progress');
    const progressValue= document.querySelector('.progress-value');
    let progressStartValue=0;
    let progressEndValue=(userScore / questions.length) * 100;
    let speed=20;

    let progress=setInterval(()=>{
        progressStartValue++;
        // console.log(progressStartValue);
        progressValue.textContent=`${progressStartValue}%`;
        circularProgress.style.background=`conic-gradient(ghostwhite ${progressStartValue * 3.6 }deg , rgba(255,255,255, .1)0deg)`
        if(progressStartValue==progressEndValue){
            clearInterval(progress);
        }


    },speed);

}