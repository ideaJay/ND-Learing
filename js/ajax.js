function ajax(options){

  var defaultOption = {
    url: false,  //请求地址
    type: 'GET', //请求方式
    async: true, //是否同步
    data: null,  //参数对象
    dataType: 'json',  //返回数据格式 支持json及jsonp
    callback: '',  //jsonp 回调函数
    success: false, //请求成功回调函数
    complete: false
  },
  key = null,
  xhr = null,
  param = '';
  
  if (window.XMLHttpRequest)  {
    // 兼容 IE7+, Firefox, Chrome, Opera, Safari  
    xhr=new XMLHttpRequest();  
  } else{// 兼容 IE6, IE5 
    xhr=new ActiveXObject("Microsoft.XMLHTTP");  
  } 

  options = extend(defaultOption,options);

  //参数拼接
  for(key in options.data){
     if(param === ''){
      param +=  key + '=' + options.data[key];    
     }else{
      param += '&' + key + '=' + options.data[key];    
     }
  }

  if(options.type.toLowerCase() === 'get'){
    options.url += '?' + param;
    param = null;
  }else if(options.type.toLowerCase() === 'post'){
   
  }else{
    throw {
      code : '-100',
      msg : 'type is only post or get'
    }
  }

  xhr.open(options.type,options.url,options.async); 
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
  xhr.send(param);

  if(options.async === true){
    xhr.onreadystatechange = stateChange;
  }else{
    xhr.responseText;  
  }


  if(options.datatype === 'jsonp'){
    window[options.callback] = function(data){
      result = data;
      result = dataHandle(options.data,result);
      ajaxSuccess(result,options)
    };
  
  }

  function stateChange(){
    var status = xhr.status,
        result = null;
    if(xhr.readyState != 4){
      return ;
    }
    if(status >= 200 && status < 300 || status == 304){
      result = xhr.responseText;
      if(options.datatype === 'json' && window.JSON){
        result = JSON.parse(result);
        result = dataHandle(options.data,result);
        ajaxSuccess(result,options);
      }else {
        result = eval('(' + result + ')');
      }
    }else{
      options.error(xhr.responseText)
    }
  }

  function ajaxSuccess(data,options){
    var status = 'success';
    options.success && options.success(data, options, status, xhr);
    options.complete && options.complete(status);
  }

  function dataHandle(options,data){
      if(options === null){
        return data;
      }
      var pageSize = options.pageSize,
          pageNo = options.pageNo;
          keyword = options.keyword,
          startIndex = 0,
          endIndex = 0,
          i = data.datas.length - 1;
      
      //搜索关键字
      for( i ; i >= 0  ; i --){
         if(data.datas[i].name.indexOf(keyword) === -1 && typeof keyword !== 'undefined'&& keyword !== ''){
            data.total --;
            data.datas.splice(i,1);
         }
      }

      //分页处理
      if(!isNaN(pageSize) && !isNaN(pageNo)){
         startIndex = (pageNo - 1) * pageSize;
         endIndex = pageNo * pageSize;
         data.datas = data.datas.slice(startIndex,endIndex);
      }

      return data;  
  }


}

