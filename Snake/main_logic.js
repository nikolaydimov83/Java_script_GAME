
var intervalTime = 115
var clear=0;

    $(document).ready(function () {

        //Paint the canvas
        var canvas = $("#canvas")[0];
        var ctx = canvas.getContext("2d");
        var w = $("#canvas").width();
        var h = $("#canvas").height();


        var score = $("#score")[0];
        var ctxScore = score.getContext("2d");
        var wSc = $("#score").width();
        var hSc = $("#score").height();

        var score = 0;

        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        ctxScore.fillStyle = "grey";
        ctxScore.fillRect(0, 0, wSc, hSc);
        ctxScore.strokeStyle = "black";
        ctxScore.strokeRect(0, 0, wSc, hSc);
        
        function Point(x, y) {
            this.x = x;
            this.y = y;

        }

        function obstaclesArray(w, h) {
            var arrayOfObstacles = [];
            for (var i = 0; i < w; i++) {
                arrayOfObstacles.push(new Point(i, 0))
                arrayOfObstacles.push(new Point(i, h / 10 - 1))
            }

            for (var j = 0; j < w; j++) {
                arrayOfObstacles.push(new Point(0, j))
                arrayOfObstacles.push(new Point(w / 10 - 1, j))
            }

            return arrayOfObstacles
        }

        //Creating the grid

        var arrayObstacles = obstaclesArray(w, h);
        var ctxObstacles = canvas.getContext("2d");
        for (var q = 0; q < arrayObstacles.length; q++) {
            ctxObstacles.fillStyle = "red";
            ctxObstacles.fillRect(arrayObstacles[q].x * 10, arrayObstacles[q].y * 10, 10, 10)
        }
        //Creating the snake
        var arraySnake = []
        snakeLength = 15;
        for (var i = 2; i < snakeLength + 2; i++) {
            arraySnake.push(new Point(i, 3))
        }



        //Paint the snake on the window

        var ctxSnake = canvas.getContext("2d");

        for (var j = 0; j < arraySnake.length; j++) {
            ctxSnake.fillStyle = "blue";
            ctx.fillRect(arraySnake[j].x * 10, arraySnake[j].y * 10, 10, 10)
        }
        var snakeHead = arraySnake[arraySnake.length - 1]

        var direction = 'right'


        function createFood() {
            var final;
            do {
                var positionX = Math.round(Math.random() * (w - 10))
                positionX = positionX - (positionX % 10);
                var positionY = Math.round(Math.random() * (h - 10))
                positionY = positionY - (positionY % 10);
                var food = new Point(positionX, positionY);
                final = food;
                var checkFood = false
                for (var i in arrayObstacles) {
                    if (arrayObstacles[i].x === positionX && arrayObstacles[i].y === positionY) {
                        checkFood = true;

                        break
                    }

                }

                for (var j in arraySnake) {
                    if (arraySnake[j].x === positionX && arraySnake[j].y === positionY) {
                        checkFood = true;
                        break
                    }

                }

            }
            while (checkFood === true)
            return final;
        }

        var food = createFood()
        alert(food.x);
        alert(food.y);
        var ctxFood = canvas.getContext("2d");
        ctxFood.fillStyle = "green";
        ctxFood.fillRect(food.x, food.y, 10, 10)

        function createNewHead(direction, existingHead) {
            var resultToCreateNewHead;
            switch (direction) {

                case 'right':
                    resultToCreateNewHead = new Point(existingHead.x + 1, existingHead.y)
                    break
                case 'left':
                    resultToCreateNewHead = new Point(existingHead.x - 1, existingHead.y)

                    break
                case 'up':
                    resultToCreateNewHead = new Point(existingHead.x, existingHead.y - 1)

                    break
                case 'down':
                    resultToCreateNewHead = new Point(existingHead.x, existingHead.y + 1)

                    break
            }
            return resultToCreateNewHead;
        }


        var main=setInterval(function () {
            var newHead = createNewHead(direction, snakeHead)

            if (newHead.x * 10 === food.x && newHead.y * 10 === food.y) {

                arraySnake.push(newHead);
                snakeHead = newHead;
                food = createFood();

                score++;
                //paint the score
                var score_text = "Score: " + score;
                ctxScore.fillStyle = "blue";
                ctxScore.fillText(score_text, 10, 10);


                ctxFood.fillStyle = "green";
                ctxFood.fillRect(food.x, food.y, 10, 10)
                for (var j = 0; j < arraySnake.length; j++) {
                    ctxSnake.fillStyle = "blue";
                    ctxSnake.fillRect(arraySnake[j].x * 10, arraySnake[j].y * 10, 10, 10)
                }


            } else {
                for (var index in arrayObstacles) {
                    if (clear > 0) {
                        break;
                    }
                    if (arrayObstacles[index].x === newHead.x && arrayObstacles[index].y === newHead.y) {
                        alert("Game over");
                        clear++
                        if (clear > 0) {
                            clearInterval(main)

                        }
                        break

                    }
                    for (var cell = 1; cell < arraySnake.length; cell++) {
                        if (cell === index) {
                            continue;
                        }
                       
                        if (newHead.x === arraySnake[cell].x && newHead.y === arraySnake[cell].y) {
                            alert("Game over! Too hungry");
                           
                            clear++
                            if (clear > 0) {
                                clearInterval(main)

                            }
                            break
                            
                           
                        }
                    }

                }
                arraySnake.push(newHead)
                snakeHead = arraySnake[arraySnake.length - 1]
                var a = arraySnake.shift();
                ctxSnake.fillStyle = "grey";
                ctx.fillRect(a.x * 10, a.y * 10, 10, 10)
                for (var j = 0; j < arraySnake.length; j++) {
                    ctxSnake.fillStyle = "blue";
                    ctx.fillRect(arraySnake[j].x * 10, arraySnake[j].y * 10, 10, 10)
                }
            }

        }, intervalTime);
       
        setInterval(function () {
            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, 10, 10)
            arrayObstacles.push(new Point(food.x / 10, food.y / 10));


            food = createFood();

            ctxFood.fillStyle = "green";
            ctxFood.fillRect(food.x, food.y, 10, 10)
            if (clear > 0) {
                clearInterval(main)

            }

        }, 10000);

        $(document).keydown(function (e) {
            var key = e.which;

            if (key == "37" && direction != "right") direction = "left";
            else if (key == "38" && direction != "down") direction = "up";
            else if (key == "39" && direction != "left") direction = "right";
            else if (key == "40" && direction != "up") direction = "down";

        })

    })

