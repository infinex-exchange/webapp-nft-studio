function renderProject(data) {
    if(data.type == 'COLLECTION')
        return renderCollection(data);
    return renderNft(data);
}

function renderCollection(data) {
    var lEdit = '/nft/studio/collection/' + data.collection.scolid;
    
    return `
      <div class="row hoverable separate px-1 py-2">
          <div class="col-12">
              <small class="secondary">COLLECTION</small>
              <br>
              <strong>${data.collection.name}</strong>
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
    var lEdit = '/nft/studio/collection/' + data.collection.scolid;
    
    return `
        <div class="row nested-hoverable collection-item separate px-1 py-2">
            <div class="col-12">
                <small class="secondary">COLLECTION</small>
                <br>
                <strong>${data.collection.name}</strong>
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