$(document).ready(function () {
    //Paint the canvas
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);
    
    function Point(x, y) {
        this.x = x;
        this.y = y;

    }

  

    //Creating the snake
    var arraySnake = []
    snakeLength = 5;
    for (var i = 0; i < snakeLength; i++) {
        arraySnake.push({x:i,y:0})
    }

    //Paint the snake on the window

    var ctxSnake = canvas.getContext("2d");

    for (var j = 0; j < arraySnake.length;j++) {
        ctxSnake.fillStyle = "blue";
        ctx.fillRect(arraySnake[j].x*10,arraySnake[j].y*10,10,10)
    }
    var snakeHead = arraySnake[arraySnake.length - 1]
    var intervalTime = 75
    var direction='right'
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
                resultToCreateNewHead = new Point(existingHead.x, existingHead.y-1)

                break
            case 'down':
                resultToCreateNewHead = new Point(existingHead.x, existingHead.y+1)

                break
        }
        return resultToCreateNewHead;
    }

    setInterval(function () {    
        var newHead = createNewHead(direction, snakeHead)
        arraySnake.push(newHead)        
        snakeHead = arraySnake[arraySnake.length - 1]
        var a = arraySnake.shift();
        ctxSnake.fillStyle = "grey";
        ctx.fillRect(a.x * 10, a.y * 10, 10, 10)
        for (var j = 0; j < arraySnake.length; j++) {
            ctxSnake.fillStyle = "blue";
            ctx.fillRect(arraySnake[j].x * 10, arraySnake[j].y * 10, 10, 10)
        }
        
    }, intervalTime);

    $(document).keydown(function (e) {
        var key = e.which;

        if (key == "37" && direction != "right") direction = "left";
        else if (key == "38" && direction != "down") direction = "up";
        else if (key == "39" && direction != "left") direction = "right";
        else if (key == "40" && direction != "up") direction = "down";

    })
})