$('#submit-login-btn').on('click', () => {
  const submitBtn = $('#submit-login-btn');
  const spinnerBlock = $('#spinner');

  const username = $('input#username').val();
  const password = $('input#password').val();

  const isValid = username && password;
  if (!isValid) {
    submitBtn.removeClass('no-display');
    spinnerBlock.addClass('no-display');
    return;
  }
  event.preventDefault();
  const data = {username, password};
  $.ajax({
    type: 'POST',
    url: '/v1/users/login',
    data: data,
    success: function (data) {
      $('input#username').val('');
      $('input#password').val('');
      $('textarea#description').val('');
      submitBtn.removeClass('no-display');
      spinnerBlock.addClass('no-display');
      window.localStorage.setItem('grammy-admin-token-value', data.token);
      window.localStorage.setItem('grammy-admin-token-expire-date', new Date().getTime() + 1000 * 60 * 60 * 36); // 36 hours after
      window.location.href = '/admin/events';
    },
    error: function (error) {
      submitBtn.removeClass('no-display');
      spinnerBlock.addClass('no-display');
      console.log(error);
    }
  });
});