
    var intervalTime = 115;
    var clear = 0;

$(document).ready(function (){
var diff = 'medium'
    document.getElementById("medium").onclick=snake(diff); //snake(***) runs the game with *** diff


});
   function snake (diff) {
difficulty = diff;
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

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = "black";
            ctx.strokeRect(0, 0, w, h);

            ctxScore.fillStyle = "black";
            ctxScore.fillRect(0, 0, wSc, hSc);
            ctxScore.strokeStyle = "black";
            ctxScore.strokeRect(0, 0, wSc, hSc);

            function Point(x, y) {
                this.x = x;
                this.y = y;
            }

            function obstaclesArray(w, h, difficulty) {
//            initialization and execution
                var arrayOfObstacles = [];
                createBorders(w, h);
                switch (difficulty) {
                    case 'easy':
                        break;
                    case 'medium':
                        createPredefinedObstacles();
                        break;
                    case 'hard':
                        createScatteredSquareObstacles();
                        break;
                }

//            functions definition

                function createBorders(w, h) {
                    for (var i = 0; i < w; i++) {
                        arrayOfObstacles.push(new Point(i, 0));
                        arrayOfObstacles.push(new Point(i, h / 10 - 1))
                    }

                    for (var j = 0; j < w; j++) {
                        arrayOfObstacles.push(new Point(0, j));
                        arrayOfObstacles.push(new Point(w / 10 - 1, j))
                    }
                }

                function createPredefinedObstacles() {
//                var numberOfObstacles = 10;
//                var currentObstacle = 0;
                    for (var i = 0; i < 5; i++) {
                        var x = 8 + 12 * i;
                        for (var j = 0; j < 3; j++) {
                            var y = 10 + 13 * j;
                            var rnd = Math.floor(Math.random() * 3);
                            createTokens(x, y, rnd);
                        }
                    }
//                do {var rnd = Math.floor(Math.random() * 3) ;
//                    currentObstacle++;
//                    var x = 15 + Math.floor(Math.random() * currentObstacle * 4);
//                    var y = 10 + Math.floor(Math.random() * currentObstacle * 3);
//
//                    if (isFree) { // occupancy check here would've been nice
//                        // TODO: 1. create functions for the elements (3 left);
//                        // 2. create a randomizer
//                        // 3. populate with the while loop
//
//                        createTokens(x, y, rnd);
//                        occupied.push(21-numberOfObstacles);
//                        numberOfObstacles--;
//                    } else  {
//                        currentObstacle--;
//                        continue;
//                    }
//                } while (numberOfObstacles > 0);
                    function createTokens(w, h, type) {
                        switch (type) {
                            case 0: // 5x5 matrix with respect to the center of the figure
                                arrayOfObstacles.push(new Point(w - 2, h + 2));
                                arrayOfObstacles.push(new Point(w, h + 2));
                                arrayOfObstacles.push(new Point(w + 2, h + 2));
                                arrayOfObstacles.push(new Point(w - 2, h));
                                arrayOfObstacles.push(new Point(w, h));
                                arrayOfObstacles.push(new Point(w + 2, h));
                                arrayOfObstacles.push(new Point(w - 2, h - 2));
                                arrayOfObstacles.push(new Point(w, h - 2));
                                arrayOfObstacles.push(new Point(w + 2, h - 2));
                                break;
                            case 1: // X shaped object, 9x9
                                arrayOfObstacles.push(new Point(w - 4, h + 4));
                                arrayOfObstacles.push(new Point(w + 4, h + 4));
                                arrayOfObstacles.push(new Point(w - 2, h + 2));
                                arrayOfObstacles.push(new Point(w + 2, h + 2));
                                arrayOfObstacles.push(new Point(w, h));
                                arrayOfObstacles.push(new Point(w - 2, h - 2));
                                arrayOfObstacles.push(new Point(w + 2, h - 2));
                                arrayOfObstacles.push(new Point(w - 4, h - 4));
                                arrayOfObstacles.push(new Point(w + 4, h - 4));
                                break;
                            case 2: // O shaped object, 9x9
                                arrayOfObstacles.push(new Point(w - 1, h - 4));
                                arrayOfObstacles.push(new Point(w, h - 4));
                                arrayOfObstacles.push(new Point(w + 1, h - 4));
                                arrayOfObstacles.push(new Point(w - 3, h - 2));
                                arrayOfObstacles.push(new Point(w + 3, h - 2));
                                arrayOfObstacles.push(new Point(w - 3, h));
                                arrayOfObstacles.push(new Point(w + 3, h));
                                arrayOfObstacles.push(new Point(w - 3, h + 2));
                                arrayOfObstacles.push(new Point(w + 3, h + 2));
                                arrayOfObstacles.push(new Point(w - 1, h + 4));
                                arrayOfObstacles.push(new Point(w, h + 4));
                                arrayOfObstacles.push(new Point(w + 1, h + 4));
                                break;
                        }
                    }

//                function occupancyCheck(x, y) { // doesn't work for some reason
////                check if we have space (9x9 matrix) for the next obstacle, function will return true if yes
//                    for (var index = 0; index < arrayOfObstacles.length; index++) {
//
////                    TODO: funny how if you comment the for-loop the program won't run
//                        if (
//                            (x - 4 === arrayOfObstacles[index].x || x - 3 === arrayOfObstacles[index].x ||
//                            x - 2 === arrayOfObstacles[index].x || x - 1 === arrayOfObstacles[index].x ||
//                            x === arrayOfObstacles[index].x || x + 1 === arrayOfObstacles[index].x ||
//                            x + 2 === arrayOfObstacles[index].x || x + 3 === arrayOfObstacles[index].x ||
//                            x + 4 === arrayOfObstacles[index].x)
//                            &&
//                            (y - 4 === arrayOfObstacles[index].y || y - 3 === arrayOfObstacles[index].y ||
//                                y - 2 === arrayOfObstacles[index].y || y - 1 === arrayOfObstacles[index].y ||
//                                y === arrayOfObstacles[index].y || y + 1 === arrayOfObstacles[index].y ||
//                                y + 2 === arrayOfObstacles[index].y || y + 3 === arrayOfObstacles[index].y ||
//                                y + 4 === arrayOfObstacles[index].y)
//                            )
//                        {
//                            alert(success);
//                            return false;
//                        } else {
//                            return true;
//                        }
//                    }
//
//                }
                }

                function createScatteredSquareObstacles() {
                    var numberOfObstacles = 70;
                    for (var i = 0; i < numberOfObstacles; i++) {
                        var x = Math.floor(Math.random() * (63)) + 1;
                        var y = Math.floor(Math.random() * (63)) + 1;
                        arrayOfObstacles.push(new Point(x, y));
                    }
                }

                return arrayOfObstacles
            }

            //Creating the grid

            var arrayObstacles = obstaclesArray(w, h, difficulty);
            var ctxObstacles = canvas.getContext("2d");
            for (var q = 0; q < arrayObstacles.length; q++) {
                ctxObstacles.fillStyle = "white";
                ctxObstacles.fillRect(arrayObstacles[q].x * 10, arrayObstacles[q].y * 10, 10, 10)
            }
            //Creating the snake
            var arraySnake = [];
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

            var direction = 'right';

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

            var food = createFood();
//    alert(food.x);
//    alert(food.y);
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


            var main = setInterval(function () {
                var newHead = createNewHead(direction, snakeHead)

                if (newHead.x * 10 === food.x && newHead.y * 10 === food.y) {

                    arraySnake.push(newHead);
                    snakeHead = newHead;
                    food = createFood();

                    score++;
                    //paint the score
                    var score_text = "Score: " + score;

                    ctxScore.fillStyle = "black";
                    ctxScore.fillRect(0, 0, wSc, hSc);
                    ctxScore.fillStyle = "white";
                    ctxScore.fillText(score_text, 15, 10);


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
                                clearInterval(foodGen)

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
                                    clearInterval(foodGen)

                                }
                                break


                            }
                        }

                    }
                    arraySnake.push(newHead)
                    snakeHead = arraySnake[arraySnake.length - 1]
                    var a = arraySnake.shift();
                    ctxSnake.fillStyle = "black";
                    ctx.fillRect(a.x * 10, a.y * 10, 10, 10)
                    for (var j = 0; j < arraySnake.length; j++) {
                        ctxSnake.fillStyle = "blue";
                        ctx.fillRect(arraySnake[j].x * 10, arraySnake[j].y * 10, 10, 10)
                    }
                }

            }, intervalTime);

            var foodGen = setInterval(function () {
                ctx.fillStyle = "white";
                ctx.fillRect(food.x, food.y, 10, 10)
                arrayObstacles.push(new Point(food.x / 10, food.y / 10));


                food = createFood();

                ctxFood.fillStyle = "green";
                ctxFood.fillRect(food.x, food.y, 10, 10)


            }, 10000);

            $(document).keydown(function (e) {
                var key = e.which;

                if (key == "37" && direction != "right") direction = "left";
                else if (key == "38" && direction != "down") direction = "up";
                else if (key == "39" && direction != "left") direction = "right";
                else if (key == "40" && direction != "up") direction = "down";

            })

        }


