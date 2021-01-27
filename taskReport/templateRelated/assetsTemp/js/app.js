var APP = function() {
    this.ASSETS_PATH = "./assets/"
};
(APP = new APP).UI = {
    scrollTop: 0
}, $(window).on("load", function() {
    setTimeout(function() {
        $(".preloader-backdrop").fadeOut(200), $("body").addClass("has-animation")
    }, 0)
}), $(function() {
    function e(o) {
        27 == o.which && ($("body").removeClass("fullscreen-mode"), $(".ibox-fullscreen").removeClass("ibox-fullscreen"), $(window).off("keydown", e))
    }

    function o() {
        $("body").removeClass("has-backdrop"), $(".shined").removeClass("shined")
    }
    $(window).scroll(function() {
        $(this).scrollTop() > APP.UI.scrollTop ? $(".to-top").fadeIn() : $(".to-top").fadeOut()
    }), $(".to-top").click(function(e) {
        $("html, body").animate({
            scrollTop: 0
        }, 500)
    }), $(".quick-sidebar-toggler").click(function() {
        $(".quick-sidebar").backdrop()
    }), $('.chat-list [data-toggle="show-chat"]').click(function() {
        $(this).parents(".chat-panel").addClass("opened")
    }), $(".messenger-return").click(function() {
        $(this).parents(".chat-panel").removeClass("opened")
    }), $(".log-tabs a").click(function() {
        $(this).addClass("active").siblings().removeClass("active"), "all" == $(this).attr("data-type") ? $(".logs-list li").show() : $(".logs-list li").hide().filter('[data-type="' + $(this).attr("data-type") + '"]').show()
    }), $(".theme-config-toggle").on("click", function() {
        $(this).parents(".theme-config").backdrop()
    }), $(".js-search-toggler").click(function() {
        $(".search-top-bar").backdrop().find(".search-input").focus()
    }), $(".input-search-close").click(function() {
        o()
    }), $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover(), $(".scroller").each(function() {
        $(this).slimScroll({
            height: $(this).attr("data-height") || "100%",
            color: $(this).attr("data-color") || "#71808f",
            railOpacity: "0.9",
            size: "4px"
        })
    }), $(".slimScrollBar").hide(), $(".ibox-collapse").click(function() {
        $(this).closest("div.ibox").toggleClass("collapsed-mode").children(".ibox-body").slideToggle(200)
    }), $(".ibox-remove").click(function() {
        $(this).closest("div.ibox").remove()
    }), $(".fullscreen-link").click(function() {
        $("body").hasClass("fullscreen-mode") ? ($("body").removeClass("fullscreen-mode"), $(this).closest("div.ibox").removeClass("ibox-fullscreen"), $(window).off("keydown", e)) : ($("body").addClass("fullscreen-mode"), $(this).closest("div.ibox").addClass("ibox-fullscreen"), $(window).on("keydown", e))
    }), $.fn.backdrop = function() {
        return $(this).toggleClass("shined"), $("body").toggleClass("has-backdrop"), $(this)
    }, $(".backdrop").click(o);
    var t;
    ! function() {
        function e() {
            $(document).idleTimer("destroy"), t && clearTimeout(t), $("#session-dialog").modal("hide"), $(".timeout-toggler").removeClass("active"), $("#timeout-reset-box").hide(), $("#timeout-activate-box").show()
        }
        $("#timeout-activate").click(function() {
            +$("#timeout-count").val() && function(o) {
                $("#session-dialog").modal("hide"), $("#timeout-reset-box").show(), $("#timeout-activate-box").hide(), $(document).idleTimer(6e4 * o), setTimeout(function() {
                    $(".timeout-toggler").addClass("active")
                }, 6e4 * (o - 1)), $(document).on("idle.idleTimer", function(o, i, s) {
                    toastr.warning("Your session is about to expire. The page will redirect after 15 seconds with no activity.", "Session Timeout Notification", {
                        progressBar: !0,
                        timeOut: 5e3
                    }), t = setTimeout(function() {
                        e(), alert("Your session has expired. You can redirect this page or logout.")
                    }, 5e3)
                }), $(document).on("active.idleTimer", function(e, o, i, s) {
                    clearTimeout(t), $(document).idleTimer("reset"), toastr.clear(), toastr.success("You returned to the active mode.", "You are back.")
                })
            }(+$("#timeout-count").val())
        }), $("#timeout-reset").click(function() {
            e()
        })
    }(), $(".clipboard-copy").length > 0 && new Clipboard(".clipboard-copy", {
        target: function(e) {
            return e.nextElementSibling
        }
    }).on("success", function(e) {
        e.clearSelection(), e.trigger.textContent = "Copied", window.setTimeout(function() {
            e.trigger.textContent = "Copy"
        }, 2e3)
    }), $("[data-action='print']").click(function() {
        var e = $(this).attr("data-target");
        $(e).length && $(e).printMe({
            path: ["assets/vendors/bootstrap/dist/css/bootstrap.min.css", "assets/css/main.css"]
        })
    })
}), $(window).on("load resize scroll", function() {
    $(this).width() < 992 && !$("body").hasClass("sidebar-mini") && ($("body").addClass("drawer-sidebar"), $("#sidebar-collapse").slimScroll({
        height: "100%",
        railOpacity: "0.9"
    }))
}), $(function() {
    $(".metismenu").metisMenu(), $(".js-sidebar-toggler").click(function() {
        $("body").hasClass("drawer-sidebar") ? $("#sidebar").backdrop() : ($("body").toggleClass("sidebar-mini"), $("body").hasClass("sidebar-mini") || ($("#sidebar-collapse").hide(), setTimeout(function() {
            $("#sidebar-collapse").fadeIn(300)
        }, 200)))
    }), $("#_fixedlayout").change(function() {
        $(this).is(":checked") ? ($("body").addClass("fixed-layout"), $("#sidebar-collapse").slimScroll({
            height: "100%",
            railOpacity: "0.9"
        })) : ($("#sidebar-collapse").slimScroll({
            destroy: !0
        }).css({
            overflow: "visible",
            height: "auto"
        }), $("body").removeClass("fixed-layout"))
    }), $("#_drawerSidebar").change(function() {
        $("body").removeClass("sidebar-mini"), $(this).is(":checked") ? ($("body").addClass("drawer-sidebar"), $("#sidebar-collapse").slimScroll({
            height: "100%",
            railOpacity: "0.9"
        })) : ($("#sidebar-collapse").slimScroll({
            destroy: !0
        }).css({
            overflow: "visible",
            height: "auto"
        }), $("body").removeClass("drawer-sidebar"))
    }), $("#_fixedNavbar").change(function() {
        $(this).is(":checked") ? $("body").addClass("fixed-navbar") : $("body").removeClass("fixed-navbar")
    }), $("[name='layout-style']").change(function() {
        +$(this).val() ? $("body").addClass("boxed-layout") : $("body").removeClass("boxed-layout")
    })
});