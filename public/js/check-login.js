'use strict';
(function () {
  const token = window.localStorage.getItem('grammy-admin-token-value');
  const expiredTime = +window.localStorage.getItem('grammy-admin-token-expire-date');
  if (!token || expiredTime < new Date().getTime()) {
    window.localStorage.setItem('grammy-admin-token-value', '');
    window.localStorage.setItem('grammy-admin-token-expire-date', '');
    window.location.href = '/admin';
  }
})();
