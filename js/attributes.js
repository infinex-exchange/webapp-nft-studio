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
                <a href="#_" class="nav-link attribute-remove">
                    <i class="fa-solid fa-xmark"></i>
                </a>
            </div>
        </div>
    `);
    
    $('.attribute-remove').off('click').on('click', function() {
        console.log($(this).parent('.attribute-item'));
    });
}

function setAttributes(attributes) {
    $.each(attributes, function(k, v) {
        addAttribute(v.key, v.value);
    });
}

function getAttributes() {
    //
}