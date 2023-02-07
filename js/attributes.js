function removeAttribute(elem) {
    console.log($(elem).parent('.attribute-item'));
}

function addAttribute(key = '', value = '') {
    $('#attributes').append(`
        <div class="row attribute-item">
            <div class="col-5">
                <input type="text" class="form-control attribute-key" value="${key}">
            </div>
            <div class="col-auto px-0 my-auto">
                <strong>=</strong>
            </div>
            <div class="col-5">
                <input type="text" class="form-control attribute-value" value="${value}">
            </div>
            <div class="col-auto ms-auto my-auto">
                <i class="fa-solid fa-xmark nav-link" onClick="removeAttribute(this)"></i>
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