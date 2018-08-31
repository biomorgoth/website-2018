jQuery(document).ready(function($) {

  var gotoCountry = function(elem) {
    var country = elem.attr('data-country');
    window.setLocalVal[window.storage]('country', country);
    top.location.href = elem.attr('href');
  };

  var colorCircle = function(elem, on) {
    elem.attr('fill', on ? '#ffffff' : '#FFAE71');
  };

  var mySVGsToInject = document.querySelectorAll('#svg-inject');
  SVGInjector(mySVGsToInject, {}, function() {

    $('.countries a').click(function(e) {
      gotoCountry($(this));
      e.preventDefault();
    });

    $('.countries a').hover(
      function() {
        var ref = $('#'+$(this).attr('id').substr(4));
        colorCircle(ref, true);
      },
      function() {
        var ref = $('#'+$(this).attr('id').substr(4));
        colorCircle(ref, false);
      }
    );

    $('#svg-inject circle').hover(
      function() {
        var ref = $('#lnk-'+$(this).attr('id'));
        ref.addClass('hover');
        colorCircle($(this), true);
      },
      function() {
        var ref = $('#lnk-'+$(this).attr('id'));
        ref.removeClass('hover');
        colorCircle($(this), false);
      }
    );

    $('#svg-inject circle').click(function() {
      gotoCountry($('#lnk-'+$(this).attr('id')));
    });
  });
}); 
