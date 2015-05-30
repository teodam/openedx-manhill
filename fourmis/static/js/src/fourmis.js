/* Javascript for FourmisXBlock. */
var urlApi = "http://127.0.0.1:8000"

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

    $.getJSON(urlApi+"/api/course_structure/v0/courses",function(datas){
      addElt(datas.results);
    });

    function updateVotes(votes) {
      console.log(votes)
    }

    function initLiens(datas) {

      var lien1 = document.getElementById("lien1");
      var lien2 = document.getElementById("lien2");
      var lien3 = document.getElementById("lien3");

      $("#lien1").text(datas[0].id)
      $("#lien1").attr("id_c",datas[0].id)
      $("#lien2").text(datas[1].id)
      $("#lien2").attr("id_c",datas[1].id)
      $("#lien3").text(datas[2].id)
      $("#lien3").attr("id_c",datas[2].id)

      var img1 = document.getElementById("imglien1");
      var img2 = document.getElementById("imglien2");
      var img3 = document.getElementById("imglien3");

      //img1.src = urlApi + datas[0].img
      //img2.src = urlApi + datas[1].img
      //img3.src = urlApi + datas[2].img
    }

    var handlerUrl = runtime.handlerUrl(element, 'fourmisAlgo');
    var addUrl = runtime.handlerUrl(element, 'nextPage');

    $('button', element).click(function(eventObject) {
        document.getElementById("cours").style.display = 'block';
        document.getElementById("choix").style.display = 'none';

        var rep = $(this).attr("id") == "oui";

        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"choix": rep ? 1 : 0}),
            success: initLiens
        });
    });

    $('.link_to').click(function(eventObject){
      id = $(this).attr('id_c');
      eventObject.preventDefault();
      console.log(id);
      $.ajax({
        type:"POST",
        url:addUrl,
        data:JSON.stringify({"id":id}),
        success:function(data){
          window.location.href = "http://127.0.0.1:8010/scenario/fourmis.0/"
        }
      });
    });

    document.getElementById("cours").style.display = 'none';

    $(function () {
        /* Here's where you'd do things on page load. */
    });
}
