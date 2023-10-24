const Game = {

    gameScreen: document.querySelector('#game-screen'),

    gameSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    playerTeam: [
        {
            name: 'Pikachu',
            health: 100,
            power: 20,
            pp: 100,
            sprite: ''
        },
        {
            name: 'Charmander',
            health: 100,
            power: 20,
            pp: 100,
            sprite: ''
        },
        {
            name: 'Dratini',
            health: 100,
            power: 20,
            pp: 100,
            sprite: ''
        },
    ],

    playerIndex: 0,

    pokemonPlayer: undefined,

    iaTeam: [
        {
            name: 'Alakazam',
            health: 10,
            power: 50,
            pp: 100,
            sprite: ''
            
        },
        {
            name: 'Gyarados',
            health: 10,
            power: 50,
            pp: 100,
            sprite: ''
        },
        {
            name: 'Persian',
            health: 10,
            power: 50,
            pp: 100,
            sprite: ''
        }
    ],

    iaIndex: 0,

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
        this.createElements()
        this.gameLoop()
    },

    createElements() {
        this.pokemonPlayer = new Player(this.gameScreen, this.gameSize, 10, this.playerTeam[0].health, this.playerTeam[0].power, this.playerTeam[0].pp)
        this.pokemonIa = new Enemy(this.gameScreen, this.gameSize, 5, this.iaTeam[0].health, this.iaTeam[0].power, this.iaTeam[0].pp) //7 
    },

    gameLoop() {
        if (this.loopCounter > 5500) {
            this.loopCounter = 0
        }
        else {
            this.loopCounter++
        }

        this.drawAll()
        this.loopCounter++

        if (this.loopCounter % 2 === 0 && this.pokemonPlayer.pp < 80){
            this.restorePP(this.pokemonPlayer)
        }
        if (this.loopCounter % 5 === 0 && this.pokemonIa.pp < 80) {
            this.restorePP(this.pokemonIa)
        }

        if (this.pokemonIa.pokemonPosition.top < this.pokemonPlayer.pokemonPosition.top - 15) {
            this.pokemonIa.goDown()
        }
        if (this.pokemonIa.pokemonPosition.top > this.pokemonPlayer.pokemonPosition.top + 15) {
            this.pokemonIa.goUp()
        }

        if (this.pokemonIa.pokemonPosition.left < this.pokemonPlayer.pokemonPosition.left - 300) {
            this.pokemonIa.goRight()
        }
        if (this.pokemonIa.pokemonPosition.left > this.pokemonPlayer.pokemonPosition.left + 300) {
            this.pokemonIa.goLeft()
        }

        if (this.loopCounter % 5 === 0) {
            this.pokemonIa.normalAttack()
        }
        if (this.loopCounter % 2 === 0) {
            this.pokemonIa.specialAttack()
        }
        
        this.isCollision()
        this.isOutOfCombat()
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
            this.pokemonPlayer.clearMts()
            this.pokemonPlayer.pokemonElement.remove()
            this.playerTeam.shift()
            if (this.playerTeam.length > 0) {
                console.log(this.playerTeam[this.playerIndex])
                this.pokemonPlayer = new Player(this.gameScreen, this.gameSize, 10, this.playerTeam[0].health, this.playerTeam[0].power, this.playerTeam[0].pp)
            }
            else {
                alert('hahahahaha eres peor que Ash en la temporada 1')
            }
        }

        if(this.pokemonIa.health <= 0){
            this.pokemonIa.clearMts()
            this.pokemonIa.pokemonElement.remove()
            this.iaTeam.shift()
            if(this.iaTeam.length > 0){
                console.log(this.iaTeam[0])
                
                this.pokemonIa = new Enemy(this.gameScreen, this.gameSize, 5, this.iaTeam[0].health, this.iaTeam[0].power, this.iaTeam[0].pp)
            }
            else {
                alert('ah pos muh bien, quiereh un pin o argo?')
            }
        }

    },

    restorePP(character) {
        character.pp++
    }
}