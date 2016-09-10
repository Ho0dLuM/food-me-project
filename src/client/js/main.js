(function () {
  var faded = false;
  var $h3 = $('#review h3')
  var $p = $('#review p')

  $h3.css({ opacity: 1 })
  $p.css({ opacity: 0.15 })

  $(window).on('scroll', function () {
    if (!faded) {
      $h3.animate({ opacity: 0.15 }, 1000)
      $p.animate({ opacity: 1 }, 1000)
      faded = true
    }
  })
})()
