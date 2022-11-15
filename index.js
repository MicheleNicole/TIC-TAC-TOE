window.addEventListener("DOMContentLoaded", () => {
    /* SELECTED AND DEFINED THE HTML ELEMENTS NEEDED*/
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.querySelector("#reset");
    const announcer = document.querySelector(".announcer");

    /*VARIABLES NEEDED*/
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X"; /*it's x since ussually the game starts with x */
    let isGameActive = true;

    /* END GAME STATES STRING VALUES*/
    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE";

    /*WINNING CONDITIONS IN AN ARRAY WITH DIFFERENT INDEXES*/
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    /* FOR REFERENCE THE INDEXES WITHIN THE BOARD 
    [0][1][2]
    [3][4][5]
    [6][7][8]
    */

    /* IMPLEMENT HANDLE RESULT VALIDATION by looping through winConditions array */
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                /*if any of the elements is an empty string, so an empty tile, the iteration is skipped by using the continue keyword */
                continue;
            }
            if (a === b && b === c) {
                /*if they are equal exit the for loop using the break keyword */
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            /*if we have a winner, the announce function will call it with player X or O, based on the current player's value and set the game active as false as the game has ended */
            announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
        if (!board.includes("")) {
            /*to announce a tie */
            announce(TIE);
        }

    }

    /* IMPLEMENT ANNOUNCE FUNCITON */
    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = "Tie";
        }
        announcer.classList.remove("hide");
    };

    /* IMPLEMENT IS VALID ACTION FUNCTION */
    const isValidAction = (tile) => {
        /*checks whether the tile has a value already and if it has it returns false to make sure the user only plays empty tiles in their turn */
        if (tile.innerText === "X" || tile.innerText === "O") {
            return false;
        }

        return true;
    };

    /* IMPLEMENT UPDATE BOARD FUNCTION */
    const updateBoard = (index) => {
        /*it sets the value of the element in the board array at the given position to be equal to the value of the current player variable */
        board[index] = currentPlayer;
    };

    /* IMPLEMENT CHANGE PLAYER FUNCTION */
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X"; /*changes the current player based on who's turn it is */
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`); /*updates the player display to display the current player with the appropriate class */
    };

    /* IMPLEMENT THE USER ACTION FUNCTION THAT REPRESENTS THE TURN IN THE GAME AND WILL BE CALLED WHEN THE USER CLICKS ON THE TILE*/
    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            /* if the step is a valid action and if there is no endgame status */
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`); /*assign the class based on the current player */
            updateBoard(index);
            handleResultValidation(); /*check for winner */
            changePlayer();
        }
    }

    /* IMPLEMENT RESET BOARD FUNCTION */
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '',];
        isGameActive = true;
        announcer.classList.add("hide");

        if (currentPlayer === "O") {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = "";
            tile.classList.remove("playerX");
            tile.classList.remove("playerO");
        });
    };

    /*ATTACH AN EVENT LISTENER TO EVERY TILE SO WHEN U CLICK ON IT THE USER ACTION FUNCTION WILL BE CALLED WITH THE REFERENCE OF THAT SPECIFIC TILE'S INDEX */
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard); /*resets the board and game when the reset button is clicked*/
});
