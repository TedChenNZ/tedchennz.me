var currentPage;

function ajaxLinks() {
    $("a").unbind("click");
    $("a").click(function(e) {
        var exclude = ["http://", "https://"];
        var href = $(this).attr("href");
        if ($.inArray(href, exclude) == -1) {
            e.preventDefault();
            changeHash(href);
        }
    });
}

function changeHash(href) {
    document.location.hash = href;
    
    $("#ajax-loader").fadeIn(250);
    if (currentPage == href) {
        ajaxLoad(href);
    }
    
    currentPage = href;
}

function checkHash() {
    if(window.location.hash) {
        currentPage = window.location.hash.substring(1);
        ajaxLoad(currentPage);
    }
}

function ajaxLoad(href) {
    $.ajax({
        url: href,
        context: document.body
    }).done(function(data) {
        var main_old = $("main");
        $("body").append("<main></main>");
        var main_new = $($("main")[1]);
        main_new.hide();
        main_new.append(data);

        $("#ajax-loader").fadeOut(500);
        main_old.fadeOut(500, function() {
            $(this).remove();
        });
        main_new.fadeIn(500);

    });
}

