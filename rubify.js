var POSITION = 0;
var TONE = 1;

function rubify(sourceText, annotations, splitStByChar, splitABySpace, spaced, superscripted, colorCodes) {
    var output = [];

    if (!sourceText) {
        return output;
    }
    if (!annotations) {
        output.push(sourceText);
        return output;
    }

    var sources;
    var guides;

    if (splitStByChar)
        sources = sourceText;
    else
        sources = sourceText.split(" ");
    if (splitABySpace)
        guides = annotations.split(" ");
    else
        guides = annotations;

    for (var i = 0; i < sources.length; ++i) {
        if (guides[i] != null) {
            output.push(getRubyCharacter(sources[i], guides[i], superscripted, colorCodes));
            if (spaced)
                output.push(" ");
        }
        else {
            output.push(sources[i]);
        }
    }

    return output;
}

function getRubyCharacter(word, guide, superscripted=false, colorCodes=null) {
    var output = "<ruby"
    var newWord;
    var newGuide;

    if (superscripted || colorCodes)
        var tones = extractToneNumbers(guide);

    if (superscripted) {
        newGuide = "";
        cursor = 0;

        for (var i = 0; i < tones.length; ++i) {
            newGuide += guide.substring(cursor, tones[i][POSITION]) + "<sup>" + tones[i][TONE] + "</sup>";
            cursor = tones[i][POSITION] + 1;
        }
    }
    else {
        newGuide = guide;
    }

    if (colorCodes) {
        var colors = (tones.map(function (row) { return row[TONE]; })).map(function (tone) { return colorCodes[tone]; });
        newWord = "";

        for (var i = 0; i < colors.length; ++i)
            newWord += "<span style=\"color: " + colors[i] + ";\">" + word[i] + "</span>";
    }
    else {
        newWord = word;
    }

    output += ">" + newWord + "<rt>" + newGuide + "</rt></ruby>";
    return output;
}

function extractToneNumbers(guide) {
    var tones = [];

    for (var p = 0; p < guide.length; ++p) {
        var t = guide[p];

        if (t >= '0' && t <= '9')
            tones.push([p, t]);
    }

    return tones;
}
