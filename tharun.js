jsPlumb.ready(function() {

  var exampleEndpointOptions = {
      endpoint:"Dot",
      paintStyle:{ width:25, height:21, fillStyle:'#666' },
      isSource:true,
      connectorStyle : { strokeStyle:"#666" },
      isTarget:true,
      maxConnections: -1
      };

var count=0;
//providing dragging for .ninja class components
$(".ninja").draggable({
  helper: 'clone',
  cursor: 'move',
  //tolerance: 'fit',
  //count++;
  stop: function (ev, ui) {

      var pos = $(ui.helper).offset();
      objName = "#clone" + count;
      //count=count+1;
      //$(objName).removeClass("ninja");
      alert("count:"+count);
      alert('objName:'+objName);
      $(objName).draggable({
            containment:".workspace",
            cancel: ".arrows"
      });


      //When an existing object is dragged
      //objName is the clone and providing dragging option it
      //$(objName).draggable({
        //  containment: ".workspace",
        //  stop: function (ev, ui) {

        //  }
      //});
  },
  revert: true
});
$(".workspace").droppable({

  accept: ".ninja",
  //activeClass: "drop-area",
  drop: function (e, ui) {


      if ($(ui.draggable)[0].id != "") {

         count++;

         alert("1st : "+count);
         x = ui.helper.clone();
         $(this).append(x.attr("id",'clone'+count));
          if(x.context.textContent=="IHS")
         {
          $.ajax({
           datatype: "json",
           url: "ihs.json",
           success:function(response){
           console.log(response.data);
           json=JSON.stringify(eval('('+response.data+')'));
           arr=$.parseJSON(response.data);
           console.log(arr);
            },
           error:function(error){
           console.log(error)
            }
          });
         };
         if(x.context.textContent=="WAS")
         {
          $.ajax({
           datatype: "json",
           url: "WAS.json",
           success:function(response){
           console.log(response.data);
            },
           error:function(error){
           console.log(error)
            }
          });
         };
         ui.helper.remove();


        var offsetXPos = ui.offset.left;
        var offsetYPos = ui.offset.top;



        var clone = ui.draggable;
        var width = clone.width();
        var height = clone.height();


        //jsonElements.push(str);
        var lock1=0;
        var katana={};

        $("#clone"+count).draggable({containment:".workspace"});
          $("#clone"+count).dblclick(function(event) {

              var points={};
              var endpoint=count
              //alert("endpoint:"+count);
              if (lock1==0)
              {
              points[endpoint] =jsPlumb.addEndpoint('clone'+count, {
                       anchor : "TopCenter",
                   },exampleEndpointOptions);

                lock1=1;
                $("#clone"+count).draggable({containment:".workspace",disabled:true});


               //alert("point name:"+points[endpoint]);

              }
              else
              {
                var ep="ep_"+count;

                jsPlumb.deleteEveryEndpoint("#clone"+count);

                $("#clone"+count).draggable({containment:".workspace",disabled:false});

                lock1=0;
              }
              //var sourceUUID = "xxx";
              //****************alert(count);****************************//
             //addindg the end point to the clone




        //     instance.draggable(jsPlumb.getSelector(".workspace .window"),
        //{
        //    grid : [ 20, 20 ]
        //});


          });


          x.appendTo('#fl4');

      }
  }
});

});