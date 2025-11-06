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
                gameState.score++;
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
                gameState.score = gameState.score + 2;
            }
            break;
        case vectorBrickDown:
            if(gameState.hitSide === "top")//球向上运动表示球从上方击中
            {
                brick.status = 0;
                gameState.score = gameState.score + 2;
            }
            break;
        case vectorBrickLeft:
            if(gameState.hitSide === "right")//球向左运动表示球从右方击中
            {
                brick.status = 0;
                gameState.score = gameState.score + 2;
            }
            break;
        case vectorBrickRight:
            if(gameState.hitSide === "left")//球向右运动表示球从左方击中
            {
                brick.status = 0;
                gameState.score = gameState.score + 2;
            }
            break;
        case boomBrick:
            brick.status = 0;
            gameState.score++;
            for(var i = Math.max(0, c-1); i <= Math.min(brickColumnCount-1, c+1); i++) 
            {
                for(var j = Math.max(0, r-1); j <= Math.min(brickRowCount-1, r+1); j++) 
                {
                    if(i === c && j === r) continue;
                    // 确保砖块存在且状态>=1
                    if(brickArray[i] && brickArray[i][j] && brickArray[i][j].status >= 1) 
                    {
                        brickEffect(brickArray[i][j], i, j, brickArray, brickColumnCount, brickRowCount, gameState);
                        if(brickArray[i][j].specialBrick === vectorBrickDown || brickArray[i][j].specialBrick === vectorBrickUp ||
                           brickArray[i][j].specialBrick === vectorBrickLeft || brickArray[i][j].specialBrick === vectorBrickRight||
                           brickArray[i][j].specialBrick === hardBrick)
                        {
                            brickArray[i][j].status = 0;
                            gameState.score++;
                        }
                    }
                }
            }
            break;
        case chainBrick:
            brick.status = 0;
            gameState.score++;
            // 摧毁整行砖块
            for(var k = 0; k < brickColumnCount; k++) 
            {
                if(k === c) continue; //跳过当前砖块所在列
                if(brickArray[k] && brickArray[k][r] && brickArray[k][r].status >= 1) 
                {
                    brickEffect(brickArray[k][r], k, r, brickArray, brickColumnCount, brickRowCount, gameState);
                    if(brickArray[k][r].specialBrick === vectorBrickDown || brickArray[k][r].specialBrick === vectorBrickUp ||
                       brickArray[k][r].specialBrick === vectorBrickLeft || brickArray[k][r].specialBrick === vectorBrickRight||
                       brickArray[k][r].specialBrick === hardBrick)
                    {
                        brickArray[k][r].status = 0;
                        gameState.score++;
                    }
                    //brickArray[k][r].status = 0;
                    //gameState.score++; // 避免重复计分
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
                    if(brickArray[newC] && brickArray[newC][newR] && brickArray[newC][newR].status === 0) 
                    {
                        brickArray[newC][newR].status = 1;
                        brickArray[newC][newR].specialBrick = normalBrick; // 新生成的为普通砖块
                    }
                }
            }
            gameState.score++;
            break;
        case longPaddle:
            brick.status = 0;
            gameState.score++;
            createEffectFactor(brick.x, brick.y, longPaddle, gameState);
            break;
        case lifeUp:
            brick.status = 0;
            gameState.score++;
            createEffectFactor(brick.x, brick.y, lifeUp, gameState);
            break;
        case extraBall:
            brick.status = 0;
            gameState.score++;
            if(!gameState.extraBalls) {gameState.extraBalls = [];}
            var angle = (Math.random() * 120 - 60) * Math.PI / 180; // 随机角度在-60到60度之间
            var speed = Math.sqrt(gameState.dx * gameState.dx + gameState.dy * gameState.dy);
            gameState.extraBalls.push({
                x: brick.x + brickWidth/2,
                y: brick.y + brickHeight/2,
                dx: speed * Math.sin(angle),
                dy: - speed * Math.abs(Math.cos(angle)),
                radius: 10,
                active: true
            });
            break;
        case speedDown:
            brick.status = 0;
            gameState.score++;
            createEffectFactor(brick.x, brick.y, speedDown, gameState);
            break;
        case tankBall:
            brick.status = 0;
            gameState.score++;
            createEffectFactor(brick.x, brick.y, tankBall, gameState);
            break;
    }
}

function createEffectFactor(x, y, effectType, gameState)
{
    if(!gameState.effectFactor){gameState.effectFactor = [];}
    gameState.effectFactor.push
    ({x: x+12.5, y: y, effectType: effectType, speed: 1, width: 20, height: 20});
}

function applyEffectFactor(effectType, gameState)
{
    switch(effectType)
    {
        case longPaddle:
            if(!gameState.originalPaddleWidth) {gameState.originalPaddleWidth = gameState.paddleWidth;}
            if(gameState.longPaddleTimer) 
                {
                    clearTimeout(gameState.longPaddleTimer);
                    gameState.paddleWidth = gameState.originalPaddleWidth;
                }
            gameState.paddleWidth = 3*gameState.originalPaddleWidth;
            //Math.min(gameState.paddleWidth + 20, 200);
            gameState.longPaddleTimer = setTimeout(() => {
                gameState.paddleWidth = gameState.originalPaddleWidth;
                gameState.longPaddleTimer = null;
                gameState.originalPaddleWidth = null;
            }, 10000); // 10秒后恢复原始长度
            break;
        case lifeUp:
            gameState.lives++;
            break;
        case speedDown:
            if(!gameState.originalSpeed) {gameState.originalSpeed = {dx: gameState.dx, dy: gameState.dy};}//保存原始速度
            if(gameState.speedDownTimer) //如果已经有减速效果重置计时器
                {
                    clearTimeout(gameState.speedDownTimer);
                    gameState.dx = gameState.originalSpeed.dx;
                    gameState.dy = gameState.originalSpeed.dy;
                }
            gameState.dx = gameState.originalSpeed.dx * 0.5;
            gameState.dy = gameState.originalSpeed.dy * 0.5;
            gameState.speedDownTimer = setTimeout(() => { 
                gameState.dx = gameState.originalSpeed.dx; 
                gameState.dy = gameState.originalSpeed.dy;
                gameState.originalSpeed = null;
                gameState.speedDownTimer = null;
            }, 5000); // 5秒后恢复速度
            break;
        case tankBall:
            gameState.isTankBall = true;
            setTimeout(() => { gameState.isTankBall = false; }, 3000);
            break;
    }
}