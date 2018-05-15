$('#logout').on('click', () => {
  window.localStorage.setItem('grammy-admin-token-value', '');
  window.localStorage.setItem('grammy-admin-token-expire-date', '');
  window.location.href = '/admin';
});
