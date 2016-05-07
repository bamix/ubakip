angular.module('MyApp', ['rzModule']).controller('comicsMakerController', function ($scope) {
    var RotationAngle = 0,
    Scale = 1,
    PosX = 0,
    PosY = 0,
    ImageId = null,
    height = 0,
    width = 0,
    isDraging = false,
    divHeight = $("#sq1").height(),
    divWidth = $("#sq1").width(),
    StraightType = {
        Vertical: { value: 0 },
        Horizontal: { value: 1 },
        Custom: { value: 2 }
    };

    $scope.images = [{
        src: "https://pp.vk.me/c630516/v630516851/17d3a/o2M3HScGpQc.jpg",
        scale: 1,
        rotate: 0,
        posX: 0,
        posY: 0,
        cellId: "sq1",
        id: "1",
        height:0,
        width : 0
    },
    {
    src: "https://pp.vk.me/c630516/v630516851/17d3a/o2M3HScGpQc.jpg",
    scale: 2,
    rotate: 90,
    posX: 0,
    posY: 0,
    cellId: "sq2",
    id: "2",
    height: 0,
    width: 0
}];

    $scope.sliderRotate = {
        value: 0.0,        
        options: {
        id: 'slider-id',        
            floor: 0,
            ceil: 360,
            step: 1,
            precision: 1    
    }
    };

    interact.maxInteractions(Infinity);   // Allow multiple interactions

    interact('.imagetest')
    .draggable({
        autoScroll: true,
        onmove: dragMoveListener,
        onend: function (event) {
            console.log("end draging");
            isDraging = false;
        }
    });

    interact('.slider')                   
      .origin('self')                     
      .restrict({ drag: 'self' })           
      .inertia(true)                     
      .draggable({                     
          max: 1                  
      })
      .on('dragmove', function (event) { 
          var sliderWidth = interact.getElementRect(event.target.parentNode).width,
              value = event.pageX / sliderWidth;
          if (event.target.id == "slider_rotate") {
              SliderRotateListner(event, value);
          }
          if (event.target.id == "slider_scale") {
              SliderScaleListner(event, value)
          }
      });

    function SliderRotateListner(event,value)
    {
        if (ImageId == null) return;
        var newValue = value * 360;
        SetSliderValue(event.target, value, newValue.toFixed(0));
        RotationAngle = newValue;
        $scope.images[ImageId].rotate = RotationAngle;
        Transform($("#" + ImageId));
    }

    function SliderScaleListner(event, value) {
        if (ImageId == null) return;
        var newValue = value * 9 + 1;
        SetSliderValue(event.target, value, newValue.toFixed(2));
        Scale = newValue;
        $scope.images[ImageId].scale = Scale;
        Transform($("#" + ImageId));
    }

    function SetSliderValue(element,offset,value)
    {
        element.style.paddingLeft = (offset * 100) + '%';
        element.setAttribute('data-value', value);
    }

    LoadImages();

    $(".imagetest").load(function () {
        var id = $(this).attr('id');
        if ($(this).height() > $(this).width()) {
            $(this).css({ 'height': 'auto', 'width': '100%' });
        }
        else {
            $(this).css({ 'height': '100%', 'width': 'auto' });
        }
        $scope.images[id].height = $(this).height();
        $scope.images[id].width = $(this).width();
        SetTransformFromImage($scope.images[id]);
        Transform($(this));
    });

    function Transform(element) {
        element.css(
            {
                'transformOrigin': (Math.round(divWidth / 2)).toString() + "px " + (Math.round(divHeight / 2)).toString() + "px",
                'webkitTransform' : "rotate(" + RotationAngle + "deg) scale(" + Scale + ")" +
        "translate(" + PosX + "px, " + PosY + "px)",
                'transform': "rotate(" + RotationAngle + "deg) scale(" + Scale + ")" +
        "translate(" + PosX + "px, " + PosY + "px)"
            });
    }

    function LoadImages() {
        $(".cell").each(function (i, obj) {
            for (var i = 0; i < $scope.images.length; i++) {
                if ($scope.images[i].cellId == obj.id) {
                    console.log($scope.images[i].cellId);
                    $(obj).append(' <img src="' + $scope.images[i].src + '" id="' + i + '" class="imagetest" />');

                }
            }
        });
    }
    
    function SetTransform(rotationAngle,scale,posX,posY)
    {
        Scale = scale;
        RotationAngle = rotationAngle;        
        PosX = posX;
        PosY = posY;
    }

    $(".imagetest").click(function () {
        //var Imgid = $(this).attr('id');
        //if (ImageId == Imgid || isDraging) { return; }
        //console.log("click");
        //ImageId = Imgid;
        //SetTransformFromImage($scope.images[ImageId]);
        //EnableSliders();
        //var divRect = $("#" + ImageId).parent().get(0).getBoundingClientRect();
        //divHeight = divRect.height;
        //divWidth = divRect.width;
        //height = $scope.images[ImageId].height;
        //width = $scope.images[ImageId].width;
        //var id = $("#" + ImageId).parent().attr('id');
        //SelectCell(id);
    });

    $(".cell").click(function () {
        id = $(this).attr('id');        
        SelectCell(id);
    });

    function SelectCell(elementId) {
        //$(".cell").each(function (i, obj) {
        //    if (obj.id == elementId) {
        //        $(obj).css(
        //            {
        //                "border": "solid",
        //                "border-color": "yellow"
        //            });
        //    }
        //    else {
        //        $(obj).css(
        //            {
        //                "border": "",
        //                "border-color": "transparent"
        //            });
        //    }
        //});

    }

    function EnableSliders() {
        var rotate = $scope.images[ImageId].rotate,
            scale = $scope.images[ImageId].scale;
        SetSliderValue(document.getElementById("slider_rotate"), rotate / 360, rotate.toFixed(0));
        SetSliderValue(document.getElementById("slider_scale"), (scale - 1) / 9, scale.toFixed(2));
    }

    function SetTransformFromImage(image) {
        Scale = image.scale;
        RotationAngle = image.rotate;
        PosX = image.posX;
        PosY = image.posY;
    }

    function dragMoveListener(event) {
        if (!isDraging) {
            ImageId = event.target.id;
            SelectWorkImage();
        }
        isDraging = true;
        delta = { dx: event.dx, dy: event.dy };
        var deltas = FixDeltas(delta);
        if (deltas.dx != 0 || deltas.dy != 0) {
            Move(deltas);
        }
    }

    function SelectWorkImage()
    {        
        SetTransformFromImage($scope.images[ImageId]);
        EnableSliders();
        var divRect = $("#" + ImageId).parent().get(0).getBoundingClientRect();
        divHeight = divRect.height;
        divWidth = divRect.width;
        height = $scope.images[ImageId].height;
        width = $scope.images[ImageId].width;        
    }

    function CheckContaining(rect) {
        document.getElementById("x1").value = "false";
        document.getElementById("x2").value = "false";
        document.getElementById("y1").value = "false";
        document.getElementById("y2").value = "false";
        //if (CheckVertex(element, rect.point1)) document.getElementById("x1").value = "true";
        if (CheckVertex(rect.point1)) {
            document.getElementById("x1").value = "true";
            if (CheckVertex(rect.point2)) {
                document.getElementById("x2").value = "true";
                if (CheckVertex(rect.point3)) {
                    document.getElementById("y1").value = "true";
                    if (CheckVertex(rect.point4)) {
                        document.getElementById("y2").value = "true";
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function FixDeltas(delta) {
        var primaryDy = delta.dy;
        var dx = delta.dx, dy = delta.dy;
        if (!CheckContaining(AddTranslateChanges(delta))) {
            delta.dy = 0; dy = 0;
            if (!CheckContaining(AddTranslateChanges(delta))) {
                delta.dy = primaryDy; dy = primaryDy;
                delta.dx = 0; dx = 0;
                if (!CheckContaining(AddTranslateChanges(delta))) {
                    dx = 0; dy = 0;
                }
            }
        }
        return { dx: dx, dy: dy };
    }

    function AddTranslateChanges(delta) {
        var dx = delta.dx, dy = delta.dy,
            divRect = $("#" + ImageId).parent().get(0).getBoundingClientRect();
        var vertex1 = { x: divRect.left - dx, y: divRect.top - dy },
            vertex2 = { x: divRect.right - dx, y: divRect.top - dy },
            vertex3 = { x: divRect.right - dx, y: divRect.bottom - dy },
            vertex4 = { x: divRect.left - dx, y: divRect.bottom - dy };
        return { point1: vertex1, point2: vertex2, point3: vertex3, point4: vertex4 };
    }

    function CheckVertex(vertex) {
        var foo = Deltas(GetExtrimLeftPoint(RotationAngle), vertex);
        var bar = Deltas(GetExtrimRightPoint(RotationAngle), vertex);
        document.getElementById("top").value = foo.delta1;
        document.getElementById("left").value = foo.delta2;
        document.getElementById("right").value = bar.delta1;
        document.getElementById("bottom").value = bar.delta2;
        if (foo.delta1 >= 0 && foo.delta2 >= 0 && bar.delta1 <= 0 && bar.delta2 <= 0) return true;
        else return false;
    }

    function Deltas(point, vertex) {
        var Straight = GetStraightParams(point.x, point.y, -RotationAngle - 90), delta1 = 0, delta2 = 0;
        var Straight2 = GetStraightParams(point.x, point.y, -RotationAngle);
        if (Straight.type == StraightType.Vertical) {
            delta1 = vertex.x - point.x;
            delta2 = point.y - vertex.y;
        }
        else if (Straight.type == StraightType.Horizontal) {
            delta1 = point.y - vertex.y;
            delta2 = vertex.x - point.x;
        }
        else {
            if (RotationAngle % 180 < 90) {
                delta1 = vertex.y - (vertex.x * Straight.k + Straight.b);
                delta2 = (vertex.x * Straight2.k + Straight2.b) - vertex.y;
            }
            else {
                delta1 = (vertex.x * Straight.k + Straight.b) - vertex.y;
                delta2 = vertex.y - (vertex.x * Straight2.k + Straight2.b);
            }
        }
        return { delta1: delta1, delta2: delta2 };
    }

    function Move(deltas) {
        var newBasis = RotateBasis(deltas.dx, deltas.dy, RotationAngle);
        $scope.images[ImageId].posX = PosX = PosX + newBasis.x / Scale;
        $scope.images[ImageId].posY = PosY = PosY + newBasis.y / Scale;       
        Transform($("#" + ImageId));
    }

    function GetExtrimLeftPoint(angle) {
        if (angle < 90) return GetBottomLeftImagePoint();
        else if (angle < 180) return GetBottomRightImagePoint();
        else if (angle < 270) return GetTopRightImagePoint();
        else return GetTopLeftImagePoint();
    }

    function GetExtrimRightPoint(angle) {
        if (angle < 90) return GetTopRightImagePoint();
        else if (angle < 180) return GetTopLeftImagePoint();
        else if (angle < 270) return GetBottomLeftImagePoint();
        else return GetBottomRightImagePoint();
    }

    function GetTopLeftImagePoint() {
        return GetImagePoint(-width / 2, -height / 2);
    }

    function GetBottomLeftImagePoint() {
        return GetImagePoint(-width / 2, height / 2);
    }

    function GetTopRightImagePoint() {
        return GetImagePoint(width / 2, -height / 2);
    }

    function GetBottomRightImagePoint() {
        return GetImagePoint(width / 2, height / 2);
    }

    function GetImagePoint(offsetX, offsetY) {
        var offsetFirstPoint = RotateBasis(offsetX * Scale, offsetY * Scale, -RotationAngle);
        var center = GetCenterElementByID(ImageId);
        var x = center.x + offsetFirstPoint.x;
        var y = center.y + offsetFirstPoint.y;
        return { x: x, y: y };
    }

    function RotateBasis(x, y, angle) {
        var radian = angle * Math.PI / 180,
        newX = x * Math.cos(radian) + y * Math.sin(radian);
        newY = -x * Math.sin(radian) + y * Math.cos(radian);
        return { x: newX, y: newY };
    }

    function GetStraightParams(x, y, angle) {
        var k = 0, b = 0, type = StraightType.Custom;
        if (Math.abs(angle) % 180 == 0) {
            type = StraightType.Horizontal;
        }
        else if (Math.abs(angle) % 180 == 90) {
            type = StraightType.Vertical;
        }
        else {
            k = -Math.tan(angle * Math.PI / 180),
            b = y - k * x;
        }
        return { k: k, b: b, type: type }
    }

    function GetCenterElementByID(elementId) {
        var elemRect = document.getElementById(elementId).getBoundingClientRect(),
            x = elemRect.left + elemRect.width / 2,
            y = elemRect.top + elemRect.height / 2;
        return { x: x, y: y };
    }
});