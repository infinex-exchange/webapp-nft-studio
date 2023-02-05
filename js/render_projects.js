function renderProject(data) {
    if(data.type == 'COLLECTION')
        return renderCollection(data);
    return renderNft(data);
}

function renderCollection(data) {
    var lEdit = '/nft/studio/collection/' + data.scolid;
    
    return `
      <div class="row hoverable separate px-1 py-2">
          <div class="col-12">
              <small class="secondary">COLLECTION</small>
              <br>
              <strong>${data.name}</strong>
          </div>
          <div class="col-12">
              <a href="${lEdit}" class="btn btn-primary btn-sm ms-0">
                  <i class="fa-solid fa-pen-to-square"></i>
                  Edit
              </a>
              <button type="button" class="btn btn-primary btn-sm" onClick="enqueueCollection(${data.scolid})">
                  <i class="fa-solid fa-check"></i>
                  Mint
              </button>
          </div>
      </div>
  `;
}

function renderNft(data) {
    var lEdit = '/nft/studio/nft/' + data.snftid;
    
    return `
      <div class="row hoverable separate px-1 py-2">
          <div class="col-12">
              <small class="secondary">NFT</small>
              <br>
              <strong>${data.name}</strong>
          </div>
          <div class="col-12">
              <a href="${lEdit}" class="btn btn-primary btn-sm ms-0">
                  <i class="fa-solid fa-pen-to-square"></i>
                  Edit
              </a>
              <button type="button" class="btn btn-primary btn-sm" onClick="enqueueNft(${data.snftid})">
                  <i class="fa-solid fa-check"></i>
                  Mint
              </button>
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