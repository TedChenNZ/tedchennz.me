var currentPage;

function ajaxLinks() {
    $("a").unbind("click");
    $("a").click(function(e) {
        var exclude = ["http://", "https://", "#"];
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

// Hamburger menu show/hide
function miniMenu() {
    var nav = $("nav ul");

    $(".menu-icon").click(function(e) {
        e.preventDefault();
        if (nav.hasClass("active")) {
            nav.animate({
                "margin-left": "-151px"
            });

        } else {
            nav.animate({
                "margin-left": "0px"
            });
        }
        $("header").toggleClass("sticky");
        nav.toggleClass("active");
    });

    $(window).on("resize", function() {
        if (window.innerWidth >= 600) {
            nav.css("margin-left", "");
            nav.removeClass("active");
            var position = $(window).scrollTop();
            if (position == 0 && $("header").hasClass("sticky")) {
                $("header").removeClass("sticky");
            }
        }
    });
}

// Show/hide header depending on scroll direction
function scrollHeader() {
    var position = $(window).scrollTop();
    var header = $("header");

    $(window).on("scroll", function() {
        var scroll = $(window).scrollTop();
        header.removeClass();
        if (scroll == 0) {

        } else if (scroll > position) {
            // Scrolling down
            header.addClass("hidden")
        } else {
            header.addClass("sticky");
        }

        position = scroll;
    });
}

// Adapted from http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
function pixelStorm(){
    //canvas init
    var canvas = document.getElementById("pixel-storm");
    var ctx = canvas.getContext("2d");
    
    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Random Colour function
    function randomColour() {
        return "rgba(" + Math.round(Math.random()*255).toString() + ", " + Math.round(Math.random()*255).toString() + ", " + Math.round(Math.random()*255).toString() + ", 0.8)";
    }
    

    //snowflake particles
    var mp = 100; //max particles
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*W, //x-coordinate
            y: Math.random()*H, //y-coordinate
            r: Math.random()*3+1, //radius
            d: Math.random()*mp, //density
            rgba: randomColour() //color
        })
    }
    
    //Lets draw the flakes
    function draw()
    {
        ctx.clearRect(0, 0, W, H);
        
        for(var i = 0; i < mp; i++)
        {
            
            var p = particles[i];
            ctx.fillStyle = p.rgba;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            // ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);

            // ctx.fill();
            ctx.fillRect(p.x, p.y, p.r, p.r);
        }
        update();
    }
    
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update()
    {
        angle += 0.01;
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += 2*(Math.cos(angle+p.d) + 1 + p.r/2);
            p.x += Math.sin(angle)*2;
            
            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if(p.x > W+5*Math.random() || p.x < -5*Math.random() || p.y > H)
            {
                if(i%9 > 0)
                {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d, rgba: randomColour()};
                }
                else
                {
                    //If the flake is exitting from the right
                    if(Math.sin(angle) > 0)
                    {
                        //Enter from the left
                        particles[i] = {x: -5*Math.random()*p.r, y: Math.random()*H, r: p.r, d: p.d, rgba: randomColour()};
                    }
                    else
                    {
                        //Enter from the right
                        particles[i] = {x: W+5*Math.random()*p.r, y: Math.random()*H, r: p.r, d: p.d, rgba: randomColour()};
                    }
                }
            }
        }
    }
    
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    //animation loop
    setInterval(draw, 33);

    // Resize canvas on browser resize
    $(window).on("resize", function() {
        var parent = $("#pixel-storm").parent();
        // W = canvas.clientWidth;
        // H = canvas.clientHeight;
        W = parent.width();
        H = parent.height();
        canvas.width = W;
        canvas.height = H;


        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
    });
}