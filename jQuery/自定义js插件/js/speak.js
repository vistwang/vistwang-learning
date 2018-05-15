(function($){
    //jQuery类本身继承的方法
    $.extend({
        speak:function(){
            alert("how are you!");
        }
    });


    //jquery对象才能引用
    $.fn.extend({
        red_color:function () {
            alert("我是 $.fn.extend 继承的哦");
        }
    });
})(jQuery);
