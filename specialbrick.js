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
    switch(brick.specialbrick)
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
            brick.status = 0;
            break;
        case vectorbrickdown:
            brick.status = 0;
            break;
        case vectorbrickleft:
            brick.status = 0;
            break;
        case vectorbrickright:
            brick.status = 0;
            break;
        case boombrick:
            brick.status = 0;
            brick[c-1][r].status = 0;
            brick[c+1][r].status = 0;
            brick[c][r-1].status = 0;
            brick[c][r+1].status = 0;
            break;
        case chainbrick:
            brick.status = 0;
            break;
        case motherbrick:
            brick.status = 0;
            break;
        case longpaddle:
            brick.status = 0;
            break;
        case lifeup:
            brick.status = 0;
            break;
        case extraball:
            brick.status = 0;
            break;
        case speeddown:
            brick.status = 0;
            break;
        case tankball:
            brick.status = 0;
            break;
        case routate:
            brick.status = 0;
            break;
    }
}