$('#dataTable').DataTable({
    "bPaginate": true,
    dom: 'Blftip',
    "processing": true,
    scrollX: true,
    "serverSide": true,
    "stateSave": true,
    "info": true,
    "language": {
        searchPlaceholder: "Alt Tag"
    },
    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
    "ajax": {
        "url": apiWeb + "api/NewsList",
        "type": "POST",
        headers: {
            Authorization: "Bearer " + token,
        }
    },
    "ordering": false,
    "columnDefs": [
        {
            "targets": "_all",
            "searchable": false
        },
        {
            "targets": 1,
            "searchable": true
        }
    ],
    "columns": [
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
            "data": "statusName",
        },
        {
            "data": {},
            "render": function (data) {
                var txt = "<div><a href='/news/createupdate?Id=" + data.id + "'><i class='fas fa-edit text-warning pr-1'></i></a><a href='#' onclick='confirmDelete(" + data.id + ")'><i class='fas fa-trash-alt text-danger'></i></a></div>"
                return txt;
            }
        }
    ]
});

function confirmDelete(id) {
    if (confirm("Are you sure you want to remove this news?")) {
        $.ajax({
            url: apiWeb + 'api/News/' + id,
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