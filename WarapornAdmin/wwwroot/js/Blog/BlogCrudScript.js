var id = window.location.href.split('?Id=').pop().split('&')[0];
var data;
var imgLink;

$(document).ready(function () {
    $("#blogId").val(id);
});

getExistData();

function getExistData() {
    if (id != 0) {
        $.ajax({
            url: apiWeb + 'api/Blog/' + id,
            method: 'get',
            headers: {
                Authorization: "Bearer " + token,
            },
            beforeSend: function () {
                $("#pageloader").fadeIn();
            },
            success: function (data) {
                $("#pageloader").fadeOut();
                $("#name").val(data.detail.translations[0].name)
                $("#shortDescription").val(data.detail.translations[0].shortDescription)
                $("#urlkey").val(data.detail.urlKey)
                $("#sortorder").val(data.detail.sortOrder)
                $(".summernote").summernote("code", data.detail.translations[0].description);
                $(".filename").not('.file-name-modal').text(data.detail.imgUrl)
                $(".thumbnail").not('#thumbnailmodal').val(data.detail.imgUrl)
                $('.preview-upload').not('#preview-upload-modal').removeClass('d-none').css('background-image', 'url("' + data.detail.imgUrl + '")');
                $('#btn-delete').removeClass('d-none');

                if (data.detail.active == true) {
                    $("#radio-1").prop('checked', true)
                }
                else {
                    $("#radio-0").prop('checked', true)
                }

                if (data.detail.isHighlight == true) {
                    $("#radio-2").prop('checked', true)
                }
                else {
                    $("#radio-3").prop('checked', true)
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
        "blog": {
            "id": parseInt($("#blogId").val()),
            "imgUrl": imgLink,
            "urlKey": $("#urlkey").val(),
            "sortOrder": parseInt($("#sortorder").val()),
            "isHighlight": $(".highlight:checked").val(),
            "active": $(".status:checked").val(),
            "translations": [
                {
                    "name": $("#name").val(),
                    "blogId": parseInt($("#blogId").val()),
                    "languageId": 1,
                    "shortDescription": $("#shortDescription").val(),
                    "description": $('.summernote').summernote('code')
                },
                {
                    "name": $("#name").val(),
                    "blogId": parseInt($("#blogId").val()),
                    "languageId": 2,
                    "shortDescription": $("#shortDescription").val(),
                    "description": $('.summernote').summernote('code')
                }
            ]
        },
        "Base64Image": bg
    }

    $.ajax({
        url: apiWeb + 'api/Blog',
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
                window.location.href = '/blog/index';
            }
            else {
                alert(data.detail[0])
            }
        }
    });
}

$("#name").on("input", function () {
    $("#urlkey").val($(this).val().replace(/ /g, "-"));
});

function confirmDelete() {
    if (confirm("Are you sure you want to remove this tips & tricks?")) {
        $.ajax({
            url: apiWeb + 'api/Blog/' + id,
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
                    window.location.href = '/blog/index';
                }
                else {
                    alert(data.detail[0])
                }
            }
        });
    }
}