var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var DETAIL_BUTTON_SELECTOR = '[data-image-role="button"]'

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
  }

function setDetailsFromThumb(thumb, index) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
    setFrameImageIndex(index);
}

function setFrameImageIndex(imgIndex) {
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    frame.setAttribute('data-image-index', imgIndex);
}

function getFrameImageIndex() {
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    return parseInt(frame.getAttribute('data-image-index'));
}

function addThumbClickHandler(thumb, index) { 
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        //console.log('clicked');
        setDetailsFromThumb(thumb, index);
        showDetails();
    });
}

function getThumbnailsArray() { 
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() { 
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) { 
            hideDetails();
        }
    });
}

function detailImageButtonClick(direction) { // direction: -1 = left, 1 = right
    var imgIndex = getFrameImageIndex();
    var thumbArray = getThumbnailsArray();
    //console.log(imgIndex, thumbArray.length);
    imgIndex = (imgIndex + direction).mod(thumbArray.length);
    //console.log(imgIndex, thumbArray.length);
    setDetailsFromThumb(thumbArray[imgIndex], imgIndex);
}

function addDetailImgButtonHandlers() {
    var buttons = document.querySelectorAll(DETAIL_BUTTON_SELECTOR);
    //console.log(buttons[0]);
    buttons.forEach(function(btn) {
        btn.onclick = function(event) {
            var dir = parseInt(btn.getAttribute('button-value'));
            detailImageButtonClick(dir);
        };
    });
}

function initializeEvents() {
    'use strict';

    var thumbnails = getThumbnailsArray();
    var thumbnailImgIndex = 0;
    thumbnails.forEach(() => {
        addThumbClickHandler(thumbnails[thumbnailImgIndex], thumbnailImgIndex);
        thumbnailImgIndex++;
    });

    addKeyPressHandler();
    addDetailImgButtonHandlers();
}

// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

initializeEvents();
