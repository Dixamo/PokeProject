const Game = {

    gameScreen: document.querySelector('#game-screen'),

    gameSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    pokemonPlayer: undefined,

    pokemonIa: undefined,

    loopCounter: 0,

    keys: {
        NORMALATTACK: 'x',
        SPECIALATTACK: 'Space',
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight'
        
    },

    setDimensions() { 
        this.gameScreen.style.width = `${this.gameSize.width}px`
        this.gameScreen.style.height = `${this.gameSize.height}px`
    },

    init(){
        console.log('Oigan muyayos ecucharon ese rempalago??', this.gameSize)
        this.setDimensions()
        this.start()
    },

    start(){
        console.log("Diablo señorita")
        this.createElements()
        this.gameLoop()
    },

    /*setEventListener() {
        document.addEventListener("keydown", event =>{
            switch(event.code){
                case this.keys.UP:
                    this.pokemonPlayer.goUp()
                    break
                case this.keys.DOWN:
                    this.pokemonPlayer.goDown()
                    break
                case this.keys.LEFT:
                    this.pokemonPlayer.goLeft()
                    break
                case this.keys.RIGHT:
                    this.pokemonPlayer.goRight()
                    break
                case this.keys.NORMALATTACK:
                    this.pokemonPlayer.attackNormal()
                    break
                case this.keys.SPECIALATTACK:
                    this.pokemonPlayer.attackSpecial()
                    break
            }
        })
    },*/

    createElements() {
        this.pokemonPlayer = new Pokemon(this.gameScreen, this.gameSize, 100, 20, 10)
        this.pokemonIa = new Pokemon(this.gameScreen, this.gameSize, 100, 20, 10)
    },

    gameLoop() {
        this.drawAll()
        this.loopCounter++
        if (this.loopCounter % 7 === 0 && this.loopCounter % 2 === 0) {
            this.pokemonIa.actions.up = true
        }
        else {
            this.pokemonIa.actions.up = false
        }
        window.requestAnimationFrame(() => this.gameLoop())
    },

    drawAll() {
        this.pokemonPlayer.move()
        this.pokemonIa.move()
    }
}