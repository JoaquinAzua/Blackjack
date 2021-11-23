/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let contestants, shuffledDeck, player, dealer, cards, handValue;

/*----- cached element references -----*/
const playerHandValue = document.getElementById("pHLabel");
const dealerHandValue = document.getElementById("dHLabel");
const dealerHand = document.getElementById("dealerHand");
const playerHand = document.getElementById("playerHand");
const status = document.getElementById("gSLabel");


/*----- event listeners -----*/
 document.querySelector("#deal").addEventListener('click', initialDeal);
 document.querySelector("#hit").addEventListener('click', drawNextHand);
 document.querySelector('#stay').addEventListener('click', stay);

/*----- functions -----*/
init ();

function init() {
    shuffledDeck = getNewShuffledDeck();
    contestants = {
       player: {
            cards: [],
            handValue: 0, 
        },
        dealer: {
            cards: [],
            handValue: 0,
        }
    }

    renderHands();
};
function initialDeal(evt) {
    
    contestants.player.cards.push(shuffledDeck.pop(), shuffledDeck.pop());
    contestants.dealer.cards.push(shuffledDeck.pop(), shuffledDeck.pop());

    renderHands();
    
}

function renderHands() {
    let dealerCardTemplate = "";
    let playerCardTemplate = "";

    let dealerSum = contestants.dealer.handValue;
    let playerSum = contestants.player.handValue;

    if (contestants.dealer.handValue === 0 || contestants.player.handValue ===0 ) {
        contestants.player.cards.forEach(function (card) {
            playerCardTemplate += `<div class="card ${card.face}"></div>`;
            playerHandValue.innerHTML = `<h2 id="pHLabel">Players Hand: ${updateHandvalue("player")}</h2>`
        })
        contestants.dealer.cards.forEach(function (card){
            dealerCardTemplate += `<div class="card ${card.face}"></div>`;
            dealerHandValue.innerHTML = `<h2 id="dHLabel">Dealers Hand: ${updateHandvalue("dealer")}</h2>`
        });
        dealerHand.innerHTML = dealerCardTemplate;
        playerHand.innerHTML = playerCardTemplate;
    } 
}

function updateHandvalue(contestant)
{
    //let ace;
    let sum = 0;
    // reduce function to get sum of each contestant's hand value
    if (contestant === "player") {
        return contestants.player.cards.reduce((sum, current) => {
            sum += current.value;
            return sum;
          }, 0);
    } else {
        return contestants.dealer.cards.reduce((sum, current) => {
            sum += current.value;
            return sum;
        }, 0);
    }
    updateHandvalue();
}

function winLogic() {

}



function drawNextHand(evt) {
    console.log(evt.target);
}

function stay(evt) {
    console.log(evt.target);
}

function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          value: Number(rank) || (rank === 'A' ? 1 : 10)
        });
      });
    });
    return deck;
  }

  function getNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }