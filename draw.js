function drawBall(ctx,x,y,ballRadius) //绘制球
    {
        ctx.beginPath();//beginPath~closePath绘制
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);//(x，y，半径，起始角度，结束角度，顺时针方向)
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

function drawPaddle(ctx,paddleX,paddleY,paddleWidth,paddleHeight) //绘制挡板
    {
        ctx.beginPath();
        ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);//(x，y，宽，高)
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

function drawBricks(ctx, bricks, brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft) //绘制砖块
    {
        for(var c=0; c<brickColumnCount; c++) 
        {
            for(var r=0; r<brickRowCount; r++) 
            {
                if(bricks[c][r].status == 1) //未被击中的砖块才绘制
                {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

function drawScore(ctx, score) //绘制分数
    {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 8, 20);
    }

function drawLives(ctx, lives) //绘制生命值
    {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }