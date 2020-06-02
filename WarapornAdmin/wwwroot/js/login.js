var token = Cookies.get('token');

if (token != null) {
    window.location.href = '/banner/index'
}

checkToken();

function checkToken() {
    if (token == null) {
        token = "";
    }
    $.ajax({
        type: 'POST',
        url: 'http://api-admin-warapornsalapao.dosetech.co/api/VerifyToken',
        contentType: "application/json",
        data: JSON.stringify({
            "Token": token
        }),
        success: function (data) {
            if (data.detail.ResultCode == 0) {
                Cookies.remove('token')
                window.location.href = '/Account/Login'
            }
            else {

            }
        },
    })
}

$('.inputfield').keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        $('#btnSubmit').click();
        return false;
    }
});   

$("#btnSubmit").click(function () {
    $.ajax({
        type: 'POST',
        url: 'http://api-admin-warapornsalapao.dosetech.co/api/authenticate',
        contentType: "application/json",
        data: JSON.stringify({
            "Username": $("#email").val(),
            "Password": $("#pass").val()
        }),
        beforeSend: function () {
            $("#btnSubmit").html('Loading..');
        },
        success: function (data) {
            if (data.result == 1) {
                $(".red").html(data.message);
                Cookies.set('token', data.detail, { expires: 1 });
                Cookies.set('email', $("#email").val());
                window.location.href = '/banner/index'
            }
            else {
                $("#btnSubmit").html('Log in');
                $(".red").html(data.message);
            }
        },
    })
});