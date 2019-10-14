/*
 * @Description: 场景管理器
 * @Author: your name
 * @Date: 2019-02-06 16:27:51
 * @LastEditTime: 2019-10-14 18:26:05
 * @LastEditors: Please set LastEditors
 */

class SceneManager {
    // 1->表示欢迎界面 2->准备开始游戏界面 3->表示游戏内容界面 4->表示死亡界面 5->gameover界面
    constructor() {
        this.sceneNumber = 1;
        //场景管理器负责实例化
        game.bg = new Background();
        game.bird = new Bird();
        game.land = new Land();

        this.logoY = -48;
        this.button_playX = game.canvas.width / 2 - 58;
        this.button_playY = game.canvas.height;
        //添加监听
        this.bindEvent();
    }

    update() {
        this.logoY += 10;
        this.button_playY -= 16;
        switch (this.sceneNumber) {
            case 1:
                //让logo进行移动
                if (this.logoY > 120) {
                    this.logoY = 120;
                }
                //让button_play进行移动
                if (this.button_playY < 320) {
                    this.button_playY = 320;
                }
                break;
            case 2:
                //小鸟拍打翅膀
                game.bird.wing();
                //改变透明度
                this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.1 : 0.1;
                //如果到头了，反过来
                if (this.tutorialOpacity < 0.1 || this.tutorialOpacity > 0.9) {
                    this.tutorialOpacityIsDown = !this.tutorialOpacityIsDown;
                }
                break;
            case 3:
                //更新
                game.bg.update();
                game.land.update();
                game.bird.update();
                //实例化管子
                game.fno % 150 === 0 && (new Pipe());
                //更新管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].update();
                }
                break;
            case 4:
                if (game.bird.y > game.canvas.height * 0.75) {
                    this.isBirdLand = true;
                }
                //小鸟是否落地
                if (!this.isBirdLand) { //小鸟没落地
                    game.bird.y += 15;
                } else {                 //小鸟落地了
                    game.fno % 10 === 0 && this.bombStep++;
                    if (this.bombStep > 5) {
                        this.bombStep = 5;
                    }
                }
                //白屏要缓慢变回来
                this.maskOpacity -= 0.1;
                if (this.maskOpacity < 0) {
                    this.maskOpacity = 0;
                }
                break;
            case 5:
                this.gameoverY -= 16;
                if (this.gameoverY < 220) {
                    this.gameoverY = 220;
                }
                //让button_play进行移动
                if (this.button_playY < 320) {
                    this.button_playY = 320;
                }
        }
    }

    render() {
        //根据当前的场景，来决定做什么
        switch (this.sceneNumber) {
            case 1:
                //渲染背景
                game.bg.render();
                game.bird.render();
                game.land.render();
                game.bird.x = game.canvas.width / 2;
                game.bird.y = 250;
                //画logo、button
                game.ctx.drawImage(game.res["logo"], game.canvas.width / 2 - 89, this.logoY);
                game.ctx.drawImage(game.res["button_play"], this.button_playX, this.button_playY);
                break;
            case 2:
                //渲染背景
                game.bg.render();
                game.bird.render();
                game.land.render();
                //画教程小图
                game.ctx.save();
                game.ctx.globalAlpha = this.tutorialOpacity;  //透明度
                game.ctx.drawImage(game.res["tutorial"], game.canvas.width / 2 - 57, 240);
                game.ctx.restore();
                break;
            case 3:
                //渲染背景
                game.bg.render();
                game.bird.render();
                game.land.render();
                //渲染管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //打印分数
                var scoreLength = game.score.toString().length;  //获取分数位数
                for (var i = 0; i < scoreLength; i++) {
                    //分数居中
                    game.ctx.drawImage(game.res["number" + game.score.toString().charAt(i)], (game.canvas.width / 2) - (scoreLength / 2 * 34) + (34 * i), 100);
                }
                break;
            //场景3，4渲染相同
            case 4:
                //渲染背景
                game.bg.render();
                game.land.render();
                if (!this.isBirdLand) {
                    game.bird.render();
                } else {
                    //渲染爆炸特效
                    if (this.bombStep < 5) {
                        game.ctx.drawImage(game.res["b" + this.bombStep], game.bird.x - 24, game.bird.y - 24, 80, 80);
                    } else {
                        this.enter(5);
                    }
                }
                //渲染白屏
                game.ctx.fillStyle = "rgba(255, 255, 255, " + this.maskOpacity + ")";
                game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

                //渲染管子
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //打印分数
                var scoreLength = game.score.toString().length;  //获取分数位数
                for (var i = 0; i < scoreLength; i++) {
                    //分数居中
                    game.ctx.drawImage(game.res["number" + game.score.toString().charAt(i)], (game.canvas.width / 2) - (scoreLength / 2 * 34) + (34 * i), 100);
                }
                break;
            case 5:
                //渲染
                game.bg.render();
                game.land.render();
                //打印分数
                var scoreLength = game.score.toString().length;  //获取分数位数
                for (var i = 0; i < scoreLength; i++) {
                    //分数居中
                    game.ctx.drawImage(game.res["number" + game.score.toString().charAt(i)], (game.canvas.width / 2) - (scoreLength / 2 * 34) + (34 * i), 100);
                }
                //画gameover
                game.ctx.drawImage(game.res["gameover"], game.canvas.width / 2 - 98, this.gameoverY);
                game.ctx.drawImage(game.res["button_play"], this.button_playX, this.button_playY);
                break;
        }
    }

    //进入某个场景
    enter(number) {
        this.sceneNumber = number;
        switch (this.sceneNumber) {
            case 1:
                //进入1号场景,瞬间要做的事情
                this.logoY = -48;
                // 初始化小鸟的角度 (5 -> 1 死亡后重新开始游戏)
                game.bird.d = 0;
                // 初始化小鸟的帧数
                game.bird.fno = 0;
                // 初始化帧编号
                game.fno = 0;
             
                break;
            case 2:
                //进入2号场景
                game.bird.y = 150;
                //tutorial透明度为0~1
                this.tutorialOpacity = 1;
                this.tutorialOpacityIsDown = true;
                break;
            case 3:
                //进入3号场景
                game.bird.update();
                //管子数组清空
                game.pipeArr = new Array();
                break;
            case 4:
                //进入4号场景
                //死亡动画 游戏页面白一下
                this.maskOpacity = 1;
                //小鸟是否触底
                this.isBirdLand = false;
                //爆炸动画
                this.bombStep = 0;
                break;
            case 5:
                //进入5号场景
                //初始化gameover的高度
                this.gameoverY = game.canvas.height * 0.75;
                break;
        }
    }

    //添加监听
    bindEvent() {
        // console.log(this) // SceneManager {}
        
        const self = this; // 绑定 SceneManager 
        game.canvas.onclick = (event) => {
            // console.log(this) // <canvas id="myCanvas" width="375" height="667">
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            
            //点击判断当前的场景号
            switch (self.sceneNumber) {
                case 1:
                    if (mouseX > self.button_playX && mouseX < self.button_playX + 116 && mouseY > self.button_playY && mouseY < self.button_playY + 70) {
                        //说明用户点击到按钮上了
                        self.enter(2); //去2号场景
                    }
                    break;
                case 2:
                    self.enter(3);
                    break;
                case 3:
                    game.bird.fly();
                    break;
                case 5:
                    if (mouseX > self.button_playX && mouseX < self.button_playX + 116 && mouseY > self.button_playY && mouseY < self.button_playY + 70) {
                        self.enter(1); //去1号场景
                    }
                    break;
            }
        };
    }
}