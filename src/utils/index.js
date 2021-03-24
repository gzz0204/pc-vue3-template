// import axios from 'axios'
// import '../../mock/index.js'
/**
 * Created by GG on 2018/1/9.
 */

// 获取url参数
function getSearch(name, url = window.location.href) {
  let href = url.replace(/#.*/, '');

  let search = /\?.*/.exec(href);
  search = (search && search[0]) || '';

  let data = {};
  search.replace(/([^?=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    data[decodeURIComponent($1)] = decodeURIComponent($3);
  });
  return name ? data[name] : data;
}

// 设置url参数
function setSearch(name, value, url = window.location.href) {
  let href = url.replace(/[?#].*/, '');

  let data = getSearch(null, url);
  data[name] = value;

  let search = '?' + toSearchParams(data);

  let hash = /#.*/.exec(url);
  hash = (hash && hash[0]) || '';

  return href + search + hash;
}

// 将对象转换为Search参数
function toSearchParams(params) {
  let result = [];
  for (let i in params) {
    if (params[i]) {
      result.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
    }
  }
  return result.join('&');
}

// 格式化时间
function formatDate(dateInput, format) {
  let date = new Date(dateInput);

  let o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return format;
}

// 单页面高度适配
function getResizeStyle(targetHeight = 603, needTranslate = true) {
  if (window.innerWidth >= window.innerHeight) return;

  let deltaHeight = 603 - (window.innerHeight * 375) / window.innerWidth;
  let scale = Math.min((targetHeight - deltaHeight) / targetHeight, 1);

  let transform = `scale(${scale})`;
  if (needTranslate) {
    let translateY = ((scale - 1) / 2) * (100 / scale) + '%';
    transform += ` translateY(${translateY})`;
  }

  return {
    transform,
  };
}

// 获取static目录文件的实际路径
function getStaticPath(path) {
  return __webpack_public_path__ + 'resource/static/' + path // eslint-disable-line
}

// 获取当前页面绝对路径
function getAbsPath(url) {
  if (url) {
    let a = document.createElement('a');
    a.href = url;
    return a.href;
  } else {
    return window.location.href.replace(/([?#]).*/, '');
  }
}

const createEl = (tagname, attr, posEl, innerHTML) => {
  let element = document.createElement(tagname);

  if (tagname === 'div') {
    element.innerHTML = innerHTML;
  }
  for (var key in attr) {
    element.setAttribute(key, attr[key]);
  }
  if (tagname === 'div') {
    posEl.parentNode.insertBefore(element, posEl);
  } else {
    document.getElementsByTagName('head')[0].appendChild(element);
  }
  return element;
};

// 加载script
function loadScript(url, callback) {
  let script = document.createElement('script');
  script.src = url;
  script.onload = function () {
    callback && callback();
    script.parentNode.removeChild(script);
  };
  let target = document.getElementsByTagName('script')[0];
  target.parentNode.insertBefore(script, target);
}

function minPic(picUrl, w, h) {
  if (picUrl.indexOf('cache.netease.com') > -1) {
    return `http://nimg.ws.126.net/?url=${picUrl}&thumbnail=${w}y${h}&quality=75&type=jpg`;
  } else {
    return `${picUrl}?imageView&thumbnail=${w}y${h}&quality=85`;
  }
}

function getItemByValue(obj, name, value) {
  const target = obj.find((item) => item[name] === value);
  return target ? target : {};
}

function getItemsArrayByValue(obj, name, value) {
  const objArray = [];
  obj.forEach((item) => {
    if (item[name] === value) {
      objArray.push(item);
    }
  });
  return objArray;
}

function getter(obj, key) {
  var v = obj;
  var args = key.split('.');
  for (var i = 0; i < args.length; i++) {
    if (!v) return null;
    v = v[args[i]];
  }
  return v;
}

function bubbleSort(array, sortKey, ascendFlag) {
  var i = 0,
    len = array.length,
    j,
    d;
  for (; i < len; i++) {
    for (j = 0; j < len; j++) {
      var vi = getter(array[i], sortKey),
        vj = getter(array[j], sortKey);
      if (ascendFlag) {
        if (vi > vj) {
          d = array[j];
          array[j] = array[i];
          array[i] = d;
        }
      } else {
        if (vi < vj) {
          d = array[j];
          array[j] = array[i];
          array[i] = d;
        }
      }
    }
  }
  return array;
}
// 获取元素位置
let offset = function (dom) {
  var box = dom.getBoundingClientRect();
  var docEle = document.documentElement;
  return {
    x:
      box.left +
      (window.pageXOffset || docEle.scrollLeft || document.body.scrollLeft) -
      docEle.clientLeft,
    y:
      box.top +
      (window.pageYOffset || docEle.scrollTop || document.body.scrollTop) -
      docEle.clientTop,
  };
};
// 文章页 推荐模块用到
let NE = window.NE;
const getOffset = (el) => {
  let { offsetTop: top, offsetLeft: left } = el;
  while (el.offsetParent || el.parentNode) {
    el = el.offsetParent || el.parentNode;
    top += el.offsetTop || 0;
    left += el.offsetLeft || 0;
  }
  return {
    left,
    top,
  };
};
const jsonp = (option, callback, callbackName) => {
  if (!option.url || !callback) {
    return false;
  }
  let { url, data = {} } = option;
  data = NE.json.encode(data);

  window[callbackName] = callback;

  url = NE.para.set(url, 'callback', callbackName);

  if (data) {
    url += '&' + data;
  }

  let attr = {};

  if (option.charset) {
    attr.charset = option.charset;
  }

  if (/g\.163\.com/.test(url)) {
    attr.onerror = function () {};
  }

  attr.src = url;

  createEl('script', attr);
};

function getItemByTwoValue(obj, name1, value1, name2, value2) {
  const target = obj.find(
    (item) => item[name1] === value1 && item[name2] === value2
  );
  return target ? target : {};
}
export {
  getSearch,
  setSearch,
  toSearchParams,
  formatDate,
  getResizeStyle,
  getStaticPath,
  getAbsPath,
  loadScript,
  minPic,
  createEl,
  getItemByValue,
  bubbleSort,
  offset,
  getOffset,
  jsonp,
  getItemByTwoValue,
  getItemsArrayByValue,
};
