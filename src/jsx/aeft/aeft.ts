export const getSelectedPropertyPath = () => {

    var comp = app.project.activeItem;

    function findDeepestSelectedProp() {
        var deepestProp, numDeepestProps = 0, deepestPropDepth = 0;
        for (var i = 0; i < comp.selectedProperties.length; i++) {
            var prop = comp.selectedProperties[i];
            if (prop.propertyDepth >= deepestPropDepth) {
                if (prop.propertyDepth > deepestPropDepth) numDeepestProps = 0;
                deepestProp = prop;
                numDeepestProps++;
                deepestPropDepth = prop.propertyDepth;
            }
        }
        return (numDeepestProps > 1) ? null : deepestProp;
    }

    var prop = findDeepestSelectedProp();
    if (
        prop === null
        || prop === undefined
        || prop.value === undefined
        || comp.selectedLayers.length === 0
    ) {
        alert("Please select a single property that holds a value.");
        return;
    }

    var scriptCode = "";
    var currProp = prop;
    while (currProp !== null) {
        // Check for layer property on the parent (shape layer) first
        if (currProp.propertyIndex < 1) {
            scriptCode = ".layer(\"" + currProp.name + "\")" + scriptCode;
        } else {
            // If not a shape layer, use matchName for other properties
            scriptCode = ".property(\"" + currProp.name + "\")" + scriptCode;
            // scriptCode = ".property(" + currProp.propertyIndex + ")" + scriptCode;
        }
        currProp = currProp.parentProperty;
    }

    var compID = comp.id;
    var fullPath = "app.project.itemByID(" + compID + ")" + scriptCode;
    // var fullPathWithFunction = "(function() {return app.project.itemByID(" + compID + ")" + scriptCode + "})()";
    // var val = eval(fullPath);
    // alert(val);
    return fullPath;
};