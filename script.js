const card = Array.from(document.querySelectorAll('.cell'));
const front = document.querySelectorAll('.front')
const container = document.querySelector('.containerM')
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
let clickDelay = 1000; // delay in milliseconds

function clicking() {
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener('click', () => {
      if (!front[i].classList.contains('match')) {
        front[i].classList.add('flip');
      }
      const flippedCard = document.querySelectorAll('.flip');
      if (flippedCard.length == 2) {
        container.style.pointerEvents = 'none'; // disable clicking on any more cards
        match(flippedCard[0], flippedCard[1]);
        setTimeout(() => {
          container.style.pointerEvents = 'all'; // re-enable clicking on cards after a delay
        }, clickDelay);
      }
    });
  }
}

function match(cardOne, cardTwo) {
  if (cardOne.dataset.index == cardTwo.dataset.index) {
    score.innerHTML = parseInt(score.innerHTML) + 1;
    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');

    cardOne.classList.add('match');
    cardTwo.classList.add('match');
  } else {
    setTimeout(() => {
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
    }, 1000);
  }
}
