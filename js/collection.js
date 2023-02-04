$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-net').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    $('#col-submit').click(function() {
        var name = $('#col-name').val();
        var netid = $('#select-net').data('netid');
        var description = $('#col-description').val();
        var website = $('#col-website').val();
        var twitter = $('#col-twitter').val();
        
        if(
            //
        ) {
            msgBox('Please fill in the form correctly')
            return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;

        $.ajax({
            url: config.apiUrl + '/p2p/my_offers/add',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                msgBoxRedirect('The offer has been successfully created', '/p2p');
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
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
                if(data.status != 'DRAFT') {
                    msgBoxRedirect('Cannot edit this collection');
                    return;
                }
                
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