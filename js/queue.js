$(document).ready(function() {
	window.renderingStagesTarget = 1;
});

$(document).on('authChecked', function() {
	if(!window.loggedIn) return;
	
	window.queueAS = new AjaxScroll(
        $('#queue-data'),
        $('#queue-data-preloader'),
        {
	        api_key: window.apiKey
        },
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
            
            $.ajax({
                url: config.apiUrl + '/nft/studio/queue',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.queue, function(k, v) {
                        thisAS.append(renderQueueTask(v));
                    });
                    
                    thisAS.done();
            
                    if(thisAS.offset == 0)
                        $(document).trigger('renderingStage');
                        
                    if(data.queue.length != 50)
                        thisAS.noMoreData();
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
});

function renderQueueTask(data) {
	return 'task ' + data.type;
}