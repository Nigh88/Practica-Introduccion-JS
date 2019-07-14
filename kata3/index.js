class Deck {
    constructor () {
        this.suits = ['S', 'H', 'C', 'D'];
        this.symbols = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		this.cards = [];
        this.ranks = {
            'Straight flush': 9,
            'Four of a kind': 8,
            'Full house': 7,
            'Flush': 6,
            'Straight': 5,
            'Three of a kind': 4,
            'Two pairs': 3,
            'Pair': 2,
            'High card': 1,
        };

        this.playerOneCards = [];
        this.playerTwoCards = [];

    }

    play(hand1, hand2) {
		
		this.cards = [];
		
		// Añadimos las cartas de la baraja a la variable cards
        for (let i = 0; i < this.suits.length; i++) {
            for (let x = 0; x < this.symbols.length; x++) {
                this.cards.push(this.symbols[x] + this.suits[i]);
            }
        }
		
        this.playerOneCards = hand1.split(' ');
		this.playerTwoCards = hand2.split(' ');
		
		if (!this.checkCards(this.playerOneCards)) {
			return;
		}
		
		if (!this.checkCards(this.playerTwoCards)) {
			return;
        }
        
        var rank1 = this.getRank(this.playerOneCards);
        var rank2 = this.getRank(this.playerTwoCards);
        var highCard1 = this.getHighCard(this.playerOneCards);
        var highCard2 = this.getHighCard(this.playerTwoCards);
        this.compareHands(rank1, rank2, highCard1, highCard2);
    }

    checkCards(requestedCards) {
		if (requestedCards.length === 5) {
			
			for (let i = 0; i < requestedCards.length; i++) {
				// Comprobar que las cartas sean válidas
				let index = this.cards.indexOf(requestedCards[i]);
				if (index === -1) {
					console.log('Esta carta esta en uso ' + requestedCards[i]);
					return false;
				}
				
                this.cards.splice(index, 1);
			}
        } else {
            console.log('Debes escribir cinco cartas');
			return false;
        }
		
        return true;
    }

    getRank(hand) {
        
		var sameSuit = true;
		var consecutiveValues = true;
        var repeatedSymbols = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		
		// Ordenar mano de menor a mayor
		var orderedHand = hand.sort((a, b) => this.symbols.indexOf(a.split('')[0]) - this.symbols.indexOf(b.split('')[0]));
		var suit = '';
        var index = -1;
		
		for (let i = 0; i < orderedHand.length; i++){
            var card = orderedHand[i].split('');
            
			// Coge el primer suit
			if (suit === ''){
                suit = card[1];
				index = this.symbols.indexOf(card[0]);
			}
			//Parejas y trios, full, poker, color
			if (card[1] !== suit) {
				sameSuit = false;
            }

            index = this.symbols.indexOf(card[0]);

			//Escalera
			// Si la siguiente carta no tiene un valor consecutivo
			if (i < orderedHand.length - 1) {
				if (this.symbols.indexOf(orderedHand[i + 1].split('')[0]) !== index + 1) {
					consecutiveValues = false;
                }
            }            

            //Guardamos los valores en un array para saber cuantos tenemos de cada
            repeatedSymbols[index] += 1;
            suit = card[1];
            
        }
        //Escalera de color
        if (consecutiveValues === true && sameSuit === true){
            return 'Straight flush';
        }

         //Color
        else if(sameSuit){
            return 'Flush';
        }

        //Escalera
        else if(consecutiveValues){
            return 'Straight';
        }

        //Poker
        else{
            var trio = false;
            var pair = false;
            var pairs = 0;
            for(let i = 0; i < repeatedSymbols.length; i++){
                if(repeatedSymbols[i] === 4){
                    return 'Four of a kind';
                }

                //Trio
                else if(repeatedSymbols[i] === 3){
                    trio = true;                    
                }

                //Pareja
                else if(repeatedSymbols[i] === 2){
                    pairs += 1;
                    pair = true;
                }
            }

            //Full House
            if(trio && pair){
                return 'Full house';
            }
            
            //Trio
            else if(trio){
                return 'Three of a kind';
            }

            //Doble pareja
            else if(pairs === 2){
                return 'Two pairs';
            }

            //Pareja
            else if(pair){
                return 'Pair';
            }

            //Carta alta
            else{
                return 'High card';
            }
           
        }
    }

    getHighCard(hand){
        var highCard = 0;
        for (let i = 0; i < hand.length; i++){
            var card = hand[i].split('');
            if (this.symbols.indexOf(card[0]) > this.symbols.indexOf(highCard)){
                highCard = card[0];
            }
        }
        return highCard;
    }

    compareHands(rank1, rank2, highCard1, highCard2) {
        if(this.ranks[rank1] > this.ranks[rank2]){
            console.log('Jugador uno gana, ' + rank1);
        }

        else if(this.ranks[rank2] > this.ranks[rank1]){
            console.log('Jugador dos gana, ' + rank2);
        }

        else{
            var high1 = this.symbols.indexOf(highCard1);
            var high2 = this.symbols.indexOf(highCard2);
            if(high1 > high2){
                console.log('Jugador uno gana por carta mas alta, ' + highCard1);
            }
            else if(high2 > high1){
                console.log('Jugador dos gana por carta mas alta, ' + highCard2);
            }
            else{
                console.log('Empate');
            }
        }
    }
}

let game = new Deck();
game.play('2H 3D 5S 9C KD', '2C 3H 4S 8C AH');

game.play('2H 4S 4C 2D 4H', '2S 8S AS QS 3S');

game.play('8H 3D 5S 9C KD', '2S 2H 2D 2C AH');

game.play('2H 3D 5S 9C KD', '2D 3H 5C 9S KH');

game.play('6H 4D 5S 9C KD', '2D 3H 5C 9S KD');
