var isInit = true;
var category = new Vue({
    el: '#product-category-box',
    data: {
        category: [],
        products: [],
        name: ""
    },
    methods: {
        changeMenu: function (id, tabid, menuid) {
            var ajax = apiWeb + 'category/';
            var self = this;
            
            self.products = [];
            self.name = $("#" + menuid).data('id');

            $("ul.tabs li").removeClass("active");
            $("#" + menuid).addClass("active");
            
            $.ajax({
                type: 'GET',
                url: ajax + id,
                headers: header,
                success: function (data) {
                    self.products = data.detail;
                },
            })

            $(".tab_content").hide();
            
            setTimeout(
                function () {
                    $("#" + tabid).fadeIn();
                }, 300);
        }
    },
    created: function () {
        var ajax = apiWeb + 'categorys';
        var self = this;
        $.ajax({
            type: 'GET',
            url: ajax,
            headers: header,
            success: function (data) {
                self.category = data.detail;
            },
        })
    },
    updated: function () {
        if (isInit) {
            var self = this;
            menuId = Cookies.get('MenuId')
            self.changeMenu(menuId, `tab` + menuId, `tab-` + menuId);

            $("#tab-" + menuId).addClass("active");
            isInit = false;
        }

        //if ($("#tab-1").hasClass("active")) {
        //    $(".productlist-img").css("padding-top", "50%")
        //}
        //else {
        //    $(".productlist-img").css("padding-top", "75%")
        //}
    }
});