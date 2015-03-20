var myCount = 0;
jsPlumb.ready(function() {

  var exampleEndpointOptions = {
      endpoint:"Dot",
      paintStyle:{ width:25, height:21, fillStyle:'#666' },
      isSource:true,
      connectorStyle : { strokeStyle:"#666" },
      isTarget:true,
      maxConnections: -1
      };

count=0;
shuriken=0;
//providing dragging for .ninja class components
$(".ninja").draggable({
  helper: 'clone',
  cursor: 'move',

  stop: function (ev, ui) {

      var pos = $(ui.helper).offset();
      objName = "#clone" + count;
      $(objName).draggable({
            containment:".workspace",
            cancel: ".arrows"
      });


      //When an existing object is dragged
      //objName is the clone and providing dragging option it
      //$(objName).draggable({
      //    containment: ".workspace",
      //    stop: function (ev, ui) {

      //    }
      //});
  },
  revert: true
});
$(".workspace").droppable({

  accept: ".ninja",
  drop: function (e, ui) {


      if ($(ui.draggable)[0].id != "") {

         count++;
         myCount++;

         x = ui.helper.clone();
         $(this).append(x.attr("id",'clone'+count));
         $(this).append(x.attr("pointExists",false));
         $(this).append(x.attr("locked",false));
         $(this).append(x.attr("myCount",'0'));
         ui.helper.remove();

         if(x.context.textContent=="IHS")
        {
         $.ajax({
          datatype: "json",
          url: "ihs.json",
          success:function(response){
          console.log(response.data);
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


        //var offsetXPos = ui.offset.left;
        //var offsetYPos = ui.offset.top;



        //var clone = ui.draggable;
        //var width = clone.width();
        //var height = clone.height();

        $(".ui-draggable-dragging").draggable({containment:".workspace"});
               points=[];
          $(".ui-draggable-dragging").dblclick(function(event) {
              element=$(this);

              var endpoint = count;
              var id1=element.attr('id');
              console.log("id is:"+id1);

              if (element.attr('pointExists')=="false")
              {
                points[shuriken]= jsPlumb.addEndpoint(id1, {
                       anchor : "TopCenter",
                   },exampleEndpointOptions);
                   event.stopPropagation();
                   $(this).attr('myCount',myCount);
                   element.attr('pointExists',true);
                   console.log(points[shuriken].elementId);

              }
              else
              {
                console.log(element.attr('id'));
                var myCount = $(this).attr('myCount');
                //element.attr('myCount',myCount);
                console.log(myCount);
                console.log("trying to remove");
                kk = jsPlumb.deleteEndpoint("clone1");
                event.stopPropagation();

                element.attr('pointExists',false);
              }
              if (element.attr('locked')=="false")
              {
                //id1=element.attr('id')
                console.log(element.attr('id')+' is locked');
                $(".ui-draggable-dragging").draggable("disable");
                $(".ui-draggable-dragging").draggable({containment:".workspace",disabled:true});
                element.attr('locked',true);
              }
              else
              {

                console.log(id1 + 'is unlocked');
                $(".ui-draggable-dragging").draggable("enable");
                element.attr('locked',false);
              }
              $("#clone"+count).on('mouseenter', '.divbutton', function () {
                    $(this).find(":button").show();
                     }).on('mouseleave', '.divbutton', function () {
                     $(this).find(":button").hide();
                   });



          });


          x.appendTo('#fl4');

      }
  }
});

});
