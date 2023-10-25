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
            speed: 15,
            pp: 100,
            sprite: '../images/pikachu.png'
        },
        {
            name: 'Charizard',
            health: 100,
            power: 20,
            speed: 10,
            pp: 100,
            sprite: '../images/charizard.png'
        },
        {
            name: 'Sceptile',
            health: 100,
            power: 20,
            speed: 12,
            pp: 100,
            sprite: '../images/sceptile.png'
        },
        {
            name: 'Blaziken',
            health: 100,
            power: 20,
            speed: 12,
            pp: 100,
            sprite: '../images/blaziken.png'
        },
        {
            name: 'Infernape',
            health: 100,
            power: 20,
            speed: 13,
            pp: 100,
            sprite: '../images/infernape.png'
        }
    ],

    pokemonPlayer: undefined,

    iaTeam: [
        {
            name: 'Meowth',
            health: 100,
            power: 50,
            speed: 3,
            pp: 100,
            sprite: '../images/meowth.png'
        },
        {
            name: 'Alakazam',
            health: 100,
            power: 50,
            speed: 3,
            pp: 100,
            sprite: '../images/alakazam.png'      
        },
        {
            name: 'Garchomp',
            health: 100,
            power: 50,
            speed: 7,
            pp: 100,
            sprite: '../images/garchomp.png'
        }
    ],
    
    iaTeam2: [
        {
            name: 'Milotic',
            health: 100,
            power: 50,
            speed: 5,
            pp: 100,
            sprite: '../images/milotic.png'
        },
        {
            name: 'Tyranitar',
            health: 100,
            power: 50,
            speed: 2,
            pp: 100,
            sprite: '../images/tyranitar.png'
        },
        {
            name: 'Rayquaza',
            health: 200,
            power: 100,
            speed: 8,
            pp: 100,
            sprite: '../images/rayquaza.png'
        }
    ], 
            
    iaTeam3: [
        {
            name: 'Mewtwo',
            health: 200,
            power: 10,
            speed: 8,
            pp: 100,
            sprite: '../images/mewtwo.png'
        },
        {
            name: 'Dialga',
            health: 200,
            power: 50,
            speed: 8,
            pp: 100,
            sprite: '../images/dialga.png'
        },
        {
            name: 'Arceus',
            health: 200,
            power: 100,
            speed: 9,
            pp: 100,
            sprite: '../images/arceus-normal.png'
        }
    ],
    

    pokemonIa: undefined,

    loopCounter: 0,

    powerUp: undefined,

    powerUpCounter: 0,

    statusBar: undefined,

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
        this.pokemonPlayer = new Player(this.gameScreen, this.gameSize, this.playerTeam[0].health, this.playerTeam[0].power, this.playerTeam[0].speed, this.playerTeam[0].pp, this.playerTeam[0].sprite)
        this.pokemonIa = new Enemy(this.gameScreen, this.gameSize, this.iaTeam[0].health, this.iaTeam[0].power, this.iaTeam[0].speed, this.iaTeam[0].pp, this.iaTeam[0].sprite) //7 
        this.playerStatusBar = new StatusBar(this.gameScreen, this.gameSize, 0, this.pokemonPlayer.health)
        this.iaStatusBar = new StatusBar(this.gameScreen, this.gameSize, this.gameSize.width - 520, this.pokemonIa.health)
    },

    gameLoop() {
        if (this.loopCounter > 5500) {
            this.loopCounter = 0
        }
        else {
            this.loopCounter++
        }
        this.playerStatusBar.refreshStatusBar(this.pokemonPlayer.health)
        this.iaStatusBar.refreshStatusBar(this.pokemonIa.health)

        this.drawAll()
        this.loopCounter++

        if (this.loopCounter % 2 === 0 && this.pokemonPlayer.pp < 100){
            this.restorePP(this.pokemonPlayer)
        }
        if (this.loopCounter % 5 === 0 && this.pokemonIa.pp < 100) {
            this.restorePP(this.pokemonIa)
        }

        if (!this.powerUp && this.loopCounter % 9 === 0 && this.loopCounter > 1000 && this.loopCounter < 1100) {
            this.powerUp = new PowerUp(this.gameScreen, this.gameSize)
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

        if (this.pokemonPlayer.drunk && this.powerUpCounter <= 300) {
            this.powerUpCounter++
        }
        else if (this.pokemonPlayer.drunk && this.powerUpCounter >= 300) {
            this.pokemonPlayer.isHangover()
            this.powerUpCounter = 0
        }
        else if (this.pokemonPlayer.hangover && this.powerUpCounter <= 300) {
            this.powerUpCounter++
        }
        else if (this.pokemonPlayer.hangover && this.powerUpCounter >= 300) {
            this.pokemonPlayer.isNormalFromDrunk()
            this.powerUpCounter = 0
        }
        
        this.isCollision()
        this.isOutOfCombat()
        this.activatePowerUp()
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
                elm.mtElement.remove()
                this.pokemonPlayer.mts.splice(i, 1)
            }
        })
        this.pokemonIa.mts.forEach((elm, i) => {
           if(
                this.pokemonPlayer.pokemonPosition.left + this.pokemonPlayer.pokemonSize.width - 20 >= elm.mtPosition.left &&
                this.pokemonPlayer.pokemonPosition.left + 40 <= elm.mtPosition.left + elm.mtSize.width &&
                this.pokemonPlayer.pokemonPosition.top + this.pokemonPlayer.pokemonSize.height >= elm.mtPosition.top &&
                this.pokemonPlayer.pokemonPosition.top <= elm.mtPosition.top + elm.mtSize.height
            ){
                this.pokemonPlayer.recibeDamage(elm.power)
                elm.mtElement.remove()
                this.pokemonIa.mts.splice(i, 1)
            }
        })
    },

    isOutOfCombat() {
        if(this.pokemonPlayer.health <= 0) {
            this.pokemonPlayer.deleteMts()
            this.pokemonPlayer.pokemonElement.remove()
            this.playerTeam.shift()
            if (this.playerTeam.length > 0) {
                console.log(this.playerTeam[0])
                this.pokemonPlayer = new Player(this.gameScreen, this.gameSize, this.playerTeam[0].health, this.playerTeam[0].power, this.playerTeam[0].speed, this.playerTeam[0].pp, this.playerTeam[0].sprite)
            }
            else {
                console.log("perdiste")
            }
        }

        if(this.pokemonIa.health <= 0){
            this.pokemonIa.deleteMts()
            this.pokemonIa.pokemonElement.remove()
            this.iaTeam.shift()
            if(this.iaTeam.length > 0){
                console.log(this.iaTeam[0])
                this.pokemonIa = new Enemy(this.gameScreen, this.gameSize, this.iaTeam[0].health, this.iaTeam[0].power, this.iaTeam[0].speed, this.iaTeam[0].pp, this.iaTeam[0].sprite)
            }
            else {
                this.pokemonIa.deleteMts()
                this.pokemonIa.pokemonElement.remove()
                this.iaTeam2.shift()
                if (this.iaTeam2.length > 0) {
                    console.log(this.iaTeam2[0])
                    this.pokemonIa = new Enemy(this.gameScreen, this.gameSize, this.iaTeam2[0].health, this.iaTeam2[0].power, this.iaTeam2[0].speed, this.iaTeam2[0].pp, this.iaTeam2[0].sprite)
                }
                else{
                    this.pokemonIa.deleteMts()
                    this.pokemonIa.pokemonElement.remove()
                    this.iaTeam3.shift()
                    if (this.iaTeam3.length > 0) {
                        console.log(this.iaTeam3[0])
                        this.pokemonIa = new Enemy(this.gameScreen, this.gameSize, this.iaTeam3[0].health, this.iaTeam3[0].power, this.iaTeam3[0].speed, this.iaTeam3[0].pp, this.iaTeam3[0].sprite)
                    }
                    else{
                        console.log("ganaste")
                    }
                }
            }
        }

    },

    restorePP(character) {
        character.pp++
    },

    activatePowerUp(){
        if (this.powerUp) {
            if (
                this.pokemonPlayer.pokemonPosition.left + this.pokemonPlayer.pokemonSize.width >= this.powerUp.powerUpPosition.left &&
                this.pokemonPlayer.pokemonPosition.left <= this.powerUp.powerUpPosition.left + this.powerUp.powerUpSize.width &&
                this.pokemonPlayer.pokemonPosition.top + this.pokemonPlayer.pokemonSize.height >= this.powerUp.powerUpPosition.top &&
                this.pokemonPlayer.pokemonPosition.top <= this.powerUp.powerUpPosition.top + this.powerUp.powerUpSize.height
            ) {
                this.pokemonPlayer.isDrunk()
                this.powerUp.powerUpElement.remove()
                this.powerUp = undefined
            }
        }
    }
}