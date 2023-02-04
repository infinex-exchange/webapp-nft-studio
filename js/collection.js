$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-net').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectNet(null, '/nft/wallet/networks', false);
    
    var pathArray = window.location.pathname.split('/');
    var scolid = pathArray[pathArray.length - 1];
    
    if(scolid == 'add') {
        $('.title-create').removeClass('d-none');
        document.title = 'Create collection | ' + document.title;
        $(document).trigger('renderingStage');
    }
    
    else {
        $('.title-edit').removeClass('d-none');
        document.title = 'Edit collection | ' + document.title;
        
        $.ajax({
            url: config.apiUrl + '/nft/studio/collections/get',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                scolid: scolid
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $(document).trigger('renderingStage');
            }
            else {
                msgBoxRedirect(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true);
        });
    }
});