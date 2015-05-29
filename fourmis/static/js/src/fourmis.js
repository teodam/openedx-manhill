/* Javascript for FourmisXBlock. */
var urlApi = "http://127.0.0.1:8000/api/"

function FourmisXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    function addElt(datas) {
      var list = document.getElementById("list");
      var option;

      datas.forEach(function(elt){
        option = document.createElement("option");
        option.text = elt;
        list.add(option);
      })
    }


    $.getJSON(urlApi+"course_structure/v0/courses",function(data){
      console.log(data);
    });

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');
    $('button', element).click(function(eventObject) {
        addElt("coucou")
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    $('a', element).click(function(eventObject) {
       var rep = confirm("coucou")
       console.log(rep)
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
