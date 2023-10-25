class StatusBar{
    constructor (gameScreen, gameSize, leftPosition, stat){
        this.gameScreen = gameScreen
        this.gameSize = gameSize,
        this.fullStat = stat
        this.stat = 100

        this.statusSize = {
            height: 30,
            width: 500
        }

        this.statusPosition = {
            left: leftPosition,
            top: 0
        }

        this.init()
    }

    init() {
        this.statusElement = document.createElement('div')

        this.statusElement.style.position = "absolute"
        this.statusElement.style.width = `${this.statusSize.width}px`
        this.statusElement.style.height = `${this.statusSize.height}px`
        this.statusElement.style.left = `${this.statusPosition.left}px`
        this.statusElement.style.top = `${this.statusPosition.top}px`
        this.statusElement.style.backgroundColor = `#818181`
        this.statusElement.style.margin = '10px'
        this.statusElement.style.borderRadius = '10px'

        this.gameScreen.appendChild(this.statusElement)

        
        this.statusElement2 = document.createElement('div')

        this.statusElement2.style.position = "absolute"
        this.statusElement2.style.width = `${this.stat}%`
        this.statusElement2.style.height = `${this.statusSize.height}px`
        this.statusElement2.style.left = `${this.statusElement.style.left}px`
        this.statusElement2.style.top = `${this.statusElement.style.top}px`
        this.statusElement2.style.backgroundColor = '#c90003'
        this.statusElement2.style.borderRadius = '10px'

        this.statusElement.appendChild(this.statusElement2)
    }
    
    refreshStatusBar(newStat) {
        this.stat = (newStat * 100) / this.fullStat
        this.statusElement2.style.width = `${this.stat}%`
    }
}

