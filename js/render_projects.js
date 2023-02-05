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
				Mint
			</button>
		`;
    }
    
    var preview = '/nft/img/no_preview.png';
    
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
		              <h5>${data.name}</h5>
		          </div>
		          <div class="col-12">
		              ${buttons}
		          </div>
		      </div>
          </div>
      </div>
  `;
}

function renderNft(data) {
    var buttons = '';
    
    if(data.status == 'DRAFT') {
        buttons += `
            <a href="/nft/studio/nft/${data.snftid}" class="btn btn-primary btn-sm ms-0">
				<i class="fa-solid fa-pen-to-square"></i>
				Edit
			</a>
			<button type="button" class="btn btn-primary btn-sm" onClick="removeNft(${data.snftid})">
				<i class="fa-solid fa-trash-can"></i>
				Remove
			</button>
			<button type="button" class="btn btn-primary btn-sm" onClick="enqueueNft(${data.snftid})">
				<i class="fa-solid fa-check"></i>
				Mint
			</button>
		`;
    }
    
    var preview = '/nft/img/no_preview.png';
    
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
		          <div class="col-12">
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