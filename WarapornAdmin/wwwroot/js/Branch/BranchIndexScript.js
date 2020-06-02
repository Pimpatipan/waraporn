$('#dataTable').DataTable({
    "bPaginate": true,
    dom: 'Blftip',
    "processing": true,
    scrollX: true,
    "stateSave": true,
    "serverSide": true,
    "info": true,
    "language": {
        searchPlaceholder: "Branch Name"
    },
    "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],
    "ajax": {
        "url": apiWeb + "api/Branchs",
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
            "targets": 0,
            "searchable": true
        }
    ],
    "columns": [
        {
            "data": "name",
        },
        {
            "data": "address",
        },
        {
            "data": "telephone",
        },
        {
            "data": "timeService",
        },
        {
            "data": {},
            "render": function (data) {
                var txt = "<div><a href='/branch/createupdate?Id=" + data.id + "'><i class='fas fa-edit text-warning pr-1'></i></a><a href='#' onclick='confirmDelete(" + data.id + ")'><i class='fas fa-trash-alt text-danger'></i></a></div>"
                return txt;
            }
        }
    ]
});

function confirmDelete(id) {
    if (confirm("Are you sure you want to remove this branch?")) {
        $.ajax({
            url: apiWeb + 'api/Branch/' + id,
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