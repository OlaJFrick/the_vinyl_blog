var blogItems;

$.getJSON('blogs.json', function(posts) {
    blogItems = posts;
    $(mainApp);

});

function mainApp() {

    // By Clicking on the a's in the Sidebar, the Blog Area Elements are Changed.

    $('.scroller > ol').on('click', 'a', function() {
        var fetch = $(this).data('blog');

    // The Blog-Image will not be displayed if the img is missing from the JSON file.

       $(function(){
        if (fetch.image !== undefined) {
            $('.blog-image').delay(4).fadeOut(4, function() {
                $(this).attr("src", fetch.image).fadeToggle(700);
            });
        } else {
            $('.blog-image').hide(); 
        }      
    });


        $('.blog-image').attr("alt", fetch.altimage);
        $('.photo-credits').text("Photography by " + fetch.credit);
        $('.blog-title').text(fetch.title);
        $('.blog-date').text(fetch.date);
        $('.blog-author').text("By " + fetch.author);
        $('.blog-content').text(fetch.content);
        $('.blog-epilogue').text(fetch.epilogue);


    // Hover over Blog-image displays Photo Title Credits
    
        $(function() {
            $('.gallery-item').hover(function() {
                $(this).find('.img-title').fadeIn(300);
            }, function() {
                $(this).find('.img-title').fadeOut(100);
            });
        });

    });


// This function loops through my blogs.JSON - 

    (function() {
        for (var i = 0; i < blogItems.length; i++) {
            var blog = blogItems[i];

            var thumbnail = '<img class="thumbnail" src="' + blog.image + '">';
            var previewTitle = '<a>' + blog.title + '</a>';
            var previewDate = '<p>' + blog.date + '</p>';
            var titleDateBox = '<div class="previewTextWrapper">' + previewTitle + previewDate + '</div>';
            var divider = '<div class="divider"></div>';

            if (blog.image === undefined) {
                console.log("Hi, There are a couple of blog entries in the blogs.JSON that has non-existing images. They will be hidden into nothingness.");
                thumbnail = '<img src=" ">';
            }

            $('.scroller > ol').prepend('<li>' + thumbnail + titleDateBox + divider + '</li>');
            $('.scroller > ol a').first().data('blog', blog);

        }
        // Sidebar loads on the fly, Emulate a click on the first a tag
        $('.scroller > ol a').first().click();

    })();

}