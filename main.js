    (function () {
      'use strict';
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      /* ---------- Header border on scroll ---------- */
      var header = document.querySelector('.site-header');
      var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      /* ---------- Mobile menu ---------- */
      var toggle = document.querySelector('.menu-toggle');
      var menu = document.getElementById('mobile-menu');
      var setMenu = function (open) {
        toggle.setAttribute('aria-expanded', String(open));
        menu.hidden = !open;
        if (open) { var first = menu.querySelector('a'); if (first) first.focus(); }
      };
      toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
      menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
      });
      window.matchMedia('(min-width: 960px)').addEventListener('change', function (mq) { if (mq.matches) setMenu(false); });

      /* ---------- Reveal on scroll ---------- */
      if ('IntersectionObserver' in window) {

        /* ---------- Reveal on scroll ---------- */
        var rio = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
        }, { rootMargin: '0px 0px -8% 0px' });
        document.querySelectorAll('.reveal').forEach(function (el) { rio.observe(el); });
      } else {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      }

      /* ---------- Muted looping videos: load + play only when visible; each has a pause control ---------- */
      document.querySelectorAll('.video-frame').forEach(function (frame) {
        var video = frame.querySelector('video');
        var vbtn = frame.querySelector('.video-toggle');
        if (!video || !vbtn) return;
        var userPaused = reduceMotion.matches;
        var setBtn = function () {
          var playing = !video.paused;
          vbtn.setAttribute('aria-pressed', String(playing));
          vbtn.querySelector('span').textContent = playing ? 'Pause' : 'Play';
          vbtn.querySelector('use').setAttribute('href', playing ? '#i-pause' : '#i-play');
          vbtn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
        };
        var play = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
        vbtn.hidden = false;
        setBtn();
        video.addEventListener('play', setBtn);
        video.addEventListener('pause', setBtn);
        vbtn.addEventListener('click', function () {
          if (video.paused) { userPaused = false; play(); } else { userPaused = true; video.pause(); }
        });
        video.addEventListener('error', function () { vbtn.hidden = true; }, true);
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting && !userPaused) play();
              else if (!e.isIntersecting && !video.paused) video.pause();
            });
          }, { threshold: 0.35 }).observe(video);
        }
      });

      /* ---------- Application form ---------- */
      var form = document.getElementById('apply-form');
      if (form) {
      var success = document.getElementById('apply-success');
      var statusEl = document.getElementById('apply-status');
      var submitBtn = document.getElementById('apply-submit');
      var submitLabel = document.getElementById('apply-submit-label');

      var messages = {
        name: { valueMissing: "Please enter the student's name." },
        email: { valueMissing: 'Please enter an email address.', typeMismatch: 'Please enter a valid email, like name@example.com.' },
        school: { valueMissing: 'Please enter the school name.' },
        grade: { valueMissing: 'Please select a grade.' }
      };
      var validateField = function (el) {
        if (!messages[el.name]) return true;
        if (el.type !== 'email' && el.value && !el.value.trim()) el.value = '';
        var errEl = document.getElementById('e-' + el.name);
        var v = el.validity, msg = '';
        if (v.valueMissing) msg = messages[el.name].valueMissing;
        else if (v.typeMismatch) msg = messages[el.name].typeMismatch || 'Please check this field.';
        el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (errEl) errEl.textContent = msg;
        return !msg;
      };
      var fields = Array.prototype.slice.call(form.querySelectorAll('input[required], select[required]'));
      fields.forEach(function (el) {
        el.addEventListener('blur', function () { if (el.value || el.getAttribute('aria-invalid') === 'true') validateField(el); });
        el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') validateField(el); });
        el.addEventListener('change', function () { if (el.getAttribute('aria-invalid') === 'true') validateField(el); });
      });

      var sending = false;
      var setSending = function (on) {
        sending = on;
        submitBtn.disabled = on;
        submitBtn.classList.toggle('loading', on);
        submitBtn.setAttribute('aria-busy', String(on));
        submitLabel.textContent = on ? 'Sending…' : 'Submit application';
      };

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (sending) return;
        statusEl.textContent = ''; statusEl.className = 'form-status';
        var firstBad = null;
        fields.forEach(function (el) { if (!validateField(el) && !firstBad) firstBad = el; });
        if (firstBad) {
          statusEl.textContent = 'Please fix the highlighted fields.';
          statusEl.className = 'form-status error';
          firstBad.focus();
          return;
        }
        setSending(true);
        var data = new FormData(form);
        var ctrl = 'AbortController' in window ? new AbortController() : null;
        var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 20000) : null;
        fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }, signal: ctrl ? ctrl.signal : undefined })
          .then(function (res) {
            if (!res.ok) throw new Error('Formspree responded ' + res.status);
            var first = String(data.get('name') || '').trim().split(/\s+/)[0];
            if (first) document.getElementById('apply-name').textContent = first;
            form.hidden = true;
            success.hidden = false;
            document.getElementById('apply-success-title').focus();
            if (typeof gtag === 'function') gtag('event', 'generate_lead', { form: 'humanoid_apply' });
          })
          .catch(function (err) {
            console.error(err);
            statusEl.className = 'form-status error';
            statusEl.innerHTML = 'Sorry, something went wrong and your application was not sent. Please try again, or email <a class="text-link" href="mailto:hello@genboo.com">hello@genboo.com</a>.';
            setSending(false);
          })
          .then(function () { if (timer) clearTimeout(timer); });
      });
      }
    })();
