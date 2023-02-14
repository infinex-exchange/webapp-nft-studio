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
	
	$('#queue-start').click(function() {
		$.ajax({
	        url: config.apiUrl + '/nft/studio/queue/start',
	        type: 'POST',
	        data: JSON.stringify({
	            api_key: window.apiKey
	        }),
	        contentType: "application/json",
	        dataType: "json",
	    })
	    .retry(config.retry)
	    .done(function (data) {
	        if(data.success) {
		        window.queueAS.reset();
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
	                if(data.running)
		                $('#queue-running').show();
		            else
			            $('#queue-running').hide();
	                
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
	var mainCol = 'col-10 col-lg-11';
	
	if(data.status == 'QUEUED' || data.status == 'DONE') {
		htmlRemove = `
			<div class="col-2 col-lg-1 my-auto text-center">
				<a href="#_" class="nav-link" onClick="removeTask(${data.taskid}, ${data.depend_slave_count})">
                    <i class="fa-solid fa-xmark"></i>
                </a>
			</div>
		`;
		mainCol = 'col-8 col-lg-10';
	}
	
	return `
		<div class="col-12 py-1">
            <div class="ui-card-light hoverable p-2">
			<div class="row">
			    <div class="col-2 col-lg-1 my-auto text-center">
				    <i class="fa-solid ${dictTaskStatusIcon[data.status]} fa-2x"></i>
			    </div>
				<div class="${mainCol} my-auto">
					<div class="row">
						<div class="col-12">
							${dictTaskTypeTitle[data.type]} ${data.name}
						</div>
						<div class="col-12 small secondary pt-1">
							Fee: ${data.fee} ${data.fee_assetid}
						</div>
					</div>
				</div>
				${htmlRemove}
		    </div>
		    </div>
        </div>
	`;
}

function intRemoveTask(taskid, cascade) {
    $.ajax({
        url: config.apiUrl + '/nft/studio/queue/remove',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            taskid: taskid,
            cascade: cascade
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            window.queueAS.reset();
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

function removeTask(taskid, depend) {
    if(depend == 0) {
        intRemoveTask(taskid, false);
        return;
    }
        
    $('#modal-remove-task').remove();
    
    $('body').append(`
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-remove-task">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="ps-1 modal-title">Cancel task</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                        <p>${depend} other tasks dependent on this task will also be cancelled. Do you want to continue?</p>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button id="mrt-submit" type="button" class="btn btn-primary">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    `);
            
    $('#mrt-submit').click(function() {
        $('#modal-remove-task').modal('hide');
        intRemoveTask(taskid, true);
    });
    
    $('#modal-remove-task').modal('show');
}