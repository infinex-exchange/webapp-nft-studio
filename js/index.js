$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('input[name="radio-wizard"]').change(function() {
        var wizardMode = $(this).val();
        
        $('.wizard-item').removeClass('active');
        $('.wizard-item[data-wizard-mode="' + wizardMode + '"]').addClass('active');
    });
    
    $('.wizard-item').click(function() {
        $(this).find('input[name="radio-wizard"]').prop('checked', true).trigger('change');
    });
    
    $('#btn-continue').click(function() {
        switch($('input[name="radio-wizard"]:checked').val()) {
            case 'col-new':
                window.location.href = '/projects/collection/add';
                break;
            
            case 'col-add':
                var colid = $('#select-col').data('colid');
                if(colid == '') break;
                window.location.href = '/projects/nft/add?col=' + colid;
                break;
            
            default: // single
                window.location.href = '/projects/nft/add';
        }
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectCol();
    
    $(document).trigger('renderingStage');
});