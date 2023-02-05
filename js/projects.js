$(document).ready(function() {
	window.renderingStagesTarget = 1;
});

$(document).on('authChecked', function() {
	if(!window.loggedIn) return;
	
	window.projects = new AjaxScroll(
        $('#projects-data'),
        $('#projects-data-preloader'),
        {
	        api_key: window.apiKey
        },
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
            
            $.ajax({
                url: config.apiUrl + '/nft/studio/projects',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.projects, function(k, v) {
                        thisAS.append(renderProject(v));
                    });
                    
                    thisAS.done();
            
                    if(thisAS.offset == 0)
                        $(document).trigger('renderingStage');
                        
                    if(data.projects.length != 50)
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

function renderProject(data) {
    var colHeader = '';
    var colFooter = '';
    var nftString = '';
    
    if(data.collection) {
        var lEdit = '/nft/studio/collection/' + data.collection.scolid;
        
        colHeader = `
            <div class="row nested-hoverable collection-item separate px-1 py-2">
	            <div class="col-12">
	                <small class="secondary">COLLECTION</small>
	                <br>
	                <strong>${data.collection.name}</strong>
	            </div>
	            <div class="col-12">
		            <a href="${lEdit}" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-pen-to-square"></i>
                        Edit
                    </a>
	            </div>
	            <div class="col-12">
	    `;
	    
	    colFooter = `
			    </div>
	        </div>
	    `;
	}
	
	$.each(data.nfts, function(k, nft) {
	    var lEdit = '/nft/studio/nft/' + nft.snftid;
	    
		nftString += `
            <div class="row nested-hoverable nft-item separate px-1 py-2">
	            <div class="col-12">
	                <small class="secondary">NFT</small>
	                <br>
	                <strong>${nft.name}</strong>
	            </div>
	            <div class="col-12">
	                <a href="${lEdit}" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-pen-to-square"></i>
                        Edit
                    </a>
	            </div>
	        </div>
	    `;
	});
    
    return colHeader + nftString + colFooter;
}