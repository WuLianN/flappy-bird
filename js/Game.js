/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-07 16:31:43
 * @LastEditTime: 2019-10-14 18:05:11
 * @LastEditors: Please set LastEditors
 */

class Game {
    constructor(params) {
        this.canvas = document.querySelector(params.id);
        this.ctx = this.canvas.getContext("2d");

        // 资源文件地址
        this.resJsonUrl = params.resJsonUrl;
        // 帧编号
        this.fno = 0;
        // 设置画布的宽度和高度
        this.init();
        // 读取资源
        this.loadAllResouce(() => {
            // 全部资源已加载完毕，开始游戏
            this.start();
        })
    }

    // 初始化 -> 设置画布的宽度和高度
    init() {
        let clientW = document.documentElement.clientWidth;
        let clientH = document.documentElement.clientHeight;

        if (clientW > 414) {
            clientW = 414;
        } else if (clientW < 320) {
            clientW = 320;
        }
        if (clientH > 736) {
            clientH = 736;
        } else if (clientH < 500) {
            clientH = 500;
        }

        this.canvas.width = clientW;
        this.canvas.height = clientH;
    }

    loadAllResouce(callback) {

        // 计数器
        let alreadyDoesNumber = 0;
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                let resObj = JSON.parse(xhr.responseText);
                // console.log(xhr.responseText);
                // console.log(resObj);

                this.res = {};

                // 遍历数组
                for (const i of resObj.images) {
                    // 创建一个同名的key
                    this.res[i.name] = new Image();
                    // 请求
                    this.res[i.name].src = i.url;
                    // 监听
                    this.res[i.name].onload = () => {
                        alreadyDoesNumber++;
                        //清屏
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        let txt = "正在加载" + alreadyDoesNumber + "/" + resObj.images.length + "请稍后";
                        // console.log(txt);
                        this.ctx.font = "20px 微软雅黑";
                        this.ctx.textAlign = "center";
                        //放置居中的位置， 屏幕的黄金分割点
                        this.ctx.fillText(txt, this.canvas.width / 2, this.canvas.height * (1 - 0.618));
                        //判断是否已经全部加载完全
                        if (alreadyDoesNumber === resObj.images.length) {
                            callback();   // 回调
                        }
                    }
                }
            }
        }

        xhr.open("get", "res.json", true);
        xhr.send();
    }

    start() {
        //console.log("已加载完毕");

        //实例化自己的场景管理器
        this.sceneManage = new SceneManager();
        //分数
        this.score = 0;

        //设置定时器
        this.timer = setInterval(() => {
            //清屏
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //帧编号
            this.fno++;
            //场景管理器的更新和渲染
            this.sceneManage.update();
            this.sceneManage.render();
            //打印帧编号
            this.ctx.font = "16px consolas";
            this.ctx.textAlign = "left";
            this.ctx.fillText("FNO:" + this.fno, 10, 20);
            this.ctx.fillText("场景号:" + this.sceneManage.sceneNumber, 10, 40);
        }, 20);
    }
}