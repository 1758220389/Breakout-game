var normalbrick = 0;//砖块类型，0普通砖块
var hardbrick = 1;
var vectorbrickup = 2;//矢量砖块
var vectorbrickdown = 3;
var vectorbrickleft = 4;
var vectorbrickright = 5;
var boombrick = 6;
var chainbrick = 7;//连锁砖块
var motherbrick = 8;//子母砖块

var longpaddle = 9;
var lifeup = 10;
var extraball = 11;
var speeddown = 12;//减速
var tankball = 13;//穿透因子
var routate = 14;//旋转因子

function brickeffect(brick)
{
    switch(brick.specialbrick, c, r, bricks, brickColumnCount, brickRowCount, gameState)
    {
        case normalbrick:
            brick.status = 0;
            break;
        case hardbrick:
            if(brick.status > 1)
            {
                brick.status -= 1;
            }
            else
            {
                brick.status = 0;
            }
            break;
        case vectorbrickup:
            if(gameState.ballLastDY > 0)//球向下运动表示球从下方击中
            {

                brick.status = 0;
            }
            brick.status = 0;
            break;
        case vectorbrickdown:
            if(gameState.ballLastDY < 0)//球向上运动表示球从上方击中
            {
                brick.status = 0;
            }
            break;
        case vectorbrickleft:
            if(gameState.ballLastDX < 0)//球向左运动表示球从右方击中
            {
                brick.status = 0;
            }
            break;
        case vectorbrickright:
            if(gameState.ballLastDX > 0)//球向右运动表示球从左方击中
            {
                brick.status = 0;
            }
            break;
        case boombrick:
            brick.status = 0;
            // 摧毁周围砖块
            for(var i = Math.max(0, c-1); i <= Math.min(brickColumnCount-1, c+1); i++) {
                for(var j = Math.max(0, r-1); j <= Math.min(brickRowCount-1, r+1); j++) {
                    if(bricks[i][j].status > 0) {
                        bricks[i][j].status = 0;
                        gameState.score++; // 为每个被摧毁的砖块加分
                    }
                }
            }
            break;
        case chainbrick:
            brick.status = 0;
            // 摧毁整行砖块
            for(var i = 0; i < brickColumnCount; i++) {
                if(bricks[i][r].status > 0) {
                    bricks[i][r].status = 0;
                    if(i !== c) gameState.score++; // 避免重复计分
                }
            }
            break;
        case motherbrick:
            brick.status = 0;
            // 在周围生成新砖块
            var directions = [[0,1], [1,0], [0,-1], [-1,0]]; // 上下左右
            for(var d = 0; d < directions.length; d++) {
                var newC = c + directions[d][0];
                var newR = r + directions[d][1];
                if(newC >= 0 && newC < brickColumnCount && newR >= 0 && newR < brickRowCount) {
                    if(bricks[newC][newR].status === 0) {
                        bricks[newC][newR].status = 1;
                        bricks[newC][newR].specialbrick = normalbrick; // 新生成的为普通砖块
                    }
                }
            }
            break;
        case longpaddle:
            brick.status = 0;
            gameState.paddleWidth = Math.min(gameState.paddleWidth + 20, 200); // 增加挡板长度
            break;
        case lifeup:
            brick.status = 0;
             gameState.lives++;
            break;
        case extraball:
            brick.status = 0;
            //此处添加球逻辑
            break;
        case speeddown:
            brick.status = 0;
             // 减速效果
            gameState.dx *= 0.7;
            gameState.dy *= 0.7;
            break;
        case tankball:
            brick.status = 0;
             // 穿透效果 - 设置标记
            gameState.tankBall = true;
            setTimeout(() => { gameState.tankBall = false; }, 3000); // 3秒后失效
            break;
        case routate:
            brick.status = 0;
            // 旋转效果 - 反转运动方向
            gameState.dx = -gameState.dx;
            break;
    }
}