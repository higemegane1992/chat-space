$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="mainchat__body__message">
                    <div class="mainchat__body__message__header">
                      <p class="mainchat__body__message__header__name">
                        ${message.user_name}
                      </p>
                      <p class="mainchat__body__message__header__date">
                      ${message.created_at}
                      </p>
                    </div>
                    <p class="mainchat__body__message__body">
                      ${message.content}
                    </p>
                    <img class="mainchat__body__message__image" src=${message.image}>
                  </div>`;
    } else {
      var html = `<div class="mainchat__body__message">
                    <div class="mainchat__body__message__header">
                      <p class="mainchat__body__message__header__name">
                        ${message.user_name}
                      </p>
                      <p class="mainchat__body__message__header__date">
                      ${message.created_at}
                      </p>
                    </div>
                    <p class="mainchat__body__message__body">
                      ${message.content}
                    </p>
                  </div>`;
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var url = $(this).attr('action');
    var formData = new FormData(this)
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.mainchat__body').append(html);
      $('.mainchat__body').animate({ scrollTop: $('.mainchat__body')[0].scrollHeight});
      $('form')[0].reset();
      $('.mainchat__footer__form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});