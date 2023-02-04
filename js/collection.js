$(document).ready(function() {
    window.renderingStagesTarget = 2;
    window.editScolid = null;
    
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
            !validateNftName(name) ||
            (description != '' && !validateNftDesc(description)) ||
            (website != '' && !validateVotingWebsite(website)) ||
            (twitter != '' && !validateTwitter(twitter))
        ) {
            msgBox('Please fill in the form correctly')
            return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['name'] = name;
        
        if(window.editScolid)
            data['scolid'] = window.editScolid;
        
        if(netid != '')
            data['netid'] = netid;
        
        if(description != '')
            data['description'] = description;
        
        if(website != '')
            data['website'] = website;
        
        if(twitter != '')
            data['twitter'] = twitter;
        
        var endpoint = 'add';
        if(window.editScolid)
            endpoint = 'update';

        $.ajax({
            url: config.apiUrl + '/nft/studio/collections/' + endpoint,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                location.href = '/nft/studio/projects';
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
                scolid: parseInt(scolid)
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
                
                window.editScolid = data.scolid;
                
                $('#col-name').val(data.name);
                
                if(data.netid)
                    $('#select-net').val(data.netid).data('network', data.netid);
                
                if(data.description)
                    $('#col-description').val(data.description);
                
                if(data.website)
                    $('#col-website').val(data.website);
                
                if(data.twitter)
                    $('#col-twitter').val(data.twitter);
                
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