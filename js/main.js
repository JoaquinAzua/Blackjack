/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
// const ranks = ['02', '03', '04', '05', '06', '07', '08', '10', '10', '10', 'A', 'A', 'A'];
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let contestants,
    shuffledDeck,
    player,
    dealer,
    cards,
    handValue;

/*----- cached element references -----*/
const playerHandValue = document.getElementById("pHLabel");
const dealerHandValue = document.getElementById("dHLabel");
const dealerHand = document.getElementById("dealerHand");
const playerHand = document.getElementById("playerHand");
const statusEl = document.getElementById("gSLabel");
let dealButton = document.getElementById("#deal");
let hitButton = document.getElementById("#hit");
let stayButton = document.getElementById("#stay");

/*----- event listeners -----*/
document.querySelector("#deal").addEventListener('click', initialDeal);
document.querySelector("#hit").addEventListener('click', hit);
document.querySelector("#stay").addEventListener('click', stay);
document.querySelector("#reset").addEventListener('click', init);

/*----- functions -----*/
init();

// initialize contestans cards and handValue and shuffledeck and disables hit/stay buttons till inital deal 
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
    hitButton = document.querySelector("#hit").setAttribute("disabled", true);
    stayButton = document.querySelector("#stay").setAttribute("disabled", true);
    
    resetGame();
    renderHands();
}

function resetGame() {

    let resetPlayerHand = document.getElementById("playerHand");
    let resetDealerHand = document.getElementById("dealerHand");
    let resetDealerLabel = document.getElementById("dHLabel");
    let resetPlayerLabel = document.getElementById("pHLabel");
    resetPlayerLabel.textContent = "Players Hand:";
    resetDealerLabel.textContent = "Dealers Hand:";
    resetPlayerHand.textContent = "";
    resetDealerHand.textContent = "";

    statusEl.textContent = `Game Status:`;
    dealButton = document.querySelector("#deal").removeAttribute("disabled", true);

}

function initialDeal() {

    contestants.player.cards.push(shuffledDeck.pop(), shuffledDeck.pop());
    contestants.dealer.cards.push(shuffledDeck.pop(), shuffledDeck.pop());
    dealButton = document.querySelector("#deal").setAttribute("disabled", true);
    hitButton = document.querySelector("#hit").removeAttribute("disabled", true);
    stayButton = document.querySelector("#stay").removeAttribute("disabled", true);

    updateHandvalue('player');
    updateHandvalue('dealer');

    if (contestants.dealer.handValue === 21) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: Dealer Wins!</div>`;
        hitButton = document.querySelector("#hit").setAttribute("disabled", true);
        stayButton = document.querySelector("#stay").setAttribute("disabled", true);
    } else if (contestants.player.handValue === 21) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: Player Wins!</div>`;
        hitButton = document.querySelector("#hit").setAttribute("disabled", true);
        stayButton = document.querySelector("#stay").setAttribute("disabled", true);
    };

    renderHands();
    gameOver();
}

function renderHands() {
    // renders any hands either in initial deal or added through hit/stay to containers
    let dealerCardTemplate = "";
    let playerCardTemplate = "";

    contestants.player.cards.forEach(function (card) {
        playerCardTemplate += `<div class="card ${card.face}"></div>`;
        playerHandValue.innerHTML = `<h2 id="pHLabel">Players Hand: ${updateHandvalue("player")}</h2>`
        playerHand.innerHTML = playerCardTemplate;
    });
    contestants.dealer.cards.forEach(function (card) {
        dealerCardTemplate += `<div class="card ${card.face}"></div>`;
        dealerHandValue.innerHTML = `<h2 id="dHLabel">Dealers Hand: ${updateHandvalue("dealer")}</h2>`
        dealerHand.innerHTML = dealerCardTemplate;
    });
}
function updateHandvalue(contestant) {
    // reduce function to get sum of each contestant's hand value
    if (contestant === 'player') {
        let playerTotal = contestants.player.cards.reduce((sum, current) => {
            sum += current.value;
            return sum;
        }, 0);
        // assigning the updated hand value to the variable 
        contestants.player.handValue = playerTotal;
        if (contestants.player.handValue > 21 && contestants.player.cards.some(card => card.value === 11)) {
          let ace = contestants.player.cards.find(card => card.value === 11);
          ace.value = 1;
          let sum = 0;
          contestants.player.cards.forEach(card => sum += card.value);
          contestants.player.handValue = sum;
        }
        return playerTotal;
    } else {
        let dealerTotal = contestants.dealer.cards.reduce((sum, current) => {
            sum += current.value;
            return sum;
        }, 0);
        // assigning the updated hand value to the variable 
        contestants.dealer.handValue = dealerTotal;
        if (contestants.dealer.handValue > 21 && contestants.dealer.cards.some(card => card.value === 11)) {
          let ace = contestants.dealer.cards.find(card => card.value === 11);
          ace.value = 1;
          let sum = 0;
          contestants.dealer.cards.forEach(card => sum += card.value);
          contestants.dealer.handValue = sum;
        }
        return dealerTotal;
    }
}

function hit() {
    updateHandvalue("player");
    if (contestants.dealer.handValue === 21) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: Dealer Wins!</div>`;
    } else if (contestants.player.handValue === 21) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: Player Wins!</div>`;
    } else if (contestants.player.handValue < 21) {
        contestants.player.cards.push(shuffledDeck.pop());
    }
    renderHands();
    gameOver();
}

// contestants.dealer.handValue < contestants.player.handValue
function stay() {
    if (contestants.dealer.handValue < 18) {
        contestants.dealer.cards.push(shuffledDeck.pop());
    }
    updateHandvalue();
    if (contestants.player.handValue > contestants.dealer.handValue && contestants.dealer.handValue >=18) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: player Wins with higher hand!</div>`;
        hitButton = document.querySelector("#hit").setAttribute("disabled", true);
    } else if (contestants.dealer.handValue > contestants.player.handValue) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: Dealer Wins with higher hand!</div>`;
        hitButton = document.querySelector("#hit").setAttribute("disabled", true);
    }
    renderHands();
    gameOver();
}

function gameOver() {

    if (contestants.dealer.handValue < 21 && contestants.dealer.handValue === contestants.player.handValue) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: It's a tie!</div>`;
        // hitButton = document.querySelector("#hit").setAttribute("disabled", true);
        stayButton = document.querySelector("#stay").setAttribute("disabled", true);

    } else if (contestants.player.handValue > 21) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: Player busted, Dealer Wins!</div>`;
        hitButton = document.querySelector("#hit").setAttribute("disabled", true);
        stayButton = document.querySelector("#stay").setAttribute("disabled", true);

    } else if (contestants.dealer.handValue > 21) {
        statusEl.innerHTML = `<div id="gSLabel">Game Status: Dealer Busted, Player Wins!</div>`;
        hitButton = document.querySelector("#hit").setAttribute("disabled", true);
        stayButton = document.querySelector("#stay").setAttribute("disabled", true);

    };
}

function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
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