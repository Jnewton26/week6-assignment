// Coding Steps:
// For the final project you will be creating an automated version of the classic card game WAR. 
// You do not need to accept any user input, when you run your code, 
// the entire game should play out instantly without any user input. 
// Think about how you would build this project and write your plan down. 
// Consider classes such as Card, Deck, and Player and what fields and methods they might each have. 
// You can implement the game however you’d like (i.e. printing to the console, using alert, or some other way). 
// The completed project should, when ran, do the following:
// 	•	Deal 26 Cards to two Players from a Deck. 
// 	•	Iterate through the turns where each Player plays a Card
// 	•	The Player who played the higher card is awarded a point
// 	•	Ties result in zero points for either Player
// 	•	After all cards have been played, display the score.
// Write a Unit Test using Mocha and Chai for at least one of the functions you write.

// class for the player 

//Player Class 
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.hand = [];
    }
    //add cards to each player's hand
    addHand(deck) {
        for (let i = 0; i < deck.length; i++) {
            this.hand.push(deck[i]);
        }
        return this.hand;
    }

    //add one to each player's score 
    incrementScore() {
        this.score += 1;
        return this.score;
    }
}

//Deck class 
class Deck {
    constructor() {
        this.deck = [];
    }

    //create deck of 52 cards 
    createDeck() {
        let suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        let rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < rank.length; j++) {
                this.deck.push({
                    suits: suits[i],
                    rank: rank[j],
                    value: j
                });
            }
        }
        return this.deck;
    }

    //push a deck, randomized/shuffled, into a new shuffled deck. 
    shuffle() {
        let count = this.deck.length;
        while (count) {
            this.deck.push(this.deck.splice(Math.floor(Math.random() * count), 1)[0]);
            count -= 1;
        }
        return this.deck;
    }
}


/* Game Play */


//create deck
const mainDeck = new Deck();

mainDeck.createDeck();

//shuffle deck
mainDeck.shuffle();

//check to see if all cards are in the deck
console.log(mainDeck);

//create players 
let player1 = new Player("Player 1");
let player2 = new Player("Player 2");

//deal cards to each player
dealCards(player1, player2, mainDeck);

//Play game until all cards hav been played 
playGame(player1, player2);



// /* Functions for War Game */

//deal cards to each player 
function dealCards(p1, p2, deck) {
    let player1Hand = deck.deck.slice(0, 26);
    let player2Hand = deck.deck.slice(26);
    p1.addHand(player1Hand);
    p2.addHand(player2Hand);
    //console.log(p2.player2Hand);
    return player1Hand;
}

//play game (call compareHand until there are no more cards left)
function playGame(p1, p2) {
    do {
        compareHand(p1, p2);
        console.log(`Player 1 Score: ${p1.score}, Player 2 Score: ${p2.score}`);
    } while (p1.hand.length != 0 && p2.hand.length != 0)
}

function compareHand(p1, p2) {
    let x = p1.hand[0];
    let y = p2.hand[0];


    if (x.value > y.value) {
        //removes first card from deck 
        console.log(x.value);
        console.log(y.value);
        p1.hand.shift(x);
        p2.hand.shift(y);
        //add one to player1's score if they win
        p1.incrementScore();
        return p1.score;
    } else if (x.value < y.value) {
        //removes first card from deck
        console.log(x.value);
        console.log(y.value);
        p1.hand.shift(x);
        p2.hand.shift(y);
        //add one to player2's score if they win
        p2.incrementScore()
        return p2.score;
    } else {
        console.log(x.value);
        console.log(y.value);
        p1.hand.shift(x);
        p2.hand.shift(y);
        //do not add a point to scores
        return 0;
    }
}