/* Javascript for FourmisXBlock. */
var urlApi = "/"
var listCours = [];
var listJsonCours = {};
var nodes = [];

var first = false;

function FourmisXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    function addElt(datas) {
      var list = document.getElementById("list");
      var option;

      var i =0;

      datas.forEach(function(elt){
        option = document.createElement("option");
        option.text = elt.name
        option.value = elt.name

        if ( !first ) {
          listCours.push(elt.name);
          console.log("Update : "+elt.name+" = "+i);
          listJsonCours[elt.name] = i;

          nodes.push({"index":i,"name":elt.name,"group":i})
          i++;
        }

        list.add(option);
      })

      first = true;
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

    function showD3(matrice) {
      var width = 960,
      height = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .nodes(nodes)
        .links([])
        .charge(-120)
        .linkDistance(30)
        .size([width,height]);

    var svg = d3.select("body").select("svg")
        .attr("class", "stage")
        .attr("width", width)
        .attr("height", height);

     var links = [];
      var n = matrice.length;

      for(var i=0; i < n; i++) {
        var source = listJsonCours[matrice[i][0].trim()];
        var target = listJsonCours[matrice[i][1].trim()];

        if ( (source != null) && (target != null) ) {
          var test = matrice[i][2]-matrice[i][3]
          links.push({"source":source,"target":target,"value":test>0?test:0})
        }
      }

      var k = Math.sqrt(nodes.length / (width * height));
      var charge = -10 / k;
      var gravity = 100 * k;

      force.nodes(nodes);
      force.links(links);
      force.linkDistance(200)
        .charge(charge)
        .gravity(gravity)

      // Append the labels to each group


      var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

      var node = svg.selectAll("circle.node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("fill", function(d) { return color(d.group); })
        .call(force.drag);

      node.append("text")
          .text(function(d) { return d.name; })

      node.append("svg:circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", 5)

      force.on("tick", function(e) {

          link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

           // Translate the groups
           node.attr("transform", function(d) {
             return 'translate(' + [d.x, d.y] + ')';
           });
         });

      force.start();
    }

    $(function () {
        /* Here's where you'd do things on page load. */
        $.getJSON("/api/course_structure/v0/courses",function(datas){
          var res  = datas.results;

          addElt(res);

          var matUrl = runtime.handlerUrl(element, 'matriceAlgo');

          $.ajax({
            type:"POST",
            url:matUrl,
            data:JSON.stringify({}),
            success: showD3
          });
        });



    });

}
