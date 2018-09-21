require([
    "JeanPerformance",
    "ListControl",
    "css!bootstrap"
], function (
    JeanPerformance,
    ListControl
) {
        var listControl = new ListControl({ height: 500 });
        document.body.style.padding = "5px";
        document.body.appendChild(listControl.element);
        JeanPerformance.startMeasurement();
        for (var i = 0; i < 50000; i++) {
            listControl.set("JeanListElement " + i, "DetailInfo " + i);
        }
        JeanPerformance.stopMeasurement();
        listControl.commit();
    });