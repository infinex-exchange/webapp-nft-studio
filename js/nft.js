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
        var royalty = $('#nft-royalty-perc').val();
        
        var mint = $(this).is('#nft-submit-and-mint');
        
        if(
            !validateNftName(name) ||
            (description != '' && !validateNftDesc(description)) ||
            attributes === false
        ) {
	        $('#nft-name').trigger('input');
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
        data['royalty_perc'] = royalty;
        
        var utData = $('#nft-data').data('ticket');
        if(typeof utData != 'undefined')
            data['data_ut'] = utData;
        
        var utLicense = $('#nft-license').data('ticket')
        if(typeof utLicense != 'undefined')
            data['license_ut'] = utLicense;
        
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
    
    $('#nft-remove').click(function() {
	    removeNft(window.editSnftid, onCurrentNftRemove);
    });
    
    $('#nft-name').on('input', function() {
        var name = $(this).val();
        
        if(name == '') {
	        $('#nft-name-invalid').addClass('d-none');
	        $('#nft-name-required').removeClass('d-none');
	        return;
	    }
	    
	    if(!validateNftName(name)) {
		    $('#nft-name-invalid').removeClass('d-none');
		    $('#nft-name-required').addClass('d-none');
		    return;
	    }
	    
	    $('#nft-name-invalid, #nft-name-required').addClass('d-none');
    });
    
    $('#nft-description').on('input', function() {
	    var description = $(this).val();
	    
        if(description == '' || validateNftDesc(description))
	        $('#nft-description-invalid').addClass('d-none');
	    
	    else
		    $('#nft-description-invalid').removeClass('d-none');
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
        initUpload('#nft-data', 'nft', true, null);
        initUpload('#nft-license', 'nft-license', false, null);
        
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
        $('.edit-only').removeClass('d-none');
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
                $('#nft-royalty-perc').val(data.royalty_perc).trigger('_input');
                
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
                
                initUpload('#nft-data', 'nft', true, data.data_url);
                initUpload('#nft-license', 'nft-license', false, data.license_url);
                
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
            <div class="my-auto" style="width: calc(50% - 40px)">
                <input type="text" class="form-control attribute-key" value="${key}">
            </div>
            <div class="px-0 my-auto text-center" style="width: 10px">
                <strong>=</strong>
            </div>
            <div class="my-auto" style="width: calc(50% - 40px)">
                <input type="text" class="form-control attribute-value" value="${value}">
            </div>
            <div class="my-auto text-center" style="width: 20px">
                <a href="#_" class="nav-link attribute-remove">
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </div>
            <div class="attribute-key-invalid small text-red pt-1 d-none">
                <i class="fa-solid fa-triangle-exclamation"></i>
                Attribute key contains forbidden characters
            </div>
            <div class="attribute-value-invalid small text-red pt-1 d-none">
                <i class="fa-solid fa-triangle-exclamation"></i>
                Attribute value contains forbidden characters
            </div>
        </div>
    `);
    
    $('.attribute-remove').off('click').on('click', function() {
        $(this).closest('.attribute-item').remove();
    });
    
    $('.attribute-key, .attribute-value').off('input').on('input', function() {
	    var parent = $(this).closest('.attribute-item');
	    var k = parent.find('.attribute-key').val();
	    var v = parent.find('.attributes-value').val();
	    
	    if(k == '' && v == '') {
		    parent.find('.attribute-key-invalid, .attribute-value-invalid').addClass('d-none');
		    return;
	    }
	    
	    if(validateAttrKey(key))
	        parent.find('.attribute-key-invalid').addClass('d-none');
	    
	    else
		    parent.find('.attribute-key-invalid').removeClass('d-none');
		    
		if(validateAttrValue(value))
	        parent.find('.attribute-value-invalid').addClass('d-none');
	    
	    else
		    parent.find('.attribute-value-invalid').removeClass('d-none');
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
        
        if(!validateAttrKey(key) || !validateAttrValue(value)) {
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

function onCurrentNftRemove() {
	location.href = window.backUrl;
}