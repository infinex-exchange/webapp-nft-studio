function removeAttribute(elem) {
    $(this).parent('.attribute-item').remove();
}

function addAttribute(key = '', value = '') {
    $('#attributes').append(`
        <div class="row hoverable attribute-item">
            <div class="col-4">
                <input type="text" class="form-control attribute-key" value="${key}">
            </div>
            <div class="col-4">
                <input type="text" class="form-control attribute-value" value="${value}">
            </div>
            <div class="col-auto ms-auto my-auto" onClick="removeAttribute(this)">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
    `);
}

function setAttributes(attributes) {
    $.each(attributes, function(k, v) {
        addAttribute(v.key, v.value);
    });
}

function getAttributes() {
    //
}