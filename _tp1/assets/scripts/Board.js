/*
Créer le DOM de chaque joueur selon le nombre reçu.
Chaque joueur instancie la classe Player.
*/

import Player from './Player.js'

export default class Board {

    constructor(el) {
        this._el = el;
        this._elBoard = document.querySelector('[data-js-nbjoueur]');
        this._elJoueurParent = document.querySelector('[data-js-joueurs]');
        this._elInput = this._el.nbJoueur;
        this._elBtn = this._el.querySelector('button');
        this._elBtnRejouer = document.querySelector('[data-js-rejouer]');
        this._elNbPartie = document.querySelector('[data-js-partie]');
        this.nbPartie = sessionStorage.getItem('nbPartieJouer');


    }

    /**
     * Méthode qui initie l'avant partie
     * 
    */
    init() {

        this._elNbPartie.innerHTML = `<h3>Nombre de partie jouée : </h3>
                                     <span>` + this.nbPartie + `</span>`;

        /* Gestionnaire d'évenement input -> nombre de joueur */
        this._elInput.addEventListener('mouseup', function () {
            if (this._elInput.value != '' && this._elInput.value > 0) {
                this._elBtn.disabled = false
            } else {
                this._elBtn.disabled = true;
            }
        }.bind(this));

        /* Gestionnaire d'évenement click -> bouton jouer */
        this._elBtn.addEventListener('click', function (e) {
            e.preventDefault();
            this._el.innerHTML = '';
            for (let i = 1; i <= this._elInput.value; i++) {
                this.injectPlayer(i);
            }
        }.bind(this));

         /* Gestionnaire d'évenement click -> boutpn rejouer */
         this._elBtnRejouer.addEventListener('click', function () {
            let nbJoueurAvant = this._elInput.value;
            this._elBtnRejouer.classList.add('rejouer');
            this._elJoueurParent.innerHTML = '';
            this._elBoard.innerHTML = `<div data-js-nbJoueur>
                                            <form>
                                                <h2>Combien de joueur à cette table?</h2>
                                                <input type="number" name="nbJoueur" value="${nbJoueurAvant}">
                                                <button>Jouer!</button>
                                            </form>
                                            <!-- nombre de partie jouée -->
                                            <div class="nbjouer" data-js-partie></div>
                                         </div>
                                        ` ;
            this.nbPartie ++
            sessionStorage.setItem('nbPartieJouer', this.nbPartie);
            this._elNbPartie.innerHTML = `<h3>Nombre de partie jouée : </h3>
                                     <span>` + this.nbPartie + `</span>`;
            let elForm = document.querySelector('form');
            new Board(elForm).init();
        }.bind(this));


    }


    /**
     * Méthode qui affecte le DOM d'un joueur, l'injecte dans le DOM et créé instancie un joueur
     * @param {number} id Le id du joueur
    */
    injectPlayer(id) {
        let joueurDOM = `<div class="joueur" data-js-joueur=` + id + `>
                            <div class="joueurZone">
                                <h3>Joueur # ` + id + `</h3>
                                Total : <span data-js-joueur-total>0</span>
                                <button class="btn" data-js-joueur-action="jouer">Jouer</button>
                                <button class="btn" data-js-joueur-action="stop">Stop</button>
                            </div>
                            <div class="carteZone"></div>
                         </div>`;
        this._elJoueurParent.insertAdjacentHTML('beforeend', joueurDOM);
        new Player(this._elJoueurParent.lastElementChild, id, this._elInput.value);
    }
}