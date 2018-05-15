require('./test1');

require('./test2');

var fs = require('fs');

const result = fs.readFile('./main.js',(err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data.toString());
    }
});

console.log(result);

//学习笔记
// 1、module被加载时候执行，加载后存入到缓存。
// 2、一旦出现某个模块被循环加载，就只输出已经执行的部分，还未执行的部分不会输出。
// 3、引入系统内置模块

//加载过得模块就会存储在内存中，不会再去加载了  所以 require('./test2');  引入就不会执行了
