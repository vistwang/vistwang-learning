const {normalize} = require('path');
const {join} = require('path');
const {resolve} = require('path');
const {basename,dirname,extname} = require('path');
const {parse,format} = require('path');

const {
    sep,
    delimiter,
    win32,
    posix,
} = require('path');
//等同于 const normalize = require('path').normalize;
console.log(normalize('./usr/adm/local/bin'));
console.log(normalize('./usr/adm/local/../bin'));


console.log('拼接1：',join('./usr','/adm/','/lo//cal/bin'));
console.log('拼接2：',join('./usr','/adm','../local/bin'));

//相对路径解析成绝对路径 resolve
console.log('相对路径转绝对：',resolve('./'));

//basename 文件名,dirname 路径,extname 拓展名
const  filePath = '/usr/local/bin/no.txt';

console.log('文件名：',basename(filePath));
console.log('路径：',dirname(filePath));
console.log('拓展名：',extname(filePath));

//parse  根据文件的路径返回一个信息对象
//format  将一个文件的信息对象转换为一个路径
var t_path = parse(filePath);
console.log(t_path);

console.log(format(t_path));

//sep,delimiter,win32,posix,

console.log('sep:',sep);
console.log('win.sep:',win32.sep);
console.log('PATH:',process.env.PATH);
console.log('win32.delimiter:', win32.delimiter);
console.log('win32.delimiter:', win32.delimiter);









