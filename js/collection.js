$(document).ready(function() {
    window.renderingStagesTarget = 3;
    window.editScolid = null;
    
    $('#select-net').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    $('#col-submit, #col-submit-and-mint').click(function() {
        var name = $('#col-name').val();
        var netid = $('#select-net').data('network');
        var description = $('#col-description').val();
        var website = $('#col-website').val();
        var twitter = $('#col-twitter').val();
        
        var mint = $(this).is('#col-submit-and-mint');
        
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
                if(mint)
                    enqueueCollection(window.editScolid ? window.editScolid : data.scolid);
                else
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
        $(document).trigger('renderingStage'); // NFTs in collection
    }
    
    else {
        $('.edit-only').removeClass('d-none');
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
                    $('#select-net').val(data.net_name).data('network', data.netid);
                
                if(data.description)
                    $('#col-description').val(data.description);
                
                if(data.website)
                    $('#col-website').val(data.website);
                
                if(data.twitter)
                    $('#col-twitter').val(data.twitter);
                
                $('#btn-add-nft').attr('src', '/nft/studio/nft/add?col=' + window.editScolid);
                
                $(document).trigger('renderingStage');
            }
            else {
                msgBoxRedirect(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true);
        });
        
        window.nftsAs = new AjaxScroll(
            $('#nfts-data'),
            $('#nfts-data-preloader'),
            {
    	        api_key: window.apiKey,
                scolid: parseInt(scolid)
            },
            function() {
                this.data.offset = this.offset;
                var thisAS = this;
                
                $.ajax({
                    url: config.apiUrl + '/nft/studio/nfts',
                    type: 'POST',
                    data: JSON.stringify(thisAS.data),
                    contentType: "application/json",
                    dataType: "json",
                })
                .retry(config.retry)
                .done(function (data) {
                    if(data.success) {
                        $.each(data.nfts, function(k, v) {
                            thisAS.append(renderNft(v));
                        });
                        
                        thisAS.done();
                
                        if(thisAS.offset == 0)
                            $(document).trigger('renderingStage');
                            
                        if(data.nfts.length != 50)
                            thisAS.noMoreData();
                        
                        if(data.nfts.length != 0)
                            $('.title-nfts').removeClass('d-none');
                    } else {
                        msgBoxRedirect(data.error);
                        thisAS.done();
                        thisAS.noMoreData();
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    msgBoxNoConn(true);
                    thisAS.done();
                    thisAS.noMoreData();
                });
            },
            true,
            true
        );
    }
});