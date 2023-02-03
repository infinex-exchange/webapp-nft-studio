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
});