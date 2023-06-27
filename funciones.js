var hero = {
    x: 300,
    y: 650
}
var score = 0;

var enemies = [{ x: 50, y: 50 }, { x: 250, y: 50 }, { x: 450, y: 50 }, { x: 550, y: 50 }, { x: 700, y: 50 }, { x: 850, y: 50 }, { x: 950, y: 50 }];

var bullets = [];

function displayHero() {
    document.getElementById('hero').style['top'] = hero.y + "px";
    document.getElementById('hero').style['left'] = hero.x + "px";
}

function displayEnemies() {
    var output = '';
    for (var i = 0; i < enemies.length; i++) {
        output += "<div class= 'enemy1' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;'></div>";
    }
    document.getElementById('enemies').innerHTML = output;
}

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].y += 4;

        if (enemies[i].y > 690) {
            enemies[i].y = 0;
            enemies[i].x = Math.random() * 800;
        }
    }
}

function moveBullets() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].y -= 5;

        if (bullets[i].y < 0) {
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop();
        }
    }
}

function displayBullets() {
    var output = '';
    for (var i = 0; i < bullets.length; i++) {
        output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" + bullets[i].x + "px;'></div>";
    }
    document.getElementById('bullets').innerHTML = output;
}

function displayScore() {
    document.getElementById('score').innerHTML = score;
}

function gameLoop() {
    displayHero();
    moveEnemies();
    displayEnemies();
    moveBullets();
    displayBullets();
    detectHeroCollision(); 
    detectBulletCollision(); 
    displayScore();
}

setInterval(gameLoop, 20)

function detectHeroCollision() {
    for (var i = 0; i < enemies.length; i++) {
        if (Math.abs(hero.x - enemies[i].x) < 20 &&Math.abs(hero.y - enemies[i].y) < 20){
            score -= 500; 
            resetHeroPosition(); // Volver a la posición inicial del héroe
        }
    }
}

function resetHeroPosition() {
    hero.x = 300;
    hero.y = 650;
}

function detectBulletCollision() {
    var hitSound = document.getElementById('sonido');

    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
            if (Math.abs(bullets[i].x - enemies[j].x) < 10 && Math.abs(bullets[i].y - enemies[j].y) < 10){
                // Reemplazar el avión enemigo golpeado con la explosión
                document.getElementById('enemies').innerHTML +="<div class='explosion' style='top:" +enemies[j].y +"px; left:" +enemies[j].x +"px;'></div>";

                bullets.splice(i, 1); // Eliminar la bala correspondiente
                score += 10; 
                hitSound.currentTime = 1;
                hitSound.play();
                // Eliminar el avión enemigo golpeado
                enemies.splice(j, 1);
                break; // Salir del bucle interno para evitar colisiones múltiples con la misma bala
            }
        }
    }
}

document.onkeydown = function (e) {
    if (e.keyCode == 37 && hero.x > 0) {
        hero.x -= 10;

    } else if (e.keyCode == 39 && hero.x < 980) {
        hero.x += 10;

    } else if (e.keyCode == 40 && hero.y < 680) {
        hero.y += 10;

    } else if (e.keyCode == 38 && hero.y > 100) {
        hero.y -= 10;

    } else if (e.keyCode == 32) {
        bullets.push({ x: hero.x + 8, y: hero.y - 15 });
        displayBullets();
    }
}
