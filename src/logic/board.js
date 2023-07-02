import { winnerCombos, Turns } from "../constantes";
export const checkWinnerBoard = (boardCheck) => {
    for (const combo of winnerCombos) {
        const [a, b, c] = combo;
        if (boardCheck[a] && boardCheck[a] === boardCheck[b] && boardCheck[a] === boardCheck[c]) {
            return boardCheck[a];
        }
    }
    return null;
}

export function checkEndGame(boardCheck) {
    const validateTie = boardCheck.includes(null);
    return !validateTie;
}

export const setDataStorage = (items) => {
    items.forEach(item => {
        localStorage.setItem(item.name, JSON.stringify(item.data));
    })
}

export const removeDataStorage = (data) => {
    data.forEach(element => {
        localStorage.removeItem(element);
    });
}

export const validateData = (data, parameters) => {
    const validateData = data.filter(element => parameters.some(item => element === item)).length;
    return validateData;
};

