# “自制”打砖块游戏
大学生的课程设计项目，基于[项目](http://breakout.enclavegames.com/)，原项目[GitHub仓库](https://github.com/end3r/Gamedev-Canvas-workshop)。
小组成员：[NuLL](https://github.com/1758220389)、[moonstairsovo-ux](https://github.com/moonstairsovo-ux)、[lllllvlv](https://github.com/gok2023)

---

## 1. 项目介绍
### 1.1 背景介绍
打砖块游戏，作为电子游戏史上最具代表性的经典作品之一，诞生于1976年。它以其简单的规则、即上手的操作和充满挑战性的玩法，风靡了全球数个世代的玩家。 打砖块游戏的核心玩法（移动挡板、反弹球体、消除目标）是游戏设计中最纯粹、最经得起时间考验的机制之一。本项目旨在回归游戏设计的本源，探索在极简规则下如何构建丰富、耐玩的游戏体验。通过对这样一个经典游戏的复刻，并加入自己的新元素、玩法。可以让我们更深刻的理解到本课程中学习到的开源软件开发精神。

### 1.2 系统架构
本项目主要使用Html嵌入Javascript代码实现，Html提供UI绘制，按钮交互以及排行榜存储功能；Javascript实现核心玩法。本游戏的UML图如下：
![UML图](img/uml/uml.png)
其中由一个主要的html文件控制游戏运行，html文件调用其他的js文件的函数使游戏正常运行。

---

## 2. 目标
### 2.1 更换原项目贴图
- 更换成Emoji图标

<img src="img/brick/normalBrick.png" width="25px"> <img src="img/brick/hardBrick.png" width="25px"> 
<img src="img/brick/vectorBrickUp.png" width="25px"> <img src="img/brick/vectorBrickDown.png" width="25px"> <img src="img/brick/vectorBrickLeft.png" width="25px"> <img src="img/brick/vectorBrickRight.png" width="25px"> <img src="img/brick/boomBrick.png" width="25px"> <img src="img/brick/chainBrick.png" width="25px"> <img src="img/brick/motherBrick.png" width="25px"> <img src="img/brick/longPaddle.png" width="25px"> <img src="img/brick/lifeUp.png" width="25px"> <img src="img/brick/extraBall.png" width="25px"> <img src="img/brick/tankBall.png" width="25px"> <img src="img/brick/longPaddle.png" width="25px"> <img src="img/brick/speedDown.png" width="25px">

- 重置UI
<p align="center">
  <img src="img/markdownPic/ui/startGame.png" title="开始界面" width="400px">
</p>

<p align="center">
  <img src="img/markdownPic/ui/singleplaySelect.png" title="单人游玩 选择难度" width="300px">
  <img src="img/markdownPic/ui/singleplay.png" title="单人游玩界面" width="300px">
</p>

<p align="center">
  <img src="img/markdownPic/ui/multiplay1.png" title="多人游玩 选择难度" width="300px">
  <img src="img/markdownPic/ui/multiplay2.png" title="多人游玩界面" width="300px">
</p>

### 2.2 添加难度选择
根据难度改变球速以及板长度

### 2.3 按下⬆️键以开始
- 选择关卡结束后球在板子上，按下↑键发射球，开始游戏
- 板子没接住球时，球回到板子，按下↑键发射球

<p align="center">
  <img src="img/markdownPic/press ↑ to start/origin.gif" title="未修改前" width="200px">
  <img src="img/markdownPic/press ↑ to start/now.gif" title="修改后" width="200px">
</p>

### 2.4 添加特殊砖块
#### 硬砖块：需要撞击两次才能破坏

<img src="img/brick/hardBrick.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/hardBrick.gif" title="硬砖块效果" width="200px">
</p>

#### 矢量砖块：需要从特定角度破坏

<img src="img/brick/vectorBrickUp.png" width="50px"> <img src="img/brick/vectorBrickDown.png" width="50px"> <img src="img/brick/vectorBrickLeft.png" width="50px"> <img src="img/brick/vectorBrickRight.png" width="50px">
<p align="center">
  <img src="img/markdownPic/brickEffect/VectorBrick.gif" title="矢量砖块效果" width="200px">
</p>

#### 炸弹砖块：击破后摧毁周围砖块

<img src="img/brick/boomBrick.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/boomBrick.gif" title="炸弹砖块效果" width="200px">
</p>

#### 连锁砖块：击破后摧毁一整列的砖块

<img src="img/brick/chainBrick.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/chainBrick.gif" title="连锁砖块效果" width="200px">
</p>

#### 子母砖块：击破后在周围生成砖块

<img src="img/brick/motherBrick.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/motherBrick.gif" title="子母砖块效果" width="200px">
</p>

### 2.5 添加增益因子
添加特殊的增益减益因子：击打特定的砖块随机掉落增（减）益因子
#### 加长因子：加长板子一段时间，让玩家更容易接住小球

<img src="img/brick/longPaddle.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/longPaddle.gif" title="加长因子效果" width="200px">
</p>

#### 生命因子：增加一点生命值

<img src="img/brick/lifeUp.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/lifeUp.gif" title="生命因子效果" width="200px">
</p>

#### 增长因子：新发射一个小球

<img src="img/brick/extraBall.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/extraBall.gif" title="增长因子效果" width="200px">
</p>

#### 穿透因子：小球获得力量，摧毁路径上的所有砖块

<img src="img/brick/tankBall.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/tankBall.gif" title="穿透因子效果" width="200px">
</p>

#### 减速因子：降低小球的移动速度一段时间

<img src="img/brick/speedDown.png" width="50px"> 
<p align="center">
  <img src="img/markdownPic/brickEffect/speedDown.gif" title="减速因子效果" width="200px">
</p>

### 2.6 排行榜系统
- 游戏结束时可保存玩家名、剩余生命、游玩关卡、游戏时间
- 游玩结束时可查看排行榜，可以在游玩界面查看排行榜
- 成绩保存在浏览器缓存中，可导出成csv文件

<p align="center">
  <img src="img/markdownPic/rating/rating_getUserName.png" title="保存玩家名" width="400px">
</p>

<br>
<p align="center">
  <img src="img/markdownPic/rating/rating_history.png" title="排行榜" width="400px">
</p>

<br>
<p align="center">
  <img src="img/markdownPic/rating/rating_csv.png" title="导出的csv文件" width="400px">
</p>

### 2.7 联机多人玩法
#### 基本玩法介绍
二人对战，分别操作位于界面上下边界的板子，显示同一个界面的对立视角，在屏幕中间一定区域随机生成砖块，破坏方得分，拾取因子时使对方获得减益/自己获得增益使让对手无法将球击回，球从一方边界掉落时该方失去一点生命值，改为对方发球，生命值掉到0后输掉对战。

<img src="img/brick/shrinkOpponent.png"  width="50px">
<p align="center">
  <img src="img/markdownPic/brickEffect/shrinkOpponent.gif" title="缩短因子效果" width="200px">
</p>

#### 主要机制确定
增加破坏中央区域所有砖块的奖励（破坏最后一个砖块的玩家获得生命值加一），砖块在被全部破坏后会刷新。同时讨论后确认了对战模式的结束条件是一方生命值为0（不死不休！）

<p align="center">
  <img src="img/markdownPic/multiplayWin.png" title="获胜界面" width="400px">
</p>

#### 特殊方块兼容
对战模式可以兼容大部分单人模式的特殊砖块，除此之外删除了与玩法冲突的一些特殊砖块（如增长因子），添加了对战模式的专属砖块（缩短因子）

### 2.9 充值玩法
付费增加挡板长度或生命值

<p align="center">
  <img src="img/markdownPic/recharge/recharge_menu1.png" title="保存玩家名" width="200px">
  <img src="img/markdownPic/recharge/recharge_menu2.png" title="排行榜" width="153px">
  <img src="img/markdownPic/recharge/recharge_menu3.png" title="导出的csv文件" width="167px">
</p>

---

## 开发日志

### 3.1逻辑优化

#### 优化碰撞
在最初版本中，由于碰撞函数的检测问题，出现了碰撞边界不对而导致的一次碰撞消除大量砖块的情况，于是优化了碰撞函数。

<p align="center">
  <img src="img/markdownPic/logic1.gif" title="获胜界面" width="400px">
</p>

#### 优化小球反弹逻辑
在原始版本中，小球只能以固定角度运动，固定角度反弹。修改后，小球根据和板碰撞的位置变化反弹角度。

<p align="center">
  <img src="img/markdownPic/logic2.gif" title="获胜界面" width="400px">
</p>

### Bug修复日志

#### - ~~变量名混乱~~
#### - ~~矢量方块应根据碰撞边判断~~
原：根据小球运动方向判断
#### - ~~硬砖块有时被击中一次就消失~~
#### - ~~矢量方块有时会把小球吸走~~

<p align="center">
  <img src="img/markdownPic/bugfix/vectorBrick-old.gif" title="修复前" width="300px">
</p>

#### - ~~计分系统错误判断胜利条件~~
原：根据砖块总数计算；改：根据所有方块状态判断
#### - ~~分数、生命显示超范围~~
#### - ~~没接住小球时应清空所有效果~~
#### - ~~增长因子带来的额外小球应基于砖块生成~~
原：根据小球位置生成

<p align="center">
  <img src="img/markdownPic/bugfix/extraBall-old.gif" title="修复前" width="300px">
  <img src="img/markdownPic/bugfix/extraBall-fixed.gif" title="修复后" width="300px">
</p>

#### - ~~炸弹砖块和连锁砖块破坏特殊方块时，特殊效果不生效~~

<p align="center">
  <img src="img/markdownPic/bugfix/chainBrick&boomBrick-old.png" title="修复前" width="100px">
</p>

#### - ~~充值系统板长度不保留~~
#### - ~~遇到矢量方块会卡死~~
添加重置按钮脱离卡死

<p align="center">
  <img src="img/markdownPic/bugfix/resetButton.gif" title="重置按钮" width="600px">
</p>

#### - ~~最后一个方块被破坏时无法查看到被破坏的效果~~
添加延迟，更改胜利函数判断位置
#### - ~~充值系统故障~~
#### - ~~对战模式生命值存在上限，无法增长到3以上~~
修改了生命值增长逻辑，现在可以一直增长（这个应该不会有溢出吧）。
#### - ~~对战模式击破砖块加分混乱~~
击破砖块可能会给自己或对面加分，增加了一个变量检测上一个碰撞球的挡板是玩家1还是2后解决。
#### - ~~对战模式专属因子判定问题~~
对战模式新增的缩短因子会同时缩短对面与自己的板子，改良了新增特殊因子的判定后解决。
#### - ~~单人模式特殊因子在对战模式的兼容问题~~
直接套用了单人模式的特殊砖块生成逻辑，运行时发现球撞到增长因子所在砖块会完全停住，思索后从对战模式的特殊方块池中移去了增长因子等不符合对战逻辑的特殊砖块。