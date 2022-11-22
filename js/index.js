$(document).ready(function() {
    window.renderingStagesTarget = 1;
    $(document).trigger('renderingStage');
    
    $('input[name="radio-wizard"]').change(function() {
        var wizardMode = $(this).val();
        
        $('.wizard-item').removeClass('active');
        $('.wizard-item[data-wizard-mode="' + wizardMode + '"]').addClass('active');
    });
    
    $('.wizard-item').click(function() {
        $(this).find('input[name="radio-wizard"]').prop('checked', true).trigger('change');
    });
});