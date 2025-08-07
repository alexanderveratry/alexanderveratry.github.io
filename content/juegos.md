---
title: "🎮 Juegos Interactivos"
date: 2025-08-05T21:45:00-04:00
draft: false
description: "Colección de juegos web interactivos desarrollados en JavaScript - Color Chain Reaction"
---

# 🎮 Juegos Interactivos

Bienvenido a mi colección de juegos web. Aquí encontrarás diferentes juegos desarrollados con HTML, CSS y JavaScript.

---
<style>
#game-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
}

#game-menu button {
    padding: 10px 20px;
    cursor: pointer;
}
</style>

<div id="game-menu">
  <h2>Selecciona un juego</h2>
  <button id="start-simple-game">Simple Game</button>
  <button disabled>Próximo juego (muy pronto)</button>
  <button disabled>Otro juego (muy pronto)</button>
</div>

<div id="color-chain-game" style="display:none;">
<h2>Simple Game</h2>
<p>Un juego de puzzle donde debes hacer que todos los cuadrados tengan el mismo color mediante reacciones en cadena.</p>
<h3>🎯 Cómo jugar:</h3>
<ol>
  <li>Haz clic en cualquier cuadrado del tablero 10x10</li>
  <li>El cuadrado cambiará al <strong>próximo color</strong> de la cola</li>
  <li>Todos los cuadrados adyacentes del mismo color también cambiarán</li>
  <li>Puedes ver los <strong>próximos 2 colores</strong> para planificar tu estrategia</li>
  <li>El objetivo es hacer que todo el tablero sea del mismo color</li>
  <li><strong>🎵 Activa la música</strong> para una experiencia más inmersiva</li>
  <li>¡Hazlo en el menor tiempo posible!</li>
</ol>

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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    initMenu();
}

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
<h2>🏆 Puntuaciones y Récords</h2>
<p>¿Puedes completar el juego en menos de 2 minutos? ¡Comparte tu mejor tiempo en los comentarios!</p>

<h3>💡 Estrategias:</h3>
<ul>
  <li><strong>Planifica con anticipación</strong>: Observa los próximos 2 colores antes de hacer clic</li>
  <li><strong>Piensa en secuencias</strong>: ¿Cómo puedes usar los próximos colores de manera óptima?</li>
  <li><strong>Observa el tablero</strong>: Identifica grupos grandes del mismo color</li>
  <li><strong>Timing perfecto</strong>: A veces es mejor esperar un color específico de la cola</li>
  <li><strong>Combos efectivos</strong>: Planifica movimientos que afecten la mayor cantidad de cuadrados</li>
  <li><strong>No hay azar</strong>: Ahora cada movimiento es calculado, ¡usa la estrategia!</li>
</ul>

<p><em>¿Te gustó este juego? ¡Déjame saber en los comentarios si quieres que cree más juegos interactivos!</em></p>
</div>
