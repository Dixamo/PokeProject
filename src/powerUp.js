class PowerUp {
    constructor(gameScreen, gameSize){
        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.powerUpSize = {
            height: 50,
            width: 50
        }

        this.powerUpPosition = {
            left: Math.floor(Math.random() * (this.gameSize.width - this.powerUpSize.width) + 0),
            top: Math.floor(Math.random() * (this.gameSize.height - this.powerUpSize.height) + 0)
        }
        this.init()
    }

    init() {
        this.powerUpElement = document.createElement('div')
        
        this.powerUpElement.style.position = "absolute"
        this.powerUpElement.style.width = `${this.powerUpSize.width}px`
        this.powerUpElement.style.height = `${this.powerUpSize.height}px`
        this.powerUpElement.style.left = `${this.powerUpPosition.left}px`
        this.powerUpElement.style.top = `${this.powerUpPosition.top}px`
        this.powerUpElement.style.zIndex = "-1"
        this.powerUpElement.style.backgroundColor = `darkgreen`

        this.gameScreen.appendChild(this.powerUpElement)
    }
}