'use strict';
var activeDate;

$('.save-event button.btn').on('click', function (event) {
  const submitBtn = $('.save-event button.btn');
  const spinnerBlock = $('#spinner');
  submitBtn.addClass('no-display');
  spinnerBlock.removeClass('no-display');


  const name = $('input#name').val();
  const date = activeDate;
  const price = +$('input#price').val();
  const title = $('input#title').val();
  const subtitle = $('input#subtitle').val();
  const paymentLink = $('input#paymentLink').val();
  const getReponseLink = $('input#getReponseLink').val();
  const description = $('textarea#description').val();


  const isValid = name && title && subtitle && getReponseLink;
  if (!isValid) {
    submitBtn.removeClass('no-display');
    spinnerBlock.addClass('no-display');
    return;
  }
  event.preventDefault();
  // TODO add logic to media links
  const mediaLinks = [];
  const data = {name, date, price, title, subtitle, paymentLink, getReponseLink, description, mediaLinks};

  $.ajax({
    type: 'POST',
    url: '/v1/events/create',
    data: data,
    success: function (data) {
      $('input#name').val('');
      $('input#date').val('');
      $('input#price').val('');
      $('input#title').val('');
      $('input#subtitle').val('');
      $('input#paymentLink').val('');
      $('input#getReponseLink').val('');
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

$('#events-list').on('click', function (event) {
  $.ajax({
    type: 'GET',
    url: '/v1/events/findAll',
    success: function (data) {
      const list = $('#events-list-table tbody');
      list.children().remove();
      data.forEach((event, index) => {
        let htmlElement = '<tr><td>' + event.title + ': ' + event.subtitle + '</td>' + '<td class="td-actions text-right">' +
          '<button type="button" rel="tooltip" title="удалить" class="btn btn-danger btn-simple btn-xs" ' +
          'onclick="openDeleteModal(\'' + event._id + '\', ' + index + ', \'' + event.title + '\')"><i class="material-icons">close</i></button></td></tr>';
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
  const content = '<h4>Вы уверены, что хотите удалить мероприятие ' + title + '?</h4>';
  const btnDelete = '<button class="btn btn-yellow btn-round btn-file btn-save-event" onclick="removeNews(\'' + id + '\', ' + index + ')">Удалить</button>';
  const btnDecline = '<button class="btn btn-yellow btn-round btn-file btn-save-event" onclick="hideModal()">Отменить</button>';
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
    url: '/v1/events/remove',
    data: {id},
    success: function (result) {
      if (result) {
        $('#events-list-table tbody').children().slice(index, index + 1).remove();
        hideModal();
      }
    },
    error: function (error) {
      console.log(error);
      const modalContent = $('.modal-body');
      modalContent.append('<h4 style="color: red; font-weight: bold;">' + error.responseJSON.message + '</h4>')
    }
  });
}

function handleDescriptionCheckClick(checkbox) {
  if (checkbox.checked) {
    $('#descriptionBlock').removeClass('no-display');
  } else {
    $('#descriptionBlock').addClass('no-display');
  }
}

function handlePaymentLinkCheckClick(checkbox) {
  if (checkbox.checked) {
    $('#paymentLinkBlock').removeClass('no-display');
  } else {
    $('#paymentLinkBlock').addClass('no-display');
  }
}

$(document).ready(() => {
  $(function () {
    $('#date').datetimepicker({
      locale: moment.locale('ru')
    });

    $('#date').on('dp.change', (newDateObj) => {
      activeDate = newDateObj.date.toDate().getTime();
      const formattedTime = newDateObj.date.format('DD.MM.YYYY HH:MM');
      $('#date-empty-block').removeClass('is-empty has-error');
    })
  });
});


