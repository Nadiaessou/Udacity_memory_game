/*
 * Create a list that holds all of your cards
 */
let listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"]


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

///////////////////////////////////////////////////////////////////////////////////


let open = [];
let matchedCards = 0;
let move = 0;
let star = 3;


/////////////////////////////// MOVES AND STARS ///////////////////////////////

let level1 = 12;
let level2 = 20;
let level3 = 30;


function removeStar() {
    $(".fa-star").last().attr("class", "fa fa-star-o");
    star--;
    $(".num-stars").text(String(star));
};

function updateMove() {
    $(".moves").text(move);
    if (move === level1 || move === level2 || move === level3) {
        removeStar();
    }
};


/////////////////////////////// LOGIC CARD ///////////////////////////////


let clickCard = function() {
    if (selectedCard($(this))) {
        if (open.length === 0) {
            openCard($(this));

        } else if (open.length === 1) {
            openCard($(this));
            move++;
            updateMove();

            if (checkMatch()) {
                setTimeout(setMatch, 200);
            } else {
                setTimeout(resetOpen, 600);
            }
        }
    }
};

$(".card").click(clickCard);


/////////////////////////////// CHECK IF CARD IS OPEN AND MATCH ///////////////////////////////



function selectedCard(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
};

function checkMatch() {
    if (open[0].children().attr("class") === open[1].children().attr("class")) {
        return true;
    } else {
        return false;
    }
};


/////////////////////////////// SET AND RESET CARD OPEN ///////////////////////////////


function openCard(card) {
    if (!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");
        open.push(card);
    }
};

let resetOpen = function() {
    open.forEach(function(card) {
        card.toggleClass("open");
        card.toggleClass("show");
    });
    open = [];
};


/////////////////////////////// Set card to match and display alert ///////////////////////////////


let setMatch = function() {
    open.forEach(function(card) {
        card.addClass("match");
    });
    open = [];
    matchedCards += 2;
    if ($('.deck').find('.match').length === 16) {
        // alert from https://sweetalert2.github.io/
        swal({
            title: 'Congratulations !',
            text: "You won this game",
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#02b3e4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Play again'
        }).then((result) => {
            if (result.value) {
                document.location.reload()
            }
        })
    }
};


/////////////////////////////// RESET GAME ///////////////////////////////

let resetGame = function() {
    document.location.reload()
};

$(".restart").click(resetGame);
