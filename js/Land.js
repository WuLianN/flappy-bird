/*
 * @Description: 大地类
 * @Author: your name
 * @Date: 2019-02-01 21:57:59
 * @LastEditTime: 2019-10-14 23:05:25
 * @LastEditors: Please set LastEditors
 */

class Land {
    constructor() {
        //自己的背景
        this.image = game.res.land;  //此处的res为Game.js中的 this.res = {}
        this.x = 0;
        this.y = game.canvas.height * 0.75;
        this.w = 336;
        this.h = 112;
    }

    update() {
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        // 渲染天空猫腻矩形
        game.ctx.fillStyle = "#DED895";
        game.ctx.fillRect(0, this.y + this.h, game.canvas.width, game.canvas.height * 0.25 - this.h);
    }

    render() {
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        // 渲染天空猫腻矩形
        game.ctx.fillStyle = "#DED895";
        game.ctx.fillRect(0, this.y + this.h, game.canvas.width, game.canvas.height * 0.25 - this.h);
    }
}