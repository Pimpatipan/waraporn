var id = window.location.href.split('?Id=').pop().split('&')[0];
var data;
var imgLink;
var isHighlight = false;
var districtid, subdistrictid;

$(document).ready(function () {
    $("#branchId").val(id);
    getExistData();
});

var branches = new Vue({
    el: '#address-box',
    data: {
        province: [],
        district: [],
        subdistrict: []
    },
    methods: {
        getDistrict: function (provinceId) {
            var ajax = apiWeb + 'api/Districts/' + provinceId;
            var self = this;
            
            $.ajax({
                type: 'GET',
                url: ajax,
                headers: {
                    Authorization: "Bearer " + token,
                },
                success: function (data) {
                    self.district = data.detail;
                },
            })
        },
        getSubdistrict: function (provinceId, districtId) {
            var ajax = apiWeb + 'api/SubDistricts/' + provinceId + '/' + districtId;
            var self = this;
            $.ajax({
                type: 'GET',
                url: ajax,
                headers: {
                    Authorization: "Bearer " + token,
                },
                success: function (data) {
                    self.subdistrict = data.detail;
                },
            })
        }
    },
    mounted: function () {
        var ajax = apiWeb + 'api/Provinces';
        var self = this;
        $.ajax({
            type: 'GET',
            url: ajax,
            headers: {
                Authorization: "Bearer " + token,
            },
            success: function (data) {
                self.province = data.detail;
            },
        })
    },
    updated: function () {
        if (id != 0) {
            $('#district-list option[value="' + districtid + '"]').prop('selected', true);
            $('#subdistrict-list option[value="' + subdistrictid + '"]').prop('selected', true);
        }
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

function getExistData() {
    if (id != 0) {
        $.ajax({
            url: apiWeb + 'api/Branch/' + id,
            method: 'get',
            headers: {
                Authorization: "Bearer " + token,
            },
            beforeSend: function () {
                $("#pageloader").fadeIn();
            },
            success: function (data) {
                $("#pageloader").fadeOut();
                $("#name-th").val(data.detail.translations[0].name)
                $("#name-en").val(data.detail.translations[1].name)
                $("#code").val(data.detail.code)
                $("#address").val(data.detail.address)
                $("#timeService").val(data.detail.address)
                $("#address").val(data.detail.address)
                $("#opentime").val(data.detail.timeService)
                $("#tel").val(data.detail.telephone)
                $("#ggMap").val(data.detail.googleMap)
                $("#lat").val(data.detail.lat)
                $("#longtitude").val(data.detail.long)
                $(".filename").text(data.detail.menuImg)
                $(".thumbnail").val(data.detail.menuImg)
                
                $('#province-list option[value="' + data.detail.provinceId + '"]').prop('selected', true);
                branches.getDistrict(data.detail.provinceId);
                branches.getSubdistrict(data.detail.provinceId, data.detail.districtId);
                
                districtid = data.detail.districtId;
                subdistrictid = data.detail.subDistrictId;
                
                $('.preview-upload').removeClass('d-none').css('background-image', 'url("' + data.detail.menuImg + '")');
                $('#btn-delete').removeClass('d-none');

                if (data.detail.isDeliveryBranch == true) {
                    $("#delivery-branch").prop('checked', true)
                }
                else {
                    $("#delivery-branch").prop('checked', false)
                }
            }
        });
    }
}

function submitData() {
    var bg = $("#pictureImg").text();
    var ajaxType, branchNameEn;
    var branchcodeval = $("#code").val()
    var branchcode = branchcodeval.toUpperCase();

    if (id == 0) {
        imgLink = "";
        ajaxType = "post";
    }
    else {
        imgLink = $(".filename").html();
        ajaxType = "put"
    }

    if ($("#name-en").val() == "") {
        branchNameEn = $("#name-th").val()
    }
    else {
        branchNameEn = $("#name-en").val()
    }

    data = {
        "branch": {
            "id": parseInt($("#branchId").val()),
            "code": branchcode,
            "telephone": $("#tel").val(),
            "menuImg": imgLink,
            "googleMap": $("#ggMap").val(),
            "lat": $("#lat").val(),
            "long": $("#longtitude").val(),
            "isDeliveryBranch": isHighlight,
            "provinceId": parseInt($("#province-list option:selected").val()),
            "districtId": parseInt($("#district-list option:selected").val()),
            "subDistrictId": parseInt($("#subdistrict-list option:selected").val()),
            "address": $("#address").val(),
            "timeService": $("#opentime").val(),
            "translations": [
                {
                    "id": parseInt($("#branchId").val()),
                    "name": $("#name-th").val(),
                    "branchId": parseInt($("#branchId").val()),
                    "languageId": 1
                },
                {
                    "id": parseInt($("#branchId").val()),
                    "name": branchNameEn,
                    "branchId": parseInt($("#branchId").val()),
                    "languageId": 2
                }
            ]
        },
        "Base64Image": bg
    }
    
    $.ajax({
        url: apiWeb + 'api/Branch',
        method: ajaxType,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        headers: {
            Authorization: "Bearer " + token,
        },
        beforeSend: function () {
            $("#pageloader").fadeIn();
        },
        success: function (data) {
            $("#pageloader").fadeOut();
            if (data.result != 0) {
                window.location.href = '/Branch/index';
            }
            else {
                alert(data.detail[0])
            }
        }
    });
}

$("#delivery-branch").change(function () {
    if ($('#delivery-branch').is(':checked')) {
        isHighlight = true;
    }
    else {
        isHighlight = false;
    }
});

$("#tel").keypress(function (e) {
    if (e.which != 45 && !(e.which >= 48 && e.which <= 57)) {
        return false;
    }
});

$(".map-angle").keypress(function (e) {
    if (e.which != 45 && e.which != 46 && !(e.which >= 48 && e.which <= 57)) {
        return false;
    }
});

function confirmDelete() {
    if (confirm("Are you sure you want to remove this branch?")) {
        $.ajax({
            url: apiWeb + 'api/Branch/' + id,
            type: 'delete',
            headers: {
                Authorization: "Bearer " + token,
            },
            beforeSend: function () {
                $("#pageloader").fadeIn();
            },
            success: function (data) {
                $("#pageloader").fadeOut();
                if (data.result != 0) {
                    window.location.href = '/Branch/index';
                }
                else {
                    alert(data.detail[0])
                }
            }
        });
    }
}