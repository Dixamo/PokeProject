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

    init(){
        console.log('Oigan muyayos ecucharon ese rempalago??', this.gameSize)
        this.setDimensions()
        this.setListener()
        this.start()
    },

    setDimensions() { 
        this.gameScreen.style.width = `${this.gameSize.width}px`
        this.gameScreen.style.height = `${this.gameSize.height}px`
    },

    setListener() {
        document.addEventListener("keydown", event => this.getInput(event.key, true))
        document.addEventListener("keyup", event => this.getInput(event.key, false))
    },

    getInput(key, state) {
        switch (key) {
            case 'ArrowLeft':
                this.pokemonPlayer.actions.left = state;
                break;
            case 'ArrowRight':
                this.pokemonPlayer.actions.right = state;
                break;
            case 'ArrowUp':
                this.pokemonPlayer.actions.up = state;
                break;
            case 'ArrowDown':
                this.pokemonPlayer.actions.down = state;
                break;
            case ' ':
                this.pokemonPlayer.actions.specialAttack = state;
                break;
            case 'x':
                this.pokemonPlayer.actions.normalAttack = state
                break
        }
    },

    start(){
        console.log("Diablo señorita")
        this.createElements()
        this.gameLoop()
    },

    createElements() {
        this.pokemonPlayer = new Player(this.gameScreen, this.gameSize, 100, 20, 10, 100)
        this.pokemonIa = new Enemy(this.gameScreen, this.gameSize, 1000, 20, 10, 100)
    },

    gameLoop() {
        this.drawAll()
        this.isOutOfCombat()
        this.loopCounter++
        if (this.loopCounter % 2 === 0 && this.pokemonPlayer.pp < 80){
            this.restorePP(this.pokemonPlayer)
        }
        if (this.loopCounter % 5 === 0 && this.pokemonIa.pp < 80) {
            this.restorePP(this.pokemonIa)
        }
        if (this.loopCounter % 7 === 0 && this.loopCounter % 5 === 0) {
            this.pokemonIa.specialAttack()
        }
        
        this.isCollision()
        window.requestAnimationFrame(() => this.gameLoop())
    },

    drawAll() {
        this.pokemonPlayer.move()
        this.pokemonIa.move()
    },

    isCollision() {
        this.pokemonPlayer.mts.forEach((elm, i) => {
            if (
                this.pokemonIa.pokemonPosition.left + this.pokemonIa.pokemonSize.width >= elm.mtPosition.left &&
                this.pokemonIa.pokemonPosition.left <= elm.mtPosition.left + elm.mtSize.width &&
                this.pokemonIa.pokemonPosition.top + this.pokemonIa.pokemonSize.height >= elm.mtPosition.top &&
                this.pokemonIa.pokemonPosition.top <= elm.mtPosition.top + elm.mtSize.height
            ) {
                this.pokemonIa.recibeDamage(elm.power)
                this.pokemonPlayer.mts.splice(i, 1)
                elm.mtElement.remove()
            }
        })
        this.pokemonIa.mts.forEach((elm, i) => {
           if(
                this.pokemonPlayer.pokemonPosition.left + this.pokemonPlayer.pokemonSize.width >= elm.mtPosition.left &&
                this.pokemonPlayer.pokemonPosition.left <= elm.mtPosition.left + elm.mtSize.width &&
                this.pokemonPlayer.pokemonPosition.top + this.pokemonPlayer.pokemonSize.height >= elm.mtPosition.top &&
                this.pokemonPlayer.pokemonPosition.top <= elm.mtPosition.top + elm.mtSize.height
            ){
                this.pokemonPlayer.recibeDamage(elm.power)
                this.pokemonIa.mts.splice(i, 1)
                elm.mtElement.remove()
            }
        })
    },

    isOutOfCombat() {
        if(this.pokemonPlayer.health <= 0) {
            alert('hahahahahahha perdiste otra vez paquete')
            this.pokemonPlayer.pokemonElement.remove()
        }

        if(this.pokemonIa.health <= 0){
            alert('muh bien, ganaste, quiereh un pin o argo?')
            this.pokemonIa.pokemonElement.remove()
        }

    },

    restorePP(character) {
        character.pp++
    }
}