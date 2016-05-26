
$(document).ready(function () {
    $('#search-box').focus();

    $("#wikiSearch").on("click", function () {

        var text = $("#search-box").val();
        getDataFromWikiAPI(text);
    });

    $("#wikiRandom").on("click", function () {
        openRandomWikiPage();
    });
});

function openRandomWikiPage() {

    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');

}
function getDataFromWikiAPI(searchText) {

    // final 
    // Sandbox
    // https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=extracts%7Cinfo&generator=search&formatversion=2&exsentences=1&exlimit=20&exintro=1&explaintext=1&inprop=url&gsrsearch=superman&gsrnamespace=0&gsrlimit=10
    // /w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=search&formatversion=2&exsentences=1&exlimit=20&exintro=1&explaintext=1&inprop=url&gsrsearch={{searchvalue}}&gsrnamespace=0&gsrlimit=10

    var playListURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=search&formatversion=2&exsentences=1&exlimit=20&exintro=1&explaintext=1&inprop=url&gsrsearch={{searchvalue}}&gsrnamespace=0&gsrlimit=10&callback=?";

    function parseData(data) {

        var hash = data;
        var page_value = "";

        var html = "<tbody>";

        $.each(data.query.pages, function (i, item) {

            html += "<tr><td>";

            html += "<h4><a target=\"_blank\" href=\"" + item.fullurl + "\">" + item.title + "</a></h4>";

            if (item.extract) {
                html += "<p>" + item.extract + "</p>";
            }

            html += "</td></tr>";
        });

        html += "</tbody>";

        $(".table.result").html(html);

        $(".table.result").removeClass("hidden");
    }

    var url = playListURL.replace("{{searchvalue}}", encodeURIComponent(searchText));
    $.getJSON(url, parseData);
}
