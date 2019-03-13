$(document).on('turbolinks:load', function() {

  $(function(){
    function buildHTML(message){
      var addImage = (message.image.url !== null) ? `<img class="lower-message_image" src="${message.image.url}">"` : ''
      console.log(message.image.url);
      var html =  `<p class="user__name">
    ${message.user_name}
    <span class="user__date" style="color: #999999;
          font-size: 12px;
          font-weight: lighter;">
     ${message.time}
    </span></p>

      <p class="user__message">
        ${message.body}</p>
      ${addImage} `
      return html;
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href
      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat__user__messages').append(html)
        $('.form__message').val('')
        $('.fas').prop( 'disabled', false )
        $('.chat__user__messages').animate({scrollTop:$('.chat__user__messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('メッセージを入力してください');
      })

    })
  })
});
