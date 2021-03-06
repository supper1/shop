function show_loading(){//loading蒙层显示
    var model = document.getElementById("loading");
    model.style.display="block";
}
function hide_loading(){//loading蒙层隐藏
    var model = document.getElementById("loading");
    model.style.display="none";
}
function showModel(attr,time){//attr为显示层的参数{}
    var model=document.createElement("div");
    model.id="model";
    model.innerHTML="<div><div class=\"iconfont "+attr.icon+"\"></div><span>"+attr.text+"</span></div>";
    document.body.insertBefore(model,document.body.childNodes[0]);
    setTimeout(function(){
        var model=document.getElementById("model");
        document.body.removeChild(model);
    },time);
}
function one() { //获取参数
    var url =  location.search
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
function vueTouch(el,binding,type){//触屏函数
    var _this=this;
    this.obj=el;
    this.binding=binding;
    this.touchType=type;
    this.vueTouches={x:0,y:0};
    this.vueMoves=true;
    this.vueLeave=true;
    this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
    this.obj.addEventListener("touchstart",function(e){
        _this.start(e);
    },false);
    this.obj.addEventListener("touchend",function(e){
        _this.end(e);
    },false);
    this.obj.addEventListener("touchmove",function(e){
        _this.move(e);
    },false);
};
vueTouch.prototype={
    start:function(e){
        this.vueMoves=true;
        this.vueLeave=true;
        this.longTouch=true;
        this.vueTouches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
        this.time=setTimeout(function(){
            if(this.vueLeave&&this.vueMoves){
                this.touchType=="longtap"&&this.vueCallBack(this.binding.value,e);
                this.longTouch=false;
            };
        }.bind(this),1000);
    },
    end:function(e){
        var disX=e.changedTouches[0].pageX-this.vueTouches.x;
        var disY=e.changedTouches[0].pageY-this.vueTouches.y;
        clearTimeout(this.time);
        if(Math.abs(disX)>10||Math.abs(disY)>100){
            this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);
            if(Math.abs(disX)>Math.abs(disY)){
                if(disX>10){
                    this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e);
                };
                if(disX<-10){
                    this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e);
                };
            }else{
                if(disY>10){
                    this.touchType=="swipedown"&&this.vueCallBack(this.binding.value,e);
                };
                if(disY<-10){
                    this.touchType=="swipeup"&&this.vueCallBack(this.binding.value,e);
                };  
            };
        }else{
            if(this.longTouch&&this.vueMoves){
                this.touchType=="tap"&&this.vueCallBack(this.binding.value,e);
                this.vueLeave=false
            };
        };
    },
    move:function(e){
        this.vueMoves=false;
    }
};
Vue.directive("tap",{//点击事件
    bind:function(el,binding){
        new vueTouch(el,binding,"tap");
    }
});
Vue.directive("swipe",{//滑动事件
    bind:function(el,binding){
        new vueTouch(el,binding,"swipe");
    }
});
Vue.directive("swipeleft",{//左滑事件
    bind:function(el,binding){
        new vueTouch(el,binding,"swipeleft");
    }
});
Vue.directive("swiperight",{//右滑事件
    bind:function(el,binding){
        new vueTouch(el,binding,"swiperight");
    }
});
Vue.directive("swipedown",{//下滑事件
    bind:function(el,binding){
        new vueTouch(el,binding,"swipedown");
    }
});
Vue.directive("swipeup",{//上滑事件
    bind:function(el,binding){
        new vueTouch(el,binding,"swipeup");
    }
});
Vue.directive("longtap",{//长按事件
    bind:function(el,binding){
        new vueTouch(el,binding,"longtap");
    }
});
