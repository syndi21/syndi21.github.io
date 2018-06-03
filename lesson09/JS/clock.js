// JavaScript Document
function clock(obj){
    var $ = function(id){
        return document.getElementById(id);
    }
    
    var box = $(obj), bh,bw,hour=new Array(),minute=new Array(),second=new Array(),raduis,re;
    box.style.position = 'relative';
    bh = box.clientHeight;
    bw = box.clientWidth;
    function createInterface(){
        var point1 = document.createElement('span');
        point1.style.height = '3px';
        point1.style.width='3px';
        point1.style.backgroundColor='#000';
        point1.style.lineHeight = '1px';
        point1.style.fontSize = '1px'
        point1.style.position = 'absolute';
        var point2 = document.createElement('span');
        point2.style.height = '5px';
        point2.style.width='5px';
        point2.style.lineHeight = '1px';
        point2.style.fontSize = '1px'
        point2.style.backgroundColor='#000';
        point2.style.position = 'absolute';
        var centerY = bh/2;
        var centerX = bw/2;
        raduis = (centerY >= centerX ? centerY : centerX) - 10;
        for(var angle=0; angle < 360 ; angle+=30){
            var qy = Math.round(Math.sin(angle * Math.PI / 180) * raduis);
            var qx = Math.round(Math.cos(angle * Math.PI / 180) * raduis);
            var el = point1.cloneNode(true);
            el.style.top = centerY + qy + 'px';
            el.style.left = centerX + qx + 'px';
            box.appendChild(el);
        }
        for(var angle=0; angle < 360 ; angle+=90){
            var qy = Math.round(Math.sin(angle * Math.PI / 180) * raduis);
            var qx = Math.round(Math.cos(angle * Math.PI / 180) * raduis);
            var el = point2.cloneNode(true);
            el.style.top = centerY + qy + 'px';
            el.style.left = centerX + qx + 'px';
            box.appendChild(el);
        }
        var hourone = document.createElement('span');
        hourone.style.width = '8px';
        hourone.style.height = '8px';
        hourone.style.backgroundColor = '#000';
        hourone.style.position = 'absolute';
        hourone.style.lineHeight = '1px';
        hourone.style.fontSize = '1px'
        for(var i=0; i < 30; i++){
            var hone = hourone.cloneNode(true);
            box.appendChild(hone);
            hour.push(hone);
        }
        minuteone = document.createElement('span');
        minuteone.style.width = '6px';
        minuteone.style.height = '6px';
        minuteone.style.backgroundColor = '#888';
        minuteone.style.position = 'absolute';
        minuteone.style.lineHeight = '1px';
        minuteone.style.fontSize = '1px'
        for(var i=0; i < 30; i++){
            var mone = minuteone.cloneNode(true);
            box.appendChild(mone);
            minute.push(mone);
        }
        
        secondone = document.createElement('span');
        secondone.style.width = '4px';
        secondone.style.height = '4px';
        secondone.style.backgroundColor = '#f00';
        secondone.style.position = 'absolute';
        secondone.style.lineHeight = '1px';
        secondone.style.fontSize = '1px'
        for(var i=0; i < 40; i++){
            var sone = secondone.cloneNode(true);
            box.appendChild(sone);
            second.push(sone);
        }
    }
    function calhour(h,m){
        return ((h * 60 + m) / (12 * 60)) * 360 - 90;
    }
    
    function calaa(m){
        return (m / 60) * 360 - 90;
    }
    
    function setTime(h,m,s){
        var hourA = calhour(h,m);
        var minuteA = calaa(m);
        var secondA = calaa(s);
        for(var i=0,len=hour.length; i < len ; i++){
            var araduis = (i/len) * (raduis * 0.5);
            var hy = Math.round(Math.sin(hourA * Math.PI / 180) * araduis);
            var hx = Math.round(Math.cos(hourA * Math.PI / 180) * araduis);
            hour[i].style.top = (bh/2) + hy + "px";
            hour[i].style.left = (bw/2) + hx + "px";
        }
        
        for(var i=0,len=minute.length; i < len ; i++){
            var araduis = (i/len) * (raduis * 0.6);

            var hy = Math.round(Math.sin(minuteA * Math.PI / 180) * araduis);
            var hx = Math.round(Math.cos(minuteA * Math.PI / 180) * araduis);
            minute[i].style.top = (bh/2) + hy + "px";
            minute[i].style.left = (bw/2) + hx + "px";
        }
        
        for(var i=0,len=second.length; i < len ; i++){
            var araduis = (i/len) * (raduis * 0.8);
            var hy = Math.round(Math.sin(secondA * Math.PI / 180) * araduis);
            var hx = Math.round(Math.cos(secondA * Math.PI / 180) * araduis);
            second[i].style.top = (bh/2) + hy + "px";
            second[i].style.left = (bw/2) + hx + "px";
        }
    }
    function update(){
        var d = new Date();
        var h =d.getHours();
		//h=h>12? h-12: h;
        var m = d.getUTCMinutes();
        var s = d.getSeconds();
        setTime(h,m,s);
    }
    function run(){
        re = setInterval(update,1000);
    }
    function stop(){
        clearInterval(re);
    }
    createInterface();
    update();
    return {'run':run,'stop':stop};
}
window.onload = function(){
    clock('clock').run();
}