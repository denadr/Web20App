// HAMBURGLERv2

function togglescroll () {
  $('body').on('touchstart', function(e){
    if ($('body').hasClass('noscroll')) {
      e.preventDefault();
    }
  });
}

$(document).ready(function () {
    togglescroll()
    $(".supplier_spotify").click(function () {
        $(".widgets_spotify").fadeToggle(500);
        $(".spotify_result_button").toggleClass("spotify-animate");
        $("body").toggleClass("noscroll");
    });
    
    $(".supplier_soundcloud").click(function () {
        $(".widgets_soundcloud").fadeToggle(500);
        $(".spotify_result_button").toggleClass("soundcloud-animate");
        $("body").toggleClass("noscroll");
    });
    
    $(".supplier_deezer").click(function () {
        $(".widgets_deezer").fadeToggle(500);
        $(".spotify_result_button").toggleClass("deezer-animate");
        $("body").toggleClass("noscroll");
    });
});

//$(document).ready(function () {
//    togglescroll()
//    $(".supplier_soundcloud").click(function () {
//        $(".widgets_soundcloud").fadeToggle(500);
//        $(".spotify_result_button").toggleClass("soundcloud-animate");
//        $("body").toggleClass("noscroll");
//    });
//});
//
//$(document).ready(function () {
//    togglescroll()
//    $(".supplier_deezer").click(function () {
//        $(".widgets_deezer").fadeToggle(500);
//        $(".spotify_result_button").toggleClass("deezer-animate");
//        $("body").toggleClass("noscroll");
//    });
//});

// PUSH ESC KEY TO EXIT

$(document).keydown(function(e) {
    if (e.keyCode == 27) {
        $(".widgets_spotify").fadeOut(500);
        $(".spotify_result_button").removeClass("spotify-animate");
        $(".widgets_soundcloud").fadeOut(500);
        $(".soundcloud_result_button").removeClass("soundcloud-animate");
        $(".widgets_deezer").fadeOut(500);
        $(".deezer_result_button").removeClass("deezer-animate");
        $("body").removeClass("noscroll");
    }
});

//$(document).keydown(function(e) {
//    if (e.keyCode == 27) {
//        $(".widgets_soundcloud").fadeOut(500);
//        $(".soundcloud_result_button").removeClass("soundcloud-animate");
//        $("body").removeClass("noscroll");
//    }
//});
//
//$(document).keydown(function(e) {
//    if (e.keyCode == 27) {
//        $(".widgets_deezer").fadeOut(500);
//        $(".deezer_result_button").removeClass("deezer-animate");
//        $("body").removeClass("noscroll");
//    }
//});