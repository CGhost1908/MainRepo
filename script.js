let inGame = false;
let point = 0; 
let lastGameMode;
const timeInput = document.querySelector('.time-input');
const totalButton = document.querySelector('.total-button');
const perMoveButton = document.querySelector('.per-move-button');
const timer = document.querySelector('.timer');
const coordinateList = document.querySelector('.coordinate-list');
const coordinateViewer = document.querySelector('.coordinate-viewer');
const popup = document.querySelector('.pop-up');
const leftPanel = document.querySelector('.left-panel-designer');
const closeButton = document.querySelector('.close');
const closeButton2 = document.querySelector('.close-btn');
const pointText = document.querySelector('.point');
const retryButton = document.querySelector('.retry-btn');


totalButton.addEventListener('click', function(){
    totalGame();
});

perMoveButton.addEventListener('click', function(){
    perMoveGame();
});

retryButton.addEventListener('click', function(){
    if(lastGameMode === 'totalGame'){
        totalGame();
    }else if (lastGameMode === 'perMoveGame'){
        perMoveGame()
    }
});

closeButton.addEventListener('click', function(){
    popup.classList.remove('pop-up-show');
})

closeButton2.addEventListener('click', function(){
    popup.classList.remove('pop-up-show');
})

const letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numberArray = [1, 2, 3, 4, 5, 6, 7, 8];

function generateCoordinate(){
    const randomLetter = Math.floor(Math.random() * 8);
    const randomNumber = Math.floor(Math.random() * 8);
    const createCoordinateElement = document.createElement('h1');
    createCoordinateElement.classList.add('coordinate-element');
    createCoordinateElement.textContent = letterArray[randomLetter] + numberArray[randomNumber];
    coordinateViewer.textContent = letterArray[randomLetter] + numberArray[randomNumber];
    coordinateList.appendChild(createCoordinateElement);
    coordinateList.scrollTop = coordinateList.scrollHeight;
}

function totalGame(){

    const squares = document.querySelectorAll('.square');
    squares.forEach(function(square) {
        square.addEventListener('click', function() {
            if(inGame){
                console.log(square.value);
                if(coordinateViewer.textContent === square.value){
                    point++
                    console.log(point)
                }
            generateCoordinate();
            }
        });
    });

    lastGameMode = 'totalGame';

    if(timeInput.value !== "" && timeInput.value >= 1 && !inGame){
        totalButton.textContent = 'Stop';
        leftPanel.style.pointerEvents = 'none';
        perMoveButton.style.pointerEvents = 'none';
        popup.classList.remove('pop-up-show');
        timer.textContent = timeInput.value;
        let remainTime = timer.textContent;
        inGame = true;
        generateCoordinate();

        function decreaseTime() {
            remainTime--;    
            timer.textContent = remainTime;
            if (remainTime == 0 || !inGame) {
                pointText.textContent = "Point: " + point;
                point = 0;
                totalButton.textContent = 'Total';
                leftPanel.style.pointerEvents = 'all';
                perMoveButton.style.pointerEvents = 'all';
                inGame = false;
                clearInterval(interval);
                timer.textContent = 0;
                coordinateViewer.textContent = "";
                popup.classList.add('pop-up-show');
            }
        }

    const interval = setInterval(decreaseTime, 1000);
        
    }else if (timeInput.value === ""){
        alert('Set time');
    }else if(inGame){
        inGame = false;
    }else if(timeInput.value < 1){
        alert('Time must be bigger than 0!');
    }
}

function perMoveGame(){

    const squares = document.querySelectorAll('.square');
    squares.forEach(function(square) {
        square.addEventListener('click', function() {
            if(inGame){
                console.log(square.value);
                if(coordinateViewer.textContent === square.value){
                    point++
                    timer.textContent = timeInput.value;
                }else{
                    //pointText.textContent = "Point: " + point;
                    //point = 0;
                    //perMoveButton.textContent = 'Per Move';
                    //leftPanel.style.pointerEvents = 'all';
                    //totalButton.style.pointerEvents = 'all';
                    //inGame = false;
                    //clearInterval(interval);
                    //timer.textContent = 0;
                    //coordinateViewer.textContent = "";
                    //popup.classList.add('pop-up-show');
                }
                generateCoordinate();
            }
        });
    });

    lastGameMode = 'perMoveGame';

    if(timeInput.value !== "" && timeInput.value >= 1 && !inGame){
        perMoveButton.textContent = 'Stop';
        leftPanel.style.pointerEvents = 'none';
        totalButton.style.pointerEvents = 'none';
        popup.classList.remove('pop-up-show');
        timer.textContent = timeInput.value;
        inGame = true;
        generateCoordinate();

        function decreaseTime() {
            timer.textContent--;    
            if (timer.textContent == 0 || !inGame) {
                pointText.textContent = "Point: " + point;
                point = 0;
                perMoveButton.textContent = 'Per Move';
                leftPanel.style.pointerEvents = 'all';
                totalButton.style.pointerEvents = 'all';
                inGame = false;
                clearInterval(interval);
                timer.textContent = 0;
                coordinateViewer.textContent = "";
                popup.classList.add('pop-up-show');
            }
        }

    const interval = setInterval(decreaseTime, 1000);
        
    }else if (timeInput.value === ""){
        alert('Set time');
    }else if(inGame){
        inGame = false;
    }else if(timeInput.value < 1){
        alert('Time must be bigger than 0!')
    }
}

const showCoordinates = document.querySelector('.show-coordinates');
showCoordinates.addEventListener('change', function(){
    if(!showCoordinates.checked){
        document.querySelectorAll('.coordinate-letter').forEach(function(element){
            element.style.opacity = '0';
        })
        document.querySelectorAll('.coordinate-number').forEach(function(element){
            element.style.opacity = '0';
        })
    }else{
        document.querySelectorAll('.coordinate-letter').forEach(function(element){
            element.style.opacity = '1';
        })
        document.querySelectorAll('.coordinate-number').forEach(function(element){
            element.style.opacity = '1';
        })
    }
})

const rotateBoard = document.querySelector('.rotate-board');
const board = document.querySelector('.board');
const columns = document.querySelectorAll('.column');
const numbers = document.querySelectorAll('.coordinate-number');
const letters = document.querySelectorAll('.coordinate-letter');
rotateBoard.addEventListener('change', function(){
    if(rotateBoard.checked){
        board.style.flexDirection = 'row-reverse';
        columns.forEach(function(column){
            column.style.flexDirection = 'column-reverse';
        })
        letters.forEach(function(letter){
            letter.style.alignItems = 'start';
            letter.style.justifyContent = 'start';
            letter.style.marginLeft = '0px';
            letter.style.marginTop = '-40px';
        })
        numbers.forEach(function(number){
            number.style.alignItems = 'end';
            number.style.justifyContent = 'end';
            number.style.marginLeft = '-10px';
            number.style.marginTop = '-45px';
        })
    }else{
        board.style.flexDirection = 'row';
        columns.forEach(function(column){
            column.style.flexDirection = 'column';
        })
        letters.forEach(function(letter){
            letter.style.alignItems = '';
            letter.style.justifyContent = '';
            letter.style.marginLeft = '';
            letter.style.marginTop = '';
        })
        numbers.forEach(function(number){
            number.style.alignItems = '';
            number.style.justifyContent = '';
            number.style.marginLeft = '';
            number.style.marginTop = '';
        })
    }
})