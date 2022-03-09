const gameEngine = new Engine(document.getElementById("app"));

// keydownHandler
const keydownHandler = (event) => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
};

document.addEventListener("keydown", keydownHandler);

// CSS
const startWrapper = document.querySelector(".start-wrapper");
const startbtn = document.querySelector(".start-btn");
const app = document.querySelector("#app");

startbtn.addEventListener("click", () => {
  gameEngine.gameLoop();
  app.style.display = "block";
  startWrapper.style.display = "none";
});
