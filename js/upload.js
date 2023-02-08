function initUpload(elem, utType, isImage, currentUrl) {
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
	
	$(elem).append(`
		<div class="upload-control ui-card-light border p-2">
			<div class="row">
				<div class="col-12 text-center preview-any">
					${preview}
				</div>
                <div class="col-12 py-4 d-none progress-wrapper">
                    <div class="indet-progress-bar">
                        <div class="indet-progress-bar-value"></div>
                    </div>
                </div>
				<div class="col-auto mx-auto">
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
		    </div>
	        <input class="file-input d-none" type="file">
        </div>
	`);
	
	if(currentUrl) {
		if(isImage)
			$(elem).find('.preview-img').attr('src', currentUrl)
			                            .removeClas('d-none');
		
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
	
	var fileInput = $(elem).find('.file-input');
	var btnUpload = $(elem).find('.btn-upload');
	
	btnUpload.click(function() {
		if(typeof fileInput.data('ticket-fresh') != 'undefined') {
			fileInput.trigger('click');
		    return;
		}
		
		btnUpload.prop('disabled', true);
		
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
                 fileInput.data('ticket-fresh', data.ticket)
                          .trigger('click');
                 btnUpload.prop('disabled', false);
            }
            else {
                msgBox(data.error);
                btnUpload.prop('disabled', false);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();
            btnUpload.prop('disabled', false);
        });
    });
    
    fileInput.on('change', function() {
        if(fileInput.val() == '')
            return;
        
	    btnUpload.prop('disabled', true);
        $(elem).find('.preview-any').addClass('d-none');
        $(elem).find('.progress-wrapper').removeClass('d-none');
        
        var ticket = fileInput.data('ticket-fresh');
        
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
        	    fileInput.removeData('ticket-fresh');
                $(elem).find('.progress-wrapper').addClass('d-none');
                $(elem).find('.preview-any').removeClass('d-none');
        	    btnUpload.prop('disabled', false);
            }
            else {
                msgBox(data.error);
                fileInput.removeData('ticket-fresh');
                $(elem).find('.progress-wrapper').addClass('d-none');
                $(elem).find('.preview-any').removeClass('d-none');
        	    btnUpload.prop('disabled', false);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();
            fileInput.removeData('ticket-fresh');
            $(elem).find('.progress-wrapper').addClass('d-none');
            $(elem).find('.preview-any').removeClass('d-none');
    	    btnUpload.prop('disabled', false);
        });
    });
    
    fileInput.on('click', function() {
        fileInput.val('');
    });
    
    $(elem).find('.btn-remove').click(function() {
	    $(elem).data('ticket', null);
    });
}