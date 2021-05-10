var shuffled = new Array(20);
var num_turned, firstcard, firstid, counter, game_started, cards_removed;

window.onload = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    shuffled = shuffleArray(arr);
    num_turned = 0;
    counter = 0;
    cards_removed = 0;
    game_started = false;
}

function shuffleArray(array) {

    return array.sort(() => Math.random() - 0.5);

}

var min = document.getElementById("mins");
var sec = document.getElementById("seconds");
var min_counter, sec_counter;

function runtimer() {
    sec_counter += 1;

    if (sec_counter == 60) {
        min_counter += 1;
        sec_counter = 0;
    }

    if (min_counter <= 9) {
        min.innerHTML = "0" + min_counter;
    }
    else {
        min.innerHTML = min_counter;
    }

    if (sec_counter <= 9) {
        sec.innerHTML = "0" + sec_counter;
    }
    else {
        sec.innerHTML = sec_counter;
    }
}

function turn(card) {

    if (game_started == false) {
        game_started = true;
        min_counter = 0;
        sec_counter = 0;
        var game_timer = setInterval(runtimer, 1000);
    }

    cid = card.id;
    num_turned += 1;
    counter += 1;
    pos = cid.slice(1) - 1;
    num_at_pos = shuffled[pos];
    document.getElementById(cid).src = "Images/image" + num_at_pos + ".png";
    document.getElementById(cid).style.border = "4px solid #58b498";
    document.getElementById("numturns").innerHTML = counter;

    if (num_turned == 1) {
        firstcard = num_at_pos; //the card number of first card
        firstid = cid;
    }
    else { //num_turned == 2

        var first_turned = document.getElementById(firstid);
        var second_turned = document.getElementById(cid);

        if (firstcard == num_at_pos) { //num_at_pos had card number of second card
            cards_removed += 2;
            setTimeout(() => {
                var span1 = document.createElement("span");
                var span2 = document.createElement("span");
                span1.className = "card";
                span2.className = "card";
                span1.style.border = "0px";
                span2.style.border = "0px";
                first_turned.parentNode.replaceChild(span1, first_turned);
                second_turned.parentNode.replaceChild(span2, second_turned);
            }, 800);
        }
        else { //cards don't match
            setTimeout(() => {
                first_turned.src = "Images/image.jpg";
                second_turned.src = "Images/image.jpg";
                first_turned.style.border = "3.5px solid  #7e1348";
                second_turned.style.border = "3.5px solid  #7e1348";

            }, 800);
        }
        num_turned = 0;

        if (cards_removed == 20) {
            setTimeout(() => {
                clearInterval(game_timer);
                alert('Congratulations!! You completed the game in ' + min_counter + ' minutes and '
                    + sec_counter + ' seconds with ' + counter + ' turns');
                window.location.reload();
            }, 500);
        }
    }

}

