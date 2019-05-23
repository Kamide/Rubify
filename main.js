var rubies = [];

function initialize() {
    baseText = document.getElementById('baseText');
    annotation = document.getElementById('annotation');
    baseTextDelimiter = document.getElementById('baseTextDelimiter');
    annotationDelimiter = document.getElementById('annotationDelimiter');

    segmented = document.getElementById('segmented');
    spaced = document.getElementById('spaced');
    superscripted = document.getElementById('superscripted');
    colored = document.getElementById('colored');

    editor = document.getElementById('editor');
    viewer = document.getElementById('viewer');
}

function addRubyToEditor() {
    if (baseText === '')
        return;

    var texts = baseText.value.split('\n');
    var notes = annotation.value.split('\n');

    for (var i = 0; i < texts.length; ++i) {
        var delimiters = {
            'text': baseTextDelimiter.options[baseTextDelimiter.selectedIndex].value,
            'note': annotationDelimiter.options[annotationDelimiter.selectedIndex].value
        };
        var text = texts[i];
        if (text === '')
            continue;
        var note = notes[i] ? notes[i] : '';
        rubies.push(new Annotation(text, note, delimiters,
            segmented.checked, spaced.checked, superscripted.checked, colored.checked));
    }

    display();
}

function clearEditor() {
    rubies = []
    removeChildren(editor);
    viewer.value = '';
}

function removeChildren(parent) {
    while (parent.lastChild)
        parent.removeChild(parent.lastChild);
}

function display() {
    editor.innerHTML = viewer.value = rubies.join('');
}
