(function ($) {
  $('.review').on('click', function () {
    if (this === $('.active')[0]) {
      removeActive()
    } else {
      addActive.apply(this)
    }
  })

  function removeActive () {
    $('.active').children('.truncated').show()
    $('.active').children('.full-content').hide()
    $('.active').removeClass('active')
  }

  function addActive () {
    removeActive()
    $(this).addClass('active')
    $(this).children('.truncated').hide()
    $(this).children('.full-content').show()
  }
})(window.$)
