var normalBrick = 0;//砖块类型，0普通砖块
var hardBrick = 1;
var vectorBrickUp = 2;//矢量砖块
var vectorBrickDown = 3;
var vectorBrickLeft = 4;
var vectorBrickRight = 5;
var boomBrick = 6;
var chainBrick = 7;//连锁砖块
var motherBrick = 8;//子母砖块

var longPaddle = 9;
var lifeUp = 10;
var extraBall = 11;
var speedDown = 12;//减速
var tankBall = 13;//穿透因子
var rotate = 14;//旋转因子

function brickEffect(brick, c, r, brickArray, brickColumnCount, brickRowCount, gameState)
{
    switch(brick.specialBrick)
    {
        case normalBrick:
            brick.status = 0;
            gameState.score++;
            break;
        case hardBrick:
            if(brick.status === 2)
            {
                brick.status = 1;
                //gameState.score++;
            }
            else if(brick.status === 1)
            {
                brick.status = 0;
                gameState.score++;
            }
            break;
        case vectorBrickUp:
            if(gameState.hitSide === "bottom")//球向下运动表示球从下方击中
            {
                brick.status = 0;
                gameState.score++;
            }
            break;
        case vectorBrickDown:
            if(gameState.hitSide === "top")//球向上运动表示球从上方击中
            {
                brick.status = 0;
                gameState.score++;
            }
            break;
        case vectorBrickLeft:
            if(gameState.hitSide === "right")//球向左运动表示球从右方击中
            {
                brick.status = 0;
                gameState.score++;
            }
            break;
        case vectorBrickRight:
            if(gameState.hitSide === "left")//球向右运动表示球从左方击中
            {
                brick.status = 0;
                gameState.score++;
            }
            break;
        case boomBrick:
            for(var i = Math.max(0, c-1); i <= Math.min(brickColumnCount-1, c+1); i++) 
            {
                for(var j = Math.max(0, r-1); j <= Math.min(brickRowCount-1, r+1); j++) 
                {
                    // 确保砖块存在且状态>=1
                    if(brickArray[i] && brickArray[i][j] && brickArray[i][j].status >= 1) 
                    {
                        brickArray[i][j].status = 0;
                        gameState.score++; // 为每个被摧毁的砖块加分
                    }
                }
            }
            break;
        case chainBrick:
            brick.status = 0;
            // 摧毁整行砖块
            for(var i = 0; i < brickColumnCount; i++) 
            {
                if(brickArray[i] && brickArray[i][r] && brickArray[i][r].status >= 1) 
                {
                    brickArray[i][r].status = 0;
                    gameState.score++; // 避免重复计分
                }
            }
            break;
        case motherBrick:
            brick.status = 0;
            // 在周围生成新砖块
             var directions = [[0,1], [1,0], [0,-1], [-1,0]]; // 上下左右
            for(var d = 0; d < directions.length; d++) 
            {
                var newC = c + directions[d][0];
                var newR = r + directions[d][1];
                if(newC >= 0 && newC < brickColumnCount && newR >= 0 && newR < brickRowCount) {
                    if(brickarray[newC] && brickarray[newC][newR] && brickarray[newC][newR].status === 0) {
                        brickarray[newC][newR].status = 1;
                        brickarray[newC][newR].specialbrick = normalbrick; // 新生成的为普通砖块
                    }
                }
            }
            break;
        case longPaddle:
            brick.status = 0;
            gameState.paddleWidth = Math.min(gameState.paddleWidth + 20, 200); // 增加挡板长度
            break;
        case lifeUp:
            brick.status = 0;
             gameState.lives++;
            break;
        case extraBall:
            brick.status = 0;
            //此处添加球逻辑
            break;
        case speedDown:
            brick.status = 0;
             // 减速效果
            gameState.dx *= 0.7;
            gameState.dy *= 0.7;
            break;
        case tankBall:
            brick.status = 0;
             // 穿透效果 - 设置标记
            gameState.tankBall = true;
            setTimeout(() => { gameState.tankBall = false; }, 3000); // 3秒后失效
            break;
        case rotate:
            brick.status = 0;
            // 旋转效果 - 反转运动方向
            gameState.dx = -gameState.dx;
            break;
    }
}