/*
 * @Description: 背景类
 * @Author: your name
 * @Date: 2019-02-01 21:51:15
 * @LastEditTime: 2019-10-14 17:29:10
 * @LastEditors: Please set LastEditors
 */

class Background {
    constructor() {
        this.image = game.res.bg_day;
        //自己的x、y      (y+396)/game.canvas.height=0.75  396为图片顶部到草丛的距离 y为图片顶部距离canvas顶部的距离
        this.x = 0;
        this.y = 0.75 * game.canvas.height - 396;
        //自己图片的尺寸
        this.w = 288;
        this.h = 512;
        //自己的速度
        this.speed = 1;
    }

    update() {
        this.x -= this.speed;
        //克隆
        if (this.x < -this.w) {
            this.x = 0;
        }
    }

    render() {
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        // 渲染天空猫腻矩形
        game.ctx.fillStyle = "#4EC0CA";
        game.ctx.fillRect(0, 0, game.canvas.width, this.y + 10);
    }
}