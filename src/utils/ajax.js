import axios from 'axios'; // 引入axios
import fetchJsonp from 'fetch-jsonp';

if (process.env.NODE_ENV == 'development') {
  // axios.defaults.baseURL = 'https://easy-mock.com/mock/5fbdbab80295b12de9e9a2af/football'
  // axios.defaults.baseURL = 'http://localhost'
  // axios.defaults.baseURL = 'http://t.c.m.163.com/base/cs/'
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://t.c.m.163.com/base/cs/';
  // axios.defaults.baseURL = '//api.sports.163.com/base/cs/'
}

axios.defaults.timeout = 10000; // 设置默认请求超时时间
// post请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          console.log('网络请求不存在');
          break;
          // 其他错误，直接抛出错误提示
        default:
          console.log(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);

// 将对象转换为Search参数
function toSearchParams(params) {
  let result = [];
  for (let i in params) {
    if (Object.prototype.hasOwnProperty.call(params, i)) {
      result.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
    }
  }
  return result.join('&');
}

function transfromUrl(url, urlParams) {
  let _url = url;
  let reg = /\${(\w+)}/g;
  // let matches = _url.match(reg)
  _url = _url.replace(reg, function () {
    return urlParams[arguments[1]];
  });
  return _url;
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} type [请求参数拼接方式，不传'insertuery'，为一般模式，参数直接以？&形式拼接。'insertuery'，表示参数将用于url中替换对应变量] 
 */

function get(url, urlParams, type) {
  let _url = url;
  let params = urlParams;
  // 不传'insertuery'，为一般模式，参数直接以？&形式拼接。'insertuery'，表示参数将用于url中替换对应变量。
  if (type === 'insertuery') {
    _url = transfromUrl(url, urlParams);
    params = {};
  }
  return new Promise((resolve, reject) => {
    axios
      .get(_url, {
        params: params,
      })
      .then((res) => {
        if (res.data.code !== 0) {
          return reject(res);
        }
        if (res.data.data != null) {
          resolve(res.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, toSearchParams(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

/**
 * jsonp方法，对应jsonp请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

function jsonp(url, params = {}) {
  return new Promise((resolve, reject) => {
    url = url + '?' + toSearchParams(params);
    fetchJsonp(url, {
        jsonpCallbackFunction: 'jsonpCallback_' + Math.random().toString(36).substr(2),
      })
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * ajax
 * @param {String} url [请求的url地址]
 * @param {String} method [请求方法, get|post|jsonp] ，不填写默认是get请求
 * @param {Object} params [请求时携带的参数]
 */
function ajax(url, method = 'get', params = {}) {
  let _method;
  // 第二项如果直接写的请求的对象参数，那么默认是get请求
  if (Object.prototype.toString.call(method) === '[object Object]') {
    _method = 'get';
  } else {
    // 第二项如果为空，默认get请求。或者写了，如果大小写不对，全部转小写发送请求
    _method = (method || 'get').toLowerCase();
  }
  if (_method === 'post') {
    return post(url, params);
  } else if (_method === 'jsonp') {
    return jsonp(url, params);
  } else {
    return get(url, params);
  }
}

export {
  get,
  post,
  jsonp,
  ajax
};