const {env} = process;

//env 包含很多路径
//console.log(env);

//打印当前命令所执行的路径 cwd()方法
console.log(process.cwd());


//global对象的 setImmediate()异步方法 事件队列
setImmediate(() => {  //异步优选
    console.log('setImmediate');
});

//
setTimeout(() => {
    console.log('setTimeout');
},0);

process.nextTick( () => {  //慎用
    console.log('nextTick');
});

//三种执行 顺序 nextTick  setTimeout   setImmediate