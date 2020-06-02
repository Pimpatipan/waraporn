var province, district, subdistrict, search;

var branches = new Vue({
    el: '#result-box',
    data: {
        province: [],
        district: [],
        subdistrict: [],
        places: []
    },
    methods: {
        getDistrict: function (provinceId) {
            var ajax = apiWeb + 'Districts/' + provinceId;
            var self = this;

            $.ajax({
                type: 'GET',
                url: ajax,
                headers: header,
                success: function (data) {
                    self.district = data.detail;
                },
            })
        },
        getSubdistrict: function (provinceId, districtId) {
            var ajax = apiWeb + 'SubDistricts/' + provinceId + '/' + districtId;
            var self = this;
            $.ajax({
                type: 'GET',
                url: ajax,
                headers: header,
                success: function (data) {
                    self.subdistrict = data.detail;
                },
            })
        },
        getPlaces: function (menuid) {
            var ajax = apiWeb + 'Branchs';
            var self = this;

            province = parseInt($("#province-list").val());
            district = parseInt($("#district-list").val());
            subdistrict = parseInt($("#subdistrict-list").val());
            search = $(".branch-input").val();

            $.ajax({
                type: 'POST',
                url: ajax,
                headers: header,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({
                    "provinceId": province,
                    "subDistrictId": subdistrict,
                    "districtId": district,
                    "name": search
                }),
                beforeSend: function () {
                    $("#branch-box").addClass('loading-bg');
                    $("#loading").removeClass('d-none');
                },
                success: function (data) {
                    $("#branch-box").removeClass('loading-bg');
                    $("#loading").addClass('d-none');

                    self.places = data.detail;
                    addmarker(self.places)

                    if (data.detail.length > 0) {
                        $(".not-found").addClass('d-none');
                    }
                    else {
                        $(".not-found").removeClass('d-none');
                    }
                },
            })
        }
    },
    mounted: function () {
        var ajax = apiWeb + 'Provinces';
        var self = this;
        $.ajax({
            type: 'GET',
            url: ajax,
            headers: header,

            success: function (data) {
                self.province = data.detail;
            },
        })
    }
});

var category = new Vue({
    el: '#category-box',
    data: {
        category: []
    },
    methods: {
        getMenuId: function (menuid) {
            Cookies.set('MenuId', menuid)
        }
    },
    mounted: function () {
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
    }
});

var blogs = new Vue({
    el: '#blog-box',
    data: {
        blog: []
    },
    mounted: function () {
        var ajax = apiWeb + 'BlogHomepages';
        var self = this;
        $.ajax({
            type: 'GET',
            url: ajax,
            headers: header,
            success: function (data) {
                self.blog = data.detail;
            },
        })
    }
});

var news = new Vue({
    el: '#news-box',
    data: {
        news: []
    },
    mounted: function () {
        var ajax = apiWeb + 'news';
        var self = this;
        $.ajax({
            type: 'GET',
            url: ajax,
            headers: header,
            success: function (data) {
                self.news = data.detail;
            },
        })
    },
    updated: function () {
        var self = this;

        if (this.news.length == 0) {
            $(".news-main-box").hide();
        }

        $('.news-box').slick({
            dots: true,
            arrows: false,
            autoplay: true
        });

        $('.news-banner').click(function () {
            var id = $(this).attr('newsId');
            var data = self.news
            
            $(".modal-txt-box").html(data[id].description);
            $(".modal-img").css("background-image", 'url(' + data[id].imgUrl + ')');
            $(".modal-img").attr("title", data[id].altTag);

            $('#news-modal').modal();
        });
    }
});

$('#province-list').on('change', function () {
    var selected_province = $(this).val();

    branches.district = []
    branches.subdistrict = []

    branches.getDistrict(selected_province);
})

$('#district-list').on('change', function () {
    var selected_province = $("#province-list").val();
    var selected_district = $(this).val();

    branches.subdistrict = []

    branches.getSubdistrict(selected_province, selected_district);
})