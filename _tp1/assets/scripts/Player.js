/*
Mécanique de chaque joueur individuellement.
Hérite de la classe Game.
Gestion du cas ‘Jouer‘, plus précisément :
- tirage d’une carte (classe Card) ;
- affichage de la carte ;
- gestion du pointage et l’état du joueur.
Gestion du cas ‘Stop‘.
*/

import Game from './Game.js';
import Card from './Card.js';
export default class Player extends Game {
    constructor(el, id, nbJoueur) {
        super(el, id, nbJoueur)
        this._el = el;
        this._elActions = this._el.querySelectorAll('[data-js-joueur-action]');
        this._pointage = 0;
        this._elPointage = this._el.querySelector('[data-js-joueur-total]');
        if (id == nbJoueur) {
            this._suivant = 1;
        } else {
            this._suivant = id + 1;
        }

        this.init();
    }

    /**
    * Méthode qui initie les comportement des actions (button) du joueur
    * 
   */
    init() {

        for (let i = 0; i < this._elActions.length; i++) {
            /* Gestionnaire d'évenement click -> bouton jouer et stop */
            this._elActions[i].addEventListener('click', function (e) {
                let action = e.target.dataset.jsJoueurAction;
                this.manageAction(action);
            }.bind(this));
        }
    }

    /**
     * Méthode qui gère les actions du joueurs
     * @param {string} action l'action du joueur soit jouer ou stopper
    */
    manageAction(action) {
        switch (action) {
            case 'jouer':
                this._pointage += new Card(this._el).getPoint();
                this._el.classList.remove('joueurActif');
                this.tour(this._suivant);
                break;
            case 'stop':
                this.stop();
                break;
        }
        this._elPointage.textContent = this._pointage;
        // Si le pointage du joueur est plus grand ou égal a 21 stop ou buster
        if (this._pointage >= 21) {
            this.stop();
        }
    }

    /**
     * Méthode qui calcule le pointage du joueur
     * @param {number} point les points du joueur selon la carte reçue
    */
    calculPoint(point) {
        this._pointage += point;
    }

    /**
     * Méthode qui gère le comptement stop du joueur
    */
    stop() {
        this._el.classList.add('joueurStop');
        this.tour(this._id);
        this._el.classList.remove('joueurActif');
    }

}