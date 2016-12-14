(function () {
  function $(q) {
    return document.querySelector(q);
  }

  function $$(q) {
    return document.querySelectorAll(q);
  }

  function create(elStr, opts) {
    var el = document.createElement(elStr);
    opts && Object.keys(opts).forEach(function (attr) {
      el[attr] = opts[attr];
    });
    return el;
  }

  function parseDate(dateStr) {
    var months = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
    var nyhTimestampFormat = /(\d{1,2}) (\S+) (\d{4}) (\d{2})\.(\d{2})/;
    var match = dateStr.match(nyhTimestampFormat);
    var year, month, day, hour, minute;
    if(match) {
      year = Number(match[3]);
      month = months.indexOf(match[2]);
      day = Number(match[1]);
      hour = Number(match[4]);
      minute = Number(match[5]);
      return new Date(year, month, day, hour, minute);
    }

  }

  var body = document.body;
  moment.locale('sv');

  var wrapper = create('section', { className: 'wrapper'});

  var audio = create('audio', { preload: 'auto' });
  var ogg = create('source', { type: 'audio/ogg', src: 'http://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.ogg' });
  var mp3 = create('source', { type: 'audio/mpeg', src: 'http://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.mp3' });

  audio.appendChild(ogg);
  audio.appendChild(mp3);

  var datetime = $('.nyh_article__date-timestamp').getAttribute('datetime');
  var date = moment(parseDate(datetime));

  var timeAgoWrapper = create('section', { className: 'time-ago-wrapper'});
  var timeAgoText = 'För ' + date.fromNow(true) + ' sedan i en galax ganska nära....';
  var timeAgo = create('div', {className: 'time-ago', innerText: timeAgoText});
  timeAgoWrapper.appendChild(timeAgo);
  wrapper.appendChild(timeAgoWrapper);

  mainLogo = create('img', {src: 'https://star-news.surge.sh/star_news.svg', className: 'main-logo'});
  
  var mainLogoWrapper = create('section', { className: 'main-logo-wrapper'});
  mainLogoWrapper.appendChild(mainLogo);
  wrapper.appendChild(mainLogoWrapper);

  var article = $('.nyh_article');

  var crawl = create('article', { className: 'crawl', innerHTML: article.innerHTML.replace(/data-reactid="\d+"/g, '') });
  var crawlWrapper = create('section', { className: 'crawl-wrapper'});
  crawlWrapper.appendChild(crawl);
  wrapper.appendChild(crawlWrapper);

  body.appendChild(wrapper);


  var scroll = create('style');
  scroll.innerHTML = '@keyframes scroll { from { transform: translateY(1000vh); } to { transform: translateY(' + crawl.clientHeight / -2 + 'px); } }';
  document.head && document.head.appendChild(scroll);

  setTimeout(function () {
    audio.play(); // starts with 8s silence...
  }, 3000);

  setTimeout(function () {
    timeAgoWrapper.classList.add('in');
    audio.play();
  }, 4000);

  setTimeout(function () {
    timeAgoWrapper.classList.add('out');
  }, 9000);

  setTimeout(function () {
    timeAgoWrapper.classList.remove('in');
    mainLogoWrapper.classList.add('in');
  }, 11000);

  setTimeout(function () {
    crawlWrapper.classList.add('in');
  }, 18000);
})();