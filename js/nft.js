$(document).ready(function() {
    window.renderingStagesTarget = 3;
    window.editSnftid = null;
    
    $('#select-net, #select-col').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    $('#nft-submit').click(function() {
        var name = $('#nft-name').val();
        var scolid = $('#select-col').data('colid');
        var netid = $('#select-net').data('network');
        var description = $('#nft-description').val();
        
        if(
            !validateNftName(name) ||
            (description != '' && !validateNftDesc(description))
        ) {
            msgBox('Please fill in the form correctly')
            return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['name'] = name;
        
        if(window.editSnftid)
            data['snftid'] = window.editSnftid;
        
        if(scolid != '')
            data['scolid'] = scolid;
        
        if(netid != '')
            data['netid'] = netid;
        
        if(description != '')
            data['description'] = description;
        
        var endpoint = 'add';
        if(window.editSnftid)
            endpoint = 'update';

        $.ajax({
            url: config.apiUrl + '/nft/studio/nfts/' + endpoint,
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
    
    initSelectCol('/nft/studio/collections');
    initSelectNet(null, '/nft/wallet/networks', false);
    
    var pathArray = window.location.pathname.split('/');
    var snftid = pathArray[pathArray.length - 1];
    
    if(snftid == 'add') {
        $('.title-create').removeClass('d-none');
        document.title = 'Create NFT | ' + document.title;
        
        var urlParams = new URLSearchParams(window.location.search);
        var addScolid = urlParams.get('col');
        
        if(addScolid != null) {
            $.ajax({
                url: config.apiUrl + '/nft/studio/collections/get',
                type: 'POST',
                data: JSON.stringify({
                    api_key: window.apiKey,
                    scolid: parseInt(addScolid)
                }),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $('#select-col').val(data.name).data('colid', data.scolid);
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
        else {
            $(document).trigger('renderingStage');
        }
    }
    
    else {
        $('.title-edit').removeClass('d-none');
        document.title = 'Edit NFT | ' + document.title;
        
        $.ajax({
            url: config.apiUrl + '/nft/studio/nfts/get',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                snftid: parseInt(snftid)
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                if(data.status != 'DRAFT') {
                    msgBoxRedirect('Cannot edit this NFT');
                    return;
                }
                
                window.editSnftid = data.snftid;
                
                $('#nft-name').val(data.name);
                
                if(data.scolid)
                    $('#select-col').val(data.col_name).data('colid', data.scolid);
                
                if(data.netid)
                    $('#select-net').val(data.net_name).data('network', data.netid);
                
                if(data.description)
                    $('#nft-description').val(data.description);
                
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