
(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";
    
    var CLS = "indentguide-";
    
    CodeMirror.defineOption("showIndentGuides", false, function(cm, val, prev) {
        if (prev == CodeMirror.Init) {
            prev = false;
        }
        if (prev && !val) {
            clearGuides(cm);
        } else if (!prev && val) {
            setGuides(cm, val);
        }
    });

    function clearGuides(cm) {
        cm.removeOverlay("indentguides");
    }

    function setGuides(cm, val) {
        var cls = CLS;
        if (typeof val == 'string')
            cls += val + "-";
        
        cm.addOverlay({
            token: function(stream) {
                var spaces = stream.string.match(/^\s*/)[0].length;
                if (stream.pos % 2 == 0 && stream.pos + 1 < spaces) {
                    var indentLevel = Math.min(stream.pos / 2, 3);
                    stream.pos++;
                    return cls + indentLevel;
                } else if (stream.pos % 2 != 0) {
                    stream.pos++;
                    return cls + "separator";
                } else {
                    stream.pos = stream.string.length;
                    return null;
                }
            },
            name: "indentguides"
        });
    }

});
