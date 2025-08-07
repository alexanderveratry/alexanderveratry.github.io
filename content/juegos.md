---
title: "🎮 Juegos Interactivos"
date: 2025-08-06T21:45:00-04:00
draft: false
description: "Colección de juegos web interactivos desarrollados en JavaScript - Color Chain Reaction"
---

# 🎮 Juegos Interactivos

Bienvenido a mi colección de juegos web. Aquí encontrarás diferentes juegos desarrollados con HTML, CSS y JavaScript.

---

## 🟦 Color Chain Reaction

Un juego de puzzle donde debes hacer que todos los cuadrados tengan el mismo color mediante reacciones en cadena.

### 🎯 Cómo jugar:
1. Haz clic en cualquier cuadrado del tablero 10x10
2. El cuadrado cambiará de color aleatoriamente
3. Todos los cuadrados adyacentes del mismo color también cambiarán
4. El objetivo es hacer que todo el tablero sea del mismo color
5. ¡Hazlo en el menor tiempo posible!

<div id="color-chain-game">
    <div id="game-container">
        <div id="game-header">
            <div id="timer">⏱️ Tiempo: 00:00</div>
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
        gap: 10px;
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
        
        this.initGame();
    }
    
    initGame() {
        this.generateBoard();
        this.renderBoard();
        this.updateStatus("¡Haz clic en un cuadrado para comenzar!");
        this.resetTimer();
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
        const newColor = this.getRandomColor();
        
        // Cambiar color del cuadrado clickeado y sus adyacentes del mismo color
        this.changeConnectedCells(row, col, originalColor, newColor);
        this.renderBoard();
        
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

function resetGame() {
    if (game) {
        game.reset();
    }
}
</script>

---

## 🏆 Puntuaciones y Récords

¿Puedes completar el juego en menos de 2 minutos? ¡Comparte tu mejor tiempo en los comentarios!

### 💡 Estrategias:
- Observa el tablero antes de hacer el primer clic
- Intenta identificar grupos grandes del mismo color
- Planifica movimientos que afecten la mayor cantidad de cuadrados
- Los colores se cambian aleatoriamente, así que a veces necesitarás suerte

---

*¿Te gustó este juego? ¡Déjame saber en los comentarios si quieres que cree más juegos interactivos!*
