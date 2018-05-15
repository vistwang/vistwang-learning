//process 进程

//argv,agv0,execArgv,execPath 四个process子对象

// 参数相关
const {argv,argv0,execArgv,execPath} = process;

argv.forEach(item => {
    console.log(item);
    // 数组中默认两个项
    // 第一个是node.js的安装路径，第二个是文件路径
});

console.log(argv0);
console.log(execArgv);
console.log(execPath);

