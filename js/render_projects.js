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
          </div>
      </div>
  `;
}