const card = Array.from(document.querySelectorAll('.cell'));
const front = document.querySelectorAll('.front')
const container = document.querySelector('.container')
const score = document.querySelector('.score span')
const restartButton = document.querySelector('.restart-button');


suffleImage()
clicking()
function suffleImage(){

    card.forEach(c=>{

        const num = [...Array(card.length).keys()] // pravi array duzine cards 
        const random = Math.floor(Math.random()*card.length)

        c.style.order = num[random]
    })
}

function clicking() {
    for (let i = 0; i < card.length; i++) {
      card[i].addEventListener('click', () => {
        if (!front[i].classList.contains('match')) {
          front[i].classList.add('flip');
        }
        const flippedCard = document.querySelectorAll('.flip');
        if (flippedCard.length == 2) {
          container.style.pointerEvents = 'none'; // ogranicenje da se ne moze selektovati vise od 2 kartice
          setInterval(() => {
            container.style.pointerEvents = 'all';
          }, 1000);
          match(flippedCard[0], flippedCard[1]);
        }
      });
    }
  }
  


function match(cardOne, cardTwo){
    if(cardOne.dataset.index == cardTwo.dataset.index){
        score.innerHTML = parseInt(score.innerHTML) + 1
        cardOne.classList.remove('flip')
        cardTwo.classList.remove('flip')

        cardOne.classList.add('match')
        cardTwo.classList.add('match')

    }else{
        setTimeout(() => {
        cardOne.classList.remove('flip')
        cardTwo.classList.remove('flip')
    }, 1000);
    }
}

function clearFields() {
    card.forEach(c => c.style.display = 'none');
  
    // remove the 'match' class from all the cards
    card.forEach(c => c.classList.remove('match'));
  
    // flip over all the cards that are currently matched
    front.forEach(f => {
      if (f.classList.contains('match')) {
        f.classList.remove('match');
        f.parentElement.classList.remove('flip');
      }
    });
  
    // flip over all the cards that are currently flipped
    front.forEach(f => {
      if (f.classList.contains('flip')) {
        f.parentElement.classList.remove('flip');
      }
    });
  
    // show all the cards
    card.forEach(c => c.style.display = 'block');
  
    // shuffle the cards and apply the event listeners
    suffleImage();
    clicking();
    score.innerHTML = 0;
  }
  
  
  
  
restartButton.addEventListener('click', clearFields);
  

