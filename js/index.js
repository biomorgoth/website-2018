var defaultLang = function(lang) {
  return navigator.languages
    .map(function(i) { return i.substr(0, 2); })
    .filter(function(i) { return ["es", "en", "pt"].indexOf(i) >= 0; })[0] || lang || "en"
}

var availableDomains = {
  "jooycar.com": { country: null, lang: defaultLang("es") },
  "usa.jooycar.com": { country: "US", lang: "en" },
  "jooycar.mx": { country: "MX", lang: "es" },
  "jooycar.com.co": { country: "CO", lang: "es" },
  "jooycar.com.br": { country: "BR", lang: "pt" },
  "jooycar.com.pe": { country: "PE", lang: "es" },
  "jooycar.cl": { country: "CL", lang: "es" }
}

var getDomain = function() {
  return availableDomains[window.location.hostname] || availableDomains["jooycar.com"]
}

var currentDomain = getDomain();

$(function () {

  function ConvertFormToJSON(form) {
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function () {
      json[this.name] = this.value || '';
    });

    return json;
  }
  // init the validator
  // validator files are included in the download package
  // otherwise download from http://1000hz.github.io/bootstrap-validator

  // $('#contact-form-obj').validator(); //need the form validation
  // when the form is submitted
  $('#contact-form-obj').on('submit', function (e) {
    // if the validator does not prevent form submit
    if (!e.isDefaultPrevented()) {
      var jsonObj = ConvertFormToJSON(this);
      jsonObj.country = currentDomain.country;
      var url = "https://api01.jooycar.com/api/v1/core/contacts/msg"; // changes for real data
      // POST values in the background the the script URL
      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(jsonObj),
        dataType: "json",
        processData: false,
        contentType: "application/json",
        complete: function (e, xhr, settings) {
          var messageAlert = "alert-danger"
          var messageText = "We have problems at this moment. Please try again later";
          if (e.status === 200 || e.status === 201) {
            messageAlert = "alert-success";
            messageText = "We will contact you soon!"
          }

          // let's compose Bootstrap alert box HTML
          var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

          // If we have messageAlert and messageText
          if (messageAlert && messageText) {
            // inject the alert to .messages div in our form
            $('#contact-form-obj').find('.messages').html(alertBox);
            // empty the form
            $('#contact-form-obj')[0].reset();
          }
        },
      });
      return false;
    }
  })
});
