const images =  //预加载图片资源
{
    normalBrick: new Image(),
    hardBrick: new Image(),
    vectorBrickUp: new Image(),
    vectorBrickDown: new Image(),
    vectorBrickLeft: new Image(),
    vectorBrickRight: new Image(),
    boomBrick: new Image(),
    chainBrick: new Image(),
    motherBrick: new Image(),
    longPaddle: new Image(),
    lifeUp: new Image(),
    extraBall: new Image(),
    speedDown: new Image(),
    tankBall: new Image(),
    longPaddleEffect: new Image(),
    lifeUpEffect: new Image(),
    speedDownEffect: new Image(),
    tankBallEffect: new Image(),
};
images.normalBrick.src = 'img/normalBrick.png'; //砖块图片
images.hardBrick.src = 'img/hardBrick.png';
images.vectorBrickUp.src = 'img/vectorBrickUp.png';
images.vectorBrickDown.src = 'img/vectorBrickDown.png';
images.vectorBrickLeft.src = 'img/vectorBrickLeft.png';
images.vectorBrickRight.src = 'img/vectorBrickRight.png';
images.boomBrick.src = 'img/boomBrick.png';
images.chainBrick.src = 'img/chainBrick.png';
images.motherBrick.src = 'img/motherBrick.png';
images.longPaddle.src = 'img/longPaddle.png';
images.lifeUp.src = 'img/lifeUp.png';
images.speedDown.src = 'img/speedDown.png';
images.tankBall.src = 'img/tankBall.png';
images.extraBall.src = 'img/extraBall.png';
images.longPaddleEffect.src = 'img/longPaddleEffect.png';
images.lifeUpEffect.src = 'img/lifeUpEffect.png';
images.speedDownEffect.src = 'img/speedDownEffect.png';
images.tankBallEffect.src = 'img/tankBallEffect.png';

function drawBall(ctx,x,y,ballRadius,ballColour) //绘制球
    {
        ctx.beginPath();//beginPath~closePath绘制
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);//(x，y，半径，起始角度，结束角度，顺时针方向)
        ctx.fillStyle = ballColour;
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
                if(bricks[c][r].status >= 1) //未被击中的砖块才绘制，使硬砖块也能绘制
                {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;

                    var brick = bricks[c][r];
                    switch(brick.specialBrick) {
                        case 0: // normalBrick
                            ctx.drawImage(images.normalBrick, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 1: // hardBrick
                            // 硬砖块根据状态显示不同颜色
                            if(brick.status === 2){ctx.drawImage(images.hardBrick, brickX, brickY, brickWidth, brickHeight);}
                            else ctx.drawImage(images.normalBrick, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 2: // vectorBrickUp
                            ctx.drawImage(images.vectorBrickUp, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 3: // vectorBrickDown
                            ctx.drawImage(images.vectorBrickDown, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 4: // vectorBrickLeft
                            ctx.drawImage(images.vectorBrickLeft, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 5: // vectorBrickRight
                            ctx.drawImage(images.vectorBrickRight, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 6: // boomBrick
                            ctx.drawImage(images.boomBrick, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 7: // chainBrick
                            ctx.drawImage(images.chainBrick, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 8: // motherBrick
                            ctx.drawImage(images.motherBrick, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 9: // longPaddle
                            ctx.drawImage(images.longPaddle, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 10: // lifeUp
                            ctx.drawImage(images.lifeUp, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 11: // extraBall
                            ctx.drawImage(images.extraBall, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 12: // speedDown
                            ctx.drawImage(images.speedDown, brickX, brickY, brickWidth, brickHeight);
                            break;
                        case 13: // tankBall
                            ctx.drawImage(images.tankBall, brickX, brickY, brickWidth, brickHeight);
                            break;
                        default:
                            ctx.fillStyle = "#0095DD";
                            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                    }
                }
            }
        }
    }

function drawEffectFactor(ctx, effectFactor) //绘制效果因子提示
    {
        if(!effectFactor) return;

        for(var i=0; i<effectFactor.length; i++)//遍历所有存在的效果因子
        {
            var factor = effectFactor[i];
            var size = factor.width;

            switch(factor.effectType)
            {
                case 9: 
                    ctx.drawImage(images.longPaddleEffect, factor.x - size/2, factor.y - size/2, size, size);
                    break;
                case 10: 
                    ctx.drawImage(images.lifeUpEffect, factor.x - size/2, factor.y - size/2, size, size);
                    break;
                case 12: 
                    ctx.drawImage(images.speedDownEffect, factor.x - size/2, factor.y - size/2, size, size);
                    break;
                case 13: 
                    ctx.drawImage(images.tankBallEffect, factor.x - size/2, factor.y - size/2, size, size);
                    break;
                default: 
                    ctx.beginPath();
                    ctx.fillStyle = "#FFFFFF";
                    ctx.arc(factor.x, factor.y, factor.width/2, 0, Math.PI*2);
                    ctx.fill();
                    ctx.closePath();
                    break;
            }
        }
    }

function drawScore(ctx, score) //绘制分数
    {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score, 0, 20);
    }

function drawLives(ctx, lives) //绘制生命值
    {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-92, 20);
    }