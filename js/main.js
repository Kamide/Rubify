class AnnotationEditor {
    constructor(baseText, annotation, baseTextDelimiter, annotationDelimiter,
                segmented, spaced, superscripted, colored,
                editor, viewer,
                applyBtn, cancelBtn, deleteBtn) {
        this.rubies = [];
        this.cursor = -1;

        this.baseText = document.getElementById(baseText);
        this.annotation = document.getElementById(annotation);
        this.baseTextDelimiter = document.getElementById(baseTextDelimiter);
        this.annotationDelimiter = document.getElementById(annotationDelimiter);

        this.segmented = document.getElementById(segmented);
        this.spaced = document.getElementById(spaced);
        this.superscripted = document.getElementById(superscripted);
        this.colored = document.getElementById(colored);

        this.editor = document.getElementById(editor);
        this.viewer = document.getElementById(viewer);

        this.cancelBtn = document.getElementById(cancelBtn);
        this.applyBtn = document.getElementById(applyBtn);
        this.deleteBtn = document.getElementById(deleteBtn);
    }

    addRuby() {
        if (this.baseText.value === '') {
            return;
        }

        var texts = this.baseText.value.split('\n');
        var notes = this.annotation.value.split('\n');

        for (var i = 0; i < texts.length; ++i) {
            var text = texts[i];
            if (text === '') {
                continue;
            }
            var note = notes[i] ? notes[i] : '';
            var delimiters = {
                'text': this.baseTextDelimiter.options[this.baseTextDelimiter.selectedIndex].value,
                'note': this.annotationDelimiter.options[this.annotationDelimiter.selectedIndex].value
            };

            this.rubies.push(new Annotation(text, note, delimiters,
                this.segmented.checked, this.spaced.checked,
                this.superscripted.checked, this.colored.checked));
        }

        this.resetCursor();
        this.display();
    }

    editRuby() {
        var ruby = this.rubies[this.cursor];

        ruby.text = this.baseText.value;
        ruby.note = this.annotation.value;
        ruby.textDelimiter = this.baseTextDelimiter.value;
        ruby.noteDelimiter = this.annotationDelimiter.value;

        ruby.segmented = this.segmented.checked;
        ruby.spaced = this.spaced.checked;
        ruby.superscripted = this.superscripted.checked;
        ruby.colored = this.colored.checked;

        this.resetCursor();
        this.display();
    }

    deleteRuby() {
        this.rubies.splice(this.cursor, 1);
        this.resetCursor();
        this.display();
    }

    display() {
        var viewerValue = '';
        var that = this;

        this.removeChildren(this.editor);

        for (let i = 0; i < this.rubies.length; ++i) {
            var newRubyBlock = document.createElement('span');
            newRubyBlock.className = 'ruby-block';
            newRubyBlock.id = newRubyBlock.className + '-' + i;
            viewerValue += newRubyBlock.innerHTML = this.rubies[i];
            newRubyBlock.onclick = function() { that.setCursor(i); };
            this.editor.appendChild(newRubyBlock);
        }

        this.viewer.value = viewerValue;
    }

    setCursor(position) {
        var previous = this.cursor;
        this.cursor = position;

        if (previous > -1) {
            if (previous === this.cursor) {
                return;
            }
            document.getElementById('ruby-block-' + previous).classList.remove('active');
        }
        if (this.cursor === -1) {
            this.toggleBtn(false);
            return;
        }

        var rubyBlock = document.getElementById('ruby-block-' + this.cursor);
        rubyBlock.classList.add('active');

        this.updateForm(this.rubies[this.cursor]);
        this.toggleBtn(true);
    }

    resetCursor() {
        this.setCursor(-1);
    }

    updateForm(ruby) {
        this.baseText.value = ruby.text;
        this.annotation.value = ruby.note;
        this.baseTextDelimiter.value = ruby.textDelimiter;
        this.annotationDelimiter.value = ruby.noteDelimiter;

        this.segmented.checked = ruby.segmented;
        this.spaced.checked = ruby.spaced;
        this.superscripted.checked = ruby.superscripted;
        this.colored.checked = ruby.colored;
    }

    clearOutput() {
        this.rubies = [];
        this.resetCursor();
        this.removeChildren(this.editor);
        viewer.value = '';
    }

    clearInputs() {
        this.baseText.value = this.annotation.value = '';
    }

    resetForm() {
        this.clearInputs();

        this.baseTextDelimiter.value = '';
        this.annotationDelimiter.value = ' '

        this.segmented.checked = true;
        this.spaced.checked = false;
        this.superscripted.checked = false;
        this.colored.checked = false;
    }

    toggleBtn(on) {
        if (on) {
            this.cancelBtn.style.display = 'inline-block';
            this.applyBtn.style.display = 'inline-block';
            this.deleteBtn.style.display = 'inline-block';
        }
        else {
            this.cancelBtn.style.display = 'none';
            this.applyBtn.style.display = 'none';
            this.deleteBtn.style.display = 'none';
        }
    }

    removeChildren(parent) {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    }
}
