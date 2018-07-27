window.onload = function(){
    //设置表单对象
    Form('#work--form',{
        success:function(){
            console.log('hasSubmit');
            workClose();
        }
    });

    //自定义校验方法
    Form.prototype.box_required = function(elem){
        if(elem.querySelectorAll('.auth__item').length === 0){
            return{
                status: false,
                msg: '作者信息不能为空'
            }
        }else{
            return{
                status: true,
                msg: ''
            }
        }
    }

    //加载数据
    loadData({
        pageNo:1,
        pageSize:8
    });
        
    //侧边栏点击事件
    var courses_list = document.getElementById('courses-list');
    courses_list.onclick = function(e){
        document.getElementById('search__value').value = '';
        loadData({pageNo:1,pageSize:8});
        e = window.event ? window.event :e; // 捕获事件
        var curElem = e.target ? e.target : e.secElement, // 捕获事件触发所在元素。此处用到了Event对象的target属性，该属性能够获取事件发生所在的元素
        selElem = this.getElementsByClassName('ui-sel')[0];
        selElem.removeClass('ui-sel');
        if(curElem.tagName === 'A'){
            curElem = curElem.parentNode;
        }
        curElem.addClass('ui-sel');

    }


    //tab点击事件
    var tab = document.getElementById('tab');
    tab.onclick = function(e){
        document.getElementById('search__value').value = '';
        loadData({pageNo:1,pageSize:8});
        e = window.event ? window.event :e; // 捕获事件
        var curElem = e.target ? e.target : e.secElement, // 捕获事件触发所在元素。此处用到了Event对象的target属性，该属性能够获取事件发生所在的元素
        selElem = this.getElementsByClassName('tab--sel')[0];
        selElem.removeClass('tab--sel');
        curElem.addClass('tab--sel');

    }

    //搜索点击事件
    var search__btn = document.getElementById('search__btn');
    search__btn.onclick = function(e){
        var search__value = document.getElementById('search__value').value;
        loadData({pageNo:1,pageSize:8,keyword:search__value});
    }


    //新增作者点击
    var new_auth = document.getElementById('new-auth');
    new_auth.onclick = function(){
        var l_new_class = document.getElementById('l-new-class');
        l_new_class.style.display = 'block';
    }

    //新建作品按钮点击
    var new_work_btn = document.getElementById('new-work');
    new_work_btn.onclick = function(){
        var l_new_work = document.getElementById('l-new-work');
        l_new_work.style.display = 'block';
        openShade();
    }





    //关闭新建作品窗口
    var work_close = document.getElementById('work-close');
    work_close.onclick = workClose;
    
    //提交作者信息
    var class_submit = document.getElementById('class-submit');
    class_submit.onclick = classClose;

    //关闭作者信息
    var class_close = document.getElementById('class-close');
    class_close.onclick = classClose;

    //删除作者
    var auth_delete = document.getElementsByClassName('icon--auth--delete');
    for(var i = 0 ; i < auth_delete.length ; i++){
        (function(j){
            auth_delete[j].addEventListener('click',function(){
                this.parentNode.parentNode.removeChild(this.parentNode);
            },false);
        })(i)
    }

    document.getElementById('input-file').onchange = function(){
        this.parentNode.getElementsByTagName('span')[0].innerText = this.value;
    }


    //添加作者
    document.getElementById('add-auth').onclick = function(){
        var name_list = document.getElementById('name-list'),
            sel_name = document.getElementById('sel-name'),
            selElem = name_list.querySelector('.sel');
            selElem.removeClass('sel');
            sel_name.appendChild(selElem);
    }

    //删除选中作者
    document.getElementById('delete-auth').onclick = function(){
        var name_list = document.getElementById('name-list'),
        sel_name = document.getElementById('sel-name'),
        selElem = sel_name.querySelector('.sel');
        selElem.removeClass('sel');
        name_list.appendChild(selElem);
    }

    //选中
    document.getElementById('name-list').onclick = setSel;

    document.getElementById('sel-name').onclick = setSel;

    //提交作者

    document.getElementById('class-submit').onclick = function(){
        var auth_box = document.getElementById('auth-box'),
        auth_list = document.getElementById('sel-name').querySelectorAll('li');
        for(var i = 0; i < auth_list.length; i++){
            var auth_item = document.createElement('div'),
            auth_name = document.createElement('span'),
            icon = document.createElement('i');
            auth_item.className = 'auth__item';
            auth_name.className = 'auth__name';
            auth_name.innerHTML = auth_list[i].innerHTML;
            icon.className = 'icon icon--auth--delete';
            icon.onclick = function(){
                this.parentNode.parentNode.removeChild(this.parentNode);
            }
            auth_item.appendChild(auth_name);
            auth_item.appendChild(icon);
            auth_box.appendChild(auth_item);
        }
        var clear = document.createElement('div');
        clear.className = 'clear';
        auth_box.appendChild(clear);
        classClose();
    }

};


  //拓展对象
  var extend = (function() {
    var isObjFunc = function(name) {
        var toString = Object.prototype.toString
        return function() {
            return toString.call(arguments[0]) === '[object ' + name + ']'
        } 
    }
    var   isObject = isObjFunc('Object'),
        isArray = isObjFunc('Array'),
        isBoolean = isObjFunc('Boolean')
    return function extend() {
        var index = 0,isDeep = false,obj,copy,destination,source,i
        if(isBoolean(arguments[0])) {
            index = 1
            isDeep = arguments[0]
        }
        for(i = arguments.length - 1;i>index;i--) {
            destination = arguments[i - 1]
            source = arguments[i];
            if(isObject(source) || isArray(source)) {
                for(var property in source) {
                    obj = source[property]
                    if(isDeep && ( isObject(obj) || isArray(obj) ) ) {
                        copy = isObject(obj) ? {} : []
                        var extended = extend(isDeep,copy,obj)
                        destination[property] = extended 
                    }else {
                        destination[property] = source[property]
                    }
                }
            } else {
                destination = source
            }
        }
        return destination
    }
})();


function workClose(){
    var l_new_work = document.getElementById('l-new-work');
    l_new_work.style.display = 'none';
    closeShade();
}
function classClose(){
    var l_new_class = document.getElementById('l-new-class');
    l_new_class.style.display = 'none';
}

/**
 * 加载作品数据
 * @param {*} param  请求参数对象 
 */
function loadData(param){
    ajax({
        url:'https://ideajay.github.io/ND-Learing/nd-learning/data/mywork-item-01.json',
        type: 'GET',
        async: true,
        data: param,
        datatype: 'jsonp',
        callback: 'mywork_list',
        success: function(data,opts){
            var car_main = document.getElementById('car-main'),
            item = document.getElementById('theTemplate').innerHTML,
            tempHTML = '',
            i = 0,
            items = [],
            datas = data.datas;
            if(datas.length > 0){
                items.push('<ul class="car-list" id="car-list">')
                for(i ; i < datas.length ; i ++){
                    tempHTML = item;
                    tempHTML = tempHTML.replace('imgsrc',datas[i].logo);
                    tempHTML = tempHTML.replace('authName',datas[i].authName);
                    tempHTML = tempHTML.replace('datetime',datas[i].datetime);
                    tempHTML = tempHTML.replace('workName',datas[i].name);
                    items.push(tempHTML);
                }
                items.push('</ul>');
                items.push('<div class="clear"></div>');
                //填充内容
                car_main.innerHTML = items.join('');
                //分页组件
                var page = document.getElementById('page');
                Pager(page,{
                    pageNo : opts.data.pageNo,
                    pageSize : opts.data.pageSize,
                    total : data.total,
                    change:function(pageNo,pageSize,total){
                        var param = opts.data;
                        param.pageNo = pageNo;
                        param.pageSize = pageSize;
                       loadData(param);
                    }
                });
            }else{
                //暂无资源
                var no_resource = document.createElement('div'),
                icon = document.createElement('i');
                no_resource.className = 'no-resources';
                no_resource.innerHTML = '暂无可用资源';
                icon.className = 'icon icon--no--resouces';
                no_resource.appendChild(icon);
            }
        },error: function(data){
            var main__bd = document.getElementById('l-content'); 
            pop_fail = document.createElement('div'),
            fail_icon = document.createElement('i'),
            interval = null;
            pop_fail.id = 'fail--tip';
            pop_fail.className = 'pop--fail';
            fail_icon.className = 'pop--fail--icon';
            main__bd.appendChild(pop_fail);
            pop_fail.innerHTML = '网络错误,请重试!';
            pop_fail.appendChild(fail_icon);
            interval = setInterval(function(){
                main__bd.removeChild(pop_fail);
                clearInterval(interval);
            },3000);
        }
    })
}

/*
* 显示loading遮罩层
*/
function openShade() {
    var mask_bg = document.createElement("div");
    mask_bg.id = "mask_bg";
    mask_bg.style.position = "absolute";
    mask_bg.style.top = "0px";
    mask_bg.style.left = "0px";
    mask_bg.style.width = "100%";
    mask_bg.style.height = "100%";
    mask_bg.style.backgroundColor = "#3b3c3d";
    mask_bg.style.opacity = 0.6;
    mask_bg.style.zIndex = 99;
    document.body.appendChild(mask_bg);
}

/*
* 关闭遮罩层
*/
function closeShade() {
    var mask_bg = document.getElementById("mask_bg");
    if (mask_bg != null)
        mask_bg.parentNode.removeChild(mask_bg);
}


function setSel(){
    e = window.event ? window.event :e; // 捕获事件
    var curElem = e.target ? e.target : e.secElement, // 捕获事件触发所在元素。此处用到了Event对象的target属性，该属性能够获取事件发生所在的元素
    selElem = this.getElementsByClassName('sel')[0];
    if(curElem.tagName !== 'LI'){
        return false;
    }else{
        selElem != null ? selElem.removeClass('sel') : ''; 
        curElem.addClass('sel');
    }
}






