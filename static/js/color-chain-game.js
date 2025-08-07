
class ColorChainGame {
    constructor() {
        this.board = [];
        this.colors = ['red', 'green', 'blue'];
        this.size = 10;
        this.gameStartTime = null;
        this.gameRunning = false;
        this.timerInterval = null;
        this.animationFrame = null;
        this.colorQueue = []; // Cola de próximos colores
        this.audioElement = null;
        this.audioEnabled = false;
        
        this.initGame();
        this.initAudio();
    }
    
    initAudio() {
        // Cargar archivo MP3 específico desde la carpeta static
        this.audioElement = new Audio('/audio/background-music.mp3');
        this.audioElement.loop = true;
        this.audioElement.volume = 0.5; // Volumen inicial del 50%
        
        console.log('Audio del juego inicializado: background-music.mp3');
    }
    
    stopAllAudio() {
        // Detener música
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
        
        this.audioEnabled = false;
        const button = document.getElementById('audio-toggle');
        button.classList.remove('playing');
        button.classList.add('muted');
    }
    
    initGame() {
        this.generateBoard();
        this.generateColorQueue();
        this.renderBoard();
        this.updateColorQueue();
        this.updateStatus("¡Haz clic en un cuadrado para comenzar!");
        this.resetTimer();
    }
    
    generateColorQueue() {
        // Generar una cola de 10 colores para tener siempre próximos colores disponibles
        this.colorQueue = [];
        for (let i = 0; i < 10; i++) {
            this.colorQueue.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
        }
    }
    
    getNextColor() {
        // Obtener el primer color de la cola
        const nextColor = this.colorQueue.shift();
        // Agregar un nuevo color al final de la cola
        this.colorQueue.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
        return nextColor;
    }
    
    updateColorQueue() {
        // Actualizar la visualización de los próximos 2 colores
        const nextColor1 = document.getElementById('next-color-1');
        const nextColor2 = document.getElementById('next-color-2');
        
        if (nextColor1 && nextColor2) {
            nextColor1.className = `next-color ${this.colorQueue[0]}`;
            nextColor2.className = `next-color ${this.colorQueue[1]}`;
        }
    }
    
    generateBoard() {
        this.board = [];
        for (let i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = this.colors[Math.floor(Math.random() * this.colors.length)];
            }
        }
    }
    
    renderBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const cell = document.createElement('button');
                cell.className = `game-cell ${this.board[i][j]}`;
                cell.onclick = () => this.cellClick(i, j);
                gameBoard.appendChild(cell);
            }
        }
    }
    
    cellClick(row, col) {
        if (!this.gameRunning) {
            this.startGame();
        }
        
        const originalColor = this.board[row][col];
        const newColor = this.getNextColor(); // Usar el próximo color de la cola
        
        // Cambiar color del cuadrado clickeado y sus adyacentes del mismo color
        this.changeConnectedCells(row, col, originalColor, newColor);
        this.renderBoard();
        this.updateColorQueue(); // Actualizar la visualización de próximos colores
        
        if (this.checkWin()) {
            this.endGame(true);
        }
    }
    
    changeConnectedCells(row, col, originalColor, newColor) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) return;
        if (this.board[row][col] !== originalColor) return;
        
        this.board[row][col] = newColor;
        
        // Cambiar células adyacentes (arriba, abajo, izquierda, derecha)
        this.changeConnectedCells(row - 1, col, originalColor, newColor);
        this.changeConnectedCells(row + 1, col, originalColor, newColor);
        this.changeConnectedCells(row, col - 1, originalColor, newColor);
        this.changeConnectedCells(row, col + 1, originalColor, newColor);
    }
    
    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    
    checkWin() {
        const firstColor = this.board[0][0];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] !== firstColor) {
                    return false;
                }
            }
        }
        return true;
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameStartTime = performance.now(); // Usar performance.now() para mayor precisión
        this.startTimer();
        this.updateStatus("🎮 ¡Juego en progreso! Haz que todos los cuadrados sean del mismo color.");
    }
    
    endGame(won) {
        this.gameRunning = false;
        this.stopTimer();
        
        if (won) {
            const timeElapsed = this.getTimeElapsed();
            this.updateStatus(`🎉 ¡Felicitaciones! Completaste el juego en ${timeElapsed}`, 'won');
        }
    }
    
    startTimer() {
        // Función recursiva para un cronómetro más preciso
        const updateClock = () => {
            if (this.gameRunning) {
                this.updateTimer();
                this.animationFrame = requestAnimationFrame(updateClock);
            }
        };
        updateClock();
        
        // Backup con setInterval cada segundo
        this.timerInterval = setInterval(() => {
            if (this.gameRunning) {
                this.updateTimer();
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    resetTimer() {
        this.stopTimer();
        this.gameStartTime = null;
        document.getElementById('timer').textContent = '⏱️ Tiempo: 00:00';
    }
    
    updateTimer() {
        const timeElapsed = this.getTimeElapsed();
        document.getElementById('timer').textContent = `⏱️ Tiempo: ${timeElapsed}`;
    }
    
    getTimeElapsed() {
        if (!this.gameStartTime) return '00:00';
        
        // Usar performance.now() para cálculo más preciso
        const elapsed = Math.floor((performance.now() - this.gameStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
    
    updateStatus(message, type = 'playing') {
        const statusElement = document.getElementById('game-status');
        statusElement.textContent = message;
        statusElement.className = `status-${type}`;
    }
    
    reset() {
        this.gameRunning = false;
        this.stopTimer();
        this.gameStartTime = null;
        this.resetTimer();
        this.generateColorQueue(); // Regenerar cola de colores
        this.initGame();
    }
}

// Controlador principal del juego y el menú
let game;

function initMenu() {
    const menu = document.getElementById('game-menu');
    const gameSection = document.getElementById('color-chain-game');
    const startButton = document.getElementById('start-simple-game');

    if (startButton) {
        startButton.addEventListener('click', () => {
            menu.style.display = 'none';
            gameSection.style.display = 'block';

            if (document.getElementById('game-board')) {
                game = new ColorChainGame();
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', initMenu);


// Función global para controlar el audio
async function toggleAudio() {
    if (!game || !game.audioElement) return;
    
    const button = document.getElementById('audio-toggle');
    
    if (game.audioElement.paused) {
        // Reproducir música
        try {
            await game.audioElement.play();
            game.audioEnabled = true;
            button.textContent = '🔇 Pausar música';
            button.classList.remove('muted');
            button.classList.add('playing');
        } catch (error) {
            console.error('Error al reproducir audio:', error);
            alert('Error al reproducir la música. Asegúrate de que el archivo /audio/background-music.mp3 exista.');
        }
    } else {
        // Pausar música
        game.audioElement.pause();
        game.audioEnabled = false;
        button.textContent = '🎵 Reproducir música';
        button.classList.remove('playing');
        button.classList.add('muted');
    }
}

function changeVolume(value) {
    if (!game || !game.audioElement) return;
    
    // Volumen para música del juego
    game.audioElement.volume = value / 100; // Convertir a rango 0-1
}

function resetGame() {
    if (game) {
        game.reset();
    }
}

// Exponer controles del juego para ser usados desde el HTML
window.ColorChain = {
    toggleAudio,
    changeVolume,
    resetGame,
};

