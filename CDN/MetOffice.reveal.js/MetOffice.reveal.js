// find the base path of a script
var settings = {};
settings.basePath = null;

if (!settings.basePath) {
  (function (name) {
    var scripts = document.getElementsByTagName('script');

    for (var i = scripts.length - 1; i >= 0; --i) {
      var src = scripts[i].src;
      var l = src.length;
      var length = name.length;
      if (src.substr(l - length) == name) {
        // set a global propery here
        settings.basePath = src.substr(0, l - length);
      }
    }
  })('MetOffice.reveal.js');
}


function add_fullscreen_image_to_sections(sections, url) {
	sections.prepend('<span style="position: absolute; left:0; top:0; width: 100%; height: 100%; z-index: -5;"><img src="' + url +'" style="height:100%; width: 100%;margin: 0px;" class="background" /></span>');
}

function AddBranding(event) {
    function apply_to_dark_sections(sections) {
		sections.prepend('<img src="' + settings.basePath + 'images/MO_Master_W.png" class="logo" />');
        sections.addClass('has-dark-background')
    }
	$('.reveal section').each( function( index, element ){
        var element = $(element);
        if (element.hasClass('title-slide')) {
            apply_to_dark_sections(element);
            if (element.hasClass('globe')) {
                img = 'globe'
            } else if (element.hasClass('network')) {
                img = 'network'
            } else {
                img = 'building'
            }
			add_fullscreen_image_to_sections(element, settings.basePath + 'images/' + img + '.jpg');
		} else if (element.hasClass('questions-slide')) {
  	        apply_to_dark_sections(element);
            if (element.hasClass('alternative')) {
                img = 'questions2'
            } else {
                img = 'questions'
            }
       		add_fullscreen_image_to_sections(element, settings.basePath + 'images/' + img + '.jpg');
        } else if (element.hasClass('black-slide')) {
            apply_to_dark_sections(element);
       		add_fullscreen_image_to_sections(element, settings.basePath + 'images/black.png');
	} else if (element.hasClass('divider-slide')) {
            apply_to_dark_sections(element);
       		add_fullscreen_image_to_sections(element, settings.basePath + 'images/divider.jpg');
	} else if (element.find('section').length === 0) {
            // Only put a logo in if we don't have sub-slides.
			element.prepend('<img src="' + settings.basePath + 'images/MO_Master_B.png" class="logo" />');
		}
	});
}


$( document ).ready(function() {
   Reveal.addEventListener('ready', AddBranding);
})
