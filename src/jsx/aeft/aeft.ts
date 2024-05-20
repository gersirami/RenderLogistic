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

export const getActiveOrSelectedCompItemIds = (): number[] | null => {
    let selectedCompIds: number[] = [];
    const activeComp = app.project.activeItem;
    const selection = app.project.selection;
    // If no compositions are selected, use the active composition
    if (activeComp instanceof CompItem) {
        selectedCompIds.push(activeComp.id);
    } else if (activeComp === null && selection.length > 0) {
        for (var i = 0; i < selection.length; i++) {
            let comp = selection[i];
            if (comp instanceof CompItem) {
                selectedCompIds.push(comp.id);
            }
        }
    } else {
        return null;
    }
    return selectedCompIds;
}

export const getSelectedPropertyPath = (): string | null => {
    // Get the active composition
    const activeComp = app.project.activeItem as CompItem;
    if (!(activeComp instanceof CompItem)) {
        alert("Please select a composition.");
        return null;
    }
    // Get the selected layer
    let selectedLayers = activeComp.selectedLayers;
    if (selectedLayers.length !== 1) {
        alert("Please select a single layer.");
        return null;
    }
    let selectedLayer = selectedLayers[0];
    // Get the selected property
    let selectedProperties = selectedLayer.selectedProperties;

    if (selectedProperties.length !== 1) {
        alert("Please select a single property.");
        return null;
    }
    let selectedProperty = selectedProperties[0];
    // Construct the property path
    const propertyPath = getPropertyPath(selectedProperty);
    const fullPath = `app.project.itemByID(${activeComp.id})${propertyPath}`;
    // const fullPathWithFunction = `(function() {return ${fullPath}})()`;
    // const val = eval(fullPathWithFunction).value;
    return fullPath;
}

export const getPropertyPath = (property: PropertyBase) => {
    var path = `.property("${property.name}")`;
    var parentProperty = property.parentProperty;

    while (parentProperty) {
        if (parentProperty.propertyIndex < 1) {
            path = ".layer(\"" + parentProperty.name + "\")" + path;
        } else {
            path = ".property(\"" + parentProperty.name + "\")" + path;
            // path = ".property(\"" + parentProperty.propertyIndex + "\")" + path;
        }
        parentProperty = parentProperty.parentProperty;
    }
    return path;
}