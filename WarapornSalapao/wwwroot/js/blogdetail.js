var id = window.location.href.split('/').pop();

if (id == "") {
    window.location.href = "/Blog"
}


var blogs = new Vue({
    el: '#blog-detail-box',
    data: {
        blogdetail: [],
        recentBlog: []
    },
    methods: {
        getrecentBlog: function () {
            var ajax = apiWeb + 'BlogRecent/' + id;
            var self = this;
            $.ajax({
                type: 'GET',
                url: ajax,
                headers: header,
                success: function (data) {
                    self.recentBlog = data.detail;
                },
            })
        }
    },
    mounted: function () {
        var ajax = apiWeb + 'blog/' + id;
        var self = this;
        $.ajax({
            type: 'GET',
            url: ajax,
            headers: header,
            success: function (data) {
                if (data.detail.urlKey != null) {
                    self.blogdetail = data.detail;
                    self.getrecentBlog();
                }
                else {
                    window.location.href = "/Blog"
                }
            },
        })

    }
});