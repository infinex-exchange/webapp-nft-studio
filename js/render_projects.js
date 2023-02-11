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

function renderProject(data) {
    if(data.type == 'COLLECTION')
        return renderCollection(data);
    return renderNft(data);
}

function renderCollection(data) {
    var buttons = `
		<a href="/nft/studio/collection/${data.scolid}" class="btn btn-primary btn-sm ms-0">
			<i class="fa-solid fa-pen-to-square"></i>
			Edit
		</a>
	`;
    
    if(data.status == 'DRAFT') {
        buttons += `
            <button type="button" class="btn btn-primary btn-sm" onClick="removeCollection(${data.scolid})">
				<i class="fa-solid fa-trash-can"></i>
				Remove
			</button>
			<button type="button" class="btn btn-primary btn-sm" onClick="enqueueCollection(${data.scolid})">
				<i class="fa-solid fa-check"></i>
				To mint
			</button>
		`;
    }
    
    var preview = data.preview ? data.preview : '/nft/img/no_preview.png';
    
    var badgeNet = '';
    
    if(data.net_name)
	    badgeNet = `
		    <div class="col-12 small secondary">
	            <img src="${data.net_icon}" width="16" height="16">
	            ${data.net_name}
		    </div>
		`;
    
    return `
      <div class="row hoverable separate px-1 py-2">
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
  `;
}

function renderNft(data, back = null, readonly = false) {
    var backSuffix = '';
    if(back)
        backSuffix = '?back=' + back;
    
    var buttons = '';
    
    if(data.status == 'DRAFT' || readonly) {
        buttons += `
            <a href="/nft/studio/nft/${data.snftid}${backSuffix}" class="btn btn-primary btn-sm ms-0">
				<i class="fa-solid fa-pen-to-square"></i>
				Edit
			</a>
			<button type="button" class="btn btn-primary btn-sm" onClick="removeNft(${data.snftid})">
				<i class="fa-solid fa-trash-can"></i>
				Remove
			</button>
			<button type="button" class="btn btn-primary btn-sm" onClick="enqueueNft(${data.snftid})">
				<i class="fa-solid fa-check"></i>
				To mint
			</button>
		`;
    }
    
    var preview = data.preview ? data.preview : '/nft/img/no_preview.png';
    
    var badgeNet = '';
    
    if(data.net_name)
	    badgeNet = `
		    <div class="col-12 small secondary">
	            <img src="${data.net_icon}" width="16" height="16">
	            ${data.net_name}
		    </div>
		`;
    
    return `
      <div class="row hoverable separate px-1 py-2">
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
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

function enqueueCollection(scolid) {
    intEnqueue(
        '/nft/studio/collection/queue',
        {
            api_key: window.apiKey,
            scolid: scolid
        }
    );
}

function enqueueNft(snftid) {
    intEnqueue(
        '/nft/studio/nft/queue',
        {
            api_key: window.apiKey,
            snftid: snftid
        }
    );
}

function intRemoveNft(snftid, callback) {
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
            
            
            $('body').append(`
                <div class="modal fade" tabindex="-1" role="dialog" id="modal-remove-nft">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="ps-1 modal-title">Confirm remove</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div class="modal-body">
                            
                                ${renderNft(data, null, true)}
                                
                            </div>
                            
                            <div class="modal-footer">
                                <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="modal-close btn btn-primary" data-bs-dismiss="modal">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            
            $('#modal-remove-nft').modal('show');
            
            
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}