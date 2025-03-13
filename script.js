  const board = document.getElementById("board");
        const status = document.getElementById("status");
        let currentPlayer = "X";
        let cells = Array(9).fill(null);
        let gameActive = true;

        function highlightWinner(combo) {
            combo.forEach(index => {
                board.children[index].classList.add("winning");
            });
        }

        function checkWinner() {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (let combo of winningCombos) {
                let [a, b, c] = combo;
                if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                    status.textContent = `Player ${cells[a]} Wins!`;
                    status.classList.add("winner-highlight");
                    highlightWinner(combo);
                    gameActive = false;
                    setTimeout(() => {
                        resetGame();
                    }, 3000);
                    return true;
                }
            }
            if (!cells.includes(null)) {
                status.textContent = "It's a Draw!";
                setTimeout(resetGame, 2000);
                return true;
            }
            return false;
        }

        function handleClick(event) {
            if (!gameActive) return;
            const index = event.target.dataset.index;
            if (!cells[index]) {
                cells[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                event.target.classList.add("taken");
                if (!checkWinner()) {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    status.textContent = `Player ${currentPlayer}'s Turn`;
                }
            }
        }

        function resetGame() {
            cells.fill(null);
            board.innerHTML = "";
            status.textContent = "Player X's Turn";
            status.classList.remove("winner-highlight");
            currentPlayer = "X";
            gameActive = true;
            createBoard();
        }

        function createBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                cell.addEventListener("click", handleClick);
                board.appendChild(cell);
            }
        }

        createBoard();