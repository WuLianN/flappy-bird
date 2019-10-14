/*
 * @Description: 管子类
 * @Author: your name
 * @Date: 2019-02-03 21:27:43
 * @LastEditTime: 2019-10-14 18:08:59
 * @LastEditors: Please set LastEditors
 */

class Pipe {
    constructor() {
        //自己的背景
        this.imageUp = game.res.pipe_up;
        this.imageDown = game.res.pipe_down;
        //总高  包括了上管子高度+空隙+下管子高度
        this.allHeight = game.canvas.height * 0.75;  //此处的高度为 canvas顶部到地面的距离
        //空隙
        this.interspace = 150;
        //一条管子的总高度 图片的尺寸
        this.picHeight = 320;
        //上管子的高度 保证管子至少要有100的高度
        this.height1 = 100 + parseInt(Math.random() * (this.picHeight - 100));
        //下管子的高度
        this.height2 = this.allHeight - this.height1 - this.interspace;
        //自己的x
        this.x = game.canvas.width;
        //将自己推入管子数组
        game.pipeArr.push(this);
        //小鸟是否通过管子
        this.ispassed = false;
    }

    update() {
        this.x -= 2;
        
        // 碰撞检测 检测自己有没有碰撞到小鸟
        if (game.bird.right > this.x && game.bird.left < this.x + 52) {
            if (game.bird.top < this.height1 || game.bird.bottom > this.height1 + this.interspace) {
                //死亡就进入4号场景
                game.sceneManage.enter(4);
            }
        }
        
        // 加分
        if (game.bird.right > this.x + 52 && !this.ispassed) {
            //顺利通过了
            game.score++;
            //标记为已经通过了
            this.ispassed = true;
        }

        // 检测这个管子是否已经出了视口，如果时，要从数组中删除这个管子
        if (this.x < -52) {
            for (var i = 0; i < game.pipeArr.length; i++) {
                if (game.pipeArr[i] = this) {
                    game.pipeArr.splice(i, 1);
                }
            }
        }
    }

    //渲染   52为管子宽度
    render() {
        game.ctx.drawImage(this.imageDown, 0, this.picHeight - this.height1, 52, this.height1, this.x, 0, 52, this.height1);
        game.ctx.drawImage(this.imageUp, 0, 0, 52, this.height2, this.x, this.height1 + this.interspace, 52, this.height2);
    }
}