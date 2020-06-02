$('#dataTable').DataTable({
    "bPaginate": true,
    dom: 'Blftip',
    "processing": true,
    scrollX: true,
    "stateSave": true,
    "serverSide": true,
    "info": true,
    "ordering": false,
    "language": {
        searchPlaceholder: "Name"
    },
    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
    "ajax": {
        "url": apiWeb + "api/Banners",
        "type": "POST",
        headers: {
            Authorization: "Bearer " + token,
        }
    },
    "columnDefs": [
        {
            "targets": "_all",
            "searchable": false
        },
        {
            "targets": 0,
            "searchable": true
        }
    ],
    "columns": [
        {
            "data": "name",
        },
        {
            "data": "imgUrl",
            "render": function (data) {
                return '<div id="preview-upload-news" class="preview-upload border-0 m-auto" style="background-image:url(' + data + ')"></div>';
            }
        },
        {
            "data": "altTag",
        },
        {
            "data": "sortOrder",
        },
        {
            "data": "bannerTypeId",
            "render": function (data) {
                if (data == 1) {
                    return "Main Banner"
                }
                else {
                    return "Sub Banner"
                }
            }
        },
        {
            "data": "statusName",
        },
        {
            "data": {},
            "render": function (data) {
                var txt = "<div><a href='/banner/createupdate?Id=" + data.id + "'><i class='fas fa-edit text-warning pr-1'></i></a><a href='#' onclick='confirmDelete(" + data.id + ")'><i class='fas fa-trash-alt text-danger'></i></a></div>"
                return txt;
            }
        }
    ]
});

function confirmDelete(id) {
    if (confirm("Are you sure you want to remove this banner?")) {
        $.ajax({
            url: apiWeb + "api/Banner/" + id,
            type: 'delete',
            headers: {
                Authorization: "Bearer " + token,
            },
            success: function (data) {
                alert(data.message)
                if (data.result != 0) {
                    location.reload();
                }
            }
        });
    }
}