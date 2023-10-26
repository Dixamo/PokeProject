const startScreen = document.getElementById('start-screen')
const button = document.getElementById('start-button')

button.addEventListener('click', function() {
    startScreen.style.display = 'none'
    Game.init()
})