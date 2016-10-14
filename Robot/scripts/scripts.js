addEventListener("mousemove", trackMouse, false);

function trackMouse(event)
{
    var leftIris = document.getElementById('left-iris');
    var leftEye = leftIris.parentElement;
    var width = (leftEye.parentElement.offsetWidth - leftEye.offsetWidth) / 2;
    
    moveIris(document.getElementById('left-iris'), width);
    moveIris(document.getElementById('right-iris'), width);
}

function moveIris(iris, width)
{
    var eyeArea = iris.parentElement.getBoundingClientRect();
    var irisArea = iris.getBoundingClientRect();

    var height = (width * eyeArea.height) / eyeArea.width;
    var center = {
        x: eyeArea.left + (eyeArea.width / 2),
        y: eyeArea.top + (eyeArea.height / 2)
    };
    
    var multiplier = (width + width) / (eyeArea.width - irisArea.width);

    if (event.pageX <= center.x - width)
        iris.style.left = "0px";
    else if (event.pageX >= center.x + width)
        iris.style.left = (eyeArea.width - irisArea.width) + "px";
    else
        iris.style.left = Math.floor((event.pageX - (center.x - width)) / multiplier) + "px";

    if (event.pageY <= center.y - height)
        iris.style.top = "0px";
    else if (event.pageY >= center.y + height)
        iris.style.top = (eyeArea.height - irisArea.height) + "px";
    else
        iris.style.top = Math.floor((event.pageY - (center.y - height)) / multiplier) + "px";
}