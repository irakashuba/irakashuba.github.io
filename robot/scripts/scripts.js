(function () {
    //adding listener and function for MouseMove event
    document.addEventListener("mousemove", function (event) {
        moveIris(event, leftIris, width);
        moveIris(event, document.getElementById('right-iris'), width);
    });
    //adding listener to TouchMove event
    document.addEventListener("touchmove", trackTouch);

    //declaring variables
    var triggered = false;
    var onEnterRobotClass = 'triggered', onLeaveRobotClass = 'relaxed', onEnterBgColor = "#D50000", onLeaveBgColor = "#607D8B";
    var leftIris = document.getElementById('left-iris');
    var leftEye = leftIris.parentElement;
    var width = (leftEye.parentElement.offsetWidth - leftEye.offsetWidth) / 2;
    var head = document.getElementById('robot-head');
    
    //adding listener and function for MouseEnter event
    head.addEventListener("mouseenter", function (event) {
        changeRobotState(event.target, onLeaveRobotClass, onEnterRobotClass, onEnterBgColor);
    });
    
    //adding listener and function for MouseLeave event
    head.addEventListener("mouseleave", function (event) {
        changeRobotState(event.target, onEnterRobotClass, onLeaveRobotClass, onLeaveBgColor);
    });

    addTeeth(document.getElementById('robot-mouth'), 2, 5);
    //function for adding a teeth table
    function addTeeth(obj, rows, columns) {
        var teeth = "<table class=\"teeth\">";

        for (var i = 0; i < rows; i++) {
            teeth += "<tr>";
            for (var j = 0; j < columns; j++)
                teeth += "<td></td>";
            teeth += "</tr>";
        }

        obj.innerHTML = teeth + "</table>";
    }

    //function for tracking touches positions
    function trackTouch(event) {
        var touched = false;
        var clientRect = head.getBoundingClientRect();
        
        for (var i = 0; i < event.touches.length; i++)
        {
            if (isTouchInside(event.touches[i], clientRect))
            {
                touched = true;
                break;
            }
        }

        if (touched && !triggered)
        {
            triggered = true;
            changeRobotState(head, onLeaveRobotClass, onEnterRobotClass, onEnterBgColor);
        }
        else if (!touched && triggered)
        {
            triggered = false;
            changeRobotState(head, onEnterRobotClass, onLeaveRobotClass, onEnterBgColor);
        }

        switch (event.touches.length) {
            case 1:
                moveIris(event.touches[0], leftIris, width);
                moveIris(event.touches[0], document.getElementById('right-iris'), width);
                break;
            default:
                moveIris(event.touches[0], leftIris, width);
                moveIris(event.touches[1], document.getElementById('right-iris'), width);
        }
        event.preventDefault();
    }

    //functing for checking if touch is insinde of a ClientRect of an object
    function isTouchInside(touch, clientRect)
    {
        if (touch.pageX < clientRect.left || touch.pageX > clientRect.right)
            return false;
        else if (touch.pageY < clientRect.top || touch.pageY > clientRect.bottom)
            return false;

        return true;
    }

    //function for changing the state of a robot
    function changeRobotState(obj, oldClass, newClass, bgColor)
    {
        obj.classList.remove(oldClass);
        obj.classList.add(newClass);
        obj.style.backgroundColor = bgColor;
    }

    //function for moving irises
    function moveIris(obj, iris, width) {
        var eyeArea = iris.parentElement.getBoundingClientRect();
        var irisArea = iris.getBoundingClientRect();

        var height = (width * eyeArea.height) / eyeArea.width;
        var center = {
            x: eyeArea.left + (eyeArea.width / 2),
            y: eyeArea.top + (eyeArea.height / 2)
        };

        var multiplier = (width + width) / (eyeArea.width - irisArea.width);

        if (obj.pageX <= center.x - width)
            iris.style.left = "0px";
        else if (obj.pageX >= center.x + width)
            iris.style.left = (eyeArea.width - irisArea.width) + "px";
        else
            iris.style.left = Math.floor((obj.pageX - (center.x - width)) / multiplier) + "px";

        if (obj.pageY <= center.y - height)
            iris.style.top = "0px";
        else if (obj.pageY >= center.y + height)
            iris.style.top = (eyeArea.height - irisArea.height) + "px";
        else
            iris.style.top = Math.floor((obj.pageY - (center.y - height)) / multiplier) + "px";
    }
})();
