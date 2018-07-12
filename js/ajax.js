function ajax(){

  var defaultOption = {
    url: false,
    type: 'GET',
    async: true,
    data: null,
    dataType: 'json',
    success: false,
    complete: false
  },
  key = null,
  xhr = null,
  options = {},
  param = '';
  
  if (window.XMLHttpRequest)  {
    // 兼容 IE7+, Firefox, Chrome, Opera, Safari  
    xhr=new XMLHttpRequest();  
  } else{// 兼容 IE6, IE5 
    xhr=new ActiveXObject("Microsoft.XMLHTTP");  
  } 



  for(key in defaultOption){
    options[i] = options[i] || defaultOption[i];
  }
  //参数拼接
  for(key in data){
     if(param === ''){
      param +=  key + '=' + data[key];    
     }else{
      param += '&' + key + '=' + data[key];    
     }
  }

  if(options.type.toLowerCase() === 'get'){
    url += '?' + param;
  }else if(options.type.toLowerCase() === 'post'){
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
  }else{
    throw {
      code : '-100',
      msg : 'type is only post or get'
    }
  }

  xhr.open(options.type,options.url,options.async); 
  xhr.send(param);

  if(options.async === true){
    xhr.onreadystatechange = stateChange;
  }else{
    xhr.responseText;  
  }

  function stateChange(){
    var status = xhr.status,
        result = null;

    if(status >= 200 && status < 300 || status == 304){
      result = xhr.responseText;
      if(window.JSON){
        result = JSON.parse(result);
      }else{
        result = eval('(' + result + ')');
      }
      ajaxSuccess(result)
    }else{
      options.error(xhr.responseText)
    }
  }

  function ajaxSuccess(data){
    var status = 'success';
    options.success && options.success(data, options, status, xhr);
    options.complete && options.complete(status);
  }


}

