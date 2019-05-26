const RUBY_L = '<ruby>', RUBY_R = '</ruby>',
      RB_L = '<rb>', RB_R = '</rb>',
      RT_L = '<rt>', RT_R = '</rt>',
      SUP_L = '<sup>', SUP_R = '</sup>',
      SPACE = ' ';

const COLORS = ['black', 'lightskyblue', 'orange', 'royalblue', 'darkseagreen', 'crimson', 'midnightblue',
                'lightskyblue', 'royalblue', 'midnightblue'];

class Annotation {
    constructor(text, note, delimiters, segmented, spaced, superscripted, colored) {
        this.text = text;
        this.note = note;
        this.delimiters = delimiters;
        this.segmented = segmented;
        this.spaced = spaced;
        this.superscripted = superscripted;
        this.colored = colored;
    }

    get textDelimiter() { return this.delimiters['text']; }
    get noteDelimiter() { return this.delimiters['note']; }

    get texts() { return this.text.split(this.textDelimiter); }
    get notes() { return this.note.split(this.noteDelimiter); }

    set textDelimiter(td) { this.delimiters['text'] = td; }
    set noteDelimiter(nd) { this.delimiters['note'] = nd; }

    rubify(text, note) {
        if (this.superscripted || this.colored) {
            var phonemesTonemes = note.split(/(\d)/);
        }

        if (this.superscripted) {
            var newNote = '';
            for (var i = 0; i < phonemesTonemes.length; ++i) {
                if (Annotation.isToneNumber(phonemesTonemes[i])) {
                    newNote += SUP_L + phonemesTonemes[i] + SUP_R;
                }
                else {
                    newNote += phonemesTonemes[i];
                }
            }
        }
        else {
            var newNote = note;
        }

        var tonemes;
        var lastTone;
        var tonal = false;
        if (this.colored) {
            tonemes = phonemesTonemes.filter(Number);
            lastTone = tonemes[tonemes.length - 1];
            if (Annotation.isToneNumber(lastTone)) {
                tonal = true;
            }
        }

        if (tonal) {
            var rbl = '<rb style="color: ' + COLORS[lastTone] + ';">';
            var rtl = '<rt style="color: ' + COLORS[lastTone] + ';">';
        }
        else {
            var rbl = RB_L;
            var rtl = RT_L;
        }

        return rbl + text + RB_R + rtl + newNote + RT_R;
    }

    toString() {
        if (this.note === '') {
            if (this.spaced) {
                return this.text + SPACE;
            }
            else {
                return this.text;
            }
        }

        var rubies = '';
        var texts = this.texts;
        var notes = this.notes;
        var count = Math.min(texts.length, notes.length);

        if (this.segmented) {
            for (var i = 0; i < count; ++i) {
                rubies += RUBY_L + this.rubify(texts[i], notes[i]) + RUBY_R;
                if (this.spaced) {
                    rubies += SPACE;
                }
            }
        }
        else {
            for (var i = 0; i < count; ++i) {
                rubies += this.rubify(texts[i], notes[i])
                if (this.spaced && i < count - 1) {
                    rubies += SPACE;
                }
            }
            rubies = RUBY_L + rubies + RUBY_R;
            if (this.spaced) {
                rubies += SPACE;
            }
        }

        return rubies;
    }

    static isToneNumber(x) {
        return x >= '0' && x <= '9';
    }
}
