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
        option.text = elt.name
        list.add(option);
      })
    }

    $.getJSON(urlApi+"course_structure/v0/courses",function(datas){
      addElt(datas.results);
      console.log(datas.results)
    });

  //  var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('a', element).click(function(eventObject) {
       var rep = confirm("coucou")
       console.log(rep)
    });

    function initLiens(elt) {
      var lien1 = document.getElementById("lien1");
      var lien2 = document.getElementById("lien2");
      var lien3 = document.getElementById("lien3");

      lien1.text = elt[0].name
      lien2.text = elt[1].name
      lien3.text = elt[2].name

      var img1 = document.getElementById("imglien1");
      var img2 = document.getElementById("imglien2");
      var img3 = document.getElementById("imglien3");

      img1.src = elt[0].img
      img2.src = elt[1].img
      img3.src = elt[2].img

    }

    $('button', element).click(function(eventObject) {
        document.getElementById("cours").style.display = 'block';
        document.getElementById("choix").style.display = 'none';

        datas = [{"name":"cours1","img":""},{"name":"cours2","img":""},{"name":"cours3","img":""}]
        initLiens(datas);
    });

    document.getElementById("cours").style.display = 'none';

    document.getElementById("lien1").text = 'lien1';

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
