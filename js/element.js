Element.prototype.find = function(selector){  
}

Element.prototype.hasClass = function(className){
    return !!this.className.match( new RegExp( "(\\s|^)" + className + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断   
}

Element.prototype.addClass = function(className){
    if( !this.hasClass(className ) ){ 
        this.className += " " + className; 
    } 
}

Element.prototype.removeClass = function(className){
    if( this.hasClass(className ) ){ 
        this.className = this.className.replace( new RegExp( "(\\s|^)" + className + "(\\s|$)" )," " ); // replace方法是替换 
    }
}