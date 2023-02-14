var dictTaskStatusIcon = {
	QUEUED: 'fa-bars-progress',
	PENDING: 'fa-circle-notch fa-rotate',
	DONE: 'fa-check'
};

var dictTaskTypeTitle = {
	AUTHOR: 'Create author wallet for network',
	COLLECTION: 'Mint collection',
	NFT: 'Mint NFT'
};

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
	var htmlRemove = '';
	
	if(data.status == 'QUEUED' || data.status == 'DONE')
		htmlRemove = `
			<div class="col-1 my-auto text-center">
				<a href="#_" class="nav-link">
                    <i class="fa-solid fa-xmark"></i>
                </a>
			</div>
	`;
	
	return `
		<div class="col-12 py-1">
            <div class="ui-card-light hoverable p-2">
			<div class="row">
			    <div class="col-2 my-auto text-center">
				    <i class="fa-solid ${dictTaskStatusIcon[data.status]} fa-2x"></i>
			    </div>
				<div class="col-10 my-auto">
					<h5>${dictTaskTypeTitle[data.type]} ${data.name}</h5>
					<p class="secondary">
					    Your tasks are being processed. Once completed, created NFTs will
					    appear in your main NFT wallet.
					</p>
				</div>
				${htmlRemove}
		    </div>
		    </div>
        </div>
	`;
}