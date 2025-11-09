// ===== 分数记录系统 =====
var scoreRecords = [];

// 从 LocalStorage 加载历史记录
function loadScoreRecords() {
    var stored = localStorage.getItem('breakoutScores');
    if (stored) {
        try {
            scoreRecords = JSON.parse(stored);
        } catch (e) {
            console.error("加载记录失败:", e);
            scoreRecords = [];
        }
    }
}

// 保存记录到 LocalStorage
function saveScoreRecord(playerName, score, difficulty, lives) {
    var record = {
        playerName: playerName || "玩家",
        score: score,
        difficulty: difficulty,
        lives: lives,
        date: new Date().toLocaleString('zh-CN')
    };
    
    scoreRecords.push(record);
    localStorage.setItem('breakoutScores', JSON.stringify(scoreRecords));
}

// 导出为CSV文件
function exportToCSV() {
    if (scoreRecords.length === 0) {
        alert("暂无游戏记录");
        return;
    }
    
    // CSV表头（添加BOM以支持Excel正确显示中文）
    var csv = "\uFEFF玩家名称,分数,难度,剩余生命,游戏时间\n";
    
    // 添加数据行
    scoreRecords.forEach(function(record) {
        csv += record.playerName + "," + 
               record.score + "," + 
               record.difficulty + "," + 
               record.lives + "," + 
               '"' + record.date + '"\n';
    });
    
    // 创建下载链接
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "breakout_scores_" + Date.now() + ".csv");
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("CSV文件已导出！");
}

// 显示排行榜
function showLeaderboard() {
    if (scoreRecords.length === 0) {
        alert("暂无游戏记录");
        return;
    }
    
    // 按分数排序
    var sorted = scoreRecords.slice().sort(function(a, b) {
        return b.score - a.score;
    });
    
    var message = "=== 游戏排行榜 ===\n\n";
    sorted.slice(0, 10).forEach(function(record, index) {
        message += (index + 1) + ". " + record.playerName + 
                   " - " + record.score + "分 (" + 
                   record.difficulty + "难度, " +
                   "剩余" + record.lives + "命)\n" +
                   "    时间: " + record.date + "\n\n";
    });
    
    alert(message);
}

// 清空所有记录
function clearAllRecords() {
    if (confirm("确定要清空所有游戏记录吗？此操作不可恢复！")) {
        scoreRecords = [];
        localStorage.removeItem('breakoutScores');
        alert("所有记录已清空");
    }
}

// 处理游戏结束（胜利）
function handleGameWin(score, difficulty, lives) {
    var playerName = prompt("🎉 恭喜通关！\n最终分数: " + score + "\n请输入您的名字:", "玩家" + (scoreRecords.length + 1));
    if (playerName) {
        saveScoreRecord(playerName, score, difficulty, lives);
    }
    
    if (confirm("游戏结束！\n分数: " + score + "\n\n是否查看排行榜？")) {
        showLeaderboard();
    }
    
    if (confirm("是否导出成绩到CSV文件？")) {
        exportToCSV();
    }
}

// 处理游戏结束（失败）
function handleGameOver(score, difficulty) {
    var playerName = prompt("💀 游戏结束！\n最终分数: " + score + "\n请输入您的名字:", "玩家" + (scoreRecords.length + 1));
    if (playerName) {
        saveScoreRecord(playerName, score, difficulty, 0);
    }
    
    if (confirm("游戏结束！\n分数: " + score + "\n\n是否查看排行榜？")) {
        showLeaderboard();
    }
    
    if (confirm("是否导出成绩到CSV文件？")) {
        exportToCSV();
    }
}

// 页面加载时初始化
if (typeof window !== 'undefined') {
    loadScoreRecords();
}