import {dataSetChangedCallback, resetButtonCallback} from "./callbacks.js";
export const listenersInit = () => {
    document.addEventListener('datasetChanged', dataSetChangedCallback);
    document.addEventListener('roundWon', ()=>{console.log('won!')});
    document.getElementById('resetButton').addEventListener('click', resetButtonCallback)
}

