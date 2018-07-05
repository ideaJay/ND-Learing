window.onload = function(){
    var new_work_btn = document.getElementById("new-work");
    new_work_btn.onclick = function(){
        var l_new_work = document.getElementById("l-new-work");
        l_new_work.style.display = "block";
    }

    var work_submit = document.getElementById("work-submit");
    work_submit.onclick = workClose;

    var work_close = document.getElementById("work-close");
    work_close.onclick = workClose;
    
    var class_submit = document.getElementById("class-submit");
    class_submit.onclick = classClose;

    var class_close = document.getElementById("class-close");
    class_close.onclick = classClose;


    var new_auth = document.getElementById("new-auth");
    new_auth.onclick = function(){
        var l_new_class = document.getElementById("l-new-class");
        l_new_class.style.display = "block";
    }

    function workClose(){
        var l_new_work = document.getElementById("l-new-work");
        l_new_work.style.display = "none";
    }

    function classClose(){
        var l_new_class = document.getElementById("l-new-class");
        l_new_class.style.display = "none";
    }

}
