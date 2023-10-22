class Pokemon{
    constructor(gameScreen, gameSize, health, power, speed){
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.health = health
        this.power = power
        this.speed = speed
        
        this.pokemonSize = {
            height: 50,
            width: 50
        },
    
        this.pokemonPosition = {
            left: Math.floor(Math.random() * (this.gameSize.width - 0) + 0),
            top: Math.floor(Math.random() * (this.gameSize.height - 0) + 0)
        }

        this.actions = {
            left: false,
            right: false,
            up: false,
            down: false,
            specialAttack: false,
            normalAttack: false
        }

        this.setListener()

        this.init()
    }
    
    init() {
        this.pokemonElement = document.createElement('div')
        
        this.pokemonElement.style.position = "absolute"
        this.pokemonElement.style.width = `${this.pokemonSize.width}px`
        this.pokemonElement.style.height = `${this.pokemonSize.height}px`
        this.pokemonElement.style.left = `${this.pokemonPosition.left}px`
        this.pokemonElement.style.top = `${this.pokemonPosition.top}px`
        this.pokemonElement.style.backgroundColor = `yellow`

        this.gameScreen.appendChild(this.pokemonElement)
    }

    setListener() {
        document.addEventListener("keydown", event => this.getInput(event.key, true))
        document.addEventListener("keyup", event => this.getInput(event.key, false));
    }

    getInput(key, state) {
        switch (key) {
        case 'ArrowLeft':
            this.actions.left = state;
            break;
        case 'ArrowRight':
            this.actions.right = state;
            break;
        case 'ArrowUp':
            this.actions.up = state;
            break;
        case 'ArrowDown':
            this.actions.down = state;
            break;
        case 'Space':
            this.actions.specialAttack = state;
            break;
        case 'x':
            this.actions.normalAttack = state
        } 
    }

    attackNormal(){

    }

    attackSpecial(){
        
    }

    recibeDamage(powerEnemie){
        this.health -= powerEnemie
    }

    move(){
        this.goUp()
        this.goDown()
        this.goLeft()
        this.goRight()
        this.updatePosition()
    }

    goUp(){
        if (
            this.actions.up &&
            this.pokemonPosition.top > 0
        ) {
            this.pokemonPosition.top -= this.speed
        }
    }
    goDown() {
        if (
            this.actions.down &&
            this.pokemonPosition.top <= this.gameSize.height - this.pokemonSize.height
        ) {
            this.pokemonPosition.top += this.speed
        }
    }
    goLeft() {
        if (
            this.actions.left &&
            this.pokemonPosition.left > 0
        ) {
            this.pokemonPosition.left -= this.speed
        }
    }
    goRight() {
        if (
            this.actions.right &&
            this.pokemonPosition.left <= this.gameSize.width - this.pokemonSize.width
        ) {
            this.pokemonPosition.left += this.speed
        }
    }

    updatePosition() {
        this.pokemonElement.style.left = `${this.pokemonPosition.left}px`
        this.pokemonElement.style.top = `${this.pokemonPosition.top}px`
    }
}