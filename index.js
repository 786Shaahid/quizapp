const questions=document.querySelector('#question');
const option1=document.querySelector('#option1');
const option2=document.querySelector('#option2');
const option3=document.querySelector('#option3');
const option4=document.querySelector('#option4');
const questionNum=document.querySelector('#count');
const allInput=document.getElementsByName('opt');
const btn=document.querySelector('#btn');
const scoreDisplay=document.querySelector('#scoreBox');
const header=document.querySelector('#quiz');
const btnBox=document.querySelector('#btnContainer');

async function fetchData(k) {
  const url =`https://opentdb.com/api.php?amount=${k}`;
  let res = await fetch(url);
  let { results } = await res.json();
  return results;
}
let num=0;
let score=0;
async function storeData(){
    let numQuestion=10;
    let results = await fetchData(`${numQuestion}`);
    forDisplay(num,results[num]);
   
    return {results,numQuestion};
}
storeData();
let getValueOfInput=()=>{
    let answer;
    allInput.forEach((currentInput)=>{
        if(currentInput.checked){
            answer=currentInput.value;
        }
    });
    return answer;
}

btn.addEventListener("click",async(e)=>{
    let dataOnclick= await storeData();
    console.log(dataOnclick.numQuestion);
    num++;
   if(num<dataOnclick.numQuestion){
       forDisplay(num,dataOnclick.results[num]);
       let givenAnswer=getValueOfInput();
           if(givenAnswer===dataOnclick.results[num].correct_answer){
               score++;}
               console.log(score);
   }else{
    let HTML=`<div id="scoreBox">
    <h1>Score</h1>
    <p id="scoreResult">Your Scored ${score}/${dataOnclick.numQuestion} </p>
    <button type="submit" id="btn" onclick="location.reload()">RESTART</button></div>

 </div>`
      btnBox.insertAdjacentHTML("afterend",HTML);
}
})

// function forDisplay(num,display){

//     let container=document.createElement('div');
//     container.setAttribute('id',"container");

//     let question=document.createElement('h1');
//     question.innerHTML=`Q.${num+1}&nbsp;${display.question}`;
//     question.setAttribute('id',"question");

//     let input1=document.createElement('input');
//     input1.setAttribute('id',"ans1");
//     input1.setAttribute('type',"radio");
//     input1.setAttribute('name',"opt");
//     input1.setAttribute('value',`${display.incorrect_answers[0] ? display.incorrect_answers[0]:"-"}`);

//     let lable1=document.createElement('lable');
//     lable1.innerHTML=`${display.incorrect_answers[0] ? display.incorrect_answers[0]:"-"} <br>`;
//     lable1.setAttribute('id',"option1");
//     lable1.setAttribute('for','ans1')
 
//     let input2=document.createElement('input');
//     input2.setAttribute('id',"ans2");
//     input2.setAttribute('type',"radio");
//     input2.setAttribute('name',"opt");
//     input2.setAttribute('value',`${display.incorrect_answers[1] ? display.incorrect_answers[1]:"-"}`);

//     let lable2=document.createElement('lable');
//     lable2.innerHTML=`${display.incorrect_answers[1] ? display.incorrect_answers[1]:"-"}<br>`;
//     lable2.setAttribute('id',"option2");
//     lable2.setAttribute('for','ans2')
 
//     let input3=document.createElement('input');
//     input3.setAttribute('id',"ans3");
//     input3.setAttribute('type',"radio");
//     input3.setAttribute('name',"opt");
//     input3.setAttribute('value',`${display.incorrect_answers[2] ? display.incorrect_answers[2]:"-"}`);

//     let lable3=document.createElement('lable');
//     lable3.innerHTML=`${display.incorrect_answers[2] ? display.incorrect_answers[2]:"-"}<br>`;
//     lable3.setAttribute('id',"option3");
//     lable3.setAttribute('for','ans3')

//     let input4=document.createElement('input');
//     input4.setAttribute('id',"ans4");
//     input4.setAttribute('type',"radio");
//     input4.setAttribute('name',"opt");
//     input4.setAttribute('value',`${display.correct_answer}`);

//     let lable4=document.createElement('lable');
//     lable4.innerHTML=`${display.correct_answer} <br>` ;
//     lable4.setAttribute('id',"option4");
//     lable4.setAttribute('for','ans4');

//     header.insertAdjacentElement("afterend",container);
//      container.appendChild(question);
//      container.appendChild(input1);
//      container.appendChild(lable1);
//      container.appendChild(input2);
//      container.appendChild(lable2);
//      container.appendChild(input3);
//      container.appendChild(lable3);
//      container.appendChild(input4);
//      container.appendChild(lable4);
// }
function forDisplay(num,display) {
   questions.innerHTML=`Q.${num+1}&nbsp;${display.question}`;
   option1.innerHTML=`${display.incorrect_answers[0] ? display.incorrect_answers[0]:"-"}`;
   option2.innerHTML=`${display.incorrect_answers[1] ? display.incorrect_answers[1]:"-"}`;
   option3.innerHTML=`${display.incorrect_answers[2] ? display.incorrect_answers[2]:"-"}`;
   option4.innerHTML=`${display.correct_answer}`;
   document.querySelector('#ans1').value=`${display.incorrect_answers[0] ? display.incorrect_answers[0]:"-"}`;
   document.querySelector('#ans2').value=`${display.incorrect_answers[1] ? display.incorrect_answers[1]:"-"}`;
   document.querySelector('#ans3').value=`${display.incorrect_answers[2] ? display.incorrect_answers[2]:"-"}`;
   document.querySelector('#ans4').value=`${display.correct_answer}`;
}
