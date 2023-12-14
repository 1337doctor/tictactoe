export const datasetChangedDispatcher = (row, col, val) => {
    const evt = new CustomEvent('datasetChanged', {
        detail: {
            row,
            col,
            val,
        }
    });
    document.dispatchEvent(evt);
}

export const roundWonDispatcher = (row, col, val) => {
    const evt = new CustomEvent('roundWon', {
        detail: {
            won: true
        }
    });
    document.dispatchEvent(evt);
}
