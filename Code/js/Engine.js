class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.score = 0;
    addBackground(this.root);
  }

  // the gameLoop will run every few milliseconds.
  //  - updates the enemy positions
  //  - detects a collision
  //  - removes enemies that are too low
  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    let scorePts = document.querySelector(".scorePts");
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.destroyed) {
        this.score++;
        scorePts.innerText = this.score;
      }
      return !enemy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
    if (this.isPlayerDead()) {
      const endGame = document.querySelector(".end-game");
      endGame.style.display = "block";
      endGame.style.position = "absolute";
      return;
    }

    // restart button
    const restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", restartGame);

    function restartGame() {
      window.location.reload();
    }

    // if the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // dead player
  isPlayerDead = () => {
    let playerDead = false;

    this.enemies.forEach((enemy) => {
      if (
        enemy.x === this.player.x &&
        GAME_HEIGHT - PLAYER_HEIGHT <= enemy.y + ENEMY_HEIGHT
      ) {
        playerDead = true;
      }
    });

    return playerDead;
  };
}
