'use strict';


$('.save-news button.btn').on('click', function (event) {
  const submitBtn = $('.save-news button.btn');
  const spinnerBlock = $('#spinner');
  submitBtn.addClass('no-display');
  spinnerBlock.removeClass('no-display');
  const title = $('input#title').val();
  const subtitle = $('input#subtitle').val();
  const description = $('textarea#description').val();
  const isValid = title && subtitle;
  if (!isValid) {
    submitBtn.removeClass('no-display');
    spinnerBlock.addClass('no-display');
    return;
  }
  event.preventDefault();
  // TODO add logic to media links
  const mediaLinks = [];
  const data = {title, subtitle, description, mediaLinks};

  $.ajax({
    type: 'POST',
    url: '/v1/news/create',
    data: data,
    success: function (data) {
      $('input#title').val('');
      $('input#subtitle').val('');
      $('textarea#description').val('');
      submitBtn.removeClass('no-display');
      spinnerBlock.addClass('no-display');
    },
    error: function (error) {
      submitBtn.removeClass('no-display');
      spinnerBlock.addClass('no-display');
      console.log(error);
    }
  });
});

$('#news-list').on('click', function (event) {
  $.ajax({
    type: 'GET',
    url: '/v1/news/findAll',
    success: function (data) {
      const list = $('#news-list-table tbody');
      list.children().remove();
      data.forEach((news, index) => {
        let htmlElement = '<tr><td>' + news.title + ': ' + news.subtitle + '</td>' + '<td class="td-actions text-right">' +
          '<button type="button" rel="tooltip" title="удалить" class="btn btn-danger btn-simple btn-xs" ' +
          'onclick="openDeleteModal(\'' + news._id + '\', ' + index + ', \'' + news.title + '\')"><i class="material-icons">close</i></button></td></tr>';
        list.append(htmlElement);
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
});

function openDeleteModal(id, index, title) {
  const modal = $('.modal');
  const modalContent = $('.modal-body');
  const modalFooter = $('.modal .modal-footer');
  modalContent.children().remove();
  modalFooter.children().remove();
  const content = '<h4>Вы уверены, что хотите удалить новость ' + title + '?</h4>';
  const btnDelete = '<button class="btn btn-yellow btn-round btn-file btn-save-news" onclick="removeNews(\'' + id + '\', ' + index + ')">Удалить</button>';
  const btnDecline = '<button class="btn btn-yellow btn-round btn-file btn-save-news" onclick="hideModal()">Отменить</button>';
  modalContent.append(content);
  modalFooter.append(btnDelete + btnDecline);
  modal.css('display', 'flex')
}

function hideModal() {
  const modal = $('.modal');
  const modalContent = $('.modal-body');
  const modalFooter = $('.modal .modal-footer');
  modal.css('display', 'none');
  modalContent.children().remove();
  modalFooter.children().remove();
}

function removeNews(id, index) {
  $.ajax({
    type: 'POST',
    url: '/v1/news/remove',
    data: {id},
    success: function (result) {
      if (result) {
        $('#news-list-table tbody').children().slice(index, index + 1).remove();
        hideModal();
      }
    },
    error: function (error) {
      console.log(error);
      const modalContent = $('.modal-body');
      modalContent.append('<h4 style="color: red; font-weight: bold;">' + error.responseJSON.message +'</h4>')
    }
  });
}


