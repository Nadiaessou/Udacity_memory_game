/*
 * Create a list that holds all of your cards
 */
let listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"] // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/////////////////////////////// MOVES AND STARS ///////////////////////////////
let star = 3;
let level1 = 12;
let level2 = 20;
let level3 = 30;

function removeStar() {
    $(".fa-star").last().attr("class", "fa fa-star-o");
    star--;
    $(".num-stars").text(String(star));
}

;

function updateMove() {
    $(".moves").text(move);
    if (move === level1 || move === level2 || move === level3) {
        removeStar();
    }
}

;
/////////////////////////////// CHRONO ///////////////////////////////
let seconde = 0;
let minute = 0;
let heure = 0;

function chrono() {
    if (seconde < 59) {
        seconde++;
    } else {
        seconde = 0;
        minute++;
    }
    $('#chrono').text('Time : ' + minute + ':' + seconde);
}

;
let time = setInterval(chrono, 1000);
/////////////////////////////// LOGIC CARD ///////////////////////////////
let open = [];
let matchedCards = 0;
let move = 0;
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
}

;
$(".card").click(clickCard);
/////////////////////////////// RANDOM CARDS ///////////////////////////////
function randomCards() {
    listOfCards = shuffle(listOfCards);
    let index = 0;
    $.each($(".card i").not(".fa-anchor"), function() {
        $(this).attr("class", listOfCards[index]);
        index++;
    });
}

;
/////////////////////////////// CHECK IF CARD IS OPEN AND MATCH ///////////////////////////////
function selectedCard(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
}

;

function checkMatch() {
    if (open[0].children().attr("class") === open[1].children().attr("class")) {
        return true;
    } else {
        return false;
    }
}

;
/////////////////////////////// SET AND RESET CARD OPEN ///////////////////////////////
function openCard(card) {
    if (!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");
        open.push(card);
    }
}

;
let resetOpen = function() {
    open.forEach(function(card) {
        card.toggleClass("open");
        card.toggleClass("show");
    });
    open = [];
}

;
/////////////////////////////// Set card to match and display alert ///////////////////////////////
let setMatch = function() {
    open.forEach(function(card) {
        card.addClass("match");
    });
    open = [];
    matchedCards += 2;
    if ($('.deck').find('.match').length === 16) {
        clearTimeout(time);
        $('.popup').css('display', 'block');
        $('#popupAlert').text("You won this game in " + minute + 'min ' + seconde + "sec with " + star + "/3 stars");
    }
}

;
/////////////////////////////// RESET GAME ///////////////////////////////
let resetGame = function() {
    document.location.reload()
};

$(randomCards);
$(".bouton1").click(resetGame);
$(".restart").click(resetGame);
$(".bouton3").click(function() {
        $(".popup").css("display", "none");
    }

);