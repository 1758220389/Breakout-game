/* 
const images =  //预加载图片资源
{
    brick: new Image(),
};
images.brick.src = 'images/brick.png'; //砖块图片
*/

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
                if(bricks[c][r].status >= 1) //未被击中的砖块才绘制，使硬砖块也能绘制
                {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    /*
                    ctx.drawImage(images.brick, brickX, brickY, brickWidth, brickHeight); //使用图片绘制砖块
                    */
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);

                    var brick = bricks[c][r];
                    switch(brick.specialBrick) {
                        case 0: // normalBrick
                            ctx.fillStyle = "#0095DD";
                            break;
                        case 1: // hardBrick
                            // 硬砖块根据状态显示不同颜色
                            if(brick.status === 2){ctx.fillStyle = "#8B4513";}
                            else ctx.fillStyle = "#0095DD";
                            //ctx.fillStyle = brick.status === 2 ? "#8B4513" : "#A0522D";
                            break;
                        case 2: // vectorBrickUp
                            ctx.fillStyle = "#FF0000"; // 红色
                            break;
                        case 3: // vectorBrickDown
                            ctx.fillStyle = "#00FF00"; // 绿色
                            break;
                        case 4: // vectorBrickLeft
                            ctx.fillStyle = "#0000FF"; // 蓝色
                            break;
                        case 5: // vectorBrickRight
                            ctx.fillStyle = "#363611ff"; // 黄色
                            break;
                        case 6: // boomBrick
                            ctx.fillStyle = "#FF4500"; // 橙红色
                            break;
                        case 7: // chainBrick
                            ctx.fillStyle = "#8A2BE2"; // 紫色
                            break;
                        case 8: // motherBrick
                            ctx.fillStyle = "#FF69B4"; // 粉色
                            break;
                        case 9: // longPaddle
                            ctx.fillStyle = "#00FFFF"; // 青色
                            break;
                        case 10: // lifeUp
                            ctx.fillStyle = "#32CD32"; // 酸橙绿
                            break;
                        case 11: // extraBall
                            ctx.fillStyle = "#aa9d54ff"; // 金色
                            break;
                        case 12: // speedDown
                            ctx.fillStyle = "#1E90FF"; // 道奇蓝
                            break;
                        case 13: // tankBall
                            ctx.fillStyle = "#696969"; // 暗灰色
                            break;
                        case 14: // rotate
                            ctx.fillStyle = "#DA70D6"; // 兰花紫
                            break;
                        default:
                            ctx.fillStyle = "#0095DD";
                    }

                    ctx.fill();
                    ctx.closePath();

                    // 为特殊砖块添加文字标识
                    if(brick.specialBrick !== 0) { // 不是普通砖块
                        ctx.fillStyle = "#FFFFFF";
                        ctx.font = "10px Arial";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        
                        var text = "";
                        switch(brick.specialBrick) {
                            case 1: text = "硬"; break;
                            case 2: text = "↑"; break;
                            case 3: text = "↓"; break;
                            case 4: text = "←"; break;
                            case 5: text = "→"; break;
                            case 6: text = "爆"; break;
                            case 7: text = "链"; break;
                            case 8: text = "母"; break;
                            case 9: text = "长"; break;
                            case 10: text = "命"; break;
                            case 11: text = "球"; break;
                            case 12: text = "慢"; break;
                            case 13: text = "穿"; break;
                            case 14: text = "旋"; break;
                        }
                        
                        ctx.fillText(text, brickX + brickWidth/2, brickY + brickHeight/2);
                    }

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