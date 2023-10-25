class Pokemon{
    constructor(gameScreen, gameSize, health, power, speed, pp, sprite){
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.health = health
        this.power = power
        this.speed = speed
        this.pp = pp
        this.direction = {
            top: 0,
            left: 20
        }

        this.sprite = sprite
        
        this.pokemonSize = {
            height: 190,
            width: 175
        }
    
        this.pokemonPosition = {
            left: Math.floor(Math.random() * (this.gameSize.width - this.pokemonSize.width) + 0),
            top: Math.floor(Math.random() * (this.gameSize.height - this.pokemonSize.height) - 100)
        }

        this.mts = []

        this.init()
    }
    
    init() {
        this.pokemonElement = document.createElement('div')
       
        
        this.pokemonElement.style.position = "absolute"
        this.pokemonElement.style.width = `${this.pokemonSize.width}px`
        this.pokemonElement.style.height = `${this.pokemonSize.height}px`
        this.pokemonElement.style.left = `${this.pokemonPosition.left}px`
        this.pokemonElement.style.top = `${this.pokemonPosition.top}px`

        this.pokemonElement.style.backgroundImage = `url(${this.sprite})`
        this.pokemonElement.style.backgroundSize = `200px 200px`
        this.pokemonElement.style.transform = `scaleX(-1)`

        this.pokemonElement.style.overflow = "hidden"
        this.pokemonElement.style.backgroundRepeat = "no-repeat"
        this.pokemonElement.style.backgroundPositionX = "0px"

        this.gameScreen.appendChild(this.pokemonElement)
    }

    recibeDamage(powerEnemie){
        //console.log(this.health)
        this.health -= powerEnemie
        //console.log(this.health)
    }

    updatePosition() {
        this.pokemonElement.style.left = `${this.pokemonPosition.left}px`
        this.pokemonElement.style.top = `${this.pokemonPosition.top}px`
    }

    getLastPositionLeft(){
        let lastPositionLeft = this.pokemonElement.style.left

        return lastPositionLeft
    }

    getLastPositionTop() {
        let lastPositionTop = this.pokemonElement.style.top

        return lastPositionTop
    }
    
    clearMts() {
        this.mts.forEach((mt, i) => {
            if (mt.mtPosition.left >= this.gameSize.width || mt.mtPosition.left < 0 || mt.mtPosition.top >= this.gameSize.width || mt.mtPosition.top < 0) {
                mt.mtElement.remove()
                this.mts.splice(i, 1)
            }
        })
    }

    deleteMts() {
        this.mts.forEach((mt, i) => {
            mt.mtElement.remove()
        })
        this.mts = []
    }
}



class Player extends Pokemon {

    constructor(gameScreen, gameSize, health, power, speed, pp, sprite) {
        super(gameScreen, gameSize, health, power, speed, pp, sprite)
        this.direction = {
            top: 0,
            left: 20
        }

        this.actions = {
            left: false,
            right: false,
            up: false,
            down: false,
            specialAttack: false,
            normalAttack: false
        }

        this.drunk = false
        this.hangover = false
    }

    move(){
        this.goUp()
        this.goDown()
        this.goLeft()
        this.goRight()
        this.normalAttack()
        this.specialAttack()
        this.updatePosition()
        this.mts.forEach(mt => {
            mt.move()
            mt.updatePosition()
        })
        this.clearMts()
    }

    goUp() {
        if (
            this.actions.up &&
            this.pokemonPosition.top >= 30
        ) {
            this.direction.top = -20
            this.direction.left = 0
            this.pokemonPosition.top -= this.speed
        }
    }
    goDown() {
        if (
            this.actions.down &&
            this.pokemonPosition.top <= this.gameSize.height - this.pokemonSize.height 
        ) {
            this.direction.top = 20
            this.direction.left = 0
            this.pokemonPosition.top += this.speed
        }
    }
    goLeft() {
        if (
            this.actions.left &&
            this.pokemonPosition.left > 0
        ) {
            this.pokemonElement.style.transform = `scaleX(1)`
            this.direction.top = 0
            this.direction.left = -20
            this.pokemonPosition.left -= this.speed
        }
    }
    goRight() {
        if (
            this.actions.right &&
            this.pokemonPosition.left <= this.gameSize.width - this.pokemonSize.width
        ) {
            this.pokemonElement.style.transform = `scaleX(-1)`
            this.direction.top = 0
            this.direction.left = 20
            this.pokemonPosition.left += this.speed
        }
    }
    normalAttack() {
        if (this.actions.normalAttack && this.pp >= 15) {
            this.mts.push(new normalMT(this.gameScreen, this.pokemonPosition, this.pokemonSize, this.power, this.direction.top, this.direction.left))
            this.pp -= 15
        }
    }
    specialAttack() {
        if (this.actions.specialAttack && this.pp >= 25) {
            this.mts.push(new specialMT(this.gameScreen, this.pokemonPosition, this.pokemonSize, this.power, this.direction.top, this.direction.left))
            this.pp -= 25
        }
    }
    
    isDrunk() {
        this.drunk = true
        this.speed *= 2
        this.power *= 2
    }

    isHangover() {
        this.drunk = false
        this.hangover = true
        this.speed /= 4
        this.power /= 4
    }

    isNormalFromDrunk() {
        this.hangover = false
        this.speed *= 2
        this.power *= 2
    }
}

class Enemy extends Pokemon {

    constructor(gameScreen, gameSize, health, power, speed, pp, sprite) {
        super(gameScreen, gameSize, health, power, speed, pp, sprite)
        this.direction = {
            top: 0,
            left: -20
        }
    }

    move(){
        this.goUp()
        this.goDown()
        this.goLeft()
        this.goRight()
        this.updatePosition()
        this.mts.forEach(mt => {
            mt.move()
            mt.updatePosition()
        })
        this.clearMts()
    }

    goUp() {

        if (this.pokemonPosition.top >= 30) {
            this.direction.top = -20
            this.direction.left = 0
            this.pokemonPosition.top -= this.speed
        }

    }

    goDown() {
        if (this.pokemonPosition.top <= this.gameSize.height - this.pokemonSize.height) {
            this.direction.top = 20
            this.direction.left = 0
            this.pokemonPosition.top += this.speed
        } 
    }

    goLeft() {
        if (this.pokemonPosition.left >= 0) {
            this.pokemonElement.style.transform = `scaleX(1)`
            this.direction.top = 0
            this.direction.left = -20
            this.pokemonPosition.left -= this.speed
        }
    }

    goRight() {
        if (this.pokemonPosition.left <= this.gameSize.width - this.pokemonSize.width) {
            this.pokemonElement.style.transform = `scaleX(-1)`
            this.direction.top = 0
            this.direction.left = 20
            this.pokemonPosition.left += this.speed
        }
    }
    normalAttack() {
        if(this.pp >= 10) {
            this.mts.push(new normalMT(this.gameScreen, this.pokemonPosition, this.pokemonSize, this.power, this.direction.top, this.direction.left))
            this.pp -= 15
        }
    }
    specialAttack() {
        if(this.pp >= 20) {
            this.mts.push(new specialMT(this.gameScreen, this.pokemonPosition, this.pokemonSize, this.power, this.direction.top, this.direction.left))
            this.pp -= 25
        }
    }
}