class MT {
    constructor(gameScreen, pokemonPosition, pokemonSize, topSpeed, leftSpeed) {
        this.gameScreen = gameScreen
        this.pokemonPosition = pokemonPosition
        this.pokemonSize = pokemonSize

        this.mtSize = {
            width: 0,
            height: 0
        },


        this.mtPosition = {
            left: this.pokemonPosition.left + (this.pokemonSize.width / 3),
            top: this.pokemonPosition.top + (this.pokemonSize.height / 3)
        },

        this.mtSpeed = {
            top: topSpeed,
            left: leftSpeed
        },

        this.init()
    }

    move() {
        this.mtPosition.left += this.mtSpeed.left
        this.mtPosition.top += this.mtSpeed.top
        this.updatePosition()
    }

    updatePosition() {
        this.mtElement.style.left = `${this.mtPosition.left}px`
        this.mtElement.style.top = `${this.mtPosition.top}px`
    }
}

class normalMT extends MT {
    constructor(gameScreen, pokemonPosition, pokemonSize, pokemonPower, topSpeed, leftSpeed) {
        super(gameScreen, pokemonPosition, pokemonSize, topSpeed, leftSpeed)
        this.power = pokemonPower

        this.mtSize = {
            width: 40,
            height: 40
        },

        this.mtPosition = {
            left: this.pokemonPosition.left + (this.pokemonSize.width / 3),
            top: this.pokemonPosition.top + (this.pokemonSize.height / 3)
        },

        this.init()
    }

    init() {
        this.mtElement = document.createElement("div")

        this.mtElement.style.position = "absolute"
        this.mtElement.style.borderRadius = "50%"
        this.mtElement.style.backgroundColor = "red"
        this.mtElement.style.top = `${this.mtPosition.top}px`
        this.mtElement.style.left = `${this.mtPosition.left}px`
        this.mtElement.style.width = `${this.mtSize.width}px`
        this.mtElement.style.height = `${this.mtSize.height}px`
        this.mtElement.style.zIndex = "-1"

        this.gameScreen.appendChild(this.mtElement)
    }
}

class specialMT extends MT {
    constructor(gameScreen, pokemonPosition, pokemonSize, pokemonPower, topSpeed, leftSpeed) {
        super(gameScreen, pokemonPosition, pokemonSize, topSpeed, leftSpeed)
        this.power = pokemonPower * 2

        this.mtSize = {
            height: 80,
            width: 80
        },

        this.mtPosition = {
            left: this.pokemonPosition.left + (this.pokemonSize.width/6),
            top: this.pokemonPosition.top + (this.pokemonSize.height/6)
        },

        this.init()
    }

    init(){

        this.mtElement = document.createElement("div")
        
        this.mtElement.style.position = "absolute"
        this.mtElement.style.borderRadius = "50%"
        this.mtElement.style.backgroundColor = "purple"
        this.mtElement.style.top = `${this.mtPosition.top}px`
        this.mtElement.style.left = `${this.mtPosition.left}px`
        this.mtElement.style.width = `${this.mtSize.width}px`
        this.mtElement.style.height = `${this.mtSize.height}px`
        this.mtElement.style.zIndex = "-1"

        this.gameScreen.appendChild(this.mtElement)

    }
}