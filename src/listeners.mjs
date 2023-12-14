import {dataSetChangedCallback, resetButtonCallback, roundWonCallback} from "./callbacks.mjs";
import config from "../config/config.mjs";
export const listenersInit = () => {
    document.addEventListener('datasetChanged', dataSetChangedCallback);
    document.addEventListener('roundWon', roundWonCallback);
    document.getElementById(config.resetButtonId).addEventListener('click', resetButtonCallback)
}

export const removeAllListeners = () =>  {
    document.removeEventListener('datasetChanged', dataSetChangedCallback);
    document.removeEventListener('roundWon', roundWonCallback);
    document.getElementById(config.resetButtonId).removeEventListener('click', resetButtonCallback);
}
