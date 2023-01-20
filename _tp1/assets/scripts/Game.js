import Board from "./Board.js";

/*
Mécaniques de jeu communes à tous les joueurs :
- joueur suivant ;
- comportements en fin de la partie.
*/
export default class Game {
    constructor(el, id, nbJoueur) {
        this._el = el;
        this._id = id;
        this._fin = false;
        this._elBtnRejouer = document.querySelector('[data-js-rejouer]');
        this._elParent = document.querySelector('[data-js-joueurs]');
        this._elForm = document.querySelector('form');
        this._nbJoueur = nbJoueur;
        this._nbJoueurStop = 0;
        if (this._id == 1) this.initGame(this._id);
    
    }

    /**
     * Méthode qui initie la partie, joueur #1 débute
     * @param {number} id Le id du joueur
    */
    initGame(id) {
        let data_joueur = '[data-js-joueur="' + id + '"]';
        let elJoueur = document.querySelector(data_joueur);
        elJoueur.classList.add('joueurActif');
    }

    /**
     * Méthode qui rend actif le joueur suivant
     * @param {number} id Le id du joueur
    */
    tour(id) {
        let elSuivant = this.nextJoueurActif();
        let data_joueur = '[data-js-joueur="' + id + '"]';
        let elJoueur = document.querySelector(data_joueur);

        if (elSuivant != null) {
            elSuivant.classList.add('joueurActif');
        } else {
            elJoueur.classList.add('joueurActif');
        }
        if (this.nbJoueurStop() == this._nbJoueur) this.gameFin();
    }

    /**
     * Méthode qui retourne le nombre de joueur qui n'est plus de la partie
     * @return {number} nbJoueurStop le nombre de joueur qui a stroppé
    */
    nbJoueurStop() {
        let nbJoueurStop = 0,
            joueurInfo,
            elJoueur;
        for (let i = 1, l = this._nbJoueur; i <= l; i++) {
            joueurInfo = '[data-js-joueur="' + i + '"]';
            elJoueur = document.querySelector(joueurInfo);
            if (elJoueur.classList.contains('joueurStop')) {
                nbJoueurStop++;
            }
        }
        return nbJoueurStop;
    }

    /**
     * Méthode qui retourne l'élément DOM du prochain joueur
     * @return {Element} elJoueur l'élément du prochain joueur actif retourne {NULL}  si aucun joueur actif possible
    */
    nextJoueurActif() {
        let idJoueur = this._id,
            joueurInfo,
            elJoueur,
            idJoueurSuivant = idJoueur + 1
        if (idJoueurSuivant > this._nbJoueur) {
            idJoueurSuivant = 1;
        };

        for (let i = idJoueurSuivant, l = this._nbJoueur; i <= l; i++) {
            joueurInfo = '[data-js-joueur="' + i + '"]';
            elJoueur = document.querySelector(joueurInfo);
            if (!elJoueur.classList.contains('joueurStop')) {
                return elJoueur;
            }
            /*reset i si joueur id est le dernier */
            if (i == this._nbJoueur && this.nbJoueurStop() < this._nbJoueur) i = 1;
        }
        return null;
    }

    /**
     * Méthode qui lance le comportement en fin de la partie.
     * @param {number} id Le id du joueur
    */
    gameFin() {
        let joueur,
            elJoueur,
            pointage,
            objJoueur = {},
            listJoueurs = [];

        /*Ajouter info elements et pointage des joueurs dans le tableau listJoueurs */
        for (let i = 1, l = this._nbJoueur; i <= l; i++) {
            joueur = '[data-js-joueur="' + i + '"]';
            elJoueur = document.querySelector(joueur);
            pointage = parseInt(elJoueur.querySelector('[data-js-joueur-total]').textContent);
            objJoueur = {
                elem: elJoueur,
                points: pointage
            };
            if (pointage <= 21) listJoueurs.push(objJoueur);
        }

        /*Détecte la plus grande valeur dans le tableau*/
        if (listJoueurs.length > 0){
            let res = Math.max.apply(Math, listJoueurs.map(function (o) { return o.points; }));
            console.log(res);
            /*Ajouter class aux gagnants*/
            for (let i = 0, b = listJoueurs.length; i < b; i++) {
                if (listJoueurs[i].points == res) listJoueurs[i].elem.classList.add('gagnant')
            }
        }else{
            let noWinnerDom = `<h2 class="noWinner">Aucun gagnant!</h2>`;
            this._elParent.insertAdjacentHTML('afterbegin', noWinnerDom)
        }
        
        /*Gérer rejouer */
        this._elBtnRejouer.classList.remove('rejouer')

    }

}
