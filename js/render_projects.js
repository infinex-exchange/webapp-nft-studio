var mapStatusToIcon = {
	DRAFT: 'fa-compass-drafting',
	QUEUED: 'fa-bars-progress',
	PENDING: 'fa-spinner',
	MINTED: 'fa-circle-check'
};

var mapStatusToText = {
	DRAFT: 'Draft',
	QUEUED: 'In queue',
	PENDING: 'Minting...',
	MINTED: 'Minted'
};

function renderProject(data, removeCallback = null) {
    if(data.type == 'COLLECTION')
        return renderCollection(data, false, removeCallback);
    return renderNft(data, null, false, removeCallback);
}

function renderCollection(data, readonly = false, removeCallback = null) {
    var buttons = '';
    
    if(!readonly) {
        buttons += `
		    <a href="/nft/studio/collection/${data.scolid}" class="btn btn-primary btn-sm ms-0">
			   <i class="fa-solid fa-pen-to-square"></i>
			   Edit
            </a>
	    `;
    
        if(data.status == 'DRAFT') {
            buttons += `
                <button type="button" class="btn btn-primary btn-sm" onClick="removeCollection(${data.scolid}, ${removeCallback})">
    				<i class="fa-solid fa-trash-can"></i>
    				Remove
    			</button>
    			<button type="button" class="btn btn-primary btn-sm" onClick="enqueueCollection(${data.scolid})">
    				<i class="fa-solid fa-check"></i>
    				To mint
    			</button>
    		`;
        }
    }
    
    var preview = data.icon_url ? data.icon_url : '/nft/img/no_preview.png';
    
    var badgeNet = '';
    
    if(data.net_name)
	    badgeNet = `
		    <div class="col-12 small secondary">
	            <img src="${data.net_icon}" width="16" height="16">
	            ${data.net_name}
		    </div>
		`;
    
    return `
      <div class="col-12 py-1">
      <div class="ui-card-light hoverable p-2">
      <div class="row">
          <div class="col-3 col-lg-2 my-auto pe-0">
	          <img src="${preview}" class="img-fluid">
          </div>
          <div class="col-9 col-lg-10  my-auto">
              <div class="row">
                  <div class="col-12">
		              <small class="secondary">COLLECTION</small>
		          </div>
		          <div class="col-12">
		              <h4>${data.name}</h4>
		          </div>
		          <div class="col-12 small secondary pt-2">
			          <i class="fa-solid ${mapStatusToIcon[data.status]}"></i>
			          ${mapStatusToText[data.status]}
		          </div>
		          ${badgeNet}
		          <div class="col-12 pt-2">
		              ${buttons}
		          </div>
		      </div>
          </div>
      </div>
      </div>
      </div>
  `;
}

function renderNft(data, back = null, readonly = false, removeCallback = null) {
    var backSuffix = '';
    if(back)
        backSuffix = '?back=' + back;
    
    var buttons = '';
    
    if(data.status == 'DRAFT' && !readonly) {
        buttons += `
            <a href="/nft/studio/nft/${data.snftid}${backSuffix}" class="btn btn-primary btn-sm ms-0">
				<i class="fa-solid fa-pen-to-square"></i>
				Edit
			</a>
			<button type="button" class="btn btn-primary btn-sm" onClick="removeNft(${data.snftid}, ${removeCallback})">
				<i class="fa-solid fa-trash-can"></i>
				Remove
			</button>
			<button type="button" class="btn btn-primary btn-sm" onClick="enqueueNft(${data.snftid})">
				<i class="fa-solid fa-check"></i>
				To mint
			</button>
		`;
    }
    
    var preview = data.data_url ? data.data_url : '/nft/img/no_preview.png';
    
    var badgeNet = '';
    
    if(data.net_name)
	    badgeNet = `
		    <div class="col-12 small secondary">
	            <img src="${data.net_icon}" width="16" height="16">
	            ${data.net_name}
		    </div>
		`;
    
    return `
      <div class="col-12 py-1">
      <div class="ui-card-light hoverable p-2">
      <div class="row">
	      <div class="col-3 col-lg-2 my-auto pe-0">
	          <img src="${preview}" class="img-fluid">
          </div>
	      <div class="col-9 col-lg-10 my-auto">
		      <div class="row">
		          <div class="col-12">
		              <small class="secondary">NFT</small>
		          </div>
		          <div class="col-12">
		              <h4>${data.name}</h4>
		          </div>
		          <div class="col-12 small secondary pt-2">
			          <i class="fa-solid ${mapStatusToIcon[data.status]}"></i>
			          ${mapStatusToText[data.status]}
		          </div>
		          ${badgeNet}
		          <div class="col-12 pt-2">
			          ${buttons}
		          </div>
	          </div>
          </div>
      </div>
      </div>
      </div>
  `;
}

function intEnqueue(endpoint, data) {
    $.ajax({
        url: config.apiUrl + endpoint,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            location.href = '/nft/studio/queue';
        } else {
	        $('#modal-enqueue-errors').remove();
	        
	        var htmlErrors = '';
	        
	        $.each(data.errors, function(k, v) {
		        htmlErrors += '<li>' + v + '</li>';
	        });
	        
	        $('body').append(`
	            <div class="modal fade" tabindex="-1" role="dialog" id="modal-enqueue-errors">
				    <div class="modal-dialog modal-dialog-centered" role="document">
				        <div class="modal-content">
				            <div class="modal-header">
				                <h5 class="modal-title">Error</h5>
				                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				            </div>
				            <div class="modal-body">
				                <p>The following errors occurred while adding a job to the minting queue:</p>
				                <ul>
					                ${htmlErrors}
				                </ul>
				            </div>
				            <div class="modal-footer">
				                <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
				            </div>
				        </div>
				    </div>
				</div>
			`);
			
			$('#modal-enqueue-errors').modal('show');
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

function enqueueCollection(scolid) {
    intEnqueue(
        '/nft/studio/collections/queue',
        {
            api_key: window.apiKey,
            scolid: scolid
        }
    );
}

function enqueueNft(snftid) {
    intEnqueue(
        '/nft/studio/nfts/queue',
        {
            api_key: window.apiKey,
            snftid: snftid
        }
    );
}

function removeNft(snftid, callback) {
    $.ajax({
        url: config.apiUrl + '/nft/studio/nfts/get',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            snftid: snftid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            
            $('#modal-remove-nft').remove();
            
            $('body').append(`
                <div class="modal fade" tabindex="-1" role="dialog" id="modal-remove-nft">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="ps-1 modal-title">Remove NFT</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div class="modal-body">
                                <p>Are you sure you want to remove this NFT?</p>
                                ${renderNft(data, null, true)}
                            </div>
                            
                            <div class="modal-footer">
                                <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button id="mrn-submit" type="button" class="btn btn-primary">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            
            $('#mrn-submit').click(function() {
                $('#modal-remove-nft').modal('hide');
                
                $.ajax({
                    url: config.apiUrl + '/nft/studio/nfts/remove',
                    type: 'POST',
                    data: JSON.stringify({
                        api_key: window.apiKey,
                        snftid: snftid
                    }),
                    contentType: "application/json",
                    dataType: "json",
                })
                .retry(config.retry)
                .done(function (data) {
                    if(data.success) {
                        if(callback)
                            callback();
                    } else {
                        msgBox(data.error);
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    msgBoxNoConn(false);
                });
            });
            
            $('#modal-remove-nft').modal('show');
            
            
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

function intRemoveCollection(scolid, callback, cascade) {
    $.ajax({
        url: config.apiUrl + '/nft/studio/collections/remove',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            scolid: scolid,
            cascade: cascade
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            if(callback)
                callback();
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

function removeCollection(scolid, callback) {
    $.ajax({
        url: config.apiUrl + '/nft/studio/collections/get',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            scolid: scolid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            
            $('#modal-remove-col').remove();
            
            $('body').append(`
                <div class="modal fade" tabindex="-1" role="dialog" id="modal-remove-col">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="ps-1 modal-title">Remove collection</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div class="modal-body">
                                <p>Are you sure you want to remove this collection?</p>
                                ${renderCollection(data, true)}
                            </div>
                            
                            <div class="modal-footer">
                                <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button id="mrc-submit" type="button" class="btn btn-primary">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            
            $('#mrc-submit').click(function() {
                $('#modal-remove-col').modal('hide');
                
                if(data.nfts_count == 0)
                    intRemoveCollection(scolid, callback, false);
                
                else {
                    $('#modal-remove-col-cascade').remove();
            
                    $('body').append(`
                        <div class="modal fade" tabindex="-1" role="dialog" id="modal-remove-col-cascade">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="ps-1 modal-title">Collection not empty</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    
                                    <div class="modal-body">
                                        <p>Collection "<strong>${data.name}</strong>" contains ${data.nfts_count} NFTs.<br>
                                        Do you want to remove them or keep them unassigned to any collection?</p>
                                    </div>
                                    
                                    <div class="modal-footer">
                                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button id="mrcc-submit-cascade" type="button" class="btn btn-primary">Remove</button>
                                        <button id="mrcc-submit" type="button" class="btn btn-primary">Keep</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                    
                    $('#mrcc-submit-cascade').click(function() {
                        $('#modal-remove-col-cascade').modal('hide');
                        intRemoveCollection(scolid, callback, true);
                    });
                    
                    $('#mrcc-submit').click(function() {
                        $('#modal-remove-col-cascade').modal('hide');
                        intAjaxRemoveCollection(scolid, callback, false);
                    });
                    
                    $('#modal-remove-col-cascade').modal('show');
                }
            });
            
            $('#modal-remove-col').modal('show');
            
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}