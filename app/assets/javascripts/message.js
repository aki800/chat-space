$(function() {
  function buileHTML(message){
    var haml =  `%p.user__name
  ${message.user_name}
  %span.user__date
    ${message.created_at}

  ${if message.body.present?}
    %p.user__message
      ${message.body}
  ${image_tag message.image.url, class: "lower-message__image" if message.image.present? }`
    return haml;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this)
    var href = window.location.href + '/messages'

  $.ajax({
    url: href,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false;
    contentType: false;
  })
  .done(function(data){
    var html = buileHTMl(data);
    $('.chat__user').append(haml)
    $('.form__message').val('')
    $('#file_photo').val('')
  })
  .fail(function(){
    alert('エラーが発生したため %{resource} は保存されませんでした:');
  })
  })
})

$(function() {
    $('.chat__user').animate({scrollBottom: 0}, 500, 'swing');
});
