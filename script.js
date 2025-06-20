let userScore = 0;
let compScore = 0;
let streak = 0;

function play(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const countdown = document.getElementById("countdown");
  const resultEl = document.getElementById("winner");
  const remarkEl = document.getElementById("remark");
  const sfx = document.getElementById("sfx");

  // Reset display
  resultEl.textContent = "";
  remarkEl.textContent = "";
  document.getElementById("user-choice").textContent = "You: ❓";
  document.getElementById("computer-choice").textContent = "Computer: ❓";

  let count = ["Rock...", "Paper...", "Scissors...", "Shoot!"];
  let i = 0;

  let interval = setInterval(() => {
    countdown.textContent = count[i];
    i++;
    if (i === count.length) {
      clearInterval(interval);

      // Show choices
      document.getElementById("user-choice").textContent = "You: " + emoji(userChoice);
      document.getElementById("computer-choice").textContent = "Computer: " + emoji(computerChoice);

      // Play sound
      sfx.play();

      const result = getWinner(userChoice, computerChoice);
      resultEl.textContent = result;

      // Remarks
      remarkEl.textContent = wittyRemark(result);

      // Score logic
      if (result.includes("You Win")) {
        userScore++;
        streak++;
      } else if (result.includes("Computer Wins")) {
        compScore++;
        streak = 0;
      }

      document.getElementById("user-score").textContent = userScore;
      document.getElementById("comp-score").textContent = compScore;
      document.getElementById("streak").textContent = streak;
    }
  }, 500);
}

function getWinner(user, comp) {
  if (user === comp) return "It's a Draw!";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) {
    return "You Win!";
  } else {
    return "Computer Wins!";
  }
}

function emoji(choice) {
  switch(choice) {
    case "rock": return "✊ Rock";
    case "paper": return "✋ Paper";
    case "scissors": return "✌️ Scissors";
  }
}

function wittyRemark(result) {
  const winRemarks = [
    "Crushed it! 💪",
    "Easy dub 😎",
    "You're on fire! 🔥",
    "Too smooth 🎯"
  ];

  const loseRemarks = [
    "Oof. Try again?",
    "Computer flexed 😬",
    "That's rough buddy.",
    "Yikes... regroup!"
  ];

  const drawRemarks = [
    "A fair battle.",
    "Neck and neck!",
    "Stalemate 🤝",
    "Nobody blinked."
  ];

  if (result.includes("Win")) return randomPick(winRemarks);
  if (result.includes("Computer")) return randomPick(loseRemarks);
  return randomPick(drawRemarks);
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
