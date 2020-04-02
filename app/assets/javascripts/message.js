$(function(){
  function buildHTML(message){
    if (message.image) {
      //data-idが反映されるようにしている
      var html =
       `<div class="mainchat__body__message" data-message-id=${message.id}>
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
          <img class="mainchat__body__message__image" src=${message.image} >
        </div>`
      return html;
    } else {
      //同様にdata-idが反映されるようにしている
      var html =
      `<div class="mainchat__body__message" data-message-id=${message.id}>
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
       </div>`
      return html;
    };
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.mainchat__body__message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.mainchat__body').append(insertHTML);
        $('.mainchat__body').animate({ scrollTop: $('.mainchat__body')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});