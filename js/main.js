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

function renderHands() {
    let cardTemplate = "";
    contestants.dealer.cards.forEach(function (card){
        cardTemplate += `<div class="card ${card.face}"></div>`;
    });
    dealerHand.innerHTML = cardTemplate;
}


function initialDeal(evt) {
    contestants.dealer.cards.push(shuffledDeck.pop(),shuffledDeck.pop());
    
    renderHands();
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
          value: Number(rank) || (rank === 'A' ? 11 : 10)
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