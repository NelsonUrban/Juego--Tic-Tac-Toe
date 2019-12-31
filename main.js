const CROSS = "X";
const CERO = "O";
let currentPlayer = CROSS;
let GAME = ["", "", "", "", "", "", "", "", ""];

const verifyWinner = () => {
    const winnerCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winnerCombinations) {

        let a =  GAME[combination[0]];
        let b =  GAME[combination[1]];
        let c =  GAME[combination[2]];

        if (a !== "" && a === b && b === c) {

            return { winner: a };
        }
    }
    return undefined;
};

const gameOver = (winner, tide) => {
    let msg = `el ganador es ${winner}`
    let label = $('.msg').find('label')

    $(".item").each(function () {
        $(this).prop('disabled', true)
    })
    $('.msg').css({ display: 'block' })

    if (tide) {
        msg = "Empate"
        label.css({ color: 'red' })
    } else {
        label.css({ color: 'green' })
    }
    label.text(msg)
}

const playAgain = () => {
    const lblTurno = $('#lblTurno');
    currentPlayer = CROSS;
    lblTurno.text(currentPlayer)
     GAME = ["", "", "", "", "", "", "", "", ""];

    $(".item").each(function () {
        $(this).prop('disabled', false)
        $(this).removeClass('X O')
        $('.msg').css({ display: 'none' })
    })
}

const gameIsTide = () => {
    for (let posicion of  GAME) {
        if (posicion === "") {
            return false
        }
    }

    return true
}


$(document).ready(() => {
    const lblTurno = $('#lblTurno');
    lblTurno.text(currentPlayer)
    $(".item").on("click", event => {
        let button = $(event.currentTarget);
        let cell = parseInt(button.attr("cell"));


        if ( GAME[cell] === "") {

             GAME[cell] = currentPlayer;
            if (currentPlayer === CROSS) {
                button.addClass("X");
                currentPlayer = CERO;

            } else {

                button.addClass("O");
                currentPlayer = CROSS;

            }
            lblTurno.text(currentPlayer)

            let { winner } = verifyWinner() || {};
            if (winner) {
                gameOver(winner)
            } if (gameIsTide()) {
                gameOver('', true)
            }
        }
    });
});
