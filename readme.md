<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 18:35:56
 * @LastEditTime: 2019-10-17 17:54:30
 * @LastEditors: Please set LastEditors
 -->

## 像素鸟小游戏

### 全面拥抱ES6
**ES5 -> ES6 过程的问题**

switch 语句中的 case 不能使用 let/const 声明变量(该变量在其他case中也存在)

*var 可以正常使用* 
 

``` 
switch语句中的块级作用域，在整个switch语句中，而不是对于每一个case生成一个独立的块级作用域。
在case中声明的变量，并不会提升到块级作用域中。

ES5只有全局作用域和函数作用域
ES6新增块级作用域
```


**解决办法:**

switch -> if (if有块级作用域)

![](https://github.com/WuLianN/flappy-bird/blob/master/githubImg/bird.png)
![](https://github.com/WuLianN/flappy-bird/blob/master/githubImg/bird1.png)
![](https://github.com/WuLianN/flappy-bird/blob/master/githubImg/bird2.png)

