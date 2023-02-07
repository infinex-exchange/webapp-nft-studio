$(document).ready(function() {
    window.renderingStagesTarget = 3;
    window.editSnftid = null;
    
    $('#select-net, #select-col').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    $('#nft-submit, #nft-submit-and-mint').click(function() {
        var name = $('#nft-name').val();
        var scolid = $('#select-col').data('colid');
        var netid = $('#select-net').data('network');
        var description = $('#nft-description').val();
        var attributes = getAttributes();
        
        var mint = $(this).is('#nft-submit-and-mint');
        
        if(
            !validateNftName(name) ||
            (description != '' && !validateNftDesc(description)) ||
            attributes === false
        ) {
            msgBox('Please fill in the form correctly')
            return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['name'] = name;
        
        if(window.editSnftid)
            data['snftid'] = window.editSnftid;
        
        data['scolid'] = scolid != '' ? scolid : null;
        data['netid'] = netid != '' ? netid : null;
        data['description'] = description;
        data['attributes'] = attributes;
        
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
                if(mint)
                    enqueueNft(window.editSnftid ? window.editSnftid : data.snftid);
                else
                    location.href = window.backUrl;
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
    
    var urlParams = new URLSearchParams(window.location.search);
    window.backUrl = '/nft/studio/projects';
    
    if(snftid == 'add') {
        $('.title-create').removeClass('d-none');
        document.title = 'Create NFT | ' + document.title;
        
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
                    
                    if(urlParams.get('back') == 'col')
                        window.backUrl = '/nft/studio/collection/' + data.scolid;
                        
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
                
                if(data.scolid) {
                    $('#select-col').val(data.col_name).data('colid', data.scolid);
                    
                    if(urlParams.get('back') == 'col')
                        window.backUrl = '/nft/studio/collection/' + data.scolid;
                }
                
                if(data.netid)
                    $('#select-net').val(data.net_name).data('network', data.netid);
                
                if(data.description)
                    $('#nft-description').val(data.description);
                
                if(data.attributes)
                    setAttributes(data.attributes);
                
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

function addAttribute(key = '', value = '') {
    $('#attributes').append(`
        <div class="row attribute-item">
            <div class="my-auto" style="width: calc(50% - 20px)">
                <input type="text" class="form-control attribute-key" value="${key}">
            </div>
            <div class="my-auto p-0" style="width: 10px">
                <strong>=</strong>
            </div>
            <div class="my-auto" style="width: calc(50% - 20px)">
                <input type="text" class="form-control attribute-value" value="${value}">
            </div>
            <div class="my-auto" style="width: 10px">
                <a href="#_" class="nav-link attribute-remove">
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </div>
        </div>
    `);
    
    $('.attribute-remove').off('click').on('click', function() {
        $(this).closest('.attribute-item').remove();
    });
}

function setAttributes(attributes) {
    $.each(attributes, function(k, v) {
        addAttribute(v.key, v.value);
    });
}

function getAttributes() {
    var attributes = [];
    var error = false;
    
    $('.attribute-item').each(function() {
        var key = $(this).find('.attribute-key').val();
        var value = $(this).find('.attribute-value').val();
        
        if(key == '' && value == '') {
            $(this).remove();
            return;
        }
        
        if(key == '' || value == '') {
            error = true;
            return;
        }
        
        attributes.push({
            key: key,
            value: value
        });
    });
    
    if(error)
        return false;
    
    return attributes;
}