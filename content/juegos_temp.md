---
title: "🎮 Juegos Interactivos"
date: 2025-08-05T21:45:00-04:00
draft: false
description: "Colección de juegos web interactivos desarrollados en JavaScript - Color Chain Reaction, Number Slide Puzzle, Color Chain Challenge, Color Rush y Color Rush 2"
---

# 🎮 Juegos Interactivos

Bienvenido a mi colección de juegos web. Aquí encontrarás diferentes juegos desarrollados con HTML, CSS y JavaScript. ¡Desafía tu mente con estos puzzles!

---

## 🟦 Color Chain Reaction

Un juego de puzzle donde debes hacer que todos los cuadrados tengan el mismo color mediante reacciones en cadena.

### 🎯 Cómo jugar:
1. Haz clic en cualquier cuadrado del tablero 10x10
2. El cuadrado cambiará al **próximo color** de la cola
3. Todos los cuadrados adyacentes del mismo color también cambiarán
4. Puedes ver los **próximos 2 colores** para planificar tu estrategia
5. El objetivo es hacer que todo el tablero sea del mismo color
6. **🎵 Activa la música** para una experiencia más inmersiva
7. ¡Hazlo en el menor tiempo posible!

<div id="color-chain-game">
    <div id="game-container">
        <div id="game-header">
            <div id="timer">⏱️ Tiempo: 00:00</div>
            <div id="next-colors">
                <span>Próximos colores:</span>
                <div id="color-queue">
                    <div class="next-color" id="next-color-1"></div>
                    <div class="next-color" id="next-color-2"></div>
                </div>
            </div>
            <div id="audio-controls">
                <button id="audio-toggle" onclick="toggleAudio()">🎵 Reproducir música</button>
                <input type="range" id="volume-slider" min="0" max="100" value="50" onchange="changeVolume(this.value)">
            </div>
            <button id="reset-btn" onclick="resetGame()">🔄 Jugar de nuevo</button>
        </div>
        <div id="game-board"></div>
        <div id="game-status"></div>
    </div>
</div>

<style>
#color-chain-game {
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

#next-colors {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

#next-colors span {
    font-size: 0.9em;
    font-weight: bold;
}

#color-queue {
    display: flex;
    gap: 8px;
}

.next-color {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    border: 2px solid rgba(255,255,255,0.3);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
}

.next-color.red {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.next-color.green {
    background: linear-gradient(135deg, #51cf66, #40c057);
}

.next-color.blue {
    background: linear-gradient(135deg, #339af0, #228be6);
}

#audio-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

#audio-toggle {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: bold;
    transition: all 0.3s ease;
}

#audio-toggle:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-1px);
}

#audio-toggle.playing {
    background: rgba(76, 175, 80, 0.3);
    border-color: rgba(76, 175, 80, 0.5);
}

#audio-toggle.muted {
    background: rgba(244, 67, 54, 0.3);
    border-color: rgba(244, 67, 54, 0.5);
}

#volume-slider {
    width: 80px;
    height: 4px;
    background: rgba(255,255,255,0.3);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
}

#volume-slider::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

#volume-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

#timer {
    font-size: 1.2em;
    font-weight: bold;
}

#reset-btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: all 0.3s ease;
}

#reset-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

#game-board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 2px;
    background: #2c3e50;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    max-width: 500px;
    margin: 0 auto;
}

.game-cell {
    aspect-ratio: 1;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.game-cell:hover {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.game-cell.red {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.game-cell.green {
    background: linear-gradient(135deg, #51cf66, #40c057);
}

.game-cell.blue {
    background: linear-gradient(135deg, #339af0, #228be6);
}

.game-cell:active {
    transform: scale(0.9);
}

#game-status {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.1em;
}

.status-playing {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
}

.status-won {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
    animation: celebration 0.6s ease-in-out;
}

@keyframes celebration {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@media (max-width: 600px) {
    #game-header {
        flex-direction: column;
        gap: 15px;
    }
    
    #next-colors {
        order: -1; /* Mover los próximos colores arriba en móvil */
    }
    
    #next-colors span {
        font-size: 0.8em;
    }
    
    .next-color {
        width: 25px;
        height: 25px;
    }
    
    #audio-controls {
        order: -2; /* Mover controles de audio al top en móvil */
    }
    
    #audio-toggle {
        font-size: 0.8em;
        padding: 6px 12px;
    }
    
    #volume-slider {
        width: 60px;
    }
    
    #game-board {
        max-width: 350px;
    }
}
</style>

<script>
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

// Inicializar el juego cuando se carga la página
let game;

document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurarse de que el DOM esté completamente cargado
    setTimeout(() => {
        if (document.getElementById('game-board')) {
            game = new ColorChainGame();
        }
    }, 100);
});

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
</script>

---

## 🔢 Number Slide Puzzle

Un clásico rompecabezas deslizante donde debes ordenar los números del 1 al 15 en el menor número de movimientos posibles.

### 🎯 Cómo jugar:
1. Los números están desordenados en una cuadrícula de 4x4
2. Hay un espacio vacío que te permite mover los números
3. Haz clic en un número adyacente al espacio vacío para moverlo
4. El objetivo es ordenar todos los números del 1 al 15
5. El número 15 debe quedar en la esquina inferior derecha
6. ¡Trata de hacerlo en el menor número de movimientos!

<div id="slide-puzzle-game">
    <div id="slide-game-container">
        <div id="slide-game-header">
            <div id="slide-moves">🎯 Movimientos: 0</div>
            <div id="slide-best">🏆 Mejor: --</div>
            <button id="slide-shuffle-btn" onclick="shufflePuzzle()">🔀 Mezclar</button>
            <button id="slide-reset-btn" onclick="resetPuzzle()">🔄 Reiniciar</button>
        </div>
        <div id="slide-puzzle-board"></div>
        <div id="slide-game-status"></div>
    </div>
</div>

<style>
#slide-puzzle-game {
    max-width: 500px;
    margin: 20px auto;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#slide-game-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    flex-wrap: wrap;
    gap: 10px;
}

#slide-moves, #slide-best {
    font-size: 1.1em;
    font-weight: bold;
}

#slide-shuffle-btn, #slide-reset-btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: bold;
    transition: all 0.3s ease;
}

#slide-shuffle-btn:hover, #slide-reset-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-1px);
}

#slide-puzzle-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    background: #2c3e50;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    max-width: 400px;
    margin: 0 auto;
}

.slide-tile {
    aspect-ratio: 1;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    font-size: 1.8em;
    font-weight: bold;
    color: white;
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slide-tile:not(.empty):hover {
    transform: scale(0.95);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.slide-tile.number {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.slide-tile.empty {
    background: transparent;
    cursor: default;
}

.slide-tile.moveable {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(67, 233, 123, 0.4); }
    50% { box-shadow: 0 0 0 10px rgba(67, 233, 123, 0); }
}

.slide-tile:active {
    transform: scale(0.9);
}

#slide-game-status {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.1em;
}

.slide-status-playing {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
}

.slide-status-won {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
    animation: celebration 0.6s ease-in-out;
}

@keyframes celebration {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@media (max-width: 600px) {
    #slide-game-header {
        flex-direction: column;
        gap: 10px;
    }
    
    #slide-puzzle-board {
        max-width: 300px;
    }
    
    .slide-tile {
        font-size: 1.4em;
    }
}
</style>

<script>
class SlidePuzzle {
    constructor() {
        this.size = 4;
        this.board = [];
        this.emptyPos = { row: 3, col: 3 };
        this.moves = 0;
        this.bestScore = localStorage.getItem('slidePuzzleBest') || null;
        this.gameWon = false;
        
        this.initPuzzle();
        this.renderBoard();
        this.updateMoves();
        this.updateBestScore();
        this.updateStatus("¡Mezcla el puzzle y comienza a jugar!");
    }
    
    initPuzzle() {
        // Crear tablero ordenado (1-15 + espacio vacío)
        this.board = [];
        let num = 1;
        
        for (let i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.size; j++) {
                if (i === this.size - 1 && j === this.size - 1) {
                    this.board[i][j] = 0; // Espacio vacío
                } else {
                    this.board[i][j] = num++;
                }
            }
        }
        
        this.emptyPos = { row: this.size - 1, col: this.size - 1 };
        this.moves = 0;
        this.gameWon = false;
    }
    
    renderBoard() {
        const gameBoard = document.getElementById('slide-puzzle-board');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const tile = document.createElement('button');
                
                if (this.board[i][j] === 0) {
                    tile.className = 'slide-tile empty';
                } else {
                    tile.className = 'slide-tile number';
                    tile.textContent = this.board[i][j];
                    
                    // Verificar si el tile es movible
                    if (this.canMove(i, j)) {
                        tile.classList.add('moveable');
                    }
                    
                    tile.onclick = () => this.moveTile(i, j);
                }
                
                gameBoard.appendChild(tile);
            }
        }
    }
    
    canMove(row, col) {
        // Un tile se puede mover si está adyacente al espacio vacío
        const deltaRow = Math.abs(row - this.emptyPos.row);
        const deltaCol = Math.abs(col - this.emptyPos.col);
        
        return (deltaRow === 1 && deltaCol === 0) || (deltaRow === 0 && deltaCol === 1);
    }
    
    moveTile(row, col) {
        if (this.gameWon || !this.canMove(row, col)) return;
        
        // Intercambiar el tile con el espacio vacío
        this.board[this.emptyPos.row][this.emptyPos.col] = this.board[row][col];
        this.board[row][col] = 0;
        this.emptyPos = { row, col };
        
        this.moves++;
        this.updateMoves();
        this.renderBoard();
        
        if (this.checkWin()) {
            this.gameWon = true;
            this.updateBestScore();
            this.updateStatus(`🎉 ¡Felicitaciones! Resolviste el puzzle en ${this.moves} movimientos!`, 'won');
        } else {
            this.updateStatus(`Sigue así! Movimientos: ${this.moves}`);
        }
    }
    
    checkWin() {
        let expectedNum = 1;
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (i === this.size - 1 && j === this.size - 1) {
                    // El último espacio debe estar vacío
                    if (this.board[i][j] !== 0) return false;
                } else {
                    if (this.board[i][j] !== expectedNum) return false;
                    expectedNum++;
                }
            }
        }
        
        return true;
    }
    
    shuffle() {
        // Hacer movimientos aleatorios para mezclar el puzzle
        // Esto garantiza que el puzzle sea solucionable
        const shuffleMoves = 200;
        
        for (let i = 0; i < shuffleMoves; i++) {
            const possibleMoves = [];
            
            // Encontrar todos los tiles que se pueden mover
            for (let row = 0; row < this.size; row++) {
                for (let col = 0; col < this.size; col++) {
                    if (this.board[row][col] !== 0 && this.canMove(row, col)) {
                        possibleMoves.push({ row, col });
                    }
                }
            }
            
            if (possibleMoves.length > 0) {
                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                
                // Mover sin incrementar el contador
                this.board[this.emptyPos.row][this.emptyPos.col] = this.board[randomMove.row][randomMove.col];
                this.board[randomMove.row][randomMove.col] = 0;
                this.emptyPos = { row: randomMove.row, col: randomMove.col };
            }
        }
        
        this.moves = 0;
        this.gameWon = false;
        this.updateMoves();
        this.renderBoard();
        this.updateStatus("¡Puzzle mezclado! Ordena los números del 1 al 15.");
    }
    
    reset() {
        this.initPuzzle();
        this.renderBoard();
        this.updateMoves();
        this.updateStatus("¡Mezcla el puzzle y comienza a jugar!");
    }
    
    updateMoves() {
        document.getElementById('slide-moves').textContent = `🎯 Movimientos: ${this.moves}`;
    }
    
    updateBestScore() {
        if (this.gameWon && this.moves > 0) {
            if (!this.bestScore || this.moves < parseInt(this.bestScore)) {
                this.bestScore = this.moves;
                localStorage.setItem('slidePuzzleBest', this.bestScore);
            }
        }
        
        const bestText = this.bestScore ? this.bestScore : '--';
        document.getElementById('slide-best').textContent = `🏆 Mejor: ${bestText}`;
    }
    
    updateStatus(message, type = 'playing') {
        const statusElement = document.getElementById('slide-game-status');
        statusElement.textContent = message;
        statusElement.className = `slide-status-${type}`;
    }
}

// Inicializar el puzzle cuando se carga la página
let slidePuzzle;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('slide-puzzle-board')) {
            slidePuzzle = new SlidePuzzle();
        }
    }, 100);
});

// Funciones globales para controlar el puzzle
function shufflePuzzle() {
    if (slidePuzzle) {
        slidePuzzle.shuffle();
    }
}

function resetPuzzle() {
    if (slidePuzzle) {
        slidePuzzle.reset();
    }
}
</script>

---

## � Color Chain Challenge

Un juego similar al Color Chain Reaction, pero aquí el desafío es completarlo en la **menor cantidad de pasos posibles**.

### 🎯 Cómo jugar:
1. Haz clic en cualquier cuadrado del tablero 8x8
2. El cuadrado cambiará al **próximo color** de la cola
3. Todos los cuadrados adyacentes del mismo color también cambiarán
4. Puedes ver los **próximos 3 colores** para planificar tu estrategia
5. El objetivo es hacer que todo el tablero sea del mismo color
6. ¡Hazlo en el **menor número de pasos** posible!
7. Tu récord personal se guardará automáticamente

<div id="color-challenge-game">
    <div id="challenge-game-container">
        <div id="challenge-game-header">
            <div id="challenge-steps">🎯 Pasos: 0</div>
            <div id="challenge-best">🏆 Mejor: --</div>
            <div id="challenge-next-colors">
                <span>Próximos colores:</span>
                <div id="challenge-color-queue">
                    <div class="challenge-next-color" id="challenge-next-color-1"></div>
                    <div class="challenge-next-color" id="challenge-next-color-2"></div>
                    <div class="challenge-next-color" id="challenge-next-color-3"></div>
                </div>
            </div>
            <button id="challenge-reset-btn" onclick="resetChallenge()">🔄 Nuevo desafío</button>
        </div>
        <div id="challenge-game-board"></div>
        <div id="challenge-game-status"></div>
    </div>
</div>

<style>
#color-challenge-game {
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#challenge-game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    flex-wrap: wrap;
    gap: 15px;
}

#challenge-steps, #challenge-best {
    font-size: 1.2em;
    font-weight: bold;
}

#challenge-next-colors {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

#challenge-next-colors span {
    font-size: 0.9em;
    font-weight: bold;
}

#challenge-color-queue {
    display: flex;
    gap: 8px;
}

.challenge-next-color {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    border: 2px solid rgba(255,255,255,0.4);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
}

.challenge-next-color.red {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.challenge-next-color.green {
    background: linear-gradient(135deg, #51cf66, #40c057);
}

.challenge-next-color.blue {
    background: linear-gradient(135deg, #339af0, #228be6);
}

.challenge-next-color.yellow {
    background: linear-gradient(135deg, #ffd43b, #fab005);
}

#challenge-reset-btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: all 0.3s ease;
}

#challenge-reset-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

#challenge-game-board {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2px;
    background: #2c3e50;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    max-width: 480px;
    margin: 0 auto;
}

.challenge-game-cell {
    aspect-ratio: 1;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.challenge-game-cell:hover {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.challenge-game-cell.red {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.challenge-game-cell.green {
    background: linear-gradient(135deg, #51cf66, #40c057);
}

.challenge-game-cell.blue {
    background: linear-gradient(135deg, #339af0, #228be6);
}

.challenge-game-cell.yellow {
    background: linear-gradient(135deg, #ffd43b, #fab005);
}

.challenge-game-cell:active {
    transform: scale(0.9);
}

#challenge-game-status {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.1em;
}

.challenge-status-playing {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

.challenge-status-won {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
    animation: celebration 0.6s ease-in-out;
}

@keyframes celebration {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@media (max-width: 600px) {
    #challenge-game-header {
        flex-direction: column;
        gap: 15px;
    }
    
    #challenge-next-colors {
        order: -1;
    }
    
    #challenge-next-colors span {
        font-size: 0.8em;
    }
    
    .challenge-next-color {
        width: 25px;
        height: 25px;
    }
    
    #challenge-game-board {
        max-width: 320px;
    }
}
</style>

<script>
class ColorChallenge {
    constructor() {
        this.board = [];
        this.colors = ['red', 'green', 'blue', 'yellow'];
        this.size = 8; // Tablero más pequeño para ser más estratégico
        this.steps = 0;
        this.gameRunning = false;
        this.colorQueue = [];
        this.bestScore = localStorage.getItem('colorChallengeBest') || null;
        
        this.initChallenge();
    }
    
    initChallenge() {
        this.generateBoard();
        this.generateColorQueue();
        this.renderBoard();
        this.updateColorQueue();
        this.updateSteps();
        this.updateBestScore();
        this.updateStatus("¡Haz clic en un cuadrado para comenzar el desafío!");
        this.steps = 0;
        this.gameRunning = false;
    }
    
    generateColorQueue() {
        // Generar una cola de 15 colores
        this.colorQueue = [];
        for (let i = 0; i < 15; i++) {
            this.colorQueue.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
        }
    }
    
    getNextColor() {
        const nextColor = this.colorQueue.shift();
        this.colorQueue.push(this.colors[Math.floor(Math.random() * this.colors.length)]);
        return nextColor;
    }
    
    updateColorQueue() {
        const nextColor1 = document.getElementById('challenge-next-color-1');
        const nextColor2 = document.getElementById('challenge-next-color-2');
        const nextColor3 = document.getElementById('challenge-next-color-3');
        
        if (nextColor1 && nextColor2 && nextColor3) {
            nextColor1.className = `challenge-next-color ${this.colorQueue[0]}`;
            nextColor2.className = `challenge-next-color ${this.colorQueue[1]}`;
            nextColor3.className = `challenge-next-color ${this.colorQueue[2]}`;
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
        const gameBoard = document.getElementById('challenge-game-board');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const cell = document.createElement('button');
                cell.className = `challenge-game-cell ${this.board[i][j]}`;
                cell.onclick = () => this.cellClick(i, j);
                gameBoard.appendChild(cell);
            }
        }
    }
    
    cellClick(row, col) {
        if (!this.gameRunning) {
            this.startChallenge();
        }
        
        const originalColor = this.board[row][col];
        const newColor = this.getNextColor();
        
        // Cambiar color del cuadrado clickeado y sus adyacentes del mismo color
        this.changeConnectedCells(row, col, originalColor, newColor);
        this.steps++;
        
        this.renderBoard();
        this.updateColorQueue();
        this.updateSteps();
        
        if (this.checkWin()) {
            this.endChallenge(true);
        } else {
            this.updateStatus(`Sigue así! Pasos dados: ${this.steps}`);
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
    
    startChallenge() {
        this.gameRunning = true;
        this.updateStatus("🎮 ¡Desafío en progreso! Haz que todos los cuadrados sean del mismo color.");
    }
    
    endChallenge(won) {
        this.gameRunning = false;
        
        if (won) {
            this.updateBestScore();
            this.updateStatus(`🎉 ¡Felicitaciones! Completaste el desafío en ${this.steps} pasos!`, 'won');
        }
    }
    
    updateSteps() {
        document.getElementById('challenge-steps').textContent = `🎯 Pasos: ${this.steps}`;
    }
    
    updateBestScore() {
        if (this.gameRunning === false && this.steps > 0) {
            if (!this.bestScore || this.steps < parseInt(this.bestScore)) {
                this.bestScore = this.steps;
                localStorage.setItem('colorChallengeBest', this.bestScore);
            }
        }
        
        const bestText = this.bestScore ? this.bestScore : '--';
        document.getElementById('challenge-best').textContent = `🏆 Mejor: ${bestText}`;
    }
    
    updateStatus(message, type = 'playing') {
        const statusElement = document.getElementById('challenge-game-status');
        statusElement.textContent = message;
        statusElement.className = `challenge-status-${type}`;
    }
    
    reset() {
        this.gameRunning = false;
        this.steps = 0;
        this.generateColorQueue();
        this.initChallenge();
    }
}

// Inicializar el juego cuando se carga la página
let colorChallenge;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('challenge-game-board')) {
            colorChallenge = new ColorChallenge();
        }
    }, 100);
});

// Función global para controlar el desafío
function resetChallenge() {
    if (colorChallenge) {
        colorChallenge.reset();
    }
}
</script>

---

## �🏆 Puntuaciones y Récords

¿Puedes completar el juego en menos de 2 minutos? ¡Comparte tu mejor tiempo en los comentarios!

### 💡 Estrategias para Color Chain Reaction:
- **Planifica con anticipación**: Observa los próximos 2 colores antes de hacer clic
- **Piensa en secuencias**: ¿Cómo puedes usar los próximos colores de manera óptima?
- **Observa el tablero**: Identifica grupos grandes del mismo color
- **Timing perfecto**: A veces es mejor esperar un color específico de la cola
- **Combos efectivos**: Planifica movimientos que afecten la mayor cantidad de cuadrados
- **No hay azar**: Ahora cada movimiento es calculado, ¡usa la estrategia!

### 🎯 Estrategias para Color Chain Challenge:
- **Máxima eficiencia**: Cada paso cuenta, planifica con 3 colores de anticipación
- **Analiza patrones**: Busca la secuencia óptima antes de hacer el primer movimiento
- **Conectividad máxima**: Prioriza clicks que afecten la mayor cantidad de cuadrados
- **Color dominante**: Identifica qué color tiene más presencia en el tablero
- **Secuencia perfecta**: A veces necesitas "preparar" el tablero antes del movimiento ganador
- **Tablero 8x8**: Más pequeño = más estratégico, cada movimiento importa más

### 🧩 Estrategias para Number Slide Puzzle:
- **Resuelve por filas**: Completa la primera fila, luego la segunda, etc.
- **Esquinas primero**: Coloca los números de las esquinas en su posición correcta
- **Movimientos en L**: Aprende patrones de movimiento para posicionar números
- **Piensa hacia atrás**: A veces necesitas mover un número "hacia atrás" para avanzar
- **Último cuadrante**: Los últimos 4 números requieren una secuencia específica
- **Cuenta tus movimientos**: Cada movimiento cuenta para tu récord personal

### ⚡ Estrategias para Color Rush:
- **Posición final**: Lo importante es **dónde estés al final**, no cuándo llegues al color
- **Gestión del tiempo**: Usa todo el tiempo disponible para posicionarte estratégicamente
- **Múltiples opciones**: Busca varios cuadrados del color objetivo, no solo uno
- **Posición de respaldo**: Si ya estás en el color correcto, mantente ahí o cerca
- **No te apresures**: No necesitas llegar rápido, solo estar ahí al final de los 3 segundos
- **Anticipación**: Mientras esperas, observa dónde están los otros colores para la próxima ronda
- **Paciencia táctica**: A veces es mejor quedarse quieto si ya estás en el color correcto

---

## ⚡ Color Rush

Un juego de reacción rápida donde debes moverte por una cuadrícula de colores usando el teclado para llegar al color indicado antes de que se acabe el tiempo.

### 🎯 Cómo jugar:
1. Usa las teclas **W, A, S, D** para mover tu personaje por la cuadrícula 10x10
2. Se te indicará un color objetivo: **Rojo**, **Verde** o **Azul**
3. Tienes **3 segundos** para posicionarte en un cuadrado de ese color
4. **¡IMPORTANTE!** La verificación se hace **al final del tiempo**, no cuando tocas el color
5. Debes estar en el color correcto cuando se acaben los 3 segundos
6. Cada éxito te da **1 punto**, si no estás en el color correcto, ¡pierdes!
7. El juego continúa con nuevos colores aleatorios hasta que falles
8. ¡Intenta conseguir la puntuación más alta!

<div id="color-rush-game">
    <div id="rush-game-container">
        <div id="rush-game-header">
            <div id="rush-score">🎯 Puntos: 0</div>
            <div id="rush-target-color">
                <span>Color objetivo:</span>
                <div id="rush-target-display"></div>
                <div id="rush-target-text">¡Presiona INICIAR!</div>
            </div>
            <div id="rush-timer">⏱️ Tiempo: 3.0s</div>
            <button id="rush-start-btn" onclick="startColorRush()">🚀 Iniciar Juego</button>
        </div>
        <div id="rush-game-board"></div>
        <div id="rush-game-status"></div>
        <div id="rush-controls">
            <div class="controls-info">
                <div class="control-key">W</div>
                <div class="control-desc">Arriba</div>
            </div>
            <div class="controls-row">
                <div class="controls-info">
                    <div class="control-key">A</div>
                    <div class="control-desc">Izquierda</div>
                </div>
                <div class="controls-info">
                    <div class="control-key">S</div>
                    <div class="control-desc">Abajo</div>
                </div>
                <div class="controls-info">
                    <div class="control-key">D</div>
                    <div class="control-desc">Derecha</div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
#color-rush-game {
    max-width: 700px;
    margin: 20px auto;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#rush-game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
    color: #333;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    flex-wrap: wrap;
    gap: 15px;
}

#rush-score, #rush-timer {
    font-size: 1.2em;
    font-weight: bold;
    color: #2c3e50;
}

#rush-target-color {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

#rush-target-color span {
    font-size: 0.9em;
    font-weight: bold;
    color: #2c3e50;
}

#rush-target-display {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 3px solid #2c3e50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    background: #ddd;
}

#rush-target-display.red {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

#rush-target-display.green {
    background: linear-gradient(135deg, #51cf66, #40c057);
}

#rush-target-display.blue {
    background: linear-gradient(135deg, #339af0, #228be6);
}

#rush-target-text {
    font-size: 0.9em;
    font-weight: bold;
    color: #2c3e50;
}

#rush-start-btn {
    background: #ff6b6b;
    border: none;
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: all 0.3s ease;
}

#rush-start-btn:hover {
    background: #ee5a52;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

#rush-start-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
}

#rush-game-board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 2px;
    background: #2c3e50;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    max-width: 500px;
    margin: 0 auto 20px;
    position: relative;
}

.rush-game-cell {
    aspect-ratio: 1;
    border-radius: 4px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.rush-game-cell.red {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.rush-game-cell.green {
    background: linear-gradient(135deg, #51cf66, #40c057);
}

.rush-game-cell.blue {
    background: linear-gradient(135deg, #339af0, #228be6);
}

.rush-player {
    position: absolute;
    width: 80%;
    height: 80%;
    background: #2c3e50;
    border: 3px solid #fff;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    z-index: 10;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    transition: all 0.1s ease;
}

.rush-player::before {
    content: "😊";
    font-size: 0.8em;
}

#rush-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

.controls-row {
    display: flex;
    gap: 10px;
}

.controls-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.control-key {
    width: 40px;
    height: 40px;
    background: #2c3e50;
    color: white;
    border: 2px solid #3498db;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.control-desc {
    font-size: 0.8em;
    color: #2c3e50;
    font-weight: bold;
}

#rush-game-status {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.1em;
}

.rush-status-waiting {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    color: white;
}

.rush-status-playing {
    background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
    color: white;
}

.rush-status-success {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
    animation: success-pulse 0.5s ease-in-out;
}

.rush-status-game-over {
    background: linear-gradient(135deg, #e17055 0%, #d63031 100%);
    color: white;
    animation: game-over-shake 0.5s ease-in-out;
}

@keyframes success-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes game-over-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@media (max-width: 600px) {
    #rush-game-header {
        flex-direction: column;
        gap: 10px;
    }
    
    #rush-game-board {
        max-width: 350px;
    }
    
    .control-key {
        width: 35px;
        height: 35px;
        font-size: 1em;
    }
}
</style>

<script>
class ColorRush {
    constructor() {
        this.board = [];
        this.colors = ['red', 'green', 'blue'];
        this.size = 10;
        this.playerPos = { row: 5, col: 5 }; // Posición inicial en el centro
        this.targetColor = null;
        this.score = 0;
        this.timeLeft = 3.0;
        this.gameRunning = false;
        this.gameStarted = false;
        this.timerInterval = null;
        
        this.initGame();
        this.setupKeyboardControls();
    }
    
    initGame() {
        this.generateBoard();
        this.renderBoard();
        this.updateScore();
        this.updateTimer();
        this.updateStatus("¡Presiona INICIAR para comenzar!", 'waiting');
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
        const gameBoard = document.getElementById('rush-game-board');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const cell = document.createElement('div');
                cell.className = `rush-game-cell ${this.board[i][j]}`;
                
                // Agregar el jugador si está en esta posición
                if (i === this.playerPos.row && j === this.playerPos.col) {
                    const player = document.createElement('div');
                    player.className = 'rush-player';
                    cell.appendChild(player);
                }
                
                gameBoard.appendChild(cell);
            }
        }
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            if (!this.gameRunning) return;
            
            const key = event.key.toLowerCase();
            let newRow = this.playerPos.row;
            let newCol = this.playerPos.col;
            
            switch (key) {
                case 'w':
                    newRow = Math.max(0, this.playerPos.row - 1);
                    break;
                case 's':
                    newRow = Math.min(this.size - 1, this.playerPos.row + 1);
                    break;
                case 'a':
                    newCol = Math.max(0, this.playerPos.col - 1);
                    break;
                case 'd':
                    newCol = Math.min(this.size - 1, this.playerPos.col + 1);
                    break;
                default:
                    return; // Ignorar otras teclas
            }
            
            event.preventDefault();
            this.movePlayer(newRow, newCol);
        });
    }
    
    movePlayer(newRow, newCol) {
        this.playerPos.row = newRow;
        this.playerPos.col = newCol;
        this.renderBoard();
        
        // Ya no verificamos el color aquí - esperamos hasta que termine el temporizador
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameStarted = true;
        this.score = 0;
        this.playerPos = { row: 5, col: 5 }; // Resetear posición al centro
        
        document.getElementById('rush-start-btn').disabled = true;
        document.getElementById('rush-start-btn').textContent = 'Jugando...';
        
        this.startNewRound();
    }
    
    startNewRound() {
        this.generateBoard();
        this.renderBoard();
        this.targetColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.timeLeft = 3.0;
        
        this.updateTargetColor();
        this.updateTimer();
        this.updateStatus(`¡Ve al color ${this.getColorName(this.targetColor)}!`, 'playing');
        
        this.startTimer();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft -= 0.1;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 100);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    roundSuccess() {
        this.score++;
        this.updateScore();
        this.updateStatus(`¡Correcto! +1 punto`, 'success');
        
        // Continuar con la siguiente ronda después de 1 segundo
        setTimeout(() => {
            if (this.gameRunning) {
                this.startNewRound();
            }
        }, 1000);
    }
    
    timeUp() {
        this.stopTimer();
        
        // Verificar si el jugador está en el color correcto cuando se acaba el tiempo
        const currentColor = this.board[this.playerPos.row][this.playerPos.col];
        if (currentColor === this.targetColor) {
            this.roundSuccess();
        } else {
            this.gameOver();
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        this.gameStarted = false;
        
        document.getElementById('rush-start-btn').disabled = false;
        document.getElementById('rush-start-btn').textContent = '🚀 Jugar de nuevo';
        
        this.updateStatus(`¡Game Over! Puntuación final: ${this.score}`, 'game-over');
        this.updateTargetColor('');
        document.getElementById('rush-target-text').textContent = '¡Presiona JUGAR DE NUEVO!';
    }
    
    updateScore() {
        document.getElementById('rush-score').textContent = `🎯 Puntos: ${this.score}`;
    }
    
    updateTimer() {
        const timeDisplay = Math.max(0, this.timeLeft).toFixed(1);
        document.getElementById('rush-timer').textContent = `⏱️ Tiempo: ${timeDisplay}s`;
    }
    
    updateTargetColor(color = this.targetColor) {
        const display = document.getElementById('rush-target-display');
        const text = document.getElementById('rush-target-text');
        
        if (color) {
            display.className = `${color}`;
            text.textContent = this.getColorName(color).toUpperCase();
        } else {
            display.className = '';
            text.textContent = '¡Presiona INICIAR!';
        }
    }
    
    getColorName(color) {
        const names = {
            'red': 'ROJO',
            'green': 'VERDE',
            'blue': 'AZUL'
        };
        return names[color] || color;
    }
    
    updateStatus(message, type = 'waiting') {
        const statusElement = document.getElementById('rush-game-status');
        statusElement.textContent = message;
        statusElement.className = `rush-status-${type}`;
    }
}

// Inicializar el juego cuando se carga la página
let colorRush;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('rush-game-board')) {
            colorRush = new ColorRush();
        }
    }, 100);
});

// Función global para iniciar el juego
function startColorRush() {
    if (colorRush) {
        colorRush.startGame();
    }
}
</script>

---

## ⚡ Color Rush 2

Una versión experimental del Color Rush con nuevas mecánicas y funcionalidades en desarrollo.

### 🎯 Cómo jugar:
1. Usa las teclas **W, A, S, D** para mover tu personaje por la cuadrícula 10x10
2. Se te indicará un color objetivo: **Rojo**, **Verde** o **Azul**
3. Tienes **3 segundos** para posicionarte en un cuadrado de ese color
4. **¡IMPORTANTE!** La verificación se hace **al final del tiempo**, no cuando tocas el color
5. Debes estar en el color correcto cuando se acaben los 3 segundos
6. Cada éxito te da **1 punto**, si no estás en el color correcto, ¡pierdes!
7. El juego continúa con nuevos colores aleatorios hasta que falles
8. ¡Intenta conseguir la puntuación más alta!

<div id="color-rush-2-game">
    <div id="rush2-sky-container">
        <div id="rush2-game-container">
            <div id="rush2-game-header">
                <div id="rush2-score">🎯 Puntos: 0</div>
                <div id="rush2-target-color">
                    <span>Color objetivo:</span>
                    <div id="rush2-target-display"></div>
                    <div id="rush2-target-text">¡Presiona INICIAR!</div>
                </div>
                <div id="rush2-timer">⏱️ Tiempo: 3.0s</div>
                <button id="rush2-start-btn" onclick="startColorRush2()">🚀 Iniciar Juego</button>
            </div>
            <div id="rush2-board-container">
                <div id="rush2-game-board"></div>
                <div id="rush2-robot"></div>
            </div>
            <div id="rush2-game-status"></div>
        <div id="rush2-controls">
            <div class="controls2-info">
                <div class="control2-key">W</div>
                <div class="control2-desc">Arriba</div>
            </div>
            <div class="controls2-row">
                <div class="controls2-info">
                    <div class="control2-key">A</div>
                    <div class="control2-desc">Izquierda</div>
                </div>
                <div class="controls2-info">
                    <div class="control2-key">S</div>
                    <div class="control2-desc">Abajo</div>
                </div>
                <div class="controls2-info">
                    <div class="control2-key">D</div>
                    <div class="control2-desc">Derecha</div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
#color-rush-2-game {
    max-width: 900px; /* Aumentado para acomodar tablero más grande */
    margin: 20px auto;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#rush2-sky-container {
    background: linear-gradient(180deg, #87CEEB 0%, #87CEFA 50%, #B0E0E6 100%);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
}

#rush2-board-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 750px; /* Aumentado para tablero más grande */
    margin: 20px 0;
}

#rush2-robot {
    position: absolute;
    width: 40px;
    height: 40px;
    background: #2c3e50;
    border: 3px solid #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    z-index: 100;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    transition: all 0.1s ease;
    pointer-events: none;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}

#rush2-robot::before {
    content: "🤖";
    font-size: 0.8em;
}
}

#rush2-game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: linear-gradient(135deg, #a8e6cf 0%, #88d8c0 50%, #78c2ad 100%);
    color: #333;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    flex-wrap: wrap;
    gap: 15px;
}

#rush2-score, #rush2-timer {
    font-size: 1.2em;
    font-weight: bold;
    color: #2c3e50;
}

#rush2-target-color {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

#rush2-target-color span {
    font-size: 0.9em;
    font-weight: bold;
    color: #2c3e50;
}

#rush2-target-display {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 3px solid #2c3e50;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    background: #ddd;
}

#rush2-target-display.red {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

#rush2-target-display.green {
    background: linear-gradient(135deg, #51cf66, #40c057);
}

#rush2-target-display.blue {
    background: linear-gradient(135deg, #339af0, #228be6);
}

#rush2-target-text {
    font-size: 0.9em;
    font-weight: bold;
    color: #2c3e50;
}

#rush2-start-btn {
    background: #51cf66;
    border: none;
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: all 0.3s ease;
}

#rush2-start-btn:hover {
    background: #40c057;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

#rush2-start-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
}

#rush2-game-board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 3px;
    background: #2c3e50;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    max-width: 700px; /* Aumentado de 500px a 700px */
    width: 100%;
    margin: 0 auto;
    position: relative;
    transition: transform 0.1s ease;
    transform: scale(0); /* Start completely hidden */
}

.rush2-game-cell {
    aspect-ratio: 1;
    border-radius: 4px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

/* Estados de escala por tiempo para el tablero completo - transición suave */
/* La escala se aplicará dinámicamente via JavaScript */

.rush2-game-cell.red {
    background: linear-gradient(135deg, #ff0e0eff, #ee5a52);
}

.rush2-game-cell.green {
    background: linear-gradient(135deg, #00ff2aff, #40c057);
}

.rush2-game-cell.blue {
    background: linear-gradient(135deg, #008cffff, #228be6);
}

#rush2-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

.controls2-row {
    display: flex;
    gap: 10px;
}

.controls2-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.control2-key {
    width: 40px;
    height: 40px;
    background: #2c3e50;
    color: white;
    border: 2px solid #51cf66;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.control2-desc {
    font-size: 0.8em;
    color: #dc3838ff;
    font-weight: bold;
}

#rush2-game-status {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.1em;
}

.rush2-status-waiting {
    background: linear-gradient(135deg, #a8e6cf 0%, #88d8c0 100%);
    color: #2c3e50;
}

.rush2-status-playing {
    background: linear-gradient(135deg, #51cf66 0%, #40c057 100%);
    color: white;
}

.rush2-status-success {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
    animation: success-pulse2 0.5s ease-in-out;
}

.rush2-status-game-over {
    background: linear-gradient(135deg, #e17055 0%, #d63031 100%);
    color: white;
    animation: game-over-shake2 0.5s ease-in-out;
}

@keyframes success-pulse2 {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes game-over-shake2 {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@media (max-width: 600px) {
    #rush2-game-header {
        flex-direction: column;
        gap: 10px;
    }
    
    #rush2-game-board {
        max-width: 350px;
    }
    
    .control2-key {
        width: 35px;
        height: 35px;
        font-size: 1em;
    }
}
</style>

<script>
class ColorRush2 {
    constructor() {
        this.board = [];
        this.colors = ['red', 'green', 'blue'];
        this.size = 10;
        this.playerPos = { row: 5, col: 5 }; // Posición inicial en el centro
        this.targetColor = null;
        this.score = 0;
        this.timeLeft = 3.0;
        this.gameRunning = false;
        this.gameStarted = false;
        this.timerInterval = null;
        
        this.initGame();
        this.setupKeyboardControls();
    }
    
    initGame() {
        this.generateBoard();
        this.renderBoard();
        this.updateScore();
        this.updateTimer();
        this.updateStatus("¡Presiona INICIAR para comenzar!", 'waiting');
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
        const gameBoard = document.getElementById('rush2-game-board');
        gameBoard.innerHTML = '';
        
        // Aplicar escala continua al tablero completo
        const scale = this.getTimeScale();
        gameBoard.style.transform = `scale(${scale})`;
        
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const cell = document.createElement('div');
                cell.className = `rush2-game-cell ${this.board[i][j]}`;
                gameBoard.appendChild(cell);
            }
        }
        
        // Update robot position separately from board
        this.updateRobotPosition();
    }
    
    updateRobotPosition() {
        const robot = document.getElementById('rush2-robot');
        const gameBoard = document.getElementById('rush2-game-board');
        const container = document.getElementById('rush2-board-container');
        
        if (robot && gameBoard && container) {
            // Calculate robot position based on grid cell position
            const cellSize = 70; // Increased cell size for larger board
            const boardSize = this.size * cellSize;
            const boardScale = this.getTimeScale();
            
            // Calculate position within the board container (not the scaled board)
            const xPercent = ((this.playerPos.col + 0.5) / this.size) * 100;
            const yPercent = ((this.playerPos.row + 0.5) / this.size) * 100;
            
            // Position robot at the center of the container, then offset by player position
            const containerRect = container.getBoundingClientRect();
            const boardRect = gameBoard.getBoundingClientRect();
            
            if (boardRect.width > 0 && boardRect.height > 0) {
                const robotX = (boardRect.left - containerRect.left) + (boardRect.width * xPercent / 100);
                const robotY = (boardRect.top - containerRect.top) + (boardRect.height * yPercent / 100);
                
                robot.style.left = robotX + 'px';
                robot.style.top = robotY + 'px';
                robot.style.transform = 'translate(-50%, -50%)';
            }
        }
    }
    
    getTimeScale() {
        // Calcular escala continua basada en el tiempo restante
        // timeLeft va de 3.0 a 0
        // Escala va de 0 (invisible) a 1.0 (tamaño completo) - simula caída del cielo
        const progress = (3.0 - this.timeLeft) / 3.0; // 0 a 1
        const scale = progress; // 0 a 1.0 - crece desde 0 (invisible)
        return Math.min(1.0, Math.max(0, scale));
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            if (!this.gameRunning) return;
            
            const key = event.key.toLowerCase();
            let newRow = this.playerPos.row;
            let newCol = this.playerPos.col;
            
            switch (key) {
                case 'w':
                    newRow = Math.max(0, this.playerPos.row - 1);
                    break;
                case 's':
                    newRow = Math.min(this.size - 1, this.playerPos.row + 1);
                    break;
                case 'a':
                    newCol = Math.max(0, this.playerPos.col - 1);
                    break;
                case 'd':
                    newCol = Math.min(this.size - 1, this.playerPos.col + 1);
                    break;
                default:
                    return; // Ignorar otras teclas
            }
            
            event.preventDefault();
            this.movePlayer(newRow, newCol);
        });
    }
    
    movePlayer(newRow, newCol) {
        this.playerPos.row = newRow;
        this.playerPos.col = newCol;
        this.renderBoard();
        
        // Ya no verificamos el color aquí - esperamos hasta que termine el temporizador
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameStarted = true;
        this.score = 0;
        this.playerPos = { row: 5, col: 5 }; // Resetear posición al centro
        
        document.getElementById('rush2-start-btn').disabled = true;
        document.getElementById('rush2-start-btn').textContent = 'Jugando...';
        
        this.startNewRound();
    }
    
    startNewRound() {
        this.generateBoard();
        this.renderBoard();
        this.targetColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.timeLeft = 3.0;
        
        this.updateTargetColor();
        this.updateTimer();
        this.updateStatus(`¡Ve al color ${this.getColorName(this.targetColor)}!`, 'playing');
        
        this.startTimer();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft -= 0.1;
            this.updateTimer();
            this.renderBoard(); // Actualizar el tablero para efectos visuales
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 100);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    roundSuccess() {
        this.score++;
        this.updateScore();
        this.updateStatus(`¡Correcto! +1 punto`, 'success');
        
        // Continuar con la siguiente ronda después de 1 segundo
        // Continuar inmediatamente con la siguiente ronda
        if (this.gameRunning) {
            this.startNewRound();
        }

    }
    
    timeUp() {
        this.stopTimer();
        
        // Verificar si el jugador está en el color correcto cuando se acaba el tiempo
        const currentColor = this.board[this.playerPos.row][this.playerPos.col];
        if (currentColor === this.targetColor) {
            this.roundSuccess();
        } else {
            this.gameOver();
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        this.gameStarted = false;
        
        document.getElementById('rush2-start-btn').disabled = false;
        document.getElementById('rush2-start-btn').textContent = '🚀 Jugar de nuevo';
        
        this.updateStatus(`¡Game Over! Puntuación final: ${this.score}`, 'game-over');
        this.updateTargetColor('');
        document.getElementById('rush2-target-text').textContent = '¡Presiona JUGAR DE NUEVO!';
    }
    
    updateScore() {
        document.getElementById('rush2-score').textContent = `🎯 Puntos: ${this.score}`;
    }
    
    updateTimer() {
        const timeDisplay = Math.max(0, this.timeLeft).toFixed(1);
        document.getElementById('rush2-timer').textContent = `⏱️ Tiempo: ${timeDisplay}s`;
    }
    
    updateTargetColor(color = this.targetColor) {
        const display = document.getElementById('rush2-target-display');
        const text = document.getElementById('rush2-target-text');
        
        if (color) {
            display.className = `${color}`;
            text.textContent = this.getColorName(color).toUpperCase();
        } else {
            display.className = '';
            text.textContent = '¡Presiona INICIAR!';
        }
    }
    
    getColorName(color) {
        const names = {
            'red': 'ROJO',
            'green': 'VERDE',
            'blue': 'AZUL'
        };
        return names[color] || color;
    }
    
    updateStatus(message, type = 'waiting') {
        const statusElement = document.getElementById('rush2-game-status');
        statusElement.textContent = message;
        statusElement.className = `rush2-status-${type}`;
    }
}

// Inicializar el juego cuando se carga la página
let colorRush2;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('rush2-game-board')) {
            colorRush2 = new ColorRush2();
        }
    }, 100);
});

// Función global para iniciar el juego
function startColorRush2() {
    if (colorRush2) {
        colorRush2.startGame();
    }
}
</script>

---

*¿Te gustaron estos juegos? ¡Déjame saber en los comentarios cuál es tu favorito y si quieres que cree más juegos interactivos!*
