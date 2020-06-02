var id = window.location.href.split('?Id=').pop().split('&')[0];
var data;
var imgLink;

$(document).ready(function () {
    $("#bannerId").val(id);
});

getExistData();

function getExistData() {
    if (id != 0) {
        $.ajax({
            url: apiWeb + 'api/Banner/' + id,
            method: 'get',
            headers: {
                Authorization: "Bearer " + token,
            },
            beforeSend: function () {
                $("#pageloader").fadeIn();
            },
            success: function (data) {
                $("#pageloader").fadeOut();
                $("#name").val(data.detail.banner.name)
                $("#alttag").val(data.detail.banner.altTag)
                $("#sortorder").val(data.detail.banner.sortOrder)
                $(".filename").text(data.detail.banner.imgUrl)
                $(".thumbnail").val(data.detail.banner.imgUrl)
                $('.preview-upload').removeClass('d-none').css('background-image', 'url("' + data.detail.banner.imgUrl + '")');
                $('#btn-delete').removeClass('d-none');
                
                if (data.detail.banner.bannerTypeId == 1) {
                    $("#radio-main-b").prop('checked', true)
                }
                else {
                    $("#radio-sub-b").prop('checked', true)
                }

                if (data.detail.banner.active == true) {
                    $("#radio-1").prop('checked', true)
                }
                else {
                    $("#radio-0").prop('checked', true)
                }
            }
        });
    }
}

function submitData() {
    var bg = $("#pictureImg").text();
    var ajaxType;

    if (id == 0) {
        imgLink = "";
        ajaxType = "post";
    }
    else {
        imgLink = $(".filename").html();
        ajaxType = "put"
    }

    data = {
        "Banner": {
            "id": parseInt($("#bannerId").val()),
            "bannerTypeId": $(".banner-type:checked").val(),
            "name": $("#name").val(),
            "imgUrl": imgLink,
            "altTag": $("#alttag").val(),
            "sortOrder": parseInt($("#sortorder").val()),
            "active": $(".status:checked").val(),
        },
        "Base64Image": bg
    }

    $.ajax({
        url: apiWeb + 'api/Banner',
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
                window.location.href = '/banner/index';
            }
            else {
                alert(data.detail[0])
            }
        }
    });
}

$("#name").on("input", function () {
    $("#alttag").val($("#name").val())
});

function confirmDelete() {
    if (confirm("Are you sure you want to remove this banner?")) {
        $.ajax({
            url: apiWeb + 'api/Banner/' + id,
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
                    window.location.href = '/banner/index';
                }
                else {
                    alert(data.detail[0])
                }
            }
        });
    }
}