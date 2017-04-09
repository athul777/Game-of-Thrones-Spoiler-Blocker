function saveChanges() {
    //Check whether switch is on or off and changes local storage. 
    if ($('#myonoffswitch').is(':checked')) {
        localStorage.mydata = 'y';
    } else {
        localStorage.mydata = 'n';
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({
        'value': localStorage.mydata
    }, function () {

    });
}

$(document).ready(function () {
    //Checks whether localstorage is initiated and creates it if it isn't.
    if (localStorage.getItem('mydata')) {
        if (localStorage.mydata == 'y') {
            $('#myonoffswitch').prop('checked', true);
        } else {
            $('#myonoffswitch').prop('checked', false);
        }
    } else {
        if ($('#myonoffswitch').is(':checked')) {
            localStorage.setItem('mydata', 'y');
        } else {
            localStorage.setItem('mydata', 'n');
        }
    }
    //Calls saveChanges if clicked. 
    $('#myonoffswitch').click(function () {
        saveChanges();
    });

});