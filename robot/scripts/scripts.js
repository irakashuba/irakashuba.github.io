(function () {
    document.addEventListener("mousemove", trackMouse);
    document.addEventListener("touchmove", trackTouch);

    var leftIris = document.getElementById('left-iris');
    var leftEye = leftIris.parentElement;
    var width = (leftEye.parentElement.offsetWidth - leftEye.offsetWidth) / 2;

    function trackMouse(event) {
        moveIris(event, leftIris, width);
        moveIris(event, document.getElementById('right-iris'), width);
    }

    function trackTouch(event) {
        switch (event.touches.length) {
            case 1:
                moveIris(event.touches[0], leftIris, width);
                moveIris(event.touches[0], document.getElementById('right-iris'), width);
                break;
            default:
                moveIris(event.touches[0], leftIris, width);
                moveIris(event.touches[1], document.getElementById('right-iris'), width);
        }
    }

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
