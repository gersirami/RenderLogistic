import { getActiveComp } from "./aeft-utils";

export const getSelectedAVLayers = () => {
    app.activeViewer?.setActive();
    const activeItem = app.project.activeItem;
    if (activeItem && activeItem instanceof CompItem === true && activeItem.selectedLayers.length) {
      let selectedLayers = [];
      for (let i = 0; i < activeItem.selectedLayers.length; i++) {
        let item = activeItem.selectedLayers[i];
        if (item instanceof AVLayer) {
          selectedLayers.push(item);
        }
      }
      return selectedLayers;
    }
  };

export const getSelectedPropertyPath = () => {

    const comp = getActiveComp();

    function findDeepestSelectedProp() {
        let deepestProp, numDeepestProps = 0, deepestPropDepth = 0;
        for (let i = 0; i < comp.selectedProperties.length; i++) {
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

    let prop = findDeepestSelectedProp();
    if (
        prop === null
        || prop === undefined
        || prop.value === undefined
        || comp.selectedLayers.length === 0
    ) {
        alert("Please select a single property that holds a value.");
        return;
    }

    let scriptCode = "";
    let currProp = prop;
    while (currProp !== null) {
        if (currProp.propertyIndex < 1) {
            scriptCode = ".layer(\"" + currProp.name + "\")" + scriptCode;
        } else {
            scriptCode = ".property(\"" + currProp.name + "\")" + scriptCode;
            // scriptCode = ".property(" + currProp.propertyIndex + ")" + scriptCode;
        }
        currProp = currProp.parentProperty;
    }

    const compID = comp.id;
    const fullPath = "app.project.itemByID(" + compID + ")" + scriptCode;
    // var fullPathWithFunction = "(function() {return app.project.itemByID(" + compID + ")" + scriptCode + "})()";
    // var val = eval(fullPath);
    // alert(val);
    return fullPath;
};