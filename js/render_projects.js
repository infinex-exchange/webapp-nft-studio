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
    
    var preview = '/nft/img/no_preview.png';
    
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
          <div class="col-3 my-auto pe-0">
	          <img src="${preview}" class="img-fluid">
          </div>
          <div class="col-9 my-auto">
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

function renderNft(data, back = null) {
    var backSuffix = '';
    if(back)
        backSuffix = '?back=' + back;
    
    var buttons = '';
    
    if(data.status == 'DRAFT') {
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
    
    var preview = '/nft/img/no_preview.png';
    
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
	      <div class="col-3 my-auto pe-0">
	          <img src="${preview}" class="img-fluid">
          </div>
	      <div class="col-9 my-auto">
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