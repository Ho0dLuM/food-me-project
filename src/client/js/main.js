(function ($) {
  $('.review').on('click', function () {
    if (this === $('.active')[0]) {
      removeActive()
    } else {
      addActive.apply(this)
    }
  })

  $('[id^="delete-"]').on('click', function (e) {
    e.preventDefault()
    let self = this
    let $button = $(this)
    let url = $button.attr('href')
    let type = 'DELETE'

    $.ajax({ url, type })
      .success(function (msg) {
        if ($button.data().deleteRedirect) deleteRedirect(url)
        if ($button.data().deleteTable) deleteTable.apply(self)
      })
      .fail(function (msg) {
        console.log('Failure!', msg)
      })
  })

  function deleteRedirect (url) {
    let parent = url.split('/')
    parent.pop()

    window.location.pathname = parent.join('/')
  }

  function deleteTable () {
    $tbody = $(this).closest('tbody')
    $(this).closest('tr').remove()
    console.log($tbody)

    if (!$tbody.children().length) $tbody.closest('.row').remove()
  }

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
