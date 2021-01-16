function detectmobile() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // mobile
        return true;
    }
    else {
        // pc
        return false;
    }
}