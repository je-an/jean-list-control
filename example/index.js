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
        for (var i = 0; i < 10000; i++) {
            listControl.add(i.toString(), "JeanListElement " + i, "DetailInfo " + i);
        }
        JeanPerformance.stopMeasurement();
     //   listControl.commit();
    });