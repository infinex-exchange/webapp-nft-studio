function initUpload(elem, utType, isImage, currentUrl, readOnly = false) {
	var preview = `
		<span class="preview-empty d-none">
		    <i class="fa-solid fa-file-circle-xmark"></i>
			No file selected
		</span>
	`;
	
	if(isImage)
		preview += `
			<img class="img-fluid preview-img d-none" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
		`;
	
	else
		preview += `
			<a href="#" class="preview-link d-none" target="_blank">
				<i class="fa-solid fa-file-lines"></i>
				<span class="preview-ext"></span> file
			</a>
		`;
	
	var buttons = '';
	
	if(!readOnly)
		buttons = `
			<div class="col-auto mx-auto pt-3">
				<button type="button" class="btn-upload btn btn-primary btn-sm">
			        <i class="fa-solid fa-upload"></i>
		            <span class="text-upload d-none">Upload</span>
		            <span class="text-replace d-none">Replace</span>
		        </button>
		        <button type="button" class="btn-remove d-none btn btn-primary btn-sm">
			        <i class="fa-solid fa-trash-can"></i>
			        Remove
		        </button>
	        </div>
		`;
	
	$(elem).append(`
		<div class="upload-control ui-card-light p-3">
			<div class="row">
				<div class="col-12 text-center preview-any">
					${preview}
				</div>
                <div class="col-12 pt-5 d-none progress-wrapper">
                    <div class="indet-progress-bar">
                        <div class="indet-progress-bar-value"></div>
                    </div>
                </div>
                ${buttons}
		    </div>
	        <input class="file-input d-none" type="file">
        </div>
	`);
	
	if(currentUrl) {
		if(isImage)
			$(elem).find('.preview-img').attr('src', currentUrl)
			                            .removeClass('d-none');
		
		else {
			var extension = currentUrl.split('.').pop().toUpperCase();
			$(elem).find('.preview-ext').html(extension);
			$(elem).find('.preview-link').attr('href', currentUrl)
			                             .removeClass('d-none');
		}
		
		$(elem).find('.text-replace, .btn-remove').removeClass('d-none');
	}
	
	else {
	    $(elem).find('.preview-empty, .text-upload').removeClass('d-none');
	}
	
	if(readOnly)
		return;
	
	var fileInput = $(elem).find('.file-input');
	var buttons = $(elem).find('.btn-upload, .btn-remove');
	
	$(elem).find('.btn-upload').click(function() {
		fileInput.val('').trigger('click');
	});
    
    fileInput.on('change', function() {
        if(fileInput.val() == '')
            return;
        
        buttons.prop('disabled', true);
        $(elem).find('.preview-any').addClass('d-none');
        $(elem).find('.progress-wrapper').removeClass('d-none');
		
		$.ajax({
            url: config.apiUrl + '/nft/studio/start_upload',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                type: utType
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
	            
	            var ticket = data.ticket;
	            
		        var fd = new FormData();
		        fd.append('file', fileInput[0].files[0]);
		        fd.append('upload_ticket', ticket);
		        
		        $.ajax({
		            url: studioConfig.cdnUrl + '/upload',
		            type: 'POST',
		            data: fd,
		            contentType: false,
		            processData: false,
		            dataType: "json",
		        })
		        .retry(config.retry)
		        .done(function (data) {
		            if(data.success) {
		                $(elem).data('ticket', ticket);
		                $(elem).find('.progress-wrapper').addClass('d-none');
		                
		                if(isImage)
		                    $(elem).find('.preview-img').attr('src', studioConfig.cdnUrl + data.url)
					                                    .removeClass('d-none');
		                
		                else {
		                    var extension = data.url.split('.').pop().toUpperCase();
		        			$(elem).find('.preview-ext').html(extension);
		        			$(elem).find('.preview-link').attr('href', studioConfig.cdnUrl + data.url)
		        			                             .removeClass('d-none');
		                }
		                
		                $(elem).find('.text-upload, .preview-empty').addClass('d-none');
		                $(elem).find('.text-replace, .preview-any, .btn-remove').removeClass('d-none');
		        	    buttons.prop('disabled', false);
		            }
		            else {
		                msgBox(data.error);
		                $(elem).find('.progress-wrapper').addClass('d-none');
		                $(elem).find('.preview-any').removeClass('d-none');
		        	    buttons.prop('disabled', false);
		            }
		        })
		        .fail(function (jqXHR, textStatus, errorThrown) {
		            msgBoxNoConn();
		            $(elem).find('.progress-wrapper').addClass('d-none');
		            $(elem).find('.preview-any').removeClass('d-none');
		    	    buttons.prop('disabled', false);
		        });
	            
            }
            else {
                msgBox(data.error);
                $(elem).find('.progress-wrapper').addClass('d-none');
                $(elem).find('.preview-any').removeClass('d-none');
                buttons.prop('disabled', false);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();
            $(elem).find('.progress-wrapper').addClass('d-none');
            $(elem).find('.preview-any').removeClass('d-none');
            buttons.prop('disabled', false);
        });
    });
    
    $(elem).find('.btn-remove').click(function() {
	    $(elem).data('ticket', null);
        $(elem).find('.btn-remove, .preview-img, .preview-link, .text-replace').addClass('d-none');
        $(elem).find('.preview-empty, .text-upload').removeClass('d-none');
    });
}