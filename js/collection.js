var PREDEF_DURATION = [1, 3, 5, 7, 10, 14, 30];

$(document).ready(function() {
    // Initial
    
    window.renderingStagesTarget = 2;
    
    // Remove preloader
    
    $('#select-nft, #select-coin').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    // On change selectors
    
    $('#select-nft').on('change', function() {
        $('#fees-wrapper').addClass('d-none');
        
        $.ajax({
            url: config.apiUrl + '/nft/create_offer/info',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                nftid: $('#select-nft').data('nftid')
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('#royalty-fee').html(data.royalty_fee);
                $('#platform-fee').html(data.platform_fee);
                $('#fees-wrapper').removeClass('d-none');
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
    
    $('#select-coin').on('change', function() {
        $('.assetid').html($('#select-coin').val());
        $('.step2-ro').prop('readonly', false).data('rval', '').data('tsval', '').val('');
    });
    
    // Duration
    
    $('#duration-raw').on('input', function() {
        var raw = $(this).val();
        $('#duration-desc').html(PREDEF_DURATION[raw] + ' days');
    }).trigger('input');
    
    // Lock format and precision of inputs
    
    $('#price-buynow, #price-initial').on('input', function () {
        prec = $('#select-coin').data('prec');
        
        var regex = new RegExp("^[0-9]*(\\.[0-9]{0," + prec + "})?$");
        var newVal = $(this).val();
        
        // Revert bad format (visible value to typing safe value)
        if (!regex.test(newVal)) {
            $(this).val( $(this).data('tsval') );
        }
        
        else {
            // Check is real value change by calculations pending
            var haveRVal = $(this).data('rval') != $(this).data('tsval');
            
            // Drop . on last position (typing safe value only)
            if(newVal.slice(-1) == '.') {
                $(this).data('tsval', newVal.substring(0, newVal.length - 1));
            }
        
            // Change . to 0. on first position (typing safe value only)
            else if(newVal.startsWith('.')) {
                $(this).data('tsval', '0' + newVal);
            }
        
            // Save typing safe value as is when everythink ok
            else {
                $(this).data('tsval', newVal);
            }
            
            // If there is no pending change by calculations set rval also
            $(this).data('rval', newVal);
        }
        
        // Do calculations
        $(this).trigger('updateCalc');
    });
    
    // Move data-val to real visible value
    $('#price-buynow, #price-initial').onFirst('focusout setVal', function() {
        if($(this).is(':focus')) return;
        
        $(this).data('tsval', $(this).data('rval') )
               .val( $(this).data('rval') );
    });
    
    // Red text if initial > buy now
    $('#price-buynow, #price-initial').on('updateCalc setVal', function() {
        buynow = new BigNumber($('#price-buynow').data('rval'));
        initial = new BigNumber($('#price-initial').data('rval'));
        
        $('#price-buynow, #price-initial').removeClass('text-red');
        
        if(initial.gte(buynow))
            $(this).addClass('text-red');
    });
    
    // Submit
    
    $('#submit').click(function() {
        var nftid = $('#select-nft').data('nftid');
        var asset = $('#select-coin').val();
        var buynowField = $('#price-buynow');
        var buynow = buynowField.data('rval');
        var initialField = $('#price-initial');
        var initial = initialField.data('rval');
        
        if(buynowField.hasClass('text-red') ||
           initialField.hasClass('text-red')
        ) {
            msgBox('Auction initial price cannot be greater than buy now price');
            return;
        }
        
        if(buynow == '' && initial == '') {
            msgBox('Please specify auction initial price, buy now price or both');
            return;
        }
        
        if(nftid == '' || asset == '') {
            msgBox('Please fill in the form correctly')
            return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['nftid'] = nftid;
        data['asset'] = asset;
        data['duration'] = PREDEF_DURATION[ $('#duration-raw').val() ];
        
        if(buynow != '')
            data['price_buynow'] = buynow;
        
        if(initial != '')
            data['price_initial'] = initial;

        $.ajax({
            url: config.apiUrl + '/nft/create_offer',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                msgBoxRedirect('The offer has been successfully created', '/nft');
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
    
    initSelectNft();
    initSelectCoin('/nft/assets');
    
    var pathArray = window.location.pathname.split('/');
    var pathLast = pathArray[pathArray.length - 1];
    if(pathLast != 'sell' && pathLast != '') {
        $('#select-nft').val(pathLast).data('nftid', pathLast).trigger('change');
    }
});