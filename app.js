/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var dice, scores, roundscore, activePlayer, gamePlay;

newgame();


//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//document.getElementById('score-0').textContent = '0';
//document.getElementById('score-1').textContent = '0';
//document.getElementById('current-0').textContent = '0';
//document.getElementById('current-0').textContent = '0';
//read elements from a html page

//var x = document.querySelector('#score-0').textContent;

//document.querySelector('.dice').style.display = 'none';

function btn(){
    if(!gamePlay){
    }
    else{
        
        //Do something here
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block'
        diceDOM.src = 'dice-'+dice+'.png';
        diceDOM2.src = 'dice-'+dice2+'.png';

        if (dice !== 1 && dice2 !== 1){
            //Add Score
            roundscore += dice + dice2;
            if (roundscore + scores[activePlayer] >=100){
                gamePlay = false;
                document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer] + roundscore;
                winner();
                //newgame();
            }
            document.querySelector('#current-'+activePlayer).textContent = roundscore;

        }
        else{
            //Next Player
            scores[activePlayer] += roundscore;
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
            if(scores[activePlayer] >= 100){
                gamePlay = false;
                winner();
                //newgame();
            }
            else
                nextPlayer();
        }
        
        
    }
    
}

function winner(){
        document.querySelector('#name-' + activePlayer).textContent = "Winner!";
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer+'-panel').classList.remove('active');
}

function hold(){
    //ADD current score to the global score
    if (!gamePlay){
        
    }
    else
        {
            scores[activePlayer]+= roundscore;
    
            //Update the UI
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

            //Check if player won the game
            if (scores[activePlayer] >= 100){
                gamePlay = false;
                winner();
                //newgame();
            }
            else{
                nextPlayer();
            }
    
        }
    
    
    
}

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundscore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
}

function newgame(){
        scores = [0,0];
        activePlayer = 0;
        roundscore = 0;
        gamePlay = true;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0'; 
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
    
        document.getElementById('name-0').textContent = "Player 1";
        document.getElementById('name-1').textContent = "Player 2";
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    
}

document.querySelector('.btn-roll').addEventListener('click', btn);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', newgame);