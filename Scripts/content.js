var website_selectors = {
    google_search: "g",
    facebook: "userContentWrapper",
    reddit: "entry",
    twitter: "tweet",
    generic: "div"
};

var wordlist = [
    ['#got', 10],
    ['gameofthrones', 5],
    ['spoiler', 10],
    ['game of thrones', 5],
    ['a song of ice and fire', 5],
    ['asoif', 5],
    ['george rr martin', 5],
    ['the winds of winter', 5],
    ['a dance with dragons', 5],
    ['a feast for crows', 5],
    ['a storm of swords', 5],
    ['a clash of kings', 5],
    ['lannister', 10],
    ['baratheon', 10],
    ['targaryan', 10],
    ['tyrion', 10],
    ['cersei', 7],
    ['jon snow', 10],
    ['daenerys', 8],
    ['sansa stark', 7],
    ['arya stark', 7],
    ['jorah', 5],
    ['samwell tarly', 4],
    ['theon greyjoy', 5],
    ['petyr baelish', 5],
    ['littlefinger', 5],
    ['varys', 4],
    ['brienne of tarth', 4],
    ['bran stark', 5],
    ['sandor clegane', 3],
    ['joffrey', 4],
    ['podrick payne', 2],
    ['catelyn stark', 4],
    ['barristan selmy', 3],
    ['missandei', 3],
    ['davos seaworth', 3],
    ['margaery tyrell', 4],
    ['melisandre', 7],
    ['hodor', 4],
    ['robb stark', 4],
    ['shae', 3],
    ['loras tyrell', 2],
    ['grey worm', 2],
    ['roose bolton', 2],
    ['alliser thorne', 2],
    ['ramsay bolton', 4],
    ['ygritte', 2],
    ['gendry', 2],
    ['olly', 3],
    ['jaqen hghar', 5],
    ['daario naharis', 4],
    ['olenna tyrell', 2],
    ['rickon stark', 3],
    ['qyburn', 2],
    ['eddard stark', 2],
    ['ned stark', 2],
    ['ellaria sand', 2],
    ['jojen reed', 1],
    ['meera reed', 1],
    ['westeros', 5],
    ['essos', 2],
    ['winterfell', 5],
    ['white walker', 5],
    ['castle black', 5],
    ['meereen', 4],
    ['sons of the harpy', 3],
    ['oldtown', 3],
    ['dorne', 3],
    ['tower of joy', 3],
    ['last hearth', 2],
    ['dragonstone', 2],
    ['volantis', 3],
    ['harrenhal', 1],
    ['braavos', 2],
    ['asshai', 3],
    ['azhor ahai', 5],
    ['vaes dothrak', 3],
    ['kings landing', 2],
    ['casterly rock', 1],
    ['pentos', 1],
    ['lannisport', 1],
    ['peter dinklage', 4],
    ['lena headey', 3],
    ['kit harington', 5],
    ['emilia clarke', 4],
    ['sophie turner', 2],
    ['maisie williams', 2],
    ['iain glen', 1],
    ['nikolaj coster waldau', 2],
    ['john bradley', 1],
    ['alfie allen', 1],
    ['aiden gillen', 1],
    ['gwendoline christie', 1],
];

function hide_spoilers(selector) {
    var divs = document.getElementsByClassName(selector);
    for (var i = 0, n = divs.length; i < n; ++i) {
        var string = divs[i].innerHTML.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ");
        var counter = 0;
        for (var j = 0, m = wordlist.length; j < m; ++j) {
            var substr = wordlist[j][0];
            if (string.indexOf(substr) > -1) {
                ++counter;
                divs[i].id = "num" + i.toString();
                if (!$('#num' + i.toString()).hasClass("hide") && !$('#num' + i.toString()).hasClass("viewed") && counter > 1) {
                    $('#num' + i.toString()).addClass("hide");
                    $('#num' + i.toString()).wrap("<div class = 'content-wrapper'><div class = 'cover' id = 'text-id-" + i.toString() + "'></div></div>");
                    $('#text-id-' + i.toString()).prepend("<div class = 'spoiler-text'><span class = 'spoiler-text-span'>A potential spoiler has been detected here. Click at your own risk!</span></div>");

                }
            }
        }
    }
}

$(document).ready(function () {
    
    if (localStorage.getItem('block_pref')) {
        
    } else {
        localStorage.setItem('block_pref', 'y');
    }

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (key in changes) {
            var storageChange = changes[key];
            localStorage.block_pref = storageChange.newValue;
            console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
        }
    });

    if (localStorage.block_pref === "y") {
        var website_name = window.location.host;
        var selector;

        if (website_name.indexOf("google") > -1) {
            selector = website_selectors.google_search;
        } else if (website_name.indexOf("facebook") > -1) {
            selector = website_selectors.facebook;
        } else if (website_name.indexOf("reddit") > -1) {
            selector = website_selectors.reddit;
        } else if (website_name.indexOf("twitter") > -1) {
            selector = website_selectors.twitter;
        } else {
            selector = "";
        }

        document.addEventListener('DOMNodeInserted', function () {
            hide_spoilers(selector);
        });

        $('body').on('click', '.cover', function () {
            var elements = this.parentNode.getElementsByClassName("spoiler-text");
            while (elements[0]) {
                elements[0].parentNode.removeChild(elements[0]);
            }
            $(this).removeClass("cover", 2000);
            $(this).promise().done(function () {
                $(this).children().removeClass("hide");
            });
            $(this).children().addClass("viewed");
        });

    }
});