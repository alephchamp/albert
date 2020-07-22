class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    init() {
    }

    preload() {
        //loop and preload images
        for (var i = 1; i < 7; i++) {
            this.load.image("image" + i, "images/" + i + ".png");
        }
    }

    create() {
        //make an array to loop through later
        //to turn off and on cards
        this.cardArray = [];
        //
        //Align Grid for placing objects
        //
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
        //for debugging
        this.aGrid.showNumbers();
        //
        //Make the big cards
        //
        for (var i = 1; i < 7; i++) {
            let card = this.add.image(0, 0, "image" + i);
            //
            //scale the cards to 25% of the game's with
            //
            Align.scaleToGameW(card, .25);
            //
            //Place all the big cards on spot 52
            //
            this.aGrid.placeAtIndex(52, card);
            //
            //Add them to the list
            //
            this.cardArray.push(card);
        }
        //
        //Make the small cards
        //
        for (var i = 1; i < 7; i++) {
            let card = this.add.image(0, 0, "image" + i);
            //
            //give the card an index
            //
            card.index = i;
            //
            //Scale the card to 10% of the game's width
            //
            Align.scaleToGameW(card, .1);
            //
            //Place each card on a new row on the grid
            //
            this.aGrid.placeAtIndex(12 + (i * 11), card);
            //
            //set the card interactive so it can be clicked on
            //
            card.setInteractive();
        }
        //add a listener to the scene so when an interactive game object
        //is clicked it will call the function
        this.input.on('gameobjectdown', this.cardClick.bind(this));
    }
    cardClick(pointer, card) {
        console.log(card.index);
        //turn the big card with the same number 
        //as the small card visible
        this.turnCardOn(card.index);
    }
    allOff() {
        //turn all the big cards invisible
        for (var i = 0; i < 6; i++) {
            this.cardArray[i].visible = false;
        }
    }
    turnCardOn(index) {
        //
        //turn off all the big cards
        //
        this.allOff();
        //
        //turn back on the one big card we need
        //
        this.cardArray[index - 1].visible = true;
    }
}