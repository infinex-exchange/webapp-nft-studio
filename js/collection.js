$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-net').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectNet(null, '/nft/wallet/networks', false);
    
    $(document).trigger('renderingStage');
    $.ajax({
        url: config.apiUrl + '/nft/studio/collections',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            scolid: 0
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
});