/*
Détails de la carte tirée.
*/

export default class Card {
    constructor(el) {
        this._elJoueur = el;
        this._elZoneCarte = this._elJoueur.querySelector('.carteZone');
        this._nombre = this.random();
        this._enseigne = this.enseigne();
        this._carteFile = this.carteFile(this._nombre)
        this.init();
    }

    /**
     * Méthode qui initie l'élément carte
    */
    init() {
        let carteDom = `<img src="./assets/img/` + this._carteFile + `">`;
        this._elZoneCarte.insertAdjacentHTML('beforeend', carteDom);
    }

    /**
     * Méthode qui retourne les points de la carte
     * @return {number} this._nombre les points de la carte
    */
    getPoint() {
        return this._nombre;
    }

    /**
     * Méthode qui retourne un nombre aléatoire entre 2 et 11
     * @return {number} nb le nombre aléatoire
    */
    random() {
        let nb = Math.floor(Math.random() * (11 - 2 + 1)) + 2;
        return nb;
    }

    /**
     * Méthode qui retourne un aléatoirement l'enseigne d'une carte
     * @return {string} enseignes[nbAleatoire] l'enseigne
    */
    enseigne() {
        let enseignes = ['coeur', 'pique', 'trefle', 'carreau'],
            nbAleatoire = Math.floor(Math.random() * enseignes.length);
        return enseignes[nbAleatoire];
    }


    /**
   * Méthode qui retourne le chemin de l'image de la carte
   * @return {string} filePath , le chemin de l'image de la carte reçue
  */
    carteFile(nb) {
        let filePath;
        //console.log(nb)
        if (nb == 10) {
            let nbsDix = ['a', 'b', 'c', 'd'],  // gestion valet-reine-roi
                nbAleatoire = Math.floor(Math.random() * nbsDix.length)
            filePath = String(nb + nbsDix[nbAleatoire] + '_' + this._enseigne + '.gif');
        } else {
            filePath = String(nb + '_' + this._enseigne + '.gif');
        }
        return filePath;
    }

}