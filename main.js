var rubies = [];

var defaultColors = ["black", "lightskyblue", "orange", "royalblue", "darkseagreen", "crimson", "midnightblue"];

function initialize() {
    sourceText = document.getElementById("sourceText");
    annotations = document.getElementById("annotations");
    editor = document.getElementById("editor");
    viewer = document.getElementById("viewer");
    stByChar = document.getElementById("stByChar");
    aBySpace = document.getElementById("aBySpace");
    spaced = document.getElementById("spaced");
    superscripted = document.getElementById("superscripted");
    colorCoded = document.getElementById("colorCoded");
}

function addRubyToEditor() {
    var stLines = sourceText.value.split("\n");
    var aLines = annotations.value.split("\n");

    for (var i = 0; i < stLines.length; ++i) {
        var newRubies = rubify(stLines[i], aLines[i], stByChar.checked, aBySpace.checked, spaced.checked, superscripted.checked, colorCoded.checked ? defaultColors : null);
        rubies = [...rubies, ...newRubies];
    }

    display();
}

function clearEditor() {
    rubies = []
    removeChildren(editor);
    viewer.value = "";
}

function removeChildren(parent) {
    while (parent.lastChild)
        parent.removeChild(parent.lastChild);
}

function display() {
    editor.innerHTML = rubies.join("");
    viewer.value = rubies.join("");
}
