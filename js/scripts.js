
$(document).ready(function () {
    $('#search-box').focus();

    $("#wikiSearch").on("click", function () {
        getDataFromWikiAPI();
    });

});

function getDataFromWikiAPI() {

    
    // Sandbox:
    // https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=pageimages%7Cpageterms%7Cinfo&list=&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=50&pilimit=10&wbptterms=description&inprop=url&gpssearch=super&gpslimit=20
    // w/api.php?action=query&format=json&prop=pageimages%7Cpageterms%7Cinfo&list=&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=50&pilimit=10&wbptterms=description&inprop=url&gpssearch=super&gpslimit=20


    // Sandbox 
    // https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=pageimages%7Cextracts&generator=search&formatversion=2&pilimit=20&exsentences=1&exlimit=20&exintro=1&explaintext=1&gsrsearch=superman&gsrnamespace=0&gsrlimit=10
    //  /w/api.php?action=query&format=json&prop=pageimages%7Cextracts&generator=search&formatversion=2&pilimit=20&exsentences=1&exlimit=20&exintro=1&explaintext=1&gsrsearch=superman&gsrnamespace=0&gsrlimit=10

    // Sandbox
    // https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=pageimages%7Cextracts%7Cinfo&generator=search&formatversion=2&pilimit=20&exsentences=1&exlimit=20&exintro=1&explaintext=1&inprop=url&gsrsearch=superman&gsrnamespace=0&gsrlimit=10
    // w/api.php?action=query&format=json&prop=pageimages%7Cextracts%7Cinfo&generator=search&formatversion=2&pilimit=20&exsentences=1&exlimit=20&exintro=1&explaintext=1&inprop=url&gsrsearch=superman&gsrnamespace=0&gsrlimit=10

    var playListURL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts%7Cinfo&generator=search&formatversion=2&pilimit=20&exsentences=1&exlimit=20&exintro=1&explaintext=1&inprop=url&gsrsearch=superman&gsrnamespace=0&gsrlimit=10&callback=?';

    function parseData(data) {

        var hash = data;
        var page_value = "";

        var html = "<tbody>";
        
        $.each(data.query.pages, function (i, item) {

            html += "<tr><td>";
            
            html += "<h4><a target=\"_blank\" href=\"" + item.fullurl +"\">" + item.title + "</a></h4>";
            //console.log(item.pageid + ' ' + item.title + ' ');

            if (item.terms) {
                //console.log(item.terms.description[0]);
                 
            }

            if (item.thumbnail) {
               // console.log(item.thumbnail.source + ', ' + item.thumbnail.width + 'px, ' + item.thumbnail.height + 'px');
            }

            if (item.extract) {
               // console.log(item.extract)
               html += "<p>" + item.extract + "</p>";
            }
            
             html += "</td></tr>";
        });
        
        html += "</tbody>";
        
        //console.log(html)
        
        $(".table.result").html(html);
        // $("#quote").animateCss('zoomIn');

        // $("#quote").empty();
        // $("#quote").append(data.value.joke);

        // changeTweetLink(data.value.joke);
    }

    $.getJSON(playListURL, parseData);
}
