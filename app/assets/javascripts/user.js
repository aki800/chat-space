$(document).on('turbolinks:load', function() {
$(function() {

  function appendUserToSearchLists(user) {
    var html = `  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.user_id }" data-user-name="${ user.name }">追加</a>
                  </div>`
      $("#user-search-result").append(html);
  }

  function appendNoUserToSearchLists(user) {
    var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">
                   ${ user }
                 </p>
               </div>`
    $("#user-search-result").append(html);
  }

  function appendUserToMembers(name, user_id) {
    var html =`<div class="chat-group-user clearfix" id="chat-group-user-22">
             <input name ="group[user_ids][]", type ="hidden", value = "${user_id}">
             <p class="chat-group-user__name">
                ${name}
             </p>
             <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除
             </a>
           </div> `
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      dataType: 'json'
    })

    .done(function(user) {
      $("#user-search-result").empty();
        if (user.length !== 0) {
          user.forEach(function(user){
          appendUserToSearchLists(user);
          });
        }
        else {
          appendNoUserToSearchLists("一致するユーザーが見つかりません");
        }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).on("click", ".user-search-add", function() {
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      appendUserToMembers(name, user_id);
  });

  $(document).on("click", ".user-search-remove", function(user) {
     var ele = $(this).parents("#chat-group-user-22")
     ele.remove()
  })

});
});
