const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resetBtn = document.querySelector("#btn-icon");

// Paddle Properties
let speed = 2;
let paddleSpeed = 10
const dx = 10; // change in x(speed in x-direction)
const dy = 10; // change in y(speedi in y-direction)

// Ball properties
const ball = {
    x: canvas.width / 2,  //  x-axis postioning
    y: canvas.height / 2,   // y-axis postioning
    speedX: 5, // Reduce the speedX value to make the ball move slower in the x-direction
    speedY: 5, // Reduce the speedY value to make the ball move slower in the y-direction
    radius: 15,
    color: "black",
    height: 20,
    width: 20,

    update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.speedX = -ball.speedX;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.speedY = -ball.speedY;
        }

        if (ball.y + ball.radius > paddle1 && ball.x - ball.radius < 0) {
            ball.speedY = -ball.speedY;
            ball.speedX = ball.speedX;
            paddle1.score++;
        }

        if (ball.x + ball.radius > paddle2 && ball.x - ball.radius < 0) {
            ball.speedY = -ball.speedY;
            ball.speedX = ball.speedX;
            paddle2.score++;
        }

    }};
   
    //Ball movement with a promise object.//

 /*ballMovement = () => {
    // Simulate a delay
    setTimeout(() => {
        // Update the ball's position with a new random position
        const newX = Math.random() * (canvas.width - 2 * ball.radius);
        const newY = Math.random() * (canvas.height - 2 * ball.radius);
        ball.x = newX;
        ball.y = newY;
    }, 2000); // Adjust the delay as needed
}
*/

// paddles
const paddle1 = {
    x: 10,
    y: 50,
    width: 20,
    height: 100,
    speed: paddleSpeed,
    score: 0,
    color: "blue",

    update() {
       
      

    },

    checkCollision() {
        return this.y > paddle2.y - this.height && this.y < paddle2.y + paddle2.height && this.x + this.radius > paddle2.x;
    }
};

const paddle2 = {
    x: canvas.width - 20,
    y: 10,
    width: 20,
    height: 100,
    speed: paddleSpeed,
    score: 0,
    color: "red",

    update() {
        
     // Update paddle2's position based on the ball's y-coordinate
    paddle2.update = function() {
    // Calculate the paddle's new y-coordinate based on the ball's y-position
    const newPaddle2Y = paddle2.speed + ball.y - paddle2.height / 2;

    // Update the paddle's y-coordinate only if it's within the canvas boundaries
    if (newPaddle2Y >= 0 && newPaddle2Y <= canvas.height - paddle2.height) {
        paddle2.y = newPaddle2Y;
    }
};
        
    },

    checkCollision  () {
        return this.y > paddle1.y - this.height && this.y < paddle1.y + paddle1.height && this.x - this.radius < paddle1.x + paddle1.width;
    }
};

// paddle 1 movement
window.addEventListener('mousemove', function(event) {
    paddle1.y = event.clientY - paddle1.height / 2;
});

// displaying to the web
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle1.update();
    paddle2.update();
    ball.update();
    paddle1.checkCollision();
    paddle2.checkCollision();
    

    ctx.fillStyle = paddle1.color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    // displaing paddle 2
    ctx.fillStyle = paddle2.color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    // displaying the ball
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.fillRect(ball.x, ball.y, ball.radius * 2, ball.radius * 2);
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * ball.speed);

    requestAnimationFrame(animate);
    //ballMovement();
    
}
animate();