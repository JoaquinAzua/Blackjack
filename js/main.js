/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let cards, handvalue, gameStatus, tracker,contestants, shuffledDeck;

/*----- cached element references -----*/

/*----- event listeners -----*/
/*----- functions -----*/

function init() {
    const contestants = {
       player: {
            cards: [shuffledDeck.pop(), shuffledDeck.pop()],
            handValue: 0, 
        },
        dealer: {
            cards: [shuffledDeck.pop(),shuffledDeck.pop()],
            handValue: 0,
        }
    }
};

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