/*
 * @Description: 鸟类
 * @Author: your name
 * @Date: 2019-02-03 21:30:45
 * @LastEditTime: 2019-10-14 17:58:00
 * @LastEditors: Please set LastEditors
 */

class Bird {
    constructor() {
        //随机一个小鸟的颜色0、1、2
        this.color = parseInt(Math.random() * 3);
        //决定用图，小鸟有3个翅膀状态
        this.imageArr = [
            game.res["bird" + this.color + "_0"],
            game.res["bird" + this.color + "_1"],
            game.res["bird" + this.color + "_2"],
        ];
        //翅膀状态
        this.wingStep = 0;
        //小鸟的初始位置  24为小鸟图片的一半宽度
        this.x = game.canvas.width * (1 - 0.618) - 24;
        this.y = 100;
        //小鸟的帧数 用于上升、下落的算法
        this.fno = 0;
        //小鸟的角度
        this.d = 0;
        //小鸟是否有能量
        this.hasEnergy = false;
        //控制参数
        this.up = 0.35;    //上升  大->上升高度越大，反之越小
        this.down = 0.55;  //下落  大->下落速度越快，反之越慢
    }

    update() {
        //翅膀状态 每固定（）帧数拍打一次
        game.fno % 5 === 0 && this.wingStep++;
        if (this.wingStep > 2) {
            this.wingStep = 0;
        }
        //小鸟上升、下落的算法
        if (!this.hasEnergy) {
            //下落
            this.y += this.fno * this.down;
        } else {
            //有能量(上升)
            this.y -= (20 - this.fno) * this.up;
            //20帧后没有能量(下落)
            if (this.fno > 20) {
                this.hasEnergy = false;
                this.fno = 0;
            }
        }
        this.d += 0.04;
        this.fno++;
        //计算自己的四个碰撞检测值
        this.top = this.y - 12;    //小鸟图片有空白空隙->获得完整的小鸟->AABB盒
        this.right = this.x + 12;
        this.bottom = this.y + 17;
        this.left = this.x - 17;
        //验证是否落地
        if (this.bottom > game.canvas.height * 0.75) {
            //死亡就去4号场景
            game.sceneManage.enter(4)
        }
    }

    render() {
        game.ctx.save();
        //将坐标系拉到小鸟的中心点
        game.ctx.translate(this.x, this.y);
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24);
        game.ctx.restore();
    }

    // 飞
    fly() {
        this.hasEnergy = true;
        this.d = -0.6;
        this.fno = 0;
    }

    // 扑打翅膀
    wing() {
        // 翅膀状态 每固定（）帧数拍打一次
        game.fno % 5 === 0 && this.wingStep++;
        if (this.wingStep > 2) {
            this.wingStep = 0;
        }
    }

}