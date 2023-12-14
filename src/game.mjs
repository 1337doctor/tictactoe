export const gameState = {
    won: null,
    winner: null,
    currentPlayerId: null,
};

export const initGameState = () => {
    gameState.won = false;
    gameState.winner = null;
    gameState.currentPlayerId = 1;
}