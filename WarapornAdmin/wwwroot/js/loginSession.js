var token = Cookies.get('token');
var email = Cookies.get('email');

if (token == null) {
    window.location.href = '/account/login'
}

if (email != null) {
    $(".user-email").html(email);
}

$('#signOut').click(function () {
    if (confirm("Are you sure you want to sign out"))
        Cookies.remove('token')
        Cookies.remove('email')
        window.location.href = '/Account/Login'
    }
);

checkToken();

function checkToken() {
    $.ajax({
        type: 'POST',
        url: 'http://api-admin-warapornsalapao.dosetech.co/api/VerifyToken',
        contentType: "application/json",
        data: JSON.stringify({
            "Token": token,
        }),
        success: function (data) {
            if (data.detail.resultCode == 0) {
                Cookies.remove('token')
                window.location.href = '/Account/Login'
            }
            else {
               
            }
        },
    })
}