var deliverys = new Vue({
    el: '#delivery-box',
    data: {
        deliverys: []
    },
    mounted: function () {
        var ajax = apiWeb + 'BranchDeliveries';
        var self = this;
        $.ajax({
            type: 'GET',
            url: ajax,
            headers: header,
            success: function (data) {
                self.deliverys = data.detail;
            },
        })
    },
    updated: function () {
        if (this.deliverys.length == 0) {
            $(".news-main-box").hide();
        }
    }
});