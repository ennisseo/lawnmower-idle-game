// Définir les variables de jeu
let money = 0;
let grassCut = 0;
let lawnWidth = 500;
let lawnHeight = 500;
let mowerX = 0;
let mowerY = -10;
let totalArea = lawnWidth * lawnHeight; // Surface totale de la pelouse
let mowedArea = 0; // Surface survolée par la tondeuse

// Initialiser la grille pour marquer les zones tondues
let grassGrid = [];
for (let i = 0; i < lawnWidth / 10; i++) {
    grassGrid[i] = [];
    for (let j = 0; j < lawnHeight / 10; j++) {
        grassGrid[i][j] = false; // initialiser toutes les cases à non coupées
    }
}

// Initialiser le canvas
let lawnCanvas = document.getElementById('lawnCanvas');
let ctx = lawnCanvas.getContext('2d');

// Mettre à jour la position de la tondeuse à gazon
function updateMowerPosition() {
    ctx.clearRect(0, 0, lawnWidth, lawnHeight);

    // Remplir les zones coupées avec la couleur verte
    for (let i = 0; i < grassGrid.length; i++) {
        for (let j = 0; j < grassGrid[i].length; j++) {
            if (grassGrid[i][j]) {
                ctx.fillStyle = 'green'; // Couleur de l'herbe coupée
                ctx.fillRect(i * 10, j * 10, 10, 10); // Remplir la zone avec la couleur verte
            }
        }
    }

    ctx.fillStyle = 'black'; // Couleur de la tondeuse
    ctx.fillRect(mowerX, mowerY, 10, 10); // Dessiner la tondeuse comme un carré noir
}


// Fonction pour couper l'herbe
function cutGrass() {
    // Check if the mower is within the lawn boundaries
    if (mowerX >= 0 && mowerX < lawnWidth && mowerY >= 0 && mowerY < lawnHeight) {
        let gridX = Math.floor(mowerX / 10);
        let gridY = Math.floor(mowerY / 10);

        // Vérifier si la case a déjà été coupée
        if (!grassGrid[gridX][gridY]) {
            grassGrid[gridX][gridY] = true; // Marquer la case comme coupée
            mowedArea += 100; // Supposons que chaque coupure de 10px x 10px coupe 100 pixels carrés d'herbe
            let mowedPercentage = (mowedArea / totalArea) * 100; // Calcul du pourcentage de la surface survolée par la tondeuse

            // Si le pourcentage est un nombre entier, augmenter l'argent de 1$
            if (mowedPercentage >= 1 && mowedPercentage % 1 === 0) {
                money += 1;
                document.getElementById('money').textContent = money; // Mettre à jour le contenu du span pour afficher l'argent
            }

            console.log(mowedArea)
            console.log(mowedPercentage)

            document.getElementById('grass-cut').textContent = `Mowed: ${mowedPercentage}%`;
        }
    }
}

// Gérer les déplacements de la tondeuse à gazon avec le clavier
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (mowerY > 0) {
                mowerY -= 10;
                updateMowerPosition();
                cutGrass();
            }
            break;
        case 'ArrowDown':
            if (mowerY < lawnHeight - 10) {
                mowerY += 10;
                updateMowerPosition();
                cutGrass();
            }
            break;
        case 'ArrowLeft':
            if (mowerX > 0) {
                mowerX -= 10;
                updateMowerPosition();
                cutGrass();
            }
            break;
        case 'ArrowRight':
            if (mowerX < lawnWidth - 10) {
                mowerX += 10;
                updateMowerPosition();
                cutGrass();
            }
            break;
    }
});



// Boucle de jeu principale pour les tondeuses automatiques
setInterval(function () {
    // Ici, vous pouvez ajouter des fonctionnalités pour les tondeuses automatiques
    // Par exemple, vous pouvez faire en sorte qu'elles coupent l'herbe automatiquement
}, 1000); // Cela exécutera la boucle de jeu toutes les secondes (1000ms)
