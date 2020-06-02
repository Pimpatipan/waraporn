var id = window.location.href.split('?Id=').pop().split('&')[0];
var data;
var imgLink, subcategoryId, productNameEn, productDescEn, productSubDescEn;

$(document).ready(function () {
    $("#productId").val(id);
    getExistData();
});

function getExistData() {
    if (id != 0) {
        $.ajax({
            url: apiWeb + 'api/Product/' + id,
            method: 'get',
            headers: {
                Authorization: "Bearer " + token,
            },
            beforeSend: function () {
                $("#pageloader").fadeIn();
            },
            success: function (data) {
                $("#pageloader").fadeOut();
                $("#name-th").val(data.detail.productTranslations[0].name)
                $("#name-en").val(data.detail.productTranslations[1].name)
                $("#desc-th").val(data.detail.productTranslations[0].description)
                $("#desc-en").val(data.detail.productTranslations[1].description)
                $("#sub-desc-th").val(data.detail.productTranslations[0].subDescription)
                $("#sub-desc-en").val(data.detail.productTranslations[1].subDescription)
                $("#sortorder").val(data.detail.sortOrder)
                $(".filename").text(data.detail.imgUrl)
                $(".thumbnail").val(data.detail.imgUrl)
                $('.preview-upload').removeClass('d-none').css('background-image', 'url("' + data.detail.imgUrl + '")');
                $('#btn-delete').removeClass('d-none');

                $('#product-cat option[value="' + data.detail.categoryId + '"]').prop('selected', true);
                products.getSubcategory(data.detail.categoryId);
                subcategoryId = data.detail.subCategoryId 

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

var products = new Vue({
    el: '#categorys-box',
    data: {
        category: [],
        subcategory: []
    },
    methods: {
        getSubcategory: function (catId) {
            var ajax = apiWeb + 'api/ProductSubCategory/' + catId;
            var self = this;

            $.ajax({
                type: 'GET',
                url: ajax,
                headers: {
                    Authorization: "Bearer " + token,
                },
                success: function (data) {
                    self.subcategory = data.detail;
                },
            })
        }
    },
    mounted: function () {
        var ajax = apiWeb + 'api/ProductCategory';
        var self = this;
        $.ajax({
            type: 'GET',
            url: ajax,
            headers: {
                Authorization: "Bearer " + token,
            },
            success: function (data) {
                self.category = data.detail;
            },
        })
    },
    updated: function () {
        if (id != 0) {
            $('#product-sub-cat option[value="' + subcategoryId + '"]').prop('selected', true);
        }
    }
});

$('#product-cat').on('change', function () {
    var selected_category = $(this).val();
    products.subcategory = []

    if ($(this).val() != "") {
        products.getSubcategory(selected_category);
    }
})


function checkProName() {
    if ($("#name-en").val() == "") {
        productNameEn = $("#name-th").val()
    }
    else {
        productNameEn = $("#name-en").val()
    }
}

function checkProDesc() {
    if ($("#desc-en").val() == "") {
        productDescEn = $("#desc-th").val()
    }
    else {
        productDescEn = $("#desc-en").val()
    }
}

function checkSubProDesc() {
    if ($("#sub-desc-en").val() == "") {
        productSubDescEn = $("#sub-desc-th").val()
    }
    else {
        productSubDescEn = $("#sub-desc-en").val()
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
    
    checkProName();
    checkProDesc();
    checkSubProDesc();
    
    data = {
        "product": {
            "id": parseInt($("#productId").val()),
            "subCategoryId": parseInt($("#product-sub-cat option:selected").val()),
            "sortOrder": parseInt($("#sortorder").val()),
            "active": $(".status:checked").val(),
            "imgUrl": imgLink,
            "productTranslations": [
                {
                    "productId": parseInt($("#productId").val()),
                    "languageId": 1,
                    "name": $("#name-th").val(),
                    "description": $("#desc-th").val(),
                    "subDescription": $("#sub-desc-th").val(),
                    
                },
                {
                    "productId": parseInt($("#productId").val()),
                    "languageId": 2,
                    "name": productNameEn,
                    "description": productDescEn,
                    "subDescription": productSubDescEn,
                }
            ]
        },
        "Base64Image": bg
    }

    $.ajax({
        url: apiWeb + 'api/Product',
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
                window.location.href = '/Product/index';
            }
            else {
                alert(data.detail[0])
            }
        }
    });
}

function confirmDelete() {
    if (confirm("Are you sure you want to remove this product?")) {
        $.ajax({
            url: apiWeb + 'api/Product/' + id,
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
                    window.location.href = '/Product/index';
                }
                else {
                    alert(data.detail[0])
                }
            }
        });
    }
}