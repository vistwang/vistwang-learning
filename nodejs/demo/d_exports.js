//exports 和 module.exports 的区别，exports是module.exports的快捷方式，你可以往exports中添加对外暴露的内容，实现module.exports的效果，但是不能修改exports的指向。

//这种写法是错误的
exports = {
    a:1,
    b:1,
    c:1,
    d:1
};

//这种写法正确
exports.fun = 'fdsd';