function validateNftName(name) {
    return name.match(/^[a-zA-Z0-9 .,\-_+=()@#%?]{1,86}$/);
}

function validateNftDesc(desc) {
    return desc.match(/^[a-zA-Z0-9 .,\-_+=()@#%?]{1,2048}$/);
}

function validateTwitter(twitter) {
    return twitter.match(/^[a-zA-Z0-9_]{1,25}$/);
}

function validateAttrKey(key) {
    return key.match(/^[a-zA-Z0-9 ._]{1,86}$/);
}

function validateAttrValue(val) {
    return val.match(/^[a-zA-Z0-9 .,\-_+=()@#%?]{1,1024}$/);
}