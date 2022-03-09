class Enemy {
  constructor(theRoot, enemySpot) {
    this.root = theRoot;
    this.spot = enemySpot;
    this.x = enemySpot * ENEMY_WIDTH;

    // the y position is initially less than 0 so that the enemies fall from the top.
    this.y = -ENEMY_HEIGHT;

    // the destroyed property will indicate whether this enemy is still in play.
    this.destroyed = false;

    this.domElement = document.createElement("img");
    this.domElement.src = "./images/Enemy.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  //the speed property of the enemy.
  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    // removing enemy at the bottom of the screen.
    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);

      this.destroyed = true;
    }
  }
}
