var MapsVector = function() {
    var e = function (e) {
        var o = {
            map: "world_en",
            backgroundColor: null,
            borderColor: "#333333",
            borderOpacity: .5,
            borderWidth: 1,
            color: "#c6c6c6",
            colors: { "pr": "#66ccff"},
            enableZoom: false,
            hoverOpacity: null,
            values: sample_data,
            normalizeFunction: "linear",
            scaleColors: ["#E8E8E8", "#C1C1C5"],
            selectedColor: "#b6ce9a",
            selectedRegion: null,
            showTooltip: false,
            showLabels: false,
            onRegionOver: function (e, o) {
                //"pr" == o && e.preventDefault()
            },
            onRegionClick: function(e, o, r) {
                var a = 'You clicked "' + r + '" which has the code: ' + o.toUpperCase();
                //alert(a)
            }//,
            //pins: { "pr": "\u003cdiv style=\"font-size: 2vh;color:red;\"  \u003e25,355%\u003cdiv/\u003e", "sc": "\u003cdiv style=\"font-size: 2vh;color:red;\"  \u003e25,355%\u003cdiv/\u003e", "am": "\u003cdiv style=\"font-size: 2vh;color:red;\"  \u003e25,355%\u003cdiv/\u003e", "ac": "\u003cdiv style=\"font-size: 2vh;color:red;\"  \u003e25,355%\u003cdiv/\u003e", "se": "\u003cdiv style=\"font-size: 2vh;color:red;\"  \u003e25,355%\u003cdiv/\u003e", "rs": "\u003cdiv style=\"font-size: 2vh;color:red;margin-top: -20px;margin-left: -30px;\"  \u003e25,355%\u003cdiv/\u003e", "al": "\u003cdiv style=\"font-size: 2vh;color:red;margin-top: -20px;margin-left: -30px;\"  \u003e25,355%\u003cdiv/\u003e" },
            //pinMode: 'content'
        };
        o.map = e + "_br";
        var r = jQuery("#vmap_" + e);
        r && (r.width(r.parent().width()), r.vectorMap(o))
    };
    return {
        init: function() {
            e("brazil"), App.addResizeHandler(function() {
                e("brazil")
            })
        }
    }
}();
jQuery(document).ready(function() {
    MapsVector.init()
});