// the DOM elements;
let wrapper = document.querySelector('.puzzle__wrapper');
let reset = document.querySelector('.reset')
let modal = document.querySelector('.modal');
let modalExit = document.querySelector('.modal__exit');
let recordIndicator = document.querySelector('.modal__record');
let scoreType = document.querySelector('.high__score');
let score = document.querySelector('.score')


console.log(wrapper);


//START
let array = [0,1, 2, 3, 4, 5, 6, 7,8 ,9, 0, 1, 2, 3, 4, 5, 6, 7, 8,9];
//math random;
let mixed = [];
let arrFound = [];
let chosen=[];
let stepCount = window.localStorage.getItem('score')||0;
!window.localStorage.getItem('score')?window.localStorage.setItem('score', 10000):'';


window.onload=()=>render(wrapper)


reset.addEventListener('click', ()=>{
    render(wrapper)
    
})

//get rendom



function render(parent){  
    stepCount=0
    mixed =[]
    while(mixed.length!==20){
        let x = Math.floor(Math.random()*20);
        !mixed.includes(x)?mixed.push(x):mixed
    }
    parent.innerHTML =null
      mixed.map((e)=>{
          let newBlock = document.createElement('div');
          newBlock.setAttribute('class', 'box');
          newBlock.textContent = array[e];
          newBlock.dataset.id = e;
          parent.appendChild(newBlock);
          setTimeout(()=>{
            newBlock.textContent =null;
            newBlock.addEventListener('click',(elem)=>check(elem.target, array[e], e))
          }, 4000)
      })
}

function check(clicked, val, index){
    console.log('salom')
     if(clicked.textContent===''&&arrFound.length!==20){
         let elements = [...document.querySelectorAll('.box')]
         clicked.textContent = val;
         clicked.classList.add('choose');
         chosen.push(index);
         if(chosen.length===2){
             stepCount++;
             console.log(stepCount)
             let a = chosen[0];
             let b =chosen [1];
             console.log(array[a], array[b])
             let other= elements.filter(elem=>{
                return (elem.textContent)===array[a].toString() || elem.textContent=== array[b].toString()  
               })
            if (array[a]===array[b]){
                arrFound=[...arrFound, ...chosen] ;
                other.map(el=>{
                    setTimeout(()=>{
                        el.classList.add('found')
                    el.classList.remove('choose');
                    if(arrFound.length===20){
                        modal.classList.add('activate');
                        modalExit.addEventListener('click', ()=>{
                            modal.classList.remove('activate')
                        })
                        let storageScore = window.localStorage.getItem('score');
                        if(storageScore>stepCount){
                            window.localStorage.setItem('score',stepCount);
                            recordIndicator.textContent = `Your high score is ${window.localStorage.getItem('score')} steps!`;
                            scoreType.textContent='New Highscore!';
                            score.textContent=`${stepCount} steps!`
                        }
                        else{
                            recordIndicator.textContent = `Your high score is ${window.localStorage.getItem('score')} steps!`;
                            scoreType.textContent='Your score is';
                            score.textContent=`${stepCount} steps`
                        }

                    }
                    },500)
                })
        }
            else {
                
                 other.map(el=>{
                     setTimeout(()=>{
                        el.classList.remove('choose');
                        el.textContent=null;
                     }, 500)
                 })
             }
          chosen = []
         }
     }
  
       
     
}










