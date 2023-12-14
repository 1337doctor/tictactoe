import config from '../config/config.mjs';
import {gameBoard} from "./board.mjs";
import {cellClickedHandler} from "./callbacks.js";

const resizeFactor = 100;
const tableSize = config.boardSize * resizeFactor;
const tableLayout = 'fixed';
const tableDimension = `${tableSize}px`;
const cellDimension = `${tableSize / config.boardSize}px`;
const borderStyle = '1px solid red';
const backgroundColor = 'white';
const iconSize = `${tableSize / config.boardSize / 2}px`;

const createSpan = (icon) => {
    return `<span style="display: flex; justify-content: center; align-items: center; font-size: ${iconSize}">${icon}</span>`;
}

const createResetButton = () => {
    const button = document.createElement('button');
    button.setAttribute('id', 'resetButton');
    button.innerText = 'Reset';
    button.style.margin = '20px auto';
    button.style.display = 'block';
    button.style.width = '150px';
    button.style.height = '40px';
    button.style.backgroundColor = '#a8000d';
    button.style.color = 'white';
    button.style.borderColor = 'white';
    return button;
}
const createGameTable = () => {
    const table = document.createElement('table');
    table.setAttribute('id', config.tableId);
    table.style.width = `${tableSize}px`;
    table.style.height = `${tableSize}px`;
    table.style.border = borderStyle;
    table.style.borderCollapse = 'collapse';
    table.style.tableLayout = tableLayout;
    table.style.backgroundColor = backgroundColor;
    table.style.borderColor = 'white';
    table.createTHead();
    table.createTBody();

    const tbody = table.tBodies[0];
    for (let row = 0; row < config.boardSize; row++) {
        const tr = document.createElement('tr');
        tr.setAttribute('data-row', row.toString());
        tr.style.width = tableDimension;
        tr.style.height = cellDimension;
        for (let col = 0; col < gameBoard[row].length; col++) {
            const td = document.createElement('td');
            td.style.width = cellDimension;
            td.style.height = cellDimension;
            td.style.border = borderStyle;
            td.style.textAlign = 'center';
            td.setAttribute('data-cell', `row-${row.toString()}_col-${col.toString()}`);
            td.innerHTML = createSpan(gameBoard[row][col] || '');
            cellClickedHandler(td, row, col);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    return table;
}
export const createGameUI = () => {
    const container = document.getElementById(config.containerId);
    if(!container) throw new Error(`Element with id '${config.containerId} not found.`);
    const table = createGameTable();
    const button = createResetButton();
    container.appendChild(table);
    container.appendChild(button)
}

export const updateUIField = (row, col, val) => {
    document.querySelector(`[data-cell=row-${row.toString()}_col-${col.toString()}]`).innerHTML = createSpan(val);
}
