/*
Traite le formulaire initial.
Lance le jeu (classe Board).
Gestion de sesionStorage
*/


/**
     * Ajouter un sessionStorage , Initialiser la session, verifie si elle existe
*/
let nbPartieJouer = sessionStorage.getItem('nbPartieJouer');
if (!nbPartieJouer) {
    sessionStorage.setItem('nbPartieJouer', 0);
}

nbPartieJouer = sessionStorage.getItem('nbPartieJouer');


let elForms = document.querySelectorAll('form');


import Board from './Board.js'

for (let i = 0, l = elForms.length; i < l; i++) {
    new Board(elForms[i]).init();
}


