var blogs = new Vue({
    el: '#blog-box',
    data: {
        blog: [],
        pin: [],
    },
    methods: {
        getBlogNonHighlight: function (blogId) {
            var ajax = apiWeb + 'Blogs/0';
            var self = this;

            $.ajax({
                type: 'GET',
                url: ajax,
                headers: header,
                success: function (data) {
                    self.blog = data.detail;
                },
            })
        },
        getBlogHighlight: function (blogId) {
            var ajax = apiWeb + 'Blogs/1';
            var self = this;
            $.ajax({
                type: 'GET',
                url: ajax,
                headers: header,
                success: function (data) {
                    self.pin = data.detail;
                },
            })
        }
    },
    created: function () {
        this.getBlogHighlight();
        this.getBlogNonHighlight();
    },
    updated: function () {
        setTimeout(() => {
            if (this.blog.length == 0 && this.pin.length == 0) {
                $("#blog-box").html('<div><p class="text-center text-danger p-5 m-0">ไม่พบข้อมูล</p></div>');
            }
        }, 2000);
    }
});