var id = window.location.href.split('?Id=').pop().split('&')[0];
var data, fd, ed, fromDate, endDate;
var imgLink;

$(document).ready(function () {
    $("#newsId").val(id);
});

$('#date-from').datetimepicker({
    icons: {
        time: 'far fa-clock'
    },
    format: 'YYYY-MM-DD HH:mm'
});

$('#date-to').datetimepicker({
    icons: {
        time: 'far fa-clock'
    },
    format: 'YYYY-MM-DD HH:mm'
});

//$('#expire-date').datetimepicker({
//    icons: {
//        time: 'far fa-clock'
//    },
//    format: 'YYYY-MM-DD HH:MM'
//});

getExistData();

function getExistData() {
    if (id != 0) {
        $.ajax({
            url: apiWeb + 'api/News/' + id,
            method: 'get',
            headers: {
                Authorization: "Bearer " + token,
            },
            beforeSend: function () {
                $("#pageloader").fadeIn();
            },
            success: function (data) {
                $("#pageloader").fadeOut();
                $("#alttag").val(data.detail.altTag)
                $("#sortorder").val(data.detail.sortOrder)
                $(".summernote").summernote("code", data.detail.translations[0].description);
                $(".filename").not('.file-name-modal').text(data.detail.imgUrl)
                $(".thumbnail").not('#thumbnailmodal').val(data.detail.imgUrl)
                
                fd = new Date(data.detail.startDate)
                fromDate = moment(fd).format('YYYY-MM-DD HH:mm');
                $("#startDate").val(fromDate)

                ed = new Date(data.detail.endDate)
                toDate = moment(ed).format('YYYY-MM-DD HH:mm');
                $("#endDate").val(toDate)
                
                $('.preview-upload').not('#preview-upload-modal').removeClass('d-none').css('background-image', 'url("' + data.detail.imgUrl + '")');
                $('#btn-delete').removeClass('d-none');

                if (data.detail.active == true) {
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
        "News": {
            "id": parseInt($("#newsId").val()),
            "imgUrl": imgLink,
            "altTag": $("#alttag").val(),
            "sortOrder": parseInt($("#sortorder").val()),
            "active": $(".status:checked").val(),
            "startDate": $("#startDate").val(),
            "endDate": $("#endDate").val(),
            "translations": [
                {
                    "languageId": 1,
                    "newsId": parseInt($("#newsId").val()),
                    "description": $('.summernote').summernote('code')
                },
                {
                    "languageId": 2,
                    "newsId": parseInt($("#newsId").val()),
                    "description": $('.summernote').summernote('code')
                }
            ]
        },
        "Base64Image": bg
    }

    $.ajax({
        url: apiWeb + 'api/News',
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
                window.location.href = '/news/index';
            }
            else {
                alert(data.message)
            }
        }
    });
}

function confirmDelete() {
    if (confirm("Are you sure you want to remove this news?")) {
        $.ajax({
            url: apiWeb + 'api/News/' + id,
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
                    window.location.href = '/news/index';
                }
                else {
                    alert(data.message)
                }
            }
        });
    }
}