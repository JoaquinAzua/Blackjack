/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let cards, handvalue, gameStatus, tracker,contestants, shuffledDeck;

/*----- cached element references -----*/
const dealerHand = document.getElementById("dealersCards");
const playerHand = document.getElementById("playersCards");
const status = document.getElementById("gSLabel");
const 

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', )

/*----- functions -----*/
init();

contestants = {
   player: {
        cards: [shuffledDeck.pop(), shuffledDeck.pop()],
        handValue: 0, 
    },
    dealer: {
        cards: [shuffledDeck.pop(),shuffledDeck.pop()],
        handValue: 0,
    }
}
function init() {
    shuffledDeck = getNewShuffledDeck();

    render();
};

function render() {
let cardTemplate = `<picture id="dealersCards ${cards[0].face}"></picture>`;
pictureEl.innerHTML = cardTemplate;
}


function dealInitialHands() {

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