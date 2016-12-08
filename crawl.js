(function () {
  function $(q) {
    return document.querySelector(q);
  }

  function $$(q) {
    return document.querySelectorAll(q);
  }

  function create(elStr, opts) {
    var el = document.createElement(elStr);
    Object.keys(opts).forEach(function (attr) {
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

  var h1 = $('.nyh_article__heading').innerText;
  var article = $('.nyh_article');

  var wrapper = create('article', { className: 'wrapper'});

  var datetime = $('.nyh_article__date-timestamp').getAttribute('datetime');
  var date = moment(parseDate(datetime));

  var timeAgoWrapper = create('article', { className: 'time-ago-wrapper'});
  var timeAgoText = 'För ' + date.fromNow(true) + ' sedan i en galax ganska nära...';
  var timeAgo = create('div', {className: 'time-ago', innerText: timeAgoText});
  timeAgoWrapper.appendChild(timeAgo);
  wrapper.appendChild(timeAgoWrapper);

  var xhr = new XMLHttpRequest();
  xhr.open("GET","https://www.svtstatic.se/resources/svtservice-n-render/svt_nyheter_2.svg",false);
  xhr.send("");
  svg = xhr.responseXML.documentElement;
  
  var svgWrapper = create('article', { className: 'svg-wrapper'});
  svgWrapper.appendChild(svg);
  wrapper.appendChild(svgWrapper);

  $$('.cls-1').forEach(function(el) {
    el.style.fill = 'yellow';
  });

  body.appendChild(wrapper);
})();