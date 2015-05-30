/* Javascript for FourmisXBlock. */
var urlApi = "http://127.0.0.1:8000"
var listCours = [];
var first = false;

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
        option.value = elt.name

        if ( !first ) {
          listCours.push(elt.name);
        }

        list.add(option);
      })

      first = true;
    }

    $.getJSON(urlApi+"/api/course_structure/v0/courses",function(datas){
      var res  = datas.results;

      res.push({"name":"cours1"});
      res.push({"name":"cours2"});
      res.push({"name":"cours3"});
      res.push({"name":"cours4"});
      res.push({"name":"cours5"});
      res.push({"name":"cours6"});
      res.push({"name":"cours7"});
      res.push({"name":"cours8"});

      addElt(res);
    });

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

    function selectCourse(id) {
      $.ajax({
        type:"POST",
        url:addUrl,
        data:JSON.stringify({"id":id}),
        success:function(data){
          window.location.href = "http://127.0.0.1:8010/scenario/fourmis.0/"
        }
      });
    }

    $('.link_to').click(function(eventObject){
      id = $(this).attr('id_c');
      eventObject.preventDefault();
      selectCourse(id)
    });

    $('#list').change(function(val){
      var str = ""
      $( "select option:selected" ).each(function() {
         str += $( this ).text() + " ";
       });

       selectCourse(str)
    })

    $('#search').bind('input', function() {
        var substring = String($(this).val()).toLocaleLowerCase();// get the current value of the input field.
        var n = listCours.length;
        var res = [];

        for(var i =0; i < n ; i++) {
          var elt = String(listCours[i]);
          var lower = elt.toLocaleLowerCase();

          if ( lower.indexOf(substring) > -1 ) {
              res.push({"name":elt})
          }
        }

        $("#list").empty();

        var option = document.createElement("option");
        option.text = "--Select--";
        option.value = "--Select--";
        document.getElementById("list").add(option);

        addElt(res)
    });


    document.getElementById("cours").style.display = 'none';

    $(function () {
        /* Here's where you'd do things on page load. */
    });
}
