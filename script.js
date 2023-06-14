score = 0;//global variable
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("the key code is : ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animatedino');
        setTimeout(() => {
            dino.classList.remove('animatedino')
        }, 800)
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = dinox + 112 + 'px';//increase the x value of dino when right arrow key is pressed to move dino in right direction
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = (dinox - 112) + 'px';//decrease the x value of dino when left arrow key is pressed to move dino in left direction
    }
}

setInterval(() => {
    dino = document.querySelector('.dino')
    gameover = document.querySelector('.gameover')
    obstacle = document.querySelector('.obstacle')

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))//getting the current x value of the dino which are initially in pixel, parseInt will convert them ininteger
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'))//getting the current y value of the dino
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))//getting the current x value of the dino
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))//getting the current y value of the dino

    offsetx = Math.abs(dx - ox) //difference between the x values of dino and obstacle which is decreasing permanently
    offsety = Math.abs(dy - oy) //difference between the y values of dino and obstacle 
    console.log(offsetx, offsety)
    if (offsetx < 73 && offsety < 53) {
        gameover.style.visibility = 'visible'//when both dino and obstacle collide gameover will be displayed
        obstacle.classList.remove('obstacleani')//when both dino and obstacle collide animation of obstacle will stop
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetx < 145 && cross) {
        score += 1;
        updatescore(score);
        cross = false;
        setTimeout(() => {
            cross = true
        }, 1000)
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10)

function updatescore(score) {
    scorecont.innerHTML = "Your Score: " + score
}