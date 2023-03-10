(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('?????????????????????????????????????????????????????????' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context????????????
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// ??????????????????
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime ??????????????? uni ???????????????????????????????????? uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // ?????????????????????????????????????????????????????????__id__???????????????????????????mp-weixin??????navigateTo???AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// ?????? api ???????????????
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue ??? false ???????????????????????????????????????????????????????????????????????????
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// ??????????????????
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// ???????????? key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}????????????????????? key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// ???????????? returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// ??????????????? api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// ?????? api ??????????????????
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// ?????? api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // ?????? Vue.prototype ???????????????
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Clothes sell","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('?????? Vue ??? data ???????????????????????? data ???????????????????????? data ?????????????????? vm ??????????????????????????????????????????????????????', data);
      }
    }
  } else {
    try {
      // ??? data ?????????
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // ????????????????????? render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // ?????????????????????????????????????????????
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // ??????????????????????????? $slots ??? props??????????????? vueSlots ????????? $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO ???????????? mpvue ??? mp ??????
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for ???????????????????????????', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent ????????????????????? event ??????
  if (isCustom) {// ???????????????
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// ???????????????????????? event ??? detail ??????
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent ?????????????????????
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // ???????????? scoped slots ??????????????????????????????????????????
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('?????????????????????');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // ????????? web-view ?????? dataset ?????????
  if (!eventOpts) {
    return console.warn('?????????????????????');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao ?????????????????? scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // ??????????????????????????????????????????????????????????????????????????????
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // ???????????????????????????getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// ?????????????????????????????????????????????????????? onShow ??? onLaunch ??????
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// ?????? ???2.2.3 ????????????????????? 2.3.0 ??? nextTick ??????
          console.error('?????????????????????????????????????????? ?????????????????????-??????-????????????-????????????????????? ?????????`2.3.0`??????');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm ???????????? globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // ??????????????? globalData
  appOptions.globalData = vm.$options.globalData || {};
  // ??? methods ?????????????????? getApp() ???
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // ??????????????????(????????????:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // ??????????????????
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO ???????????? for ?????? scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail ?????????,value ?????????(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // ?????? multipleSlots ??????????????? bug??????????????????????????? ??? u-list?????????????????????
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // ??????????????????
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // ????????? vue ??????
        this.$vm = new VueComponent(options);

        // ??????$slots,$scopedSlots???????????????????????????$slots???
        initSlots(this.$vm, properties.vueSlots);

        // ???????????? setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // ????????? props ???????????? true????????????????????? false ????????? created,ready ??????, ??? attached ?????????
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // ?????? mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 134:
/*!*************************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/components/uni-icons/icons.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'house': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 170:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 173));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 176);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e28) {throw _e28;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e29) {didErr = true;err = _e29;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, s) {return e(s = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && s.path);} }, s.exports), s.exports;}var n = s(function (e, t) {var s;e.exports = (s = s || function (e, t) {var s = Object.create || function () {function e() {}return function (t) {var s;return e.prototype = t, s = new e(), e.prototype = null, s;};}(),n = {},r = n.lib = {},o = r.Base = { extend: function extend(e) {var t = s(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, t) {e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,s = e.words,n = this.sigBytes,r = e.sigBytes;if (this.clamp(), n % 4) for (var o = 0; o < r; o++) {var i = s[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[n + o >>> 2] |= i << 24 - (n + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[n + o >>> 2] = s[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,s = this.sigBytes;t[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, t.length = e.ceil(s / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var s, n = [], r = function r(t) {t = t;var s = 987654321,n = 4294967295;return function () {var r = ((s = 36969 * (65535 & s) + (s >> 16) & n) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & n) & n;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (s || e.random()));s = 987654071 * a(), n.push(4294967296 * a() | 0);}return new i.init(n, t);} }),a = n.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n += 2) {s[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;}return new i.init(s, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push(String.fromCharCode(o));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n++) {s[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;}return new i.init(s, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var s = this._data,n = s.words,r = s.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(n, h);}var l = n.splice(0, c);s.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, s) {return new e.init(s).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, s) {return new d.HMAC.init(e, s).finalize(t);};} }), n.algo = {});return n;}(Math), s);}),r = (s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = 0; s < 16; s++) {var n = t + s,r = e[n];e[n] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],v = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],P = e[t + 13],I = e[t + 14],A = e[t + 15],E = o[0],O = o[1],U = o[2],b = o[3];E = u(E, O, U, b, i, 7, a[0]), b = u(b, E, O, U, c, 12, a[1]), U = u(U, b, E, O, f, 17, a[2]), O = u(O, U, b, E, p, 22, a[3]), E = u(E, O, U, b, g, 7, a[4]), b = u(b, E, O, U, m, 12, a[5]), U = u(U, b, E, O, y, 17, a[6]), O = u(O, U, b, E, _, 22, a[7]), E = u(E, O, U, b, w, 7, a[8]), b = u(b, E, O, U, v, 12, a[9]), U = u(U, b, E, O, S, 17, a[10]), O = u(O, U, b, E, k, 22, a[11]), E = u(E, O, U, b, T, 7, a[12]), b = u(b, E, O, U, P, 12, a[13]), U = u(U, b, E, O, I, 17, a[14]), E = h(E, O = u(O, U, b, E, A, 22, a[15]), U, b, c, 5, a[16]), b = h(b, E, O, U, y, 9, a[17]), U = h(U, b, E, O, k, 14, a[18]), O = h(O, U, b, E, i, 20, a[19]), E = h(E, O, U, b, m, 5, a[20]), b = h(b, E, O, U, S, 9, a[21]), U = h(U, b, E, O, A, 14, a[22]), O = h(O, U, b, E, g, 20, a[23]), E = h(E, O, U, b, v, 5, a[24]), b = h(b, E, O, U, I, 9, a[25]), U = h(U, b, E, O, p, 14, a[26]), O = h(O, U, b, E, w, 20, a[27]), E = h(E, O, U, b, P, 5, a[28]), b = h(b, E, O, U, f, 9, a[29]), U = h(U, b, E, O, _, 14, a[30]), E = l(E, O = h(O, U, b, E, T, 20, a[31]), U, b, m, 4, a[32]), b = l(b, E, O, U, w, 11, a[33]), U = l(U, b, E, O, k, 16, a[34]), O = l(O, U, b, E, I, 23, a[35]), E = l(E, O, U, b, c, 4, a[36]), b = l(b, E, O, U, g, 11, a[37]), U = l(U, b, E, O, _, 16, a[38]), O = l(O, U, b, E, S, 23, a[39]), E = l(E, O, U, b, P, 4, a[40]), b = l(b, E, O, U, i, 11, a[41]), U = l(U, b, E, O, p, 16, a[42]), O = l(O, U, b, E, y, 23, a[43]), E = l(E, O, U, b, v, 4, a[44]), b = l(b, E, O, U, T, 11, a[45]), U = l(U, b, E, O, A, 16, a[46]), E = d(E, O = l(O, U, b, E, f, 23, a[47]), U, b, i, 6, a[48]), b = d(b, E, O, U, _, 10, a[49]), U = d(U, b, E, O, I, 15, a[50]), O = d(O, U, b, E, m, 21, a[51]), E = d(E, O, U, b, T, 6, a[52]), b = d(b, E, O, U, p, 10, a[53]), U = d(U, b, E, O, S, 15, a[54]), O = d(O, U, b, E, c, 21, a[55]), E = d(E, O, U, b, w, 6, a[56]), b = d(b, E, O, U, A, 10, a[57]), U = d(U, b, E, O, y, 15, a[58]), O = d(O, U, b, E, P, 21, a[59]), E = d(E, O, U, b, g, 6, a[60]), b = d(b, E, O, U, k, 10, a[61]), U = d(U, b, E, O, f, 15, a[62]), O = d(O, U, b, E, v, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + O | 0, o[2] = o[2] + U | 0, o[3] = o[3] + b | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;s[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(n / 4294967296),i = n;s[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (s.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, s, n, r, o, i) {var a = e + (t & s | ~t & n) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, s, n, r, o, i) {var a = e + (t & n | s & ~n) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, s, n, r, o, i) {var a = e + (t ^ s ^ n) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, s, n, r, o, i) {var a = e + (s ^ (t | ~n)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), s.MD5);}), s(function (e, t) {var s, r, o;e.exports = (r = (s = n).lib.Base, o = s.enc.Utf8, void (s.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var s = e.blockSize,n = 4 * s;t.sigBytes > n && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < s; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = n, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,s = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(s));} })));}), s(function (e, t) {e.exports = n.HmacMD5;}));function o(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function i(e) {return "object" === o(e);}var a = /*#__PURE__*/function (_Error) {_inherits(a, _Error);var _super = _createSuper(a);function a(e, t) {var _this;_classCallCheck(this, a);_this = _super.call(this, e), _this.code = t;return _this;}return a;}( /*#__PURE__*/_wrapNativeSuper(Error));var c = ["invoke", "success", "fail", "complete"],u = {};function h(e, t) {u[e] || (u[e] = {}), i(t) && Object.keys(t).forEach(function (s) {c.indexOf(s) > -1 && function (e, t, s) {var n = u[e][t];n || (n = u[e][t] = []), -1 === n.indexOf(s) && "function" == typeof s && n.push(s);}(e, s, t[s]);});}function l(e, t) {u[e] || (u[e] = {}), i(t) ? Object.keys(t).forEach(function (s) {c.indexOf(s) > -1 && function (e, t, s) {var n = u[e][t];if (!n) return;var r = n.indexOf(s);r > -1 && n.splice(r, 1);}(e, s, t[s]);}) : delete u[e];}function d(e, t) {return e && 0 !== e.length ? e.reduce(function (e, s) {return e.then(function () {return s(t);});}, Promise.resolve()) : Promise.resolve();}function f(e, t) {return u[e] && u[e][t] || [];}function p(e, t) {return t ? function (s) {var _this2 = this;var n = "callFunction" === t && "DCloud-clientDB" === (s && s.name);var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, s = s || {};var o = r.then(function () {return n ? Promise.resolve() : d(f(t, "invoke"), s);}).then(function () {return e.call(_this2, s);}).then(function (e) {return n ? Promise.resolve(e) : d(f(t, "success"), e).then(function () {return d(f(t, "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {return n ? Promise.reject(e) : d(f(t, "fail"), e).then(function () {return d(f(t, "complete"), e);}).then(function () {return Promise.reject(e);});});if (!(s.success || s.fail || s.complete)) return o;o.then(function (e) {s.success && s.success(e), s.complete && s.complete(e);}).catch(function (e) {s.fail && s.fail(e), s.complete && s.complete(e);});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var g = /*#__PURE__*/function (_Error2) {_inherits(g, _Error2);var _super2 = _createSuper(g);function g(e) {var _this3;_classCallCheck(this, g);_this3 = _super2.call(this, e.message), _this3.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this3), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this3;}return g;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e2 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "???????????????{param}", "uniCloud.uploadFile.fileError": "filePath??????File??????" }, "zh-Hant": { "uniCloud.init.paramRequired": "???????????????{param}", "uniCloud.uploadFile.fileError": "filePath??????File??????" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),m = _e2.t,y = _e2.setLocale,_ = _e2.getLocale;function w(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var v = "development" === "development",S = "mp-weixin" || false,k = w(undefined),T = w([]),P = true;var I, A, E;try {I = __webpack_require__(/*! uni-stat-config */ 177).default || __webpack_require__(/*! uni-stat-config */ 177);} catch (e) {I = { appid: "" };}function O() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function U() {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: S, OS: E, APPID: I.appid, LOCALE: _(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.4" };}function b() {if ("n" === D()) {try {A = plus.runtime.getDCloudId();} catch (e) {A = "";}return A;}return A || (A = O(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: A })), A;}function D() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)[S];}var C = { sign: function sign(e, t) {var s = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (s = s + "&" + t + "=" + e[t]);}), s = s.slice(1), r(s, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (s, n) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), v && "h5" === S && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("??????H5????????????uniCloud????????????????????????????????????????????????????????????????????????????????????????????????https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return n(new g({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return n(new g({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, s(r);} }));});} };var x = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var q = /*#__PURE__*/function () {function q(e) {_classCallCheck(this, q);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(m("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = x, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(q, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return C.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this4 = this;return Promise.resolve().then(function () {return _this4.hasAccessToken ? t ? _this4.requestWrapped(e) : _this4.requestWrapped(e).catch(function (t) {return new Promise(function (e, s) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? s(t) : e();}).then(function () {return _this4.getAccessToken();}).then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});}) : _this4.getAccessToken().then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = C.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };return "auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = C.sign(s, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: n };} }, { key: "getAccessToken", value: function getAccessToken() {var _this5 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, s) {e.result && e.result.accessToken ? (_this5.setAccessToken(e.result.accessToken), _this5._getAccessTokenPromiseStatus = "fulfilled", t(_this5.accessToken)) : (_this5._getAccessTokenPromiseStatus = "rejected", s(new g({ code: "AUTH_FAILED", message: "??????accessToken??????" })));});}, function (e) {return _this5._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this6 = this;var e = _ref.url,t = _ref.formData,s = _ref.name,n = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this6.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new g({ code: "UPLOAD_FAILED", message: "??????????????????" }));}, fail: function fail(e) {a(new g({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "??????????????????" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this7 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,s = _ref2$fileType === void 0 ? "image" : _ref2$fileType,n = _ref2.onUploadProgress,r = _ref2.config;if (!t) throw new g({ code: "CLOUDPATH_REQUIRED", message: "cloudPath????????????" });var o = r && r.envType || this.config.envType;var i, a;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;i = r.id, a = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: i, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: s };return _this7.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: n }));}).then(function () {return _this7.reportOSSUpload({ id: i });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: a }) : n(new g({ code: "UPLOAD_FAILED", message: "??????????????????" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, s) {Array.isArray(e) && 0 !== e.length || s(new g({ code: "INVALID_PARAM", message: "fileList????????????????????????????????????" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return q;}();var R = { init: function init(e) {var t = new q(e),s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} },F = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:",L = "undefined" != typeof process && "e2e" === "development" && "pre" === Object({"NODE_ENV":"development","VUE_APP_NAME":"Clothes sell","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).END_POINT ? "//tcb-pre.tencentcloudapi.com/web" : "//tcb-api.tencentcloudapi.com/web";var N;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(N || (N = {}));var M = function M() {};var j = function j() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, s) {e = function e(_e3, n) {return _e3 ? s(_e3) : t(n);};});return e.promise = t, e;};function $(e) {return void 0 === e;}function K(e) {return "[object Null]" === Object.prototype.toString.call(e);}var B;function H(e) {var t = (s = e, "[object Array]" === Object.prototype.toString.call(s) ? e : [e]);var s;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e4 = _step.value;var _t2 = _e4.isMatch,_s = _e4.genAdapter,_n = _e4.runtime;if (_t2()) return { adapter: _s(), runtime: _n };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(B || (B = {}));var W = { adapter: null, runtime: void 0 },z = ["anonymousUuidKey"];var V = /*#__PURE__*/function (_M) {_inherits(V, _M);var _super3 = _createSuper(V);function V() {var _this8;_classCallCheck(this, V);_this8 = _super3.call(this), W.adapter.root.tcbObject || (W.adapter.root.tcbObject = {});return _this8;}_createClass(V, [{ key: "setItem", value: function setItem(e, t) {W.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return W.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete W.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete W.adapter.root.tcbObject;} }]);return V;}(M);function J(e, t) {switch (e) {case "local":return t.localStorage || new V();case "none":return new V();default:return t.sessionStorage || new V();}}var Y = /*#__PURE__*/function () {function Y(e) {_classCallCheck(this, Y);if (!this._storage) {this._persistence = W.adapter.primaryStorage || e.persistence, this._storage = J(this._persistence, W.adapter);var _t3 = "access_token_" + e.env,_s2 = "access_token_expire_" + e.env,_n2 = "refresh_token_" + e.env,_r = "anonymous_uuid_" + e.env,_o = "login_type_" + e.env,_i = "user_info_" + e.env;this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _s2, refreshTokenKey: _n2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(Y, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var s = J(e, W.adapter);for (var _e5 in this.keys) {var _n3 = this.keys[_e5];if (t && z.includes(_e5)) continue;var _r2 = this._storage.getItem(_n3);$(_r2) || K(_r2) || (s.setItem(_n3, _r2), this._storage.removeItem(_n3));}this._storage = s;} }, { key: "setStore", value: function setStore(e, t, s) {if (!this._storage) return;var n = { version: s || "localCachev1", content: t },r = JSON.stringify(n);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var s = this._storage.getItem(e);if (!s) return "";if (s.indexOf(t) >= 0) {return JSON.parse(s).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return Y;}();var X = {},G = {};function Q(e) {return X[e];}var Z = function Z(e, t) {_classCallCheck(this, Z);this.data = t || null, this.name = e;};var ee = /*#__PURE__*/function (_Z) {_inherits(ee, _Z);var _super4 = _createSuper(ee);function ee(e, t) {var _this9;_classCallCheck(this, ee);_this9 = _super4.call(this, "error", { error: e, data: t }), _this9.error = e;return _this9;}return ee;}(Z);var te = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, s) {s[e] = s[e] || [], s[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, s) {if (s && s[e]) {var _n4 = s[e].indexOf(t);-1 !== _n4 && s[e].splice(_n4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof ee) return console.error(e.error), this;var s = "string" == typeof e ? new Z(e, t || {}) : e;var n = s.name;if (this._listens(n)) {s.target = this;var _e6 = this._listeners[n] ? _toConsumableArray(this._listeners[n]) : [];var _iterator2 = _createForOfIteratorHelper(_e6),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, s);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function se(e, t) {te.on(e, t);}function ne(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};te.fire(e, t);}function re(e, t) {te.off(e, t);}var oe = "loginStateChanged",ie = "loginStateExpire",ae = "loginTypeChanged",ce = "anonymousConverted",ue = "refreshAccessToken";var he;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(he || (he = {}));var le = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],de = { "X-SDK-Version": "1.3.5" };function fe(e, t, s) {var n = e[t];e[t] = function (t) {var r = {},o = {};s.forEach(function (s) {var _s$call = s.call(e, t),n = _s$call.data,i = _s$call.headers;Object.assign(r, n), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e7 in r) {i.append(_e7, r[_e7]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), n.call(e, t);};}function pe() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, de), {}, { "x-seqid": e }) };}var ge = /*#__PURE__*/function () {function ge() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, ge);var t;this.config = e, this._reqClass = new W.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = Q(this.config.env), this._localCache = (t = this.config.env, G[t]), fe(this._reqClass, "post", [pe]), fe(this._reqClass, "upload", [pe]), fe(this._reqClass, "download", [pe]);}_createClass(ge, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, s, n, r, o, i, a, _e8, _e9, _t5, _n5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, s = _this$_cache$keys.refreshTokenKey, n = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(s);if (o) {_context5.next = 5;break;}throw new Error("?????????CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e8 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e8 || "REFRESH_TOKEN_EXPIRED" === _e8 || "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 20;break;}if (!(this._cache.getStore(n) === he.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 19;break;}_e9 = this._cache.getStore(r);_t5 = this._cache.getStore(s);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e9, refresh_token: _t5 });case 17:_n5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_n5.refresh_token), this._refreshAccessToken()));case 19:ne(ie), this._cache.removeStore(s);case 20:throw new Error("??????access token?????????" + a.data.code);case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (ne(ue), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(s), this._cache.setStore(s, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, s, n, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, s = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(s)) {_context6.next = 3;break;}throw new Error("refresh token??????????????????????????????");case 3:n = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(n, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!n || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: n, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, s) {var n, r, o, _e10, i, _e11, _e12, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:n = "x-tcb-trace_" + this.config.env;r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === le.indexOf(e))) {_context7.next = 10;break;}_e10 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e10);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e11 in i) {i.hasOwnProperty(_e11) && void 0 !== i[_e11] && i.append(_e11, o[_e11]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e12 in o) {void 0 !== o[_e12] && (i[_e12] = o[_e12]);}}a = { headers: { "content-type": r } };s && s.onUploadProgress && (a.onUploadProgress = s.onUploadProgress);c = this._localCache.getStore(n);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var n = /\?/.test(t);var r = "";for (var _e13 in s) {"" === r ? !n && (t += "?") : r += "&", r += "".concat(_e13, "=").concat(encodeURIComponent(s[_e13]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(F, L, d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(n, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,s,_s3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:s = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === s.data.code && -1 === le.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_s3 = _context8.sent;if (!_s3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_s3.data.code, "] ").concat(_s3.data.message));case 12:return _context8.abrupt("return", _s3.data);case 13:if (!s.data.code) {_context8.next = 15;break;}throw new Error("[".concat(s.data.code, "] ").concat(s.data.message));case 15:return _context8.abrupt("return", s.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,s = _this$_cache$keys3.accessTokenExpireKey,n = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }]);return ge;}();var me = {};function ye(e) {return me[e];}var _e = /*#__PURE__*/function () {function _e(e) {_classCallCheck(this, _e);this.config = e, this._cache = Q(e.env), this._request = ye(e.env);}_createClass(_e, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,s = _this$_cache$keys4.accessTokenExpireKey,n = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,s = _this$_cache$keys5.accessTokenKey,n = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(s, e), this._cache.setStore(n, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return _e;}();var we = /*#__PURE__*/function () {function we(e) {_classCallCheck(this, we);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = Q(this._envId), this._request = ye(this._envId), this.setUserInfo();}_createClass(we, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, s;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;s = e.users;return _context10.abrupt("return", (s.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: s, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, s, n, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;s = e.gender;n = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: s, avatarUrl: n, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this10 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this10[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return we;}();var ve = /*#__PURE__*/function () {function ve(e) {_classCallCheck(this, ve);if (!e) throw new Error("envId is not defined");this._cache = Q(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,s = _this$_cache$keys6.accessTokenKey,n = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(s),i = this._cache.getStore(n);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new we(e);}_createClass(ve, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === he.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === he.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === he.WECHAT || this.loginType === he.WECHAT_OPEN || this.loginType === he.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return ve;}();var Se = /*#__PURE__*/function (_e14) {_inherits(Se, _e14);var _super5 = _createSuper(Se);function Se() {_classCallCheck(this, Se);return _super5.apply(this, arguments);}_createClass(Se, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, s, n, r, _e15;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;s = this._cache.getStore(e) || void 0;n = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: s, refresh_token: n });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:ne(oe);ne(ae, { env: this.config.env, loginType: he.ANONYMOUS, persistence: "local" });_e15 = new ve(this.config.env);_context13.next = 19;return _e15.user.refresh();case 19:return _context13.abrupt("return", _e15);case 20:throw new Error("??????????????????");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, s, n, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;s = _this$_cache$keys8.refreshTokenKey;n = this._cache.getStore(t);r = this._cache.getStore(s);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: n, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:ne(ce, { env: this.config.env });ne(ae, { loginType: he.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("??????????????????");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,s = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(s, he.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return Se;}(_e);var ke = /*#__PURE__*/function (_e16) {_inherits(ke, _e16);var _super6 = _createSuper(ke);function ke() {_classCallCheck(this, ke);return _super6.apply(this, arguments);}_createClass(ke, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, s;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:s = _context15.sent;if (!s.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(s.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:ne(oe);ne(ae, { env: this.config.env, loginType: he.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new ve(this.config.env));case 15:throw new Error("?????????????????????");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return ke;}(_e);var Te = /*#__PURE__*/function (_e17) {_inherits(Te, _e17);var _super7 = _createSuper(Te);function Te() {_classCallCheck(this, Te);return _super7.apply(this, arguments);}_createClass(Te, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:s = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 5:n = _context16.sent;r = n.refresh_token;o = n.access_token;i = n.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:ne(oe);ne(ae, { env: this.config.env, loginType: he.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new ve(this.config.env));case 22:throw n.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("??????????????????");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Te;}(_e);var Pe = /*#__PURE__*/function (_e18) {_inherits(Pe, _e18);var _super8 = _createSuper(Pe);function Pe() {_classCallCheck(this, Pe);return _super8.apply(this, arguments);}_createClass(Pe, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));s = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: he.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 6:n = _context19.sent;r = n.refresh_token;o = n.access_token_expire;i = n.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:ne(oe);ne(ae, { env: this.config.env, loginType: he.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new ve(this.config.env));case 23:throw n.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("???????????????????????????");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return Pe;}(_e);var Ie = /*#__PURE__*/function () {function Ie(e) {_classCallCheck(this, Ie);this.config = e, this._cache = Q(e.env), this._request = ye(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), se(ae, this._onLoginTypeChanged);}_createClass(Ie, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new Se(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new ke(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Te(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new Pe(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new Se(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Te(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new Pe(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new Se(this.config)), se(ce, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, s, n, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === he.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("?????????????????????????????????");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, s = _this$_cache$keys10.accessTokenExpireKey, n = this._cache.getStore(e);if (n) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: n });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(s), ne(oe), ne(ae, { env: this.config.env, loginType: he.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this11 = this;se(oe, function () {var t = _this11.hasLoginState();e.call(_this11, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {se(ie, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {se(ue, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {se(ce, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this12 = this;se(ae, function () {var t = _this12.hasLoginState();e.call(_this12, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new ve(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new ke(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,s = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + s };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,s = _e$data.persistence,n = _e$data.env;n === this.config.env && (this._cache.updatePersistence(s), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Ie;}();var Ae = function Ae(e, t) {t = t || j();var s = ye(this.config.env),n = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: n, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };s.upload({ url: a, data: f, file: r, name: n, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: " + e.data));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},Ee = function Ee(e, t) {t = t || j();var s = ye(this.config.env),n = e.cloudPath;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},Oe = function Oe(_ref5, t) {var e = _ref5.fileList;if (t = t || j(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList????????????????????????" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList????????????????????????????????????" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var s = { fileid_list: e };return ye(this.config.env).send("storage.batchDeleteFile", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ue = function Ue(_ref6, t) {var e = _ref6.fileList;t = t || j(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList????????????????????????" });var s = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _n6 = _step4.value;"object" == typeof _n6 ? (_n6.hasOwnProperty("fileID") && _n6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList????????????????????????fileID???maxAge?????????" }), s.push({ fileid: _n6.fileID, max_age: _n6.maxAge })) : "string" == typeof _n6 ? s.push({ fileid: _n6 }) : t(null, { code: "INVALID_PARAM", message: "fileList???????????????????????????" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var n = { file_list: s };return ye(this.config.env).send("storage.batchGetDownloadUrl", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},be = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, s, n, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return Ue.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:s = _context29.sent.fileList[0];if (!("SUCCESS" !== s.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(s) : new Promise(function (e) {e(s);}));case 6:n = ye(this.config.env);r = s.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", n.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return n.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function be(_x26, _x27) {return _ref8.apply(this, arguments);};}(),De = function De(_ref9, o) {var e = _ref9.name,t = _ref9.data,s = _ref9.query,n = _ref9.parse,r = _ref9.search;var i = o || j();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("?????????????????????"));var c = { inQuery: s, parse: n, search: r, function_name: e, request_data: a };return ye(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (n) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},Ce = { timeout: 15e3, persistence: "session" },xe = {};var qe = /*#__PURE__*/function () {function qe(e) {_classCallCheck(this, qe);this.config = e || this.config, this.authObj = void 0;}_createClass(qe, [{ key: "init", value: function init(e) {switch (W.adapter || (this.requestClient = new W.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, Ce), e), !0) {case this.config.timeout > 6e5:console.warn("timeout?????????????????????[10??????]???????????????????????????"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout?????????????????????[100ms]???????????????????????????"), this.config.timeout = 100;}return new qe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || W.adapter.primaryStorage || Ce.persistence;var s;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;X[t] = new Y(e), G[t] = new Y(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), s = this.config, me[s.env] = new ge(s), this.authObj = new Ie(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return se.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return re.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return De.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return Oe.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return Ue.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return be.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ae.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return Ee.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {xe[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var s;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:s = xe[e];if (s) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return s.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = H(e) || {},t = _ref11.adapter,s = _ref11.runtime;t && (W.adapter = t), s && (W.runtime = s);} }]);return qe;}();var Re = new qe();function Fe(e, t, s) {void 0 === s && (s = {});var n = /\?/.test(t),r = "";for (var o in s) {"" === r ? !n && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(s[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Le = /*#__PURE__*/function () {function Le() {_classCallCheck(this, Le);}_createClass(Le, [{ key: "post", value: function post(e) {var t = e.url,s = e.data,n = e.headers;return new Promise(function (e, r) {x.request({ url: Fe("https:", t), data: s, method: "POST", header: n, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, s) {var n = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = x.uploadFile({ url: Fe("https:", n), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var s = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (s.statusCode = parseInt(o.success_action_status, 10)), t(s);}, fail: function fail(e) {v && "mp-alipay" === S && console.warn("????????????????????????????????????????????????????????????????????????????????????????????????????????????"), s(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Le;}();var Ne = { setItem: function setItem(e, t) {x.setStorageSync(e, t);}, getItem: function getItem(e) {return x.getStorageSync(e);}, removeItem: function removeItem(e) {x.removeStorageSync(e);}, clear: function clear() {x.clearStorageSync();} };var Me = { genAdapter: function genAdapter() {return { root: {}, reqClass: Le, localStorage: Ne, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Re.useAdapters(Me);var je = Re,$e = je.init;je.init = function (e) {e.env = e.spaceId;var t = $e.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var s = t.auth;return t.auth = function (e) {var t = s.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = p(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var Ke = /*#__PURE__*/function (_q) {_inherits(Ke, _q);var _super9 = _createSuper(Ke);function Ke() {_classCallCheck(this, Ke);return _super9.apply(this, arguments);}_createClass(Ke, [{ key: "getAccessToken", value: function getAccessToken() {var _this13 = this;return new Promise(function (e, t) {_this13.setAccessToken("Anonymous_Access_token"), e("Anonymous_Access_token");});} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };"auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = C.sign(s, this.config.clientSecret);var r = U(),o = r.APPID,i = r.PLATFORM,a = r.DEVICEID,c = r.CLIENT_SDK_VERSION;return n["x-client-platform"] = i, n["x-client-appid"] = o, n["x-client-device-id"] = a, n["x-client-version"] = c, n["x-client-token"] = x.getStorageSync("uni_id_token"), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: JSON.parse(JSON.stringify(n)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this14 = this;var e = _ref12.url,t = _ref12.formData,s = _ref12.name,n = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (i, a) {var c = _this14.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new g({ code: "UPLOAD_FAILED", message: "??????????????????" }));}, fail: function fail(e) {a(new g({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "??????????????????" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this15 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,s = _ref13$fileType === void 0 ? "image" : _ref13$fileType,n = _ref13.onUploadProgress;if (!t) throw new g({ code: "CLOUDPATH_REQUIRED", message: "cloudPath????????????" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name,c = _t$result.fileUrl;r = c;var u = { url: o, formData: i, name: a, filePath: e, fileType: s };return _this15.uploadFileToOSS(Object.assign({}, u, { onUploadProgress: n }));}).then(function () {return _this15.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: r }) : n(new g({ code: "UPLOAD_FAILED", message: "??????????????????" }));});});} }]);return Ke;}(q);var Be = { init: function init(e) {var t = new Ke(e),s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} };var He, We;function ze(_ref14) {var e = _ref14.name,t = _ref14.data,s = _ref14.spaceId,n = _ref14.provider;He || (He = U(), We = { ak: I.appid, p: "android" === E ? "a" : "i", ut: D(), uuid: b() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = s,a = { tencent: "t", aliyun: "a" }[n];{var _e19 = Object.assign({}, We, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: He, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e19)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e20 = x.getStorageSync("uni_id_token") || x.getStorageSync("uniIdToken");_e20 && (r.uniIdToken = _e20);}return r;}function Ve(_ref15) {var _this16 = this;var e = _ref15.name,t = _ref15.data;var s = this.localAddress,n = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,i = "http://".concat(s, ":").concat(n, "/system/check-function"),a = "http://".concat(s, ":").concat(n, "/cloudfunctions/").concat(e);return new Promise(function (t, s) {x.request({ method: "POST", url: i, data: { name: e, platform: S, provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" } });} });}).then(function () {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.data;var _ref17 = e || {},t = _ref17.code,s = _ref17.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: s || "SYS_ERR" };}).then(function (_ref18) {var s = _ref18.code,n = _ref18.message;if (0 !== s) {switch (s) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(n || "?????????????????????uni-clientDB-action??????????????????????????????");break;case "NETWORK_ERROR":{var _e21 = "???????????????????????????????????????????????????????????????????????????????????????";throw console.error(_e21), new Error(_e21);}case "SWITCH_TO_CLOUD":break;default:{var _e22 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(n, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e22), new Error(_e22);}}return _this16._originCallFunction({ name: e, data: t });}return new Promise(function (s, n) {var i = ze({ name: e, data: t, provider: _this16.config.provider, spaceId: o });x.request({ method: "POST", url: a, data: { provider: r, platform: S, param: i }, success: function success() {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.statusCode,t = _ref19.data;return !e || e >= 400 ? n(new g({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : s({ result: t });}, fail: function fail(e) {n(new g({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var Je = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "????????????[{functionName}]????????????????????????????????????????????????????????????????????????????????????????????????????????????", mode: "append" }];var Ye = /[\\^$.*+?()[\]{}|]/g,Xe = RegExp(Ye.source);function Ge(e, t, s) {return e.replace(new RegExp((n = t) && Xe.test(n) ? n.replace(Ye, "\\$&") : n, "g"), s);var n;}function Qe(_ref20) {var e = _ref20.functionName,t = _ref20.result,s = _ref20.logPvd;if (this.config.useDebugFunction && t && t.requestId) {var _n7 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_n7, "[/").concat(s, "-request]"));}}function Ze(e) {var t = e.callFunction,s = function s(e) {var _this17 = this;var s = e.name;e.data = ze({ name: s, data: e.data, provider: this.config.provider, spaceId: this.config.spaceId });var n = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];return t.call(this, e).then(function (e) {return Qe.call(_this17, { functionName: s, result: e, logPvd: n }), Promise.resolve(e);}, function (t) {return Qe.call(_this17, { functionName: s, result: t, logPvd: n }), t && t.message && (t.message = function () {var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref21$message = _ref21.message,e = _ref21$message === void 0 ? "" : _ref21$message,_ref21$extraInfo = _ref21.extraInfo,t = _ref21$extraInfo === void 0 ? {} : _ref21$extraInfo,_ref21$formatter = _ref21.formatter,s = _ref21$formatter === void 0 ? [] : _ref21$formatter;for (var _n8 = 0; _n8 < s.length; _n8++) {var _s$_n = s[_n8],_r3 = _s$_n.rule,_o2 = _s$_n.content,i = _s$_n.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e23 = 1; _e23 < _a.length; _e23++) {_c = Ge(_c, "{$".concat(_e23, "}"), _a[_e23]);}for (var _e24 in t) {_c = Ge(_c, "{".concat(_e24, "}"), t[_e24]);}switch (i) {case "replace":return _c;case "append":default:return e + _c;}}return e;}({ message: "[".concat(e.name, "]: ").concat(t.message), formatter: Je, extraInfo: { functionName: s } })), Promise.reject(t);});};e.callFunction = function (t) {var n;return v && e.debugInfo && !e.debugInfo.forceRemote && T ? (e._originCallFunction || (e._originCallFunction = s), n = Ve.call(this, t)) : n = s.call(this, t), Object.defineProperty(n, "result", { get: function get() {return console.warn("?????????????????????Promise??????????????????????????????result???????????????????????????https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), n;};}var et = Symbol("CLIENT_DB_INTERNAL");function tt(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = et, new Proxy(e, { get: function get(e, s, n) {return function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}(e, s) || e[s] || "string" != typeof s ? e[s] : t.get(e, s, n);} });}function st(e) {switch (o(e)) {case "array":return e.map(function (e) {return st(e);});case "object":return e._internalType === et || Object.keys(e).forEach(function (t) {e[t] = st(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}function nt() {var e = x.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var s;try {s = JSON.parse((n = t[1], decodeURIComponent(atob(n).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("?????????????????????????????????????????????????????????" + e.message);}var n;return s.tokenExpired = 1e3 * s.exp, delete s.exp, delete s.iat, s;}var rt = t(s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var s = "chooseAndUploadFile:fail";function n(e, t) {return e.tempFiles.forEach(function (e, s) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + s + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref22) {var s = _ref22.onChooseFile,n = _ref22.onUploadProgress;return t.then(function (e) {if (s) {var _t9 = s(e);if (void 0 !== _t9) return Promise.resolve(_t9).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: "chooseAndUploadFile:ok", tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var n = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = "chooseAndUploadFile:ok";var r = t.tempFiles,o = r.length;var i = 0;return new Promise(function (a) {for (; i < s;) {c();}function c() {var s = i++;if (s >= o) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && a(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, n && n(e);} }).then(function (e) {u.url = e.fileID, s < o && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < o && c();});}});}(e, t, 5, n);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,r = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: r, sourceType: o, extension: i, success: function success(t) {e(n(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,r = e.compressed,o = e.maxDuration,i = e.sourceType,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: r, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var s = t.tempFilePath,r = t.duration,o = t.size,i = t.height,a = t.width;e(n({ errMsg: "chooseVideo:ok", tempFilePaths: [s], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: s, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: r, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,r = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " ????????? type ????????????????????????????????? image ??? video???" });i({ type: "all", count: t, extension: r, success: function success(t) {e(n(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var ot = "manual";function it(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: String, default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === ot) return;var s = !1;var n = [];for (var _r4 = 2; _r4 < e.length; _r4++) {e[_r4] !== t[_r4] && (n.push(e[_r4]), s = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(s, n);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref23$getone = _ref23.getone,e = _ref23$getone === void 0 ? !1 : _ref23$getone,t = _ref23.success,s = _ref23.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (s) {_this19.mixinDatacomLoading = !1;var _s$result = s.result,n = _s$result.data,r = _s$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = r), _this19.mixinDatacomHasMore = n.length < _this19.pageSize;var o = e ? n.length ? n[0] : void 0 : n;_this19.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, s && s(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var s = e.database();var n = t.action || this.action;n && (s = s.action(n));var r = t.collection || this.collection;s = s.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (s = s.where(o));var i = t.field || this.field;i && (s = s.field(i));var a = t.foreignKey || this.foreignKey;a && (s = s.foreignKey(a));var c = t.groupby || this.groupby;c && (s = s.groupBy(c));var u = t.groupField || this.groupField;u && (s = s.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (s = s.distinct());var h = t.orderby || this.orderby;h && (s = s.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), s = s.skip(d * (l - 1)).limit(d).get(m), s;} } };}function at(_x30, _x31) {return _at.apply(this, arguments);}function _at() {_at = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var s, _e30, n;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:s = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return n = { url: s, timeout: 500 }, new Promise(function (e, t) {x.request(_objectSpread(_objectSpread({}, n), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e30 = _context32.sent;return _context32.abrupt("return", !(!_e30.data || 0 !== _e30.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _at.apply(this, arguments);}var ct = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var s = !1 !== e.debugFunction && v && ("h5" === S && navigator.userAgent.indexOf("HBuilderX") > 0 || "app-plus" === S);switch (e.provider) {case "tencent":t = je.init(Object.assign(e, { useDebugFunction: s }));break;case "aliyun":t = R.init(Object.assign(e, { useDebugFunction: s }));break;case "private":t = Be.init(Object.assign(e, { useDebugFunction: s }));break;default:throw new Error("??????????????????provider??????");}var n = k;v && n && !n.code && (t.debugInfo = n), t.isReady = !1;var r = t.auth();t.initUniCloud = r.getLoginState().then(function (e) {return e ? Promise.resolve() : r.signInAnonymously();}).then(function () {if (v && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e25 = _t$debugInfo.address,_s4 = _t$debugInfo.servePort;return function () {var _ref24 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var s, _n9, _r5;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_n9 = 0;case 1:if (!(_n9 < e.length)) {_context31.next = 11;break;}_r5 = e[_n9];_context31.next = 5;return at(_r5, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}s = _r5;return _context31.abrupt("break", 11);case 8:_n9++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: s, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref24.apply(this, arguments);};}()(_e25, _s4);}return Promise.resolve();}).then(function () {var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref25.address,s = _ref25.port;if (!v) return Promise.resolve();if (e) t.localAddress = e, t.localPort = s;else if (t.debugInfo) {var _e26 = console["app-plus" === S ? "error" : "warn"];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _e26("??????????????????HBuilderX????????????????????????????????????????????????????????????HBuilderX??????uniCloud????????????????????????????????????????????????\n- ???????????????uniCloud????????????????????????????????????????????????\n- ????????????uniCloud??????????????????????????????????????????????????????????????????????????????????????????????????????\n- ?????????HBuilderX???????????????????????????????????????????????????HBuilderX?????????\n- ????????????????????????????????????HBuilderX?????????nodejs")) : _e26("????????????uniCloud????????????????????????????????????????????????????????????????????????????????????\n- ????????????uniCloud??????????????????????????????????????????????????????????????????????????????????????????????????????\n- ?????????HBuilderX???????????????????????????????????????????????????HBuilderX?????????\n- ????????????????????????????????????HBuilderX?????????nodejs");}}).then(function () {return function () {if (!v || "h5" !== S) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === I.appid) return;uni.setStorageSync("__LAST_DCLOUD_APPID", I.appid), uni.removeStorageSync("uni_id_token") && (console.warn("?????????????????????????????????????????????????????????????????????????????????uni-id?????????token????????????????????????????????????"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) {"quickapp-native" === S ? (E = "android", uni.getStorage({ key: "__DC_CLOUD_UUID", success: function success(t) {A = t.data ? t.data : O(32), e();} })) : setTimeout(function () {E = uni.getSystemInfoSync().platform, A = uni.getStorageSync("__DC_CLOUD_UUID") || O(32), e();}, 0);});}).then(function () {t.isReady = !0;}), Ze(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this20 = this;var s;return s = this.isReady ? Promise.resolve() : this.initUniCloud, s.then(function () {return t.call(_this20, e);});};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {},s = {};var n = /*#__PURE__*/function () {function n(e, t, s) {_classCallCheck(this, n);this.content = e, this.prevStage = t, this.actionName = s;}_createClass(n, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: e.$param };}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB????????????set??????");} }, { key: "_send", value: function _send(n, r) {var _this21 = this;var o = d(f("database", "invoke")),i = this.toJSON();return i.$db.push({ $method: n, $param: st(r) }), o.then(function () {return e.callFunction({ name: "DCloud-clientDB", data: { action: _this21.actionName, command: i } }).then(function (e) {var _e$result = e.result,n = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,c = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (c) for (var _e27 = 0; _e27 < c.length; _e27++) {var _c$_e = c[_e27],_t10 = _c$_e.level,_s5 = _c$_e.message,_n10 = _c$_e.detail,_r6 = console["app-plus" === S && "warn" === _t10 ? "error" : _t10] || console.log;var _o3 = "[System Info]" + _s5;_n10 && (_o3 = "".concat(_o3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_n10)), _r6(_o3);}if (n) return Promise.reject(new a(r, n));o && i && t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), o && i && s.refreshToken && s.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });});var u = e.result.affectedDocs;return "number" == typeof u && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs??????????????????????????????inserted/deleted/updated/data.length??????"), u;} }), d(f("database", "success"), e).then(function () {return d(f("database", "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {var t = new a(e.message, e.code || "SYSTEM_ERROR");return s.error && s.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB?????????????????????web?????????????????????schema?????????clientDB"), d(f("database", "fail"), e).then(function () {return d(f("database", "complete"), e);}).then(function () {return Promise.reject(e);});});});} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _s6 = e.content.$method;if ("aggregate" === _s6 || "pipeline" === _s6) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return i({ $method: "count", $param: st(Array.from(arguments)) }, e, e.actionName);};} }]);return n;}();var r = ["db.Geo", "db.command", "command.aggregate"];function o(e, t) {return r.indexOf("".concat(e, ".").concat(t)) > -1;}function i(e, t, s) {return tt(new n(e, t, s), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), o(n, t) ? i({ $method: t }, e, s) : function () {return i({ $method: t, $param: st(Array.from(arguments)) }, e, s);};} });}function c(_ref26) {var e = _ref26.path,t = _ref26.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var u = { auth: { on: function on(e, s) {t[e] = t[e] || [], t[e].indexOf(s) > -1 || t[e].push(s);}, off: function off(e, s) {t[e] = t[e] || [];var n = t[e].indexOf(s);-1 !== n && t[e].splice(n, 1);} }, on: function on(e, t) {s[e] = s[e] || [], s[e].indexOf(t) > -1 || s[e].push(t);}, off: function off(e, t) {s[e] = s[e] || [];var n = s[e].indexOf(t);-1 !== n && s[e].splice(n, 1);}, env: tt({}, { get: function get(e, t) {return { $env: t };} }), action: function action(e) {return tt({}, { get: function get(t, s) {return o("db", s) ? i({ $method: s }, null, e) : function () {return i({ $method: s, $param: st(Array.from(arguments)) }, null, e);};} });}, Geo: tt({}, { get: function get(e, t) {return c({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv????????????");return { $env: e.replace("$cloudEnv_", "") };}, get serverDate() {return c({ path: [], method: "serverDate" });}, get RegExp() {return c({ path: [], method: "RegExp" });} },h = tt(u, { get: function get(e, t) {return o("db", t) ? i({ $method: t }) : function () {return i({ $method: t, $param: st(Array.from(arguments)) });};} });return this._database = h, h;};}(t), function (e) {e.getCurrentUserInfo = nt, e.chooseAndUploadFile = rt.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return it(e);} });}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {t[e] && (t[e] = p(t[e], e));}), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = T;var t = {};if (1 === e.length) t = e[0], ct = ct.init(t);else {var _t11 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"];var _s7;_s7 = e && e.length > 0 ? "???????????????????????????????????????uniCloud.init????????????????????????????????????" : P ? "????????????????????????????????????uniCloud??????????????????????????????" : "uni-app cli???????????????uniCloud????????????HBuilderX??????????????????????????????????????????uniCloud????????????????????????", _t11.forEach(function (e) {ct[e] = function () {return console.error(_s7), Promise.reject(new g({ code: "SYS_ERR", message: _s7 }));};});}Object.assign(ct, { get mixinDatacom() {return it(ct);} }), ct.addInterceptor = h, ct.removeInterceptor = l, v && "h5" === S && (window.uniCloud = ct);}})();var ut = ct;var _default2 = ut;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../../../node-libs-browser/mock/process.js */ 171)))

/***/ }),

/***/ 171:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 172);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 172:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 171)))

/***/ }),

/***/ 173:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 174);

/***/ }),

/***/ 174:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 175);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 175:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 176:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.initVueI18n = initVueI18n;exports.I18n = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isObject = function isObject(val) {return val !== null && typeof val === 'object';};var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var _char = format[position++];
    if (_char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      _char = format[position++];
      while (_char !== undefined && _char !== '}') {
        sub += _char;
        _char = format[position++];
      }
      var isClosed = _char === '}';
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    } else
    if (_char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += _char;
      }
    } else
    {
      text += _char;
    }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return 'zh-Hans';
    }
    if (locale.indexOf('-hant') !== -1) {
      return 'zh-Hant';
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return 'zh-Hant';
    }
    return 'zh-Hans';
  }
  var lang = startsWith(locale, ['en', 'fr', 'es']);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref) {var locale = _ref.locale,fallbackLocale = _ref.fallbackLocale,messages = _ref.messages,watcher = _ref.watcher,formater = _ref.formater;_classCallCheck(this, I18n);
    this.locale = 'en';
    this.fallbackLocale = 'en';
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages;
    this.setLocale(locale);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      this.message = this.messages[this.locale];
      this.watchers.forEach(function (watcher) {
        watcher(_this.locale, oldLocale);
      });
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function initLocaleWatcher(appVm, i18n) {
  appVm.$i18n &&
  appVm.$i18n.vm.$watch('locale', function (newLocale) {
    i18n.setLocale(newLocale);
  }, {
    immediate: true });

}
function getDefaultLocale() {
  if (typeof navigator !== 'undefined') {
    return navigator.userLanguage || navigator.language;
  }
  if (typeof plus !== 'undefined') {
    // TODO ???????????????????????????????????????
    return plus.os.language;
  }
  return uni.getSystemInfoSync().language;
}
function initVueI18n(messages) {var fallbackLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';var locale = arguments.length > 2 ? arguments[2] : undefined;
  var i18n = new I18n({
    locale: locale || fallbackLocale,
    fallbackLocale: fallbackLocale,
    messages: messages });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app-plus view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      if (!appVm.$t || !appVm.$i18n) {
        if (!locale) {
          i18n.setLocale(getDefaultLocale());
        }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          return i18n.t(key, values);
        };
      } else
      {
        initLocaleWatcher(appVm, i18n);
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    t: function t(key, values) {
      return _t(key, values);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    },
    mixin: {
      beforeCreate: function beforeCreate() {var _this3 = this;
        var unwatch = i18n.watchLocale(function () {
          _this3.$forceUpdate();
        });
        this.$once('hook:beforeDestroy', function () {
          unwatch();
        });
      },
      methods: {
        $$t: function $$t(key, values) {
          return _t(key, values);
        } } } };



}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 177:
/*!**********************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/pages.json?{"type":"stat"} ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__B7F340C" };exports.default = _default;

/***/ }),

/***/ 178:
/*!****************************************************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * uCharts??
 * ????????????????????????????????????H5???APP?????????????????????/?????????/??????/??????/QQ/360??????Vue???Taro?????????canvas???????????????
 * Copyright (c) 2021 QIUN???????? https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * ?????????????????????????????????????????????????????????
 * 
 * uCharts??????????????
 * https://www.uCharts.cn
 * 
 * ????????????:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app?????????????????????
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 */

function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}

var config = {
  version: 'v2.2.1-20210603',
  yAxisWidth: 15,
  yAxisSplit: 5,
  xAxisHeight: 22,
  xAxisLineHeight: 22,
  legendHeight: 15,
  yAxisTitleWidth: 15,
  padding: [10, 10, 10, 10],
  pixelRatio: 1,
  rotate: false,
  columePadding: 3,
  fontSize: 13,
  fontColor: '#666666',
  dataPointShape: ['circle', 'circle', 'circle', 'circle'],
  color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  linearColor: ['#0EE2F8', '#2BDCA8', '#FA7D8D', '#EB88E2', '#2AE3A0', '#0EE2F8', '#EB88E2', '#6773E3', '#F78A85'],
  pieChartLinePadding: 15,
  pieChartTextPadding: 5,
  xAxisTextPadding: 3,
  titleColor: '#333333',
  titleFontSize: 20,
  subtitleColor: '#999999',
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: '#000000',
  toolTipOpacity: 0.7,
  toolTipLineHeight: 20,
  radarLabelTextMargin: 13,
  gaugeLabelTextMargin: 13 };


var assign = function assign(target) {for (var _len2 = arguments.length, varArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {varArgs[_key2 - 1] = arguments[_key2];}
  if (target == null) {
    throw new TypeError('[uCharts] Cannot convert undefined or null to object');
  }
  if (!varArgs || varArgs.length <= 0) {
    return target;
  }
  // ??????????????????
  function deepAssign(obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ?
      deepAssign(obj1[key], obj2[key]) : obj1[key] = obj2[key];
    }
    return obj1;
  }
  varArgs.forEach(function (val) {
    target = deepAssign(target, val);
  });
  return target;
};

var util = {
  toFixed: function toFixed(num, limit) {
    limit = limit || 2;
    if (this.isFloat(num)) {
      num = num.toFixed(limit);
    }
    return num;
  },
  isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
    return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
    return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
    obj1.end = {};
    obj1.end.x = obj1.start.x + obj1.width;
    obj1.end.y = obj1.start.y - obj1.height;
    obj2.end = {};
    obj2.end.x = obj2.start.x + obj2.width;
    obj2.end.y = obj2.start.y - obj2.height;
    var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;
    return !flag;
  } };


//??????H5????????????
function getH5Offset(e) {
  e.mp = {
    changedTouches: [] };

  e.mp.changedTouches.push({
    x: e.offsetX,
    y: e.offsetY });

  return e;
}

// ?????????????????????
function lonlat2mercator(longitude, latitude) {
  var mercator = Array(2);
  var x = longitude * 20037508.34 / 180;
  var y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  mercator[0] = x;
  mercator[1] = y;
  return mercator;
}

// ?????????????????????
function mercator2lonlat(longitude, latitude) {
  var lonlat = Array(2);
  var x = longitude / 20037508.34 * 180;
  var y = latitude / 20037508.34 * 180;
  y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
  lonlat[0] = x;
  lonlat[1] = y;
  return lonlat;
}

// hex ??? rgba
function hexToRgb(hexValue, opc) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opc + ')';
}

function findRange(num, type, limit) {
  if (isNaN(num)) {
    throw new Error('[uCharts] series????????????Number??????');
  }
  limit = limit || 10;
  type = type ? type : 'upper';
  var multiple = 1;
  while (limit < 1) {
    limit *= 10;
    multiple *= 10;
  }
  if (type === 'upper') {
    num = Math.ceil(num * multiple);
  } else {
    num = Math.floor(num * multiple);
  }
  while (num % limit !== 0) {
    if (type === 'upper') {
      num++;
    } else {
      num--;
    }
  }
  return num / multiple;
}

function calCandleMA(dayArr, nameArr, colorArr, kdata) {
  var seriesTemp = [];
  for (var k = 0; k < dayArr.length; k++) {
    var seriesItem = {
      data: [],
      name: nameArr[k],
      color: colorArr[k] };

    for (var i = 0, len = kdata.length; i < len; i++) {
      if (i < dayArr[k]) {
        seriesItem.data.push(null);
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayArr[k]; j++) {
        sum += kdata[i - j][1];
      }
      seriesItem.data.push(+(sum / dayArr[k]).toFixed(3));
    }
    seriesTemp.push(seriesItem);
  }
  return seriesTemp;
}

function calValidDistance(self, distance, chartData, config, opts) {
  var dataChartAreaWidth = opts.width - opts.area[1] - opts.area[3];
  var dataChartWidth = chartData.eachSpacing * (opts.chartData.xAxisData.xAxisPoints.length - 1);
  var validDistance = distance;
  if (distance >= 0) {
    validDistance = 0;
    self.uevent.trigger('scrollLeft');
    self.scrollOption.position = 'left';
    opts.xAxis.scrollPosition = 'left';
  } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
    validDistance = dataChartAreaWidth - dataChartWidth;
    self.uevent.trigger('scrollRight');
    self.scrollOption.position = 'right';
    opts.xAxis.scrollPosition = 'right';
  } else {
    self.scrollOption.position = distance;
    opts.xAxis.scrollPosition = distance;
  }
  return validDistance;
}

function isInAngleRange(angle, startAngle, endAngle) {
  function adjust(angle) {
    while (angle < 0) {
      angle += 2 * Math.PI;
    }
    while (angle > 2 * Math.PI) {
      angle -= 2 * Math.PI;
    }
    return angle;
  }
  angle = adjust(angle);
  startAngle = adjust(startAngle);
  endAngle = adjust(endAngle);
  if (startAngle > endAngle) {
    endAngle += 2 * Math.PI;
    if (angle < startAngle) {
      angle += 2 * Math.PI;
    }
  }
  return angle >= startAngle && angle <= endAngle;
}

function calRotateTranslate(x, y, h) {
  var xv = x;
  var yv = h - y;
  var transX = xv + (h - yv - xv) / Math.sqrt(2);
  transX *= -1;
  var transY = (h - yv) * (Math.sqrt(2) - 1) - (h - yv - xv) / Math.sqrt(2);
  return {
    transX: transX,
    transY: transY };

}

function createCurveControlPoints(points, i) {
  function isNotMiddlePoint(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y,
      points[i + 1].y);
    } else {
      return false;
    }
  }
  function isNotMiddlePointX(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].x >= Math.max(points[i - 1].x, points[i + 1].x) || points[i].x <= Math.min(points[i - 1].x,
      points[i + 1].x);
    } else {
      return false;
    }
  }
  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;
  if (i < 1) {
    pAx = points[0].x + (points[1].x - points[0].x) * a;
    pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
    pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
    pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }

  if (i > points.length - 3) {
    var last = points.length - 1;
    pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
    pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
    pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
    pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  }
  if (isNotMiddlePoint(points, i + 1)) {
    pBy = points[i + 1].y;
  }
  if (isNotMiddlePoint(points, i)) {
    pAy = points[i].y;
  }
  if (isNotMiddlePointX(points, i + 1)) {
    pBx = points[i + 1].x;
  }
  if (isNotMiddlePointX(points, i)) {
    pAx = points[i].x;
  }
  if (pAy >= Math.max(points[i].y, points[i + 1].y) || pAy <= Math.min(points[i].y, points[i + 1].y)) {
    pAy = points[i].y;
  }
  if (pBy >= Math.max(points[i].y, points[i + 1].y) || pBy <= Math.min(points[i].y, points[i + 1].y)) {
    pBy = points[i + 1].y;
  }
  if (pAx >= Math.max(points[i].x, points[i + 1].x) || pAx <= Math.min(points[i].x, points[i + 1].x)) {
    pAx = points[i].x;
  }
  if (pBx >= Math.max(points[i].x, points[i + 1].x) || pBx <= Math.min(points[i].x, points[i + 1].x)) {
    pBx = points[i + 1].x;
  }
  return {
    ctrA: {
      x: pAx,
      y: pAy },

    ctrB: {
      x: pBx,
      y: pBy } };


}

function convertCoordinateOrigin(x, y, center) {
  return {
    x: center.x + x,
    y: center.y - y };

}

function avoidCollision(obj, target) {
  if (target) {
    // is collision test
    while (util.isCollision(obj, target)) {
      if (obj.start.x > 0) {
        obj.start.y--;
      } else if (obj.start.x < 0) {
        obj.start.y++;
      } else {
        if (obj.start.y > 0) {
          obj.start.y++;
        } else {
          obj.start.y--;
        }
      }
    }
  }
  return obj;
}

function fixPieSeries(series, opts, config) {
  var pieSeriesArr = [];
  if (series.length > 0 && series[0].data.constructor.toString().indexOf('Array') > -1) {
    opts._pieSeries_ = series;
    var oldseries = series[0].data;
    for (var i = 0; i < oldseries.length; i++) {
      oldseries[i].formatter = series[0].formatter;
      oldseries[i].data = oldseries[i].value;
      pieSeriesArr.push(oldseries[i]);
    }
    opts.series = pieSeriesArr;
  } else {
    pieSeriesArr = series;
  }
  return pieSeriesArr;
}

function fillSeries(series, opts, config) {
  var index = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    if (!item.color) {
      item.color = config.color[index];
      index = (index + 1) % config.color.length;
    }
    if (!item.linearIndex) {
      item.linearIndex = i;
    }
    if (!item.index) {
      item.index = 0;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (typeof item.show == "undefined") {
      item.show = true;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (!item.pointShape) {
      item.pointShape = "circle";
    }
    if (!item.legendShape) {
      switch (item.type) {
        case 'line':
          item.legendShape = "line";
          break;
        case 'column':
          item.legendShape = "rect";
          break;
        case 'area':
          item.legendShape = "triangle";
          break;
        case 'bar':
          item.legendShape = "rect";
          break;
        default:
          item.legendShape = "circle";}

    }
  }
  return series;
}

function fillCustomColor(linearType, customColor, series, config) {
  var newcolor = customColor || [];
  if (linearType == 'custom' && newcolor.length == 0) {
    newcolor = config.linearColor;
  }
  if (linearType == 'custom' && newcolor.length < series.length) {
    var chazhi = series.length - newcolor.length;
    for (var i = 0; i < chazhi; i++) {
      newcolor.push(config.linearColor[(i + 1) % config.linearColor.length]);
    }
  }
  return newcolor;
}

function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;
  if (range >= 10000) {
    limit = 1000;
  } else if (range >= 1000) {
    limit = 100;
  } else if (range >= 100) {
    limit = 10;
  } else if (range >= 10) {
    limit = 5;
  } else if (range >= 1) {
    limit = 1;
  } else if (range >= 0.1) {
    limit = 0.1;
  } else if (range >= 0.01) {
    limit = 0.01;
  } else if (range >= 0.001) {
    limit = 0.001;
  } else if (range >= 0.0001) {
    limit = 0.0001;
  } else if (range >= 0.00001) {
    limit = 0.00001;
  } else {
    limit = 0.000001;
  }
  return {
    minRange: findRange(minData, 'lower', limit),
    maxRange: findRange(maxData, 'upper', limit) };

}

function measureText(text, fontSize, context) {
  var width = 0;
  text = String(text);



  if (context !== false && context !== undefined && context.setFontSize && context.measureText) {
    context.setFontSize(fontSize);
    return context.measureText(text).width;
  } else {
    var text = text.split('');
    for (var i = 0; i < text.length; i++) {
      var item = text[i];
      if (/[a-zA-Z]/.test(item)) {
        width += 7;
      } else if (/[0-9]/.test(item)) {
        width += 5.5;
      } else if (/\./.test(item)) {
        width += 2.7;
      } else if (/-/.test(item)) {
        width += 3.25;
      } else if (/:/.test(item)) {
        width += 2.5;
      } else if (/[\u4e00-\u9fa5]/.test(item)) {
        width += 10;
      } else if (/\(|\)/.test(item)) {
        width += 3.73;
      } else if (/\s/.test(item)) {
        width += 2.5;
      } else if (/%/.test(item)) {
        width += 8;
      } else {
        width += 10;
      }
    }
    return width * fontSize / 10;
  }
}

function dataCombine(series) {
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data);
  }, []);
}

function dataCombineStack(series, len) {
  var sum = new Array(len);
  for (var j = 0; j < sum.length; j++) {
    sum[j] = 0;
  }
  for (var i = 0; i < series.length; i++) {
    for (var j = 0; j < sum.length; j++) {
      sum[j] += series[i].data[j];
    }
  }
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data).concat(sum);
  }, []);
}

function getTouches(touches, opts, e) {
  var x, y;
  if (touches.clientX) {
    if (opts.rotate) {
      y = opts.height - touches.clientX * opts.pix;
      x = (touches.pageY - e.currentTarget.offsetTop - opts.height / opts.pix / 2 * (opts.pix - 1)) * opts.pix;
    } else {
      x = touches.clientX * opts.pix;
      y = (touches.pageY - e.currentTarget.offsetTop - opts.height / opts.pix / 2 * (opts.pix - 1)) * opts.pix;
    }
  } else {
    if (opts.rotate) {
      y = opts.height - touches.x * opts.pix;
      x = touches.y * opts.pix;
    } else {
      x = touches.x * opts.pix;
      y = touches.y * opts.pix;
    }
  }
  return {
    x: x,
    y: y };

}

function getSeriesDataItem(series, index, group) {
  var data = [];
  var newSeries = [];
  var indexIsArr = index.constructor.toString().indexOf('Array') > -1;
  if (indexIsArr) {
    var tempSeries = filterSeries(series);
    for (var i = 0; i < group.length; i++) {
      newSeries.push(tempSeries[group[i]]);
    }
  } else {
    newSeries = series;
  };
  for (var _i = 0; _i < newSeries.length; _i++) {
    var item = newSeries[_i];
    var tmpindex = -1;
    if (indexIsArr) {
      tmpindex = index[_i];
    } else {
      tmpindex = index;
    }
    if (item.data[tmpindex] !== null && typeof item.data[tmpindex] !== 'undefined' && item.show) {
      var seriesItem = {};
      seriesItem.color = item.color;
      seriesItem.type = item.type;
      seriesItem.style = item.style;
      seriesItem.pointShape = item.pointShape;
      seriesItem.disableLegend = item.disableLegend;
      seriesItem.name = item.name;
      seriesItem.show = item.show;
      seriesItem.data = item.formatter ? item.formatter(item.data[tmpindex]) : item.data[tmpindex];
      data.push(seriesItem);
    }
  }
  return data;
}

function getMaxTextListLength(list, fontSize, context) {
  var lengthList = list.map(function (item) {
    return measureText(item, fontSize, context);
  });
  return Math.max.apply(null, lengthList);
}

function getRadarCoordinateSeries(length) {
  var eachAngle = 2 * Math.PI / length;
  var CoordinateSeries = [];
  for (var i = 0; i < length; i++) {
    CoordinateSeries.push(eachAngle * i);
  }
  return CoordinateSeries.map(function (item) {
    return -1 * item + Math.PI / 2;
  });
}

function getToolTipData(seriesData, opts, index, group, categories) {
  var option = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var calPoints = opts.chartData.calPoints ? opts.chartData.calPoints : [];
  var points = {};
  if (group.length > 0) {
    var filterPoints = [];
    for (var i = 0; i < group.length; i++) {
      filterPoints.push(calPoints[group[i]]);
    }
    points = filterPoints[0][index[0]];
  } else {
    points = calPoints[0][index];
  };
  var textList = seriesData.map(function (item) {
    var titleText = null;
    if (opts.categories && opts.categories.length > 0) {
      titleText = categories[index];
    };
    return {
      text: option.formatter ? option.formatter(item, titleText, index, opts) : item.name + ': ' + item.data,
      color: item.color };

  });
  var offset = {
    x: Math.round(points.x),
    y: Math.round(points.y) };

  return {
    textList: textList,
    offset: offset };

}

function getMixToolTipData(seriesData, opts, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var points = opts.chartData.xAxisPoints[index] + opts.chartData.eachSpacing / 2;
  var textList = seriesData.map(function (item) {
    return {
      text: option.formatter ? option.formatter(item, categories[index], index, opts) : item.name + ': ' + item.data,
      color: item.color,
      disableLegend: item.disableLegend ? true : false };

  });
  textList = textList.filter(function (item) {
    if (item.disableLegend !== true) {
      return item;
    }
  });
  var offset = {
    x: Math.round(points),
    y: 0 };

  return {
    textList: textList,
    offset: offset };

}

function getCandleToolTipData(series, seriesData, opts, index, categories, extra) {
  var option = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  var calPoints = opts.chartData.calPoints;
  var upColor = extra.color.upFill;
  var downColor = extra.color.downFill;
  //????????????????????????????????????????????????
  var color = [upColor, upColor, downColor, upColor];
  var textList = [];
  seriesData.map(function (item) {
    if (index == 0) {
      if (item.data[1] - item.data[0] < 0) {
        color[1] = downColor;
      } else {
        color[1] = upColor;
      }
    } else {
      if (item.data[0] < series[index - 1][1]) {
        color[0] = downColor;
      }
      if (item.data[1] < item.data[0]) {
        color[1] = downColor;
      }
      if (item.data[2] > series[index - 1][1]) {
        color[2] = upColor;
      }
      if (item.data[3] < series[index - 1][1]) {
        color[3] = downColor;
      }
    }
    var text1 = {
      text: '?????????' + item.data[0],
      color: color[0] };

    var text2 = {
      text: '?????????' + item.data[1],
      color: color[1] };

    var text3 = {
      text: '?????????' + item.data[2],
      color: color[2] };

    var text4 = {
      text: '?????????' + item.data[3],
      color: color[3] };

    textList.push(text1, text2, text3, text4);
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  for (var i = 0; i < calPoints.length; i++) {
    var points = calPoints[i];
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  }
  offset.x = Math.round(validCalPoints[0][0].x);
  return {
    textList: textList,
    offset: offset };

}

function filterSeries(series) {
  var tempSeries = [];
  for (var i = 0; i < series.length; i++) {
    if (series[i].show == true) {
      tempSeries.push(series[i]);
    }
  }
  return tempSeries;
}

function findCurrentIndex(currentPoints, calPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var current = { index: -1, group: [] };
  var spacing = opts.chartData.eachSpacing / 2;
  var xAxisPoints = [];
  if (calPoints && calPoints.length > 0) {
    if (!opts.categories) {
      spacing = 0;
    } else {
      for (var i = 1; i < opts.chartData.xAxisPoints.length; i++) {
        xAxisPoints.push(opts.chartData.xAxisPoints[i] - spacing);
      }
      if ((opts.type == 'line' || opts.type == 'area') && opts.xAxis.boundaryGap == 'justify') {
        xAxisPoints = opts.chartData.xAxisPoints;
      }
    }
    if (isInExactChartArea(currentPoints, opts, config)) {
      if (!opts.categories) {
        var timePoints = Array(calPoints.length);
        for (var _i2 = 0; _i2 < calPoints.length; _i2++) {
          timePoints[_i2] = Array(calPoints[_i2].length);
          for (var j = 0; j < calPoints[_i2].length; j++) {
            timePoints[_i2][j] = Math.abs(calPoints[_i2][j].x - currentPoints.x);
          }
        };
        var pointValue = Array(timePoints.length);
        var pointIndex = Array(timePoints.length);
        for (var _i3 = 0; _i3 < timePoints.length; _i3++) {
          pointValue[_i3] = Math.min.apply(null, timePoints[_i3]);
          pointIndex[_i3] = timePoints[_i3].indexOf(pointValue[_i3]);
        }
        var minValue = Math.min.apply(null, pointValue);
        current.index = [];
        for (var _i4 = 0; _i4 < pointValue.length; _i4++) {
          if (pointValue[_i4] == minValue) {
            current.group.push(_i4);
            current.index.push(pointIndex[_i4]);
          }
        };
      } else {
        xAxisPoints.forEach(function (item, index) {
          if (currentPoints.x + offset + spacing > item) {
            current.index = index;
          }
        });
      }
    }
  }
  return current;
}

function findBarChartCurrentIndex(currentPoints, calPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var current = { index: -1, group: [] };
  var spacing = opts.chartData.eachSpacing / 2;
  var yAxisPoints = opts.chartData.yAxisPoints;
  if (calPoints && calPoints.length > 0) {
    if (isInExactChartArea(currentPoints, opts, config)) {
      yAxisPoints.forEach(function (item, index) {
        if (currentPoints.y + offset + spacing > item) {
          current.index = index;
        }
      });
    }
  }
  return current;
}

function findLegendIndex(currentPoints, legendData, opts) {
  var currentIndex = -1;
  var gap = 0;
  if (isInExactLegendArea(currentPoints, legendData.area)) {
    var points = legendData.points;
    var index = -1;
    for (var i = 0, len = points.length; i < len; i++) {
      var item = points[i];
      for (var j = 0; j < item.length; j++) {
        index += 1;
        var area = item[j]['area'];
        if (area && currentPoints.x > area[0] - gap && currentPoints.x < area[2] + gap && currentPoints.y > area[1] - gap && currentPoints.y < area[3] + gap) {
          currentIndex = index;
          break;
        }
      }
    }
    return currentIndex;
  }
  return currentIndex;
}

function isInExactLegendArea(currentPoints, area) {
  return currentPoints.x > area.start.x && currentPoints.x < area.end.x && currentPoints.y > area.start.y && currentPoints.y < area.end.y;
}

function isInExactChartArea(currentPoints, opts, config) {
  return currentPoints.x <= opts.width - opts.area[1] + 10 && currentPoints.x >= opts.area[3] - 10 && currentPoints.y >= opts.area[0] && currentPoints.y <= opts.height - opts.area[2];
}

function findRadarChartCurrentIndex(currentPoints, radarData, count) {
  var eachAngleArea = 2 * Math.PI / count;
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
    var fixAngle = function fixAngle(angle) {
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      if (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
      }
      return angle;
    };
    var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
    angle = -1 * angle;
    if (angle < 0) {
      angle += 2 * Math.PI;
    }
    var angleList = radarData.angleList.map(function (item) {
      item = fixAngle(-1 * item);
      return item;
    });
    angleList.forEach(function (item, index) {
      var rangeStart = fixAngle(item - eachAngleArea / 2);
      var rangeEnd = fixAngle(item + eachAngleArea / 2);
      if (rangeEnd < rangeStart) {
        rangeEnd += 2 * Math.PI;
      }
      if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <= rangeEnd) {
        currentIndex = index;
      }
    });
  }
  return currentIndex;
}

function findFunnelChartCurrentIndex(currentPoints, funnelData) {
  var currentIndex = -1;
  for (var i = 0, len = funnelData.series.length; i < len; i++) {
    var item = funnelData.series[i];
    if (currentPoints.x > item.funnelArea[0] && currentPoints.x < item.funnelArea[2] && currentPoints.y > item.funnelArea[1] && currentPoints.y < item.funnelArea[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findWordChartCurrentIndex(currentPoints, wordData) {
  var currentIndex = -1;
  for (var i = 0, len = wordData.length; i < len; i++) {
    var item = wordData[i];
    if (currentPoints.x > item.area[0] && currentPoints.x < item.area[2] && currentPoints.y > item.area[1] && currentPoints.y < item.area[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findMapChartCurrentIndex(currentPoints, opts) {
  var currentIndex = -1;
  var cData = opts.chartData.mapData;
  var data = opts.series;
  var tmp = pointToCoordinate(currentPoints.y, currentPoints.x, cData.bounds, cData.scale, cData.xoffset, cData.yoffset);
  var poi = [tmp.x, tmp.y];
  for (var i = 0, len = data.length; i < len; i++) {
    var item = data[i].geometry.coordinates;
    if (isPoiWithinPoly(poi, item, opts.chartData.mapData.mercator)) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findRoseChartCurrentIndex(currentPoints, pieData, opts) {
  var currentIndex = -1;
  var series = getRoseDataPoints(opts._series_, opts.extra.rose.type, pieData.radius, pieData.radius);
  if (pieData && pieData.center && isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    if (opts.extra.rose && opts.extra.rose.offsetAngle) {
      angle = angle - opts.extra.rose.offsetAngle * Math.PI / 180;
    }
    for (var i = 0, len = series.length; i < len; i++) {
      if (isInAngleRange(angle, series[i]._start_, series[i]._start_ + series[i]._rose_proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }
  return currentIndex;
}

function findPieChartCurrentIndex(currentPoints, pieData, opts) {
  var currentIndex = -1;
  var series = getPieDataPoints(pieData.series);
  if (pieData && pieData.center && isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    if (opts.extra.pie && opts.extra.pie.offsetAngle) {
      angle = angle - opts.extra.pie.offsetAngle * Math.PI / 180;
    }
    if (opts.extra.ring && opts.extra.ring.offsetAngle) {
      angle = angle - opts.extra.ring.offsetAngle * Math.PI / 180;
    }
    for (var i = 0, len = series.length; i < len; i++) {
      if (isInAngleRange(angle, series[i]._start_, series[i]._start_ + series[i]._proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }
  return currentIndex;
}

function isInExactPieChartArea(currentPoints, center, radius) {
  return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}

function splitPoints(points, eachSeries) {
  var newPoints = [];
  var items = [];
  points.forEach(function (item, index) {
    if (eachSeries.connectNulls) {
      if (item !== null) {
        items.push(item);
      }
    } else {
      if (item !== null) {
        items.push(item);
      } else {
        if (items.length) {
          newPoints.push(items);
        }
        items = [];
      }
    }

  });
  if (items.length) {
    newPoints.push(items);
  }
  return newPoints;
}

function calLegendData(series, opts, config, chartData, context) {
  var legendData = {
    area: {
      start: {
        x: 0,
        y: 0 },

      end: {
        x: 0,
        y: 0 },

      width: 0,
      height: 0,
      wholeWidth: 0,
      wholeHeight: 0 },

    points: [],
    widthArr: [],
    heightArr: [] };

  if (opts.legend.show === false) {
    chartData.legendData = legendData;
    return legendData;
  }
  var padding = opts.legend.padding * opts.pix;
  var margin = opts.legend.margin * opts.pix;
  var fontSize = opts.legend.fontSize ? opts.legend.fontSize * opts.pix : config.fontSize;
  var shapeWidth = 15 * opts.pix;
  var shapeRight = 5 * opts.pix;
  var lineHeight = Math.max(opts.legend.lineHeight * opts.pix, fontSize);
  if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
    var legendList = [];
    var widthCount = 0;
    var widthCountArr = [];
    var currentRow = [];
    for (var i = 0; i < series.length; i++) {
      var item = series[i];
      var itemWidth = shapeWidth + shapeRight + measureText(item.name || 'undefined', fontSize, context) + opts.legend.itemGap * opts.pix;
      if (widthCount + itemWidth > opts.width - opts.area[1] - opts.area[3]) {
        legendList.push(currentRow);
        widthCountArr.push(widthCount - opts.legend.itemGap * opts.pix);
        widthCount = itemWidth;
        currentRow = [item];
      } else {
        widthCount += itemWidth;
        currentRow.push(item);
      }
    }
    if (currentRow.length) {
      legendList.push(currentRow);
      widthCountArr.push(widthCount - opts.legend.itemGap * opts.pix);
      legendData.widthArr = widthCountArr;
      var legendWidth = Math.max.apply(null, widthCountArr);
      switch (opts.legend.float) {
        case 'left':
          legendData.area.start.x = opts.area[3];
          legendData.area.end.x = opts.area[3] + legendWidth + 2 * padding;
          break;
        case 'right':
          legendData.area.start.x = opts.width - opts.area[1] - legendWidth - 2 * padding;
          legendData.area.end.x = opts.width - opts.area[1];
          break;
        default:
          legendData.area.start.x = (opts.width - legendWidth) / 2 - padding;
          legendData.area.end.x = (opts.width + legendWidth) / 2 + padding;}

      legendData.area.width = legendWidth + 2 * padding;
      legendData.area.wholeWidth = legendWidth + 2 * padding;
      legendData.area.height = legendList.length * lineHeight + 2 * padding;
      legendData.area.wholeHeight = legendList.length * lineHeight + 2 * padding + 2 * margin;
      legendData.points = legendList;
    }
  } else {
    var len = series.length;
    var maxHeight = opts.height - opts.area[0] - opts.area[2] - 2 * margin - 2 * padding;
    var maxLength = Math.min(Math.floor(maxHeight / lineHeight), len);
    legendData.area.height = maxLength * lineHeight + padding * 2;
    legendData.area.wholeHeight = maxLength * lineHeight + padding * 2;
    switch (opts.legend.float) {
      case 'top':
        legendData.area.start.y = opts.area[0] + margin;
        legendData.area.end.y = opts.area[0] + margin + legendData.area.height;
        break;
      case 'bottom':
        legendData.area.start.y = opts.height - opts.area[2] - margin - legendData.area.height;
        legendData.area.end.y = opts.height - opts.area[2] - margin;
        break;
      default:
        legendData.area.start.y = (opts.height - legendData.area.height) / 2;
        legendData.area.end.y = (opts.height + legendData.area.height) / 2;}

    var lineNum = len % maxLength === 0 ? len / maxLength : Math.floor(len / maxLength + 1);
    var _currentRow = [];
    for (var _i5 = 0; _i5 < lineNum; _i5++) {
      var temp = series.slice(_i5 * maxLength, _i5 * maxLength + maxLength);
      _currentRow.push(temp);
    }
    legendData.points = _currentRow;
    if (_currentRow.length) {
      for (var _i6 = 0; _i6 < _currentRow.length; _i6++) {
        var _item = _currentRow[_i6];
        var maxWidth = 0;
        for (var j = 0; j < _item.length; j++) {
          var _itemWidth = shapeWidth + shapeRight + measureText(_item[j].name || 'undefined', fontSize, context) + opts.legend.itemGap * opts.pix;
          if (_itemWidth > maxWidth) {
            maxWidth = _itemWidth;
          }
        }
        legendData.widthArr.push(maxWidth);
        legendData.heightArr.push(_item.length * lineHeight + padding * 2);
      }
      var _legendWidth = 0;
      for (var _i7 = 0; _i7 < legendData.widthArr.length; _i7++) {
        _legendWidth += legendData.widthArr[_i7];
      }
      legendData.area.width = _legendWidth - opts.legend.itemGap * opts.pix + 2 * padding;
      legendData.area.wholeWidth = legendData.area.width + padding;
    }
  }
  switch (opts.legend.position) {
    case 'top':
      legendData.area.start.y = opts.area[0] + margin;
      legendData.area.end.y = opts.area[0] + margin + legendData.area.height;
      break;
    case 'bottom':
      legendData.area.start.y = opts.height - opts.area[2] - legendData.area.height - margin;
      legendData.area.end.y = opts.height - opts.area[2] - margin;
      break;
    case 'left':
      legendData.area.start.x = opts.area[3];
      legendData.area.end.x = opts.area[3] + legendData.area.width;
      break;
    case 'right':
      legendData.area.start.x = opts.width - opts.area[1] - legendData.area.width;
      legendData.area.end.x = opts.width - opts.area[1];
      break;}

  chartData.legendData = legendData;
  return legendData;
}

function calCategoriesData(categories, opts, config, eachSpacing, context) {
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };

  var categoriesTextLenth = categories.map(function (item) {
    return measureText(item, opts.xAxis.fontSize * opts.pix || config.fontSize, context);
  });
  var maxTextLength = Math.max.apply(this, categoriesTextLenth);

  if (opts.xAxis.rotateLabel == true && maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }
  return result;
}

function getXAxisTextList(series, opts, config, stack) {
  var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
  var data;
  if (stack == 'stack') {
    data = dataCombineStack(series, opts.categories.length);
  } else {
    data = dataCombine(series);
  }
  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object' && item !== null) {
      if (item.constructor.toString().indexOf('Array') > -1) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function (item) {
    if (typeof item === 'object') {
      if (item.constructor.toString().indexOf('Array') > -1) {
        if (opts.type == 'candle') {
          item.map(function (subitem) {
            sorted.push(subitem);
          });
        } else {
          sorted.push(item[0]);
        }
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });

  var minData = 0;
  var maxData = 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  //????????????v1.9.0???????????????
  if (index > -1) {
    if (typeof opts.xAxis.data[index].min === 'number') {
      minData = Math.min(opts.xAxis.data[index].min, minData);
    }
    if (typeof opts.xAxis.data[index].max === 'number') {
      maxData = Math.max(opts.xAxis.data[index].max, maxData);
    }
  } else {
    if (typeof opts.xAxis.min === 'number') {
      minData = Math.min(opts.xAxis.min, minData);
    }
    if (typeof opts.xAxis.max === 'number') {
      maxData = Math.max(opts.xAxis.max, maxData);
    }
  }
  if (minData === maxData) {
    var rangeSpan = maxData || 10;
    maxData += rangeSpan;
  }
  //var dataRange = getDataRange(minData, maxData);
  var minRange = minData;
  var maxRange = maxData;
  var range = [];
  var eachRange = (maxRange - minRange) / opts.xAxis.splitNumber;
  for (var i = 0; i <= opts.xAxis.splitNumber; i++) {
    range.push(minRange + eachRange * i);
  }
  return range;
}

function calXAxisData(series, opts, config, context) {
  //???????????????Y???
  var columnstyle = assign({}, {
    type: "" },
  opts.extra.bar);
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };

  result.ranges = getXAxisTextList(series, opts, config, columnstyle.type);
  result.rangesFormat = result.ranges.map(function (item) {
    //item = opts.xAxis.formatter ? opts.xAxis.formatter(item) : util.toFixed(item, 2);
    item = util.toFixed(item, 2);
    return item;
  });
  var xAxisScaleValues = result.ranges.map(function (item) {
    // ???????????????????????????,?????????????????????
    item = util.toFixed(item, 2);
    // ?????????????????????????????????????????????????????????
    //item = opts.xAxis.formatter ? opts.xAxis.formatter(Number(item)) : item;
    return item;
  });
  result = Object.assign(result, getXAxisPoints(xAxisScaleValues, opts, config));
  // ??????X?????????????????????????????????????????????,??????????????????\?????????????????????
  var eachSpacing = result.eachSpacing;
  var textLength = xAxisScaleValues.map(function (item) {
    return measureText(item, opts.xAxis.fontSize * opts.pix || config.fontSize, context);
  });
  // get max length of categories text
  var maxTextLength = Math.max.apply(this, textLength);
  // ?????????????????????????????????,????????????????????????45??
  if (maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }
  if (opts.xAxis.disabled === true) {
    result.xAxisHeight = 0;
  }
  return result;
}

function getRadarDataPoints(angleList, center, radius, series, opts) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var radarOption = opts.extra.radar || {};
  radarOption.max = radarOption.max || 0;
  var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));
  var data = [];var _loop2 = function _loop2(
  i) {
    var each = series[i];
    var listItem = {};
    listItem.color = each.color;
    listItem.legendShape = each.legendShape;
    listItem.pointShape = each.pointShape;
    listItem.data = [];
    each.data.forEach(function (item, index) {
      var tmp = {};
      tmp.angle = angleList[index];
      tmp.proportion = item / maxData;
      tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion * process * Math.sin(tmp.angle), center);
      listItem.data.push(tmp);
    });
    data.push(listItem);};for (var i = 0; i < series.length; i++) {_loop2(i);
  }
  return data;
}

function getPieDataPoints(series, radius) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var count = 0;
  var _start_ = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
  }
  for (var _i8 = 0; _i8 < series.length; _i8++) {
    var _item2 = series[_i8];
    _item2.data = _item2.data === null ? 0 : _item2.data;
    if (count === 0) {
      _item2._proportion_ = 1 / series.length * process;
    } else {
      _item2._proportion_ = _item2.data / count * process;
    }
    _item2._radius_ = radius;
  }
  for (var _i9 = 0; _i9 < series.length; _i9++) {
    var _item3 = series[_i9];
    _item3._start_ = _start_;
    _start_ += 2 * _item3._proportion_ * Math.PI;
  }
  return series;
}

function getFunnelDataPoints(series, radius, type, eachSpacing) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  series = series.sort(function (a, b) {
    return parseInt(b.data) - parseInt(a.data);
  });
  for (var i = 0; i < series.length; i++) {
    if (type == 'funnel') {
      series[i].radius = series[i].data / series[0].data * radius * process;
    } else {
      series[i].radius = eachSpacing * (series.length - i) / (eachSpacing * series.length) * radius * process;
    }
    series[i]._proportion_ = series[i].data / series[0].data;
  }
  if (type !== 'pyramid') {
    series.reverse();
  }
  return series;
}

function getRoseDataPoints(series, type, minRadius, radius) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var count = 0;
  var _start_ = 0;
  var dataArr = [];
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
    dataArr.push(item.data);
  }
  var minData = Math.min.apply(null, dataArr);
  var maxData = Math.max.apply(null, dataArr);
  var radiusLength = radius - minRadius;
  for (var _i10 = 0; _i10 < series.length; _i10++) {
    var _item4 = series[_i10];
    _item4.data = _item4.data === null ? 0 : _item4.data;
    if (count === 0) {
      _item4._proportion_ = 1 / series.length * process;
      _item4._rose_proportion_ = 1 / series.length * process;
    } else {
      _item4._proportion_ = _item4.data / count * process;
      if (type == 'area') {
        _item4._rose_proportion_ = 1 / series.length * process;
      } else {
        _item4._rose_proportion_ = _item4.data / count * process;
      }
    }
    _item4._radius_ = minRadius + radiusLength * ((_item4.data - minData) / (maxData - minData)) || radius;
  }
  for (var _i11 = 0; _i11 < series.length; _i11++) {
    var _item5 = series[_i11];
    _item5._start_ = _start_;
    _start_ += 2 * _item5._rose_proportion_ * Math.PI;
  }
  return series;
}

function getArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    var totalAngle = void 0;
    if (arcbarOption.type == 'circle') {
      totalAngle = 2;
    } else {
      if (arcbarOption.endAngle < arcbarOption.startAngle) {
        totalAngle = 2 + arcbarOption.endAngle - arcbarOption.startAngle;
      } else {
        totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
      }
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getGaugeAxisPoints(categories, startAngle, endAngle) {
  var totalAngle = startAngle - endAngle + 1;
  var tempStartAngle = startAngle;
  for (var i = 0; i < categories.length; i++) {
    categories[i].value = categories[i].value === null ? 0 : categories[i].value;
    categories[i]._startAngle_ = tempStartAngle;
    categories[i]._endAngle_ = totalAngle * categories[i].value + startAngle;
    if (categories[i]._endAngle_ >= 2) {
      categories[i]._endAngle_ = categories[i]._endAngle_ % 2;
    }
    tempStartAngle = categories[i]._endAngle_;
  }
  return categories;
}

function getGaugeDataPoints(series, categories, gaugeOption) {
  var process = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    if (gaugeOption.pointer.color == 'auto') {
      for (var _i12 = 0; _i12 < categories.length; _i12++) {
        if (item.data <= categories[_i12].value) {
          item.color = categories[_i12].color;
          break;
        }
      }
    } else {
      item.color = gaugeOption.pointer.color;
    }
    var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    item._endAngle_ = totalAngle * item.data + gaugeOption.startAngle;
    item._oldAngle_ = gaugeOption.oldAngle;
    if (gaugeOption.oldAngle < gaugeOption.endAngle) {
      item._oldAngle_ += 2;
    }
    if (item.data >= gaugeOption.oldData) {
      item._proportion_ = (item._endAngle_ - item._oldAngle_) * process + gaugeOption.oldAngle;
    } else {
      item._proportion_ = item._oldAngle_ - (item._oldAngle_ - item._endAngle_) * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getPieTextMaxLength(series, config, context, opts) {
  series = getPieDataPoints(series);
  var maxLength = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var text = item.formatter ? item.formatter(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    maxLength = Math.max(maxLength, measureText(text, item.textSize * opts.pix || config.fontSize, context));
  }
  return maxLength;
}

function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    var seriesGap = 0;
    var categoryGap = 0;
    if (opts.type == 'mix') {
      seriesGap = opts.extra.mix.column.seriesGap * opts.pix || 0;
      categoryGap = opts.extra.mix.column.categoryGap * opts.pix || 0;
    } else {
      seriesGap = opts.extra.column.seriesGap * opts.pix || 0;
      categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
    }
    seriesGap = Math.min(seriesGap, eachSpacing / columnLen);
    categoryGap = Math.min(categoryGap, eachSpacing / columnLen);
    item.width = Math.ceil((eachSpacing - 2 * categoryGap - seriesGap * (columnLen - 1)) / columnLen);
    if (opts.extra.mix && opts.extra.mix.column.width && +opts.extra.mix.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.mix.column.width * opts.pix);
    }
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    item.x += (index + 0.5 - columnLen / 2) * (item.width + seriesGap);
    return item;
  });
}

function fixBarData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    var seriesGap = 0;
    var categoryGap = 0;
    seriesGap = opts.extra.bar.seriesGap * opts.pix || 0;
    categoryGap = opts.extra.bar.categoryGap * opts.pix || 0;
    seriesGap = Math.min(seriesGap, eachSpacing / columnLen);
    categoryGap = Math.min(categoryGap, eachSpacing / columnLen);
    item.width = Math.ceil((eachSpacing - 2 * categoryGap - seriesGap * (columnLen - 1)) / columnLen);
    if (opts.extra.bar && opts.extra.bar.width && +opts.extra.bar.width > 0) {
      item.width = Math.min(item.width, +opts.extra.bar.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    item.y += (index + 0.5 - columnLen / 2) * (item.width + seriesGap);
    return item;
  });
}

function fixColumeMeterData(points, eachSpacing, columnLen, index, config, opts, border) {
  var categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil(eachSpacing - 2 * categoryGap);
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (index > 0) {
      item.width -= 2 * border;
    }
    return item;
  });
}

function fixColumeStackData(points, eachSpacing, columnLen, index, config, opts, series) {
  var categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
  return points.map(function (item, indexn) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil(eachSpacing - 2 * categoryGap);
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    return item;
  });
}

function fixBarStackData(points, eachSpacing, columnLen, index, config, opts, series) {
  var categoryGap = opts.extra.bar.categoryGap * opts.pix || 0;
  return points.map(function (item, indexn) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil(eachSpacing - 2 * categoryGap);
    if (opts.extra.bar && opts.extra.bar.width && +opts.extra.bar.width > 0) {
      item.width = Math.min(item.width, +opts.extra.bar.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    return item;
  });
}

function getXAxisPoints(categories, opts, config) {
  var spacingValid = opts.width - opts.area[1] - opts.area[3];
  var dataCount = opts.enableScroll ? Math.min(opts.xAxis.itemCount, categories.length) : categories.length;
  if ((opts.type == 'line' || opts.type == 'area' || opts.type == 'scatter' || opts.type == 'bubble' || opts.type == 'bar') && dataCount > 1 && opts.xAxis.boundaryGap == 'justify') {
    dataCount -= 1;
  }
  var eachSpacing = spacingValid / dataCount;
  var xAxisPoints = [];
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  categories.forEach(function (item, index) {
    xAxisPoints.push(startX + index * eachSpacing);
  });
  if (opts.xAxis.boundaryGap !== 'justify') {
    if (opts.enableScroll === true) {
      xAxisPoints.push(startX + categories.length * eachSpacing);
    } else {
      xAxisPoints.push(endX);
    }
  }
  return {
    xAxisPoints: xAxisPoints,
    startX: startX,
    endX: endX,
    eachSpacing: eachSpacing };

}

function getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var cPoints = [];
      item.forEach(function (items, indexs) {
        var point = {};
        point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
        var value = items.value || items;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        height *= process;
        point.y = opts.height - Math.round(height) - opts.area[2];
        cPoints.push(point);
      });
      points.push(cPoints);
    }
  });
  return points;
}

function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var boundaryGap = 'center';
  if (opts.type == 'line' || opts.type == 'area' || opts.type == 'scatter' || opts.type == 'bubble') {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index];
      var value = item;
      if (typeof item === 'object' && item !== null) {
        if (item.constructor.toString().indexOf('Array') > -1) {
          var xranges, xminRange, xmaxRange;
          xranges = [].concat(opts.chartData.xAxisData.ranges);
          xminRange = xranges.shift();
          xmaxRange = xranges.pop();
          value = item[1];
          point.x = opts.area[3] + validWidth * (item[0] - xminRange) / (xmaxRange - xminRange);
          if (opts.type == 'bubble') {
            point.r = item[2];
            point.t = item[3];
          }
        } else {
          value = item.value;
        }
      }
      if (boundaryGap == 'center') {
        point.x += eachSpacing / 2;
      }
      var height = validHeight * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - height - opts.area[2];
      points.push(point);
    }
  });
  return points;
}

function getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.y = yAxisPoints[index];
      var value = item;
      if (typeof item === 'object' && item !== null) {
        value = item.value;
      }
      var height = validWidth * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.height = height;
      point.value = value;
      point.x = height + opts.area[3];
      points.push(point);
    }
  });
  return points;
}

function getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);

      if (seriesIndex > 0) {
        var value = 0;
        for (var i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.y = opts.height - Math.round(height) - opts.area[2];
      point.y0 = opts.height - Math.round(heightc) - opts.area[2];
      points.push(point);
    }
  });
  return points;
}

function getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.y = yAxisPoints[index];
      if (seriesIndex > 0) {
        var value = 0;
        for (var i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.height = height - heightc;
      point.x = opts.area[3] + height;
      point.x0 = opts.area[3] + heightc;
      points.push(point);
    }
  });
  return points;
}

function getYAxisTextList(series, opts, config, stack, yData) {
  var index = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;
  var data;
  if (stack == 'stack') {
    data = dataCombineStack(series, opts.categories.length);
  } else {
    data = dataCombine(series);
  }
  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object' && item !== null) {
      if (item.constructor.toString().indexOf('Array') > -1) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function (item) {
    if (typeof item === 'object') {
      if (item.constructor.toString().indexOf('Array') > -1) {
        if (opts.type == 'candle') {
          item.map(function (subitem) {
            sorted.push(subitem);
          });
        } else {
          sorted.push(item[1]);
        }
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });
  var minData = yData.min || 0;
  var maxData = yData.max || 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  //????????????v1.9.0???????????????
  // if (index > -1) {
  //   if (typeof opts.yAxis.data[index].min === 'number') {
  //     minData = Math.min(opts.yAxis.data[index].min, minData);
  //   }
  //   if (typeof opts.yAxis.data[index].max === 'number') {
  //     maxData = Math.max(opts.yAxis.data[index].max, maxData);
  //   }
  // } else {
  //   if (typeof opts.yAxis.min === 'number') {
  //     minData = Math.min(opts.yAxis.min, minData);
  //   }
  //   if (typeof opts.yAxis.max === 'number') {
  //     maxData = Math.max(opts.yAxis.max, maxData);
  //   }
  // }
  if (minData === maxData) {
    var rangeSpan = maxData || 10;
    maxData += rangeSpan;
  }
  var dataRange = getDataRange(minData, maxData);
  var minRange = yData.min === undefined ? dataRange.minRange : yData.min;
  var maxRange = yData.max === undefined ? dataRange.maxRange : yData.max;
  var range = [];
  var eachRange = (maxRange - minRange) / opts.yAxis.splitNumber;
  for (var i = 0; i <= opts.yAxis.splitNumber; i++) {
    range.push(minRange + eachRange * i);
  }
  return range.reverse();
}

function calYAxisData(series, opts, config, context) {
  //???????????????Y???
  var columnstyle = assign({}, {
    type: "" },
  opts.extra.column);
  //????????????Y??????????????????
  var YLength = opts.yAxis.data.length;
  var newSeries = new Array(YLength);
  if (YLength > 0) {
    for (var i = 0; i < YLength; i++) {
      newSeries[i] = [];
      for (var j = 0; j < series.length; j++) {
        if (series[j].index == i) {
          newSeries[i].push(series[j]);
        }
      }
    }
    var rangesArr = new Array(YLength);
    var rangesFormatArr = new Array(YLength);
    var yAxisWidthArr = new Array(YLength);var _loop3 = function _loop3(

    _i13) {
      var yData = opts.yAxis.data[_i13];
      //???????????????????????????????????????Y???????????????
      if (opts.yAxis.disabled == true) {
        yData.disabled = true;
      }
      if (yData.type === 'categories') {
        if (!yData.formatter) {
          yData.formatter = function (val) {return val + (yData.unit || '');};
        }
        yData.categories = yData.categories || opts.categories;
        rangesArr[_i13] = yData.categories;
      } else {
        if (!yData.formatter) {
          yData.formatter = function (val) {return val.toFixed(yData.tofix) + (yData.unit || '');};
        }
        rangesArr[_i13] = getYAxisTextList(newSeries[_i13], opts, config, columnstyle.type, yData, _i13);
      }
      var yAxisFontSizes = yData.fontSize * opts.pix || config.fontSize;
      yAxisWidthArr[_i13] = {
        position: yData.position ? yData.position : 'left',
        width: 0 };

      rangesFormatArr[_i13] = rangesArr[_i13].map(function (items) {
        items = yData.formatter(items);
        yAxisWidthArr[_i13].width = Math.max(yAxisWidthArr[_i13].width, measureText(items, yAxisFontSizes, context) + 5);
        return items;
      });
      var calibration = yData.calibration ? 4 * opts.pix : 0;
      yAxisWidthArr[_i13].width += calibration + 3 * opts.pix;
      if (yData.disabled === true) {
        yAxisWidthArr[_i13].width = 0;
      }};for (var _i13 = 0; _i13 < YLength; _i13++) {_loop3(_i13);
    }
  } else {
    var rangesArr = new Array(1);
    var rangesFormatArr = new Array(1);
    var yAxisWidthArr = new Array(1);
    if (opts.type === 'bar') {
      rangesArr[0] = opts.categories;
      if (!opts.yAxis.formatter) {
        opts.yAxis.formatter = function (val) {return val + (opts.yAxis.unit || '');};
      }
    } else {
      if (!opts.yAxis.formatter) {
        opts.yAxis.formatter = function (val) {return val.toFixed(opts.yAxis.tofix) + (opts.yAxis.unit || '');};
      }
      rangesArr[0] = getYAxisTextList(series, opts, config, columnstyle.type, {});
    }
    yAxisWidthArr[0] = {
      position: 'left',
      width: 0 };

    var yAxisFontSize = opts.yAxis.fontSize * opts.pix || config.fontSize;
    rangesFormatArr[0] = rangesArr[0].map(function (item) {
      item = opts.yAxis.formatter(item);
      yAxisWidthArr[0].width = Math.max(yAxisWidthArr[0].width, measureText(item, yAxisFontSize, context) + 5);
      return item;
    });
    yAxisWidthArr[0].width += 3 * opts.pix;
    if (opts.yAxis.disabled === true) {
      yAxisWidthArr[0] = {
        position: 'left',
        width: 0 };

      opts.yAxis.data[0] = {
        disabled: true };

    } else {
      opts.yAxis.data[0] = {
        disabled: false,
        position: 'left',
        max: opts.yAxis.max,
        min: opts.yAxis.min,
        formatter: opts.yAxis.formatter };

      if (opts.type === 'bar') {
        opts.yAxis.data[0].categories = opts.categories;
        opts.yAxis.data[0].type = 'categories';
      }
    }
  }
  return {
    rangesFormat: rangesFormatArr,
    ranges: rangesArr,
    yAxisWidth: yAxisWidthArr };

}

function calTooltipYAxisData(point, series, opts, config, eachSpacing) {
  var ranges = [].concat(opts.chartData.yAxisData.ranges);
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var minAxis = opts.area[0];
  var items = [];
  for (var i = 0; i < ranges.length; i++) {
    var maxVal = ranges[i].shift();
    var minVal = ranges[i].pop();
    var item = maxVal - (maxVal - minVal) * (point - minAxis) / spacingValid;
    item = opts.yAxis.data[i].formatter ? opts.yAxis.data[i].formatter(Number(item)) : item.toFixed(0);
    items.push(String(item));
  }
  return items;
}

function calMarkLineData(points, opts) {
  var minRange, maxRange;
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  for (var i = 0; i < points.length; i++) {
    points[i].yAxisIndex = points[i].yAxisIndex ? points[i].yAxisIndex : 0;
    var range = [].concat(opts.chartData.yAxisData.ranges[points[i].yAxisIndex]);
    minRange = range.pop();
    maxRange = range.shift();
    var height = spacingValid * (points[i].value - minRange) / (maxRange - minRange);
    points[i].y = opts.height - Math.round(height) - opts.area[2];
  }
  return points;
}

function contextRotate(context, opts) {
  if (opts.rotateLock !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
  } else if (opts._rotate_ !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
    opts._rotate_ = true;
  }
}

function drawPointShape(points, color, shape, context, opts) {
  context.beginPath();
  if (opts.dataPointShapeType == 'hollow') {
    context.setStrokeStyle(color);
    context.setFillStyle(opts.background);
    context.setLineWidth(2 * opts.pix);
  } else {
    context.setStrokeStyle("#ffffff");
    context.setFillStyle(color);
    context.setLineWidth(1 * opts.pix);
  }
  if (shape === 'diamond') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'circle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x + 2.5 * opts.pix, item.y);
        context.arc(item.x, item.y, 3 * opts.pix, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === 'square') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === 'triangle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'triangle') {
    return;
  }
  context.closePath();
  context.fill();
  context.stroke();
}

function drawRingTitle(opts, config, context, center) {
  var titlefontSize = opts.title.fontSize || config.titleFontSize;
  var subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
  var title = opts.title.name || '';
  var subtitle = opts.subtitle.name || '';
  var titleFontColor = opts.title.color || opts.fontColor;
  var subtitleFontColor = opts.subtitle.color || opts.fontColor;
  var titleHeight = title ? titlefontSize : 0;
  var subtitleHeight = subtitle ? subtitlefontSize : 0;
  var margin = 5;
  if (subtitle) {
    var textWidth = measureText(subtitle, subtitlefontSize * opts.pix, context);
    var startX = center.x - textWidth / 2 + (opts.subtitle.offsetX || 0) * opts.pix;
    var startY = center.y + subtitlefontSize * opts.pix / 2 + (opts.subtitle.offsetY || 0) * opts.pix;
    if (title) {
      startY += (titleHeight * opts.pix + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(subtitlefontSize * opts.pix);
    context.setFillStyle(subtitleFontColor);
    context.fillText(subtitle, startX, startY);
    context.closePath();
    context.stroke();
  }
  if (title) {
    var _textWidth = measureText(title, titlefontSize * opts.pix, context);
    var _startX = center.x - _textWidth / 2 + (opts.title.offsetX || 0);
    var _startY = center.y + titlefontSize * opts.pix / 2 + (opts.title.offsetY || 0) * opts.pix;
    if (subtitle) {
      _startY -= (subtitleHeight * opts.pix + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(titlefontSize * opts.pix);
    context.setFillStyle(titleFontColor);
    context.fillText(title, _startX, _startY);
    context.closePath();
    context.stroke();
  }
}

function drawPointText(points, series, config, context, opts) {
  // ??????????????????
  var data = series.data;
  var textOffset = series.textOffset ? series.textOffset : 0;
  points.forEach(function (item, index) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series.textSize ? series.textSize * opts.pix : config.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series.textColor || opts.fontColor);
      var value = data[index];
      if (typeof data[index] === 'object' && data[index] !== null) {
        if (data[index].constructor.toString().indexOf('Array') > -1) {
          value = data[index][1];
        } else {
          value = data[index].value;
        }
      }
      var formatVal = series.formatter ? series.formatter(value, index) : value;
      context.setTextAlign('center');
      context.fillText(String(formatVal), item.x, item.y - 4 + textOffset * opts.pix);
      context.closePath();
      context.stroke();
      context.setTextAlign('left');
    }
  });
}

function drawBarPointText(points, series, config, context, opts) {
  // ??????????????????
  var data = series.data;
  var textOffset = series.textOffset ? series.textOffset : 0;
  points.forEach(function (item, index) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series.textSize ? series.textSize * opts.pix : config.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series.textColor || opts.fontColor);
      var value = data[index];
      if (typeof data[index] === 'object' && data[index] !== null) {
        value = data[index].value;
      }
      var formatVal = series.formatter ? series.formatter(value, index) : value;
      context.setTextAlign('left');
      context.fillText(String(formatVal), item.x + 4 * opts.pix, item.y + fontSize / 2 - 3);
      context.closePath();
      context.stroke();
    }
  });
}

function drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context) {
  radius -= gaugeOption.width / 2 + gaugeOption.labelOffset * opts.pix;
  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var totalNumber = gaugeOption.endNumber - gaugeOption.startNumber;
  var splitNumber = totalNumber / gaugeOption.splitLine.splitNumber;
  var nowAngle = gaugeOption.startAngle;
  var nowNumber = gaugeOption.startNumber;
  for (var i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    var pos = {
      x: radius * Math.cos(nowAngle * Math.PI),
      y: radius * Math.sin(nowAngle * Math.PI) };

    var labelText = gaugeOption.formatter ? gaugeOption.formatter(nowNumber) : nowNumber;
    pos.x += centerPosition.x - measureText(labelText, config.fontSize, context) / 2;
    pos.y += centerPosition.y;
    var startX = pos.x;
    var startY = pos.y;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(gaugeOption.labelColor || opts.fontColor);
    context.fillText(labelText, startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();
    nowAngle += splitAngle;
    if (nowAngle >= 2) {
      nowAngle = nowAngle % 2;
    }
    nowNumber += splitNumber;
  }

}

function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
  var radarOption = opts.extra.radar || {};
  radius += config.radarLabelTextMargin * opts.pix;
  angleList.forEach(function (angle, index) {
    var pos = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle) };

    var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
    var startX = posRelativeCanvas.x;
    var startY = posRelativeCanvas.y;
    if (util.approximatelyEqual(pos.x, 0)) {
      startX -= measureText(opts.categories[index] || '', config.fontSize, context) / 2;
    } else if (pos.x < 0) {
      startX -= measureText(opts.categories[index] || '', config.fontSize, context);
    }
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(radarOption.labelColor || opts.fontColor);
    context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();
  });

}

function drawPieText(series, opts, config, context, radius, center) {
  var lineRadius = config.pieChartLinePadding;
  var textObjectCollection = [];
  var lastTextObject = null;
  var seriesConvert = series.map(function (item, index, series) {
    var text = item.formatter ? item.formatter(item, index, series) : util.toFixed(item._proportion_.toFixed(4) * 100) + '%';
    var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
    if (item._rose_proportion_) {
      arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._rose_proportion_ / 2);
    }
    var color = item.color;
    var radius = item._radius_;
    return {
      arc: arc,
      text: text,
      color: color,
      radius: radius,
      textColor: item.textColor,
      textSize: item.textSize };

  });
  for (var i = 0; i < seriesConvert.length; i++) {
    var item = seriesConvert[i];
    // line end
    var orginX1 = Math.cos(item.arc) * (item.radius + lineRadius);
    var orginY1 = Math.sin(item.arc) * (item.radius + lineRadius);
    // line start
    var orginX2 = Math.cos(item.arc) * item.radius;
    var orginY2 = Math.sin(item.arc) * item.radius;
    // text start
    var orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding;
    var orginY3 = orginY1;
    var textWidth = measureText(item.text, item.textSize * opts.pix || config.fontSize, context);
    var startY = orginY3;
    if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, {
      x: orginX3 }))
    {
      if (orginX3 > 0) {
        startY = Math.min(orginY3, lastTextObject.start.y);
      } else if (orginX1 < 0) {
        startY = Math.max(orginY3, lastTextObject.start.y);
      } else {
        if (orginY3 > 0) {
          startY = Math.max(orginY3, lastTextObject.start.y);
        } else {
          startY = Math.min(orginY3, lastTextObject.start.y);
        }
      }
    }
    if (orginX3 < 0) {
      orginX3 -= textWidth;
    }
    var textObject = {
      lineStart: {
        x: orginX2,
        y: orginY2 },

      lineEnd: {
        x: orginX1,
        y: orginY1 },

      start: {
        x: orginX3,
        y: startY },

      width: textWidth,
      height: config.fontSize,
      text: item.text,
      color: item.color,
      textColor: item.textColor,
      textSize: item.textSize };

    lastTextObject = avoidCollision(textObject, lastTextObject);
    textObjectCollection.push(lastTextObject);
  }
  for (var _i14 = 0; _i14 < textObjectCollection.length; _i14++) {
    var _item6 = textObjectCollection[_i14];
    var lineStartPoistion = convertCoordinateOrigin(_item6.lineStart.x, _item6.lineStart.y, center);
    var lineEndPoistion = convertCoordinateOrigin(_item6.lineEnd.x, _item6.lineEnd.y, center);
    var textPosition = convertCoordinateOrigin(_item6.start.x, _item6.start.y, center);
    context.setLineWidth(1 * opts.pix);
    context.setFontSize(_item6.textSize * opts.pix || config.fontSize);
    context.beginPath();
    context.setStrokeStyle(_item6.color);
    context.setFillStyle(_item6.color);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    var curveStartX = _item6.start.x < 0 ? textPosition.x + _item6.width : textPosition.x;
    var textStartX = _item6.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
    context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(textPosition.x + _item6.width, textPosition.y);
    context.arc(curveStartX, textPosition.y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFontSize(_item6.textSize * opts.pix || config.fontSize);
    context.setFillStyle(_item6.textColor || opts.fontColor);
    context.fillText(_item6.text, textStartX, textPosition.y + 3);
    context.closePath();
    context.stroke();
    context.closePath();
  }
}

function drawToolTipSplitLine(offsetX, opts, config, context) {
  var toolTipOption = opts.extra.tooltip || {};
  toolTipOption.gridType = toolTipOption.gridType == undefined ? 'solid' : toolTipOption.gridType;
  toolTipOption.dashLength = toolTipOption.dashLength == undefined ? 4 : toolTipOption.dashLength;
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];
  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pix);
  context.beginPath();
  context.moveTo(offsetX, startY);
  context.lineTo(offsetX, endY);
  context.stroke();
  context.setLineDash([]);
  if (toolTipOption.xAxisLabel) {
    var labelText = opts.categories[opts.tooltip.index];
    context.setFontSize(config.fontSize);
    var textWidth = measureText(labelText, config.fontSize, context);
    var textX = offsetX - 0.5 * textWidth;
    var textY = endY;
    context.beginPath();
    context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
    context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
    context.setLineWidth(1 * opts.pix);
    context.rect(textX - config.toolTipPadding, textY, textWidth + 2 * config.toolTipPadding, config.fontSize + 2 * config.toolTipPadding);
    context.closePath();
    context.stroke();
    context.fill();
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.labelFontColor || opts.fontColor);
    context.fillText(String(labelText), textX, textY + config.toolTipPadding + config.fontSize);
    context.closePath();
    context.stroke();
  }
}

function drawMarkLine(opts, config, context) {
  var markLineOption = assign({}, {
    type: 'solid',
    dashLength: 4,
    data: [] },
  opts.extra.markLine);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  var points = calMarkLineData(markLineOption.data, opts);
  for (var i = 0; i < points.length; i++) {
    var item = assign({}, {
      lineColor: '#DE4A42',
      showLabel: false,
      labelFontColor: '#666666',
      labelBgColor: '#DFE8FF',
      labelBgOpacity: 0.8,
      yAxisIndex: 0 },
    points[i]);
    if (markLineOption.type == 'dash') {
      context.setLineDash([markLineOption.dashLength, markLineOption.dashLength]);
    }
    context.setStrokeStyle(item.lineColor);
    context.setLineWidth(1 * opts.pix);
    context.beginPath();
    context.moveTo(startX, item.y);
    context.lineTo(endX, item.y);
    context.stroke();
    context.setLineDash([]);
    if (item.showLabel) {
      var labelText = opts.yAxis.formatter ? opts.yAxis.formatter(Number(item.value)) : item.value;
      context.setFontSize(config.fontSize);
      var textWidth = measureText(labelText, config.fontSize, context);
      var yAxisWidth = opts.chartData.yAxisData.yAxisWidth[0].width;
      var bgStartX = opts.area[3] - textWidth - config.toolTipPadding * 2;
      var bgEndX = opts.area[3];
      var bgWidth = bgEndX - bgStartX;
      var textX = bgEndX - config.toolTipPadding;
      var textY = item.y;
      context.setFillStyle(hexToRgb(item.labelBgColor, item.labelBgOpacity));
      context.setStrokeStyle(item.labelBgColor);
      context.setLineWidth(1 * opts.pix);
      context.beginPath();
      context.rect(bgStartX, textY - 0.5 * config.fontSize - config.toolTipPadding, bgWidth, config.fontSize + 2 * config.toolTipPadding);
      context.closePath();
      context.stroke();
      context.fill();
      context.setFontSize(config.fontSize);
      context.setTextAlign('right');
      context.setFillStyle(item.labelFontColor);
      context.fillText(String(labelText), textX, textY + 0.5 * config.fontSize);
      context.stroke();
      context.setTextAlign('left');
    }
  }
}

function drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    gridType: 'solid',
    dashLength: 4 },
  opts.extra.tooltip);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pix);
  context.beginPath();
  context.moveTo(startX, opts.tooltip.offset.y);
  context.lineTo(endX, opts.tooltip.offset.y);
  context.stroke();
  context.setLineDash([]);
  if (toolTipOption.yAxisLabel) {
    var labelText = calTooltipYAxisData(opts.tooltip.offset.y, opts.series, opts, config, eachSpacing);
    var widthArr = opts.chartData.yAxisData.yAxisWidth;
    var tStartLeft = opts.area[3];
    var tStartRight = opts.width - opts.area[1];
    for (var i = 0; i < labelText.length; i++) {
      context.setFontSize(config.fontSize);
      var textWidth = measureText(labelText[i], config.fontSize, context);
      var bgStartX = void 0,bgEndX = void 0,bgWidth = void 0;
      if (widthArr[i].position == 'left') {
        bgStartX = tStartLeft - widthArr[i].width;
        bgEndX = Math.max(bgStartX, bgStartX + textWidth + config.toolTipPadding * 2);
      } else {
        bgStartX = tStartRight;
        bgEndX = Math.max(bgStartX + widthArr[i].width, bgStartX + textWidth + config.toolTipPadding * 2);
      }
      bgWidth = bgEndX - bgStartX;
      var textX = bgStartX + (bgWidth - textWidth) / 2;
      var textY = opts.tooltip.offset.y;
      context.beginPath();
      context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
      context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
      context.setLineWidth(1 * opts.pix);
      context.rect(bgStartX, textY - 0.5 * config.fontSize - config.toolTipPadding, bgWidth, config.fontSize + 2 *
      config.toolTipPadding);
      context.closePath();
      context.stroke();
      context.fill();
      context.beginPath();
      context.setFontSize(config.fontSize);
      context.setFillStyle(toolTipOption.labelFontColor || opts.fontColor);
      context.fillText(labelText[i], textX, textY + 0.5 * config.fontSize);
      context.closePath();
      context.stroke();
      if (widthArr[i].position == 'left') {
        tStartLeft -= widthArr[i].width + opts.yAxis.padding * opts.pix;
      } else {
        tStartRight += widthArr[i].width + opts.yAxis.padding * opts.pix;
      }
    }
  }
}

function drawToolTipSplitArea(offsetX, opts, config, context, eachSpacing) {
  var toolTipOption = assign({}, {
    activeBgColor: '#000000',
    activeBgOpacity: 0.08 },
  opts.extra.column);
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(offsetX - eachSpacing / 2, startY, eachSpacing, endY - startY);
  context.closePath();
  context.fill();
  context.setFillStyle("#FFFFFF");
}

function drawBarToolTipSplitArea(offsetX, opts, config, context, eachSpacing) {
  var toolTipOption = assign({}, {
    activeBgColor: '#000000',
    activeBgOpacity: 0.08 },
  opts.extra.bar);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(startX, offsetX - eachSpacing / 2, endX - startX, eachSpacing);
  context.closePath();
  context.fill();
  context.setFillStyle("#FFFFFF");
}

function drawToolTip(textList, offset, opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    showBox: true,
    showArrow: true,
    showCategory: false,
    bgColor: '#000000',
    bgOpacity: 0.7,
    borderColor: '#000000',
    borderWidth: 0,
    borderRadius: 0,
    borderOpacity: 0.7,
    fontColor: '#FFFFFF',
    splitLine: true },
  opts.extra.tooltip);
  if (toolTipOption.showCategory == true && opts.categories) {
    textList.unshift({ text: opts.categories[opts.tooltip.index], color: null });
  }
  var legendWidth = 4 * opts.pix;
  var legendMarginRight = 5 * opts.pix;
  var arrowWidth = toolTipOption.showArrow ? 8 * opts.pix : 0;
  var isOverRightBorder = false;
  if (opts.type == 'line' || opts.type == 'area' || opts.type == 'candle' || opts.type == 'mix') {
    if (toolTipOption.splitLine == true) {
      drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
    }
  }
  offset = assign({
    x: 0,
    y: 0 },
  offset);
  offset.y -= 8 * opts.pix;
  var textWidth = textList.map(function (item) {
    return measureText(item.text, config.fontSize, context);
  });
  var toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
  var toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight;
  if (toolTipOption.showBox == false) {
    return;
  }
  // if beyond the right border
  if (offset.x - Math.abs(opts._scrollDistance_ || 0) + arrowWidth + toolTipWidth > opts.width) {
    isOverRightBorder = true;
  }
  if (toolTipHeight + offset.y > opts.height) {
    offset.y = opts.height - toolTipHeight;
  }
  // draw background rect
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.bgColor || config.toolTipBackground, toolTipOption.bgOpacity || config.toolTipOpacity));
  context.setLineWidth(toolTipOption.borderWidth * opts.pix);
  context.setStrokeStyle(hexToRgb(toolTipOption.borderColor, toolTipOption.borderOpacity));
  var radius = toolTipOption.borderRadius;
  if (isOverRightBorder) {
    if (toolTipOption.showArrow) {
      context.moveTo(offset.x, offset.y + 10 * opts.pix);
      context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pix + 5 * opts.pix);
    }
    context.arc(offset.x - arrowWidth - radius, offset.y + toolTipHeight - radius, radius, 0, Math.PI / 2, false);
    context.arc(offset.x - arrowWidth - Math.round(toolTipWidth) + radius, offset.y + toolTipHeight - radius, radius,
    Math.PI / 2, Math.PI, false);
    context.arc(offset.x - arrowWidth - Math.round(toolTipWidth) + radius, offset.y + radius, radius, -Math.PI, -Math.PI / 2, false);
    context.arc(offset.x - arrowWidth - radius, offset.y + radius, radius, -Math.PI / 2, 0, false);
    if (toolTipOption.showArrow) {
      context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pix - 5 * opts.pix);
      context.lineTo(offset.x, offset.y + 10 * opts.pix);
    }
  } else {
    if (toolTipOption.showArrow) {
      context.moveTo(offset.x, offset.y + 10 * opts.pix);
      context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pix - 5 * opts.pix);
    }
    context.arc(offset.x + arrowWidth + radius, offset.y + radius, radius, -Math.PI, -Math.PI / 2, false);
    context.arc(offset.x + arrowWidth + Math.round(toolTipWidth) - radius, offset.y + radius, radius, -Math.PI / 2, 0,
    false);
    context.arc(offset.x + arrowWidth + Math.round(toolTipWidth) - radius, offset.y + toolTipHeight - radius, radius, 0,
    Math.PI / 2, false);
    context.arc(offset.x + arrowWidth + radius, offset.y + toolTipHeight - radius, radius, Math.PI / 2, Math.PI, false);
    if (toolTipOption.showArrow) {
      context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pix + 5 * opts.pix);
      context.lineTo(offset.x, offset.y + 10 * opts.pix);
    }
  }
  context.closePath();
  context.fill();
  if (toolTipOption.borderWidth > 0) {
    context.stroke();
  }
  // draw legend
  textList.forEach(function (item, index) {
    if (item.color !== null) {
      context.beginPath();
      context.setFillStyle(item.color);
      var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
      var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding + 1;
      if (isOverRightBorder) {
        startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
      }
      context.fillRect(startX, startY, legendWidth, config.fontSize);
      context.closePath();
    }
  });
  // draw text list
  textList.forEach(function (item, index) {
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
    }
    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.fontColor);
    context.fillText(item.text, startX, startY + config.fontSize);
    context.closePath();
    context.stroke();
  });
}

function drawColumnDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var columnOption = assign({}, {
    type: 'group',
    width: eachSpacing / 2,
    meterBorder: 4,
    meterFillColor: '#FFFFFF',
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: 'none',
    linearOpacity: 1,
    customColor: [],
    colorStop: 0 },
  opts.extra.column);
  var calPoints = [];
  context.save();
  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitArea(opts.tooltip.offset.x, opts, config, context, eachSpacing);
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config);
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    switch (columnOption.type) {
      case 'group':
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        var tooltipPoints = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
        for (var i = 0; i < points.length; i++) {
          var item = points[i];
          //fix issues/I27B1N yyoinge & Joeshu
          if (item !== null && i > leftNum && i < rightNum) {
            var startX = item.x - item.width / 2;
            var height = opts.height - item.y - opts.area[2];
            context.beginPath();
            var fillColor = item.color || eachSeries.color;
            var strokeColor = item.color || eachSeries.color;
            if (columnOption.linearType !== 'none') {
              var grd = context.createLinearGradient(startX, item.y, startX, opts.height - opts.area[2]);
              //????????????
              if (columnOption.linearType == 'opacity') {
                grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              } else {
                grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              }
              fillColor = grd;
            }
            // ????????????
            if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle === true) {
              var left = startX;
              var top = item.y;
              var width = item.width;
              var _height = opts.height - opts.area[2] - item.y;
              if (columnOption.barBorderCircle) {
                columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
              }var _columnOption$barBord = _slicedToArray(
              columnOption.barBorderRadius, 4),r0 = _columnOption$barBord[0],r1 = _columnOption$barBord[1],r2 = _columnOption$barBord[2],r3 = _columnOption$barBord[3];
              if (r0 + r2 > _height) {
                r0 = _height;
                r2 = 0;
                r1 = _height;
                r3 = 0;
              }
              if (r0 + r2 > width / 2) {
                r0 = width / 2;
                r2 = 0;
                r1 = width / 2;
                r3 = 0;
              }
              r0 = r0 < 0 ? 0 : r0;
              r1 = r1 < 0 ? 0 : r1;
              r2 = r2 < 0 ? 0 : r2;
              r3 = r3 < 0 ? 0 : r3;
              context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
              context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
              context.arc(left + width - r2, top + _height - r2, r2, 0, Math.PI / 2);
              context.arc(left + r3, top + _height - r3, r3, Math.PI / 2, Math.PI);
            } else {
              context.moveTo(startX, item.y);
              context.lineTo(startX + item.width - 2, item.y);
              context.lineTo(startX + item.width - 2, opts.height - opts.area[2]);
              context.lineTo(startX, opts.height - opts.area[2]);
              context.lineTo(startX, item.y);
              context.setLineWidth(1);
              context.setStrokeStyle(strokeColor);
            }
            context.setFillStyle(fillColor);
            context.closePath();
            //context.stroke();
            context.fill();
          }
        };
        break;
      case 'stack':
        // ?????????????????????
        var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(points);
        points = fixColumeStackData(points, eachSpacing, series.length, seriesIndex, config, opts, series);
        for (var _i15 = 0; _i15 < points.length; _i15++) {
          var _item7 = points[_i15];
          if (_item7 !== null && _i15 > leftNum && _i15 < rightNum) {
            context.beginPath();
            var fillColor = _item7.color || eachSeries.color;
            var startX = _item7.x - _item7.width / 2 + 1;
            var height = opts.height - _item7.y - opts.area[2];
            var height0 = opts.height - _item7.y0 - opts.area[2];
            if (seriesIndex > 0) {
              height -= height0;
            }
            context.setFillStyle(fillColor);
            context.moveTo(startX, _item7.y);
            context.fillRect(startX, _item7.y, _item7.width - 2, height);
            context.closePath();
            context.fill();
          }
        };
        break;
      case 'meter':
        // ????????????????????????
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);
        points = fixColumeMeterData(points, eachSpacing, series.length, seriesIndex, config, opts, columnOption.meterBorder);
        if (seriesIndex == 0) {
          for (var _i16 = 0; _i16 < points.length; _i16++) {
            var _item8 = points[_i16];
            if (_item8 !== null && _i16 > leftNum && _i16 < rightNum) {
              //???????????????
              context.beginPath();
              context.setFillStyle(columnOption.meterFillColor);
              var startX = _item8.x - _item8.width / 2;
              var height = opts.height - _item8.y - opts.area[2];
              if (columnOption.barBorderCircle) {
                var barBorderRadius = (_item8.width - columnOption.meterBorder * 2) / 2;
                if (barBorderRadius > height) {
                  barBorderRadius = height;
                }
                context.moveTo(startX + columnOption.meterBorder, opts.height - opts.area[2]);
                context.lineTo(startX + columnOption.meterBorder, _item8.y + barBorderRadius);
                context.arc(startX + _item8.width / 2, _item8.y + barBorderRadius, barBorderRadius, -Math.PI, 0);
                context.lineTo(startX + _item8.width - columnOption.meterBorder, opts.height - opts.area[2]);
                context.lineTo(startX, opts.height - opts.area[2]);
                context.fill();
              } else {
                context.moveTo(startX, _item8.y);
                context.fillRect(startX, _item8.y, _item8.width, height);
                context.closePath();
                context.fill();
              }
              //????????????
              if (columnOption.meterBorder > 0) {
                context.beginPath();
                context.setStrokeStyle(eachSeries.color);
                context.setLineWidth(columnOption.meterBorder * opts.pix);
                if (columnOption.barBorderCircle) {
                  var barBorderRadius = (_item8.width - columnOption.meterBorder) / 2;
                  if (barBorderRadius > height) {
                    barBorderRadius = height;
                  }
                  context.moveTo(startX + columnOption.meterBorder * 0.5, opts.height - opts.area[2]);
                  context.lineTo(startX + columnOption.meterBorder * 0.5, _item8.y + barBorderRadius);
                  context.arc(startX + _item8.width / 2, _item8.y + barBorderRadius - columnOption.meterBorder * 0.5, barBorderRadius, -Math.PI, 0);
                  context.lineTo(startX + _item8.width - columnOption.meterBorder * 0.5, opts.height - opts.area[2]);
                } else {
                  context.moveTo(startX + columnOption.meterBorder * 0.5, _item8.y + height);
                  context.lineTo(startX + columnOption.meterBorder * 0.5, _item8.y + columnOption.meterBorder * 0.5);
                  context.lineTo(startX + _item8.width - columnOption.meterBorder * 0.5, _item8.y + columnOption.meterBorder * 0.5);
                  context.lineTo(startX + _item8.width - columnOption.meterBorder * 0.5, _item8.y + height);
                }
                context.stroke();
              }
            }
          };
        } else {
          for (var _i17 = 0; _i17 < points.length; _i17++) {
            var _item9 = points[_i17];
            if (_item9 !== null && _i17 > leftNum && _i17 < rightNum) {
              context.beginPath();
              context.setFillStyle(_item9.color || eachSeries.color);
              var startX = _item9.x - _item9.width / 2;
              var height = opts.height - _item9.y - opts.area[2];
              if (columnOption.barBorderCircle) {
                var barBorderRadius = _item9.width / 2;
                if (barBorderRadius > height) {
                  barBorderRadius = height;
                }
                context.moveTo(startX, opts.height - opts.area[2]);
                context.arc(startX + barBorderRadius, _item9.y + barBorderRadius, barBorderRadius, -Math.PI, -Math.PI / 2);
                context.arc(startX + _item9.width - barBorderRadius, _item9.y + barBorderRadius, barBorderRadius, -Math.PI / 2, 0);
                context.lineTo(startX + _item9.width, opts.height - opts.area[2]);
                context.lineTo(startX, opts.height - opts.area[2]);
                context.fill();
              } else {
                context.moveTo(startX, _item9.y);
                context.fillRect(startX, _item9.y, _item9.width, height);
                context.closePath();
                context.fill();
              }
            }
          };
        }
        break;}

  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      switch (columnOption.type) {
        case 'group':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
          drawPointText(points, eachSeries, config, context, opts);
          break;
        case 'stack':
          var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
          drawPointText(points, eachSeries, config, context, opts);
          break;
        case 'meter':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          drawPointText(points, eachSeries, config, context, opts);
          break;}

    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawBarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var yAxisPoints = [];
  var eachSpacing = (opts.height - opts.area[0] - opts.area[2]) / opts.categories.length;
  for (var i = 0; i < opts.categories.length; i++) {
    yAxisPoints.push(opts.area[0] + eachSpacing / 2 + eachSpacing * i);
  }
  var columnOption = assign({}, {
    type: 'group',
    width: eachSpacing / 2,
    meterBorder: 4,
    meterFillColor: '#FFFFFF',
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: 'none',
    linearOpacity: 1,
    customColor: [],
    colorStop: 0 },
  opts.extra.bar);
  var calPoints = [];
  context.save();
  var leftNum = -2;
  var rightNum = yAxisPoints.length + 2;
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawBarToolTipSplitArea(opts.tooltip.offset.y, opts, config, context, eachSpacing);
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config);
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.xAxisData.ranges);
    maxRange = ranges.pop();
    minRange = ranges.shift();
    var data = eachSeries.data;
    switch (columnOption.type) {
      case 'group':
        var points = getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, process);
        var tooltipPoints = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixBarData(points, eachSpacing, series.length, seriesIndex, config, opts);
        for (var _i18 = 0; _i18 < points.length; _i18++) {
          var item = points[_i18];
          //fix issues/I27B1N yyoinge & Joeshu
          if (item !== null && _i18 > leftNum && _i18 < rightNum) {
            //var startX = item.x - item.width / 2;
            var startX = opts.area[3];
            var startY = item.y - item.width / 2;
            var height = item.height;
            context.beginPath();
            var fillColor = item.color || eachSeries.color;
            var strokeColor = item.color || eachSeries.color;
            if (columnOption.linearType !== 'none') {
              var grd = context.createLinearGradient(startX, item.y, item.x, item.y);
              //????????????
              if (columnOption.linearType == 'opacity') {
                grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              } else {
                grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              }
              fillColor = grd;
            }
            // ????????????
            if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle === true) {
              var left = startX;
              var width = item.width;
              var top = item.y - item.width / 2;
              var _height2 = item.heigh;
              if (columnOption.barBorderCircle) {
                columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
              }var _columnOption$barBord2 = _slicedToArray(
              columnOption.barBorderRadius, 4),r0 = _columnOption$barBord2[0],r1 = _columnOption$barBord2[1],r2 = _columnOption$barBord2[2],r3 = _columnOption$barBord2[3];
              if (r0 + r2 > _height2) {
                r0 = _height2;
                r2 = 0;
                r1 = _height2;
                r3 = 0;
              }
              if (r0 + r2 > width / 2) {
                r0 = width / 2;
                r1 = width / 2;
                r2 = 0;
                r3 = 0;
              }
              r0 = r0 < 0 ? 0 : r0;
              r1 = r1 < 0 ? 0 : r1;
              r2 = r2 < 0 ? 0 : r2;
              r3 = r3 < 0 ? 0 : r3;
              context.arc(left + r3, top + r3, r3, -Math.PI, -Math.PI / 2);
              context.arc(item.x - r0, top + r0, r0, -Math.PI / 2, 0);
              context.arc(item.x - r1, top + width - r1, r1, 0, Math.PI / 2);
              context.arc(left + r2, top + width - r2, r2, Math.PI / 2, Math.PI);
            } else {
              context.moveTo(startX, startY);
              context.lineTo(item.x, startY);
              context.lineTo(item.x, startY + item.width - 2);
              context.lineTo(startX, startY + item.width - 2);
              context.lineTo(startX, startY);
              context.setLineWidth(1);
              context.setStrokeStyle(strokeColor);
            }
            context.setFillStyle(fillColor);
            context.closePath();
            //context.stroke();
            context.fill();
          }
        };
        break;
      case 'stack':
        // ?????????????????????
        var points = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(points);
        points = fixBarStackData(points, eachSpacing, series.length, seriesIndex, config, opts, series);
        for (var _i19 = 0; _i19 < points.length; _i19++) {
          var _item10 = points[_i19];
          if (_item10 !== null && _i19 > leftNum && _i19 < rightNum) {
            context.beginPath();
            var fillColor = _item10.color || eachSeries.color;
            var startX = _item10.x0;
            context.setFillStyle(fillColor);
            context.moveTo(startX, _item10.y - _item10.width / 2);
            context.fillRect(startX, _item10.y - _item10.width / 2, _item10.height, _item10.width - 2);
            context.closePath();
            context.fill();
          }
        };
        break;}

  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.xAxisData.ranges);
      maxRange = ranges.pop();
      minRange = ranges.shift();
      var data = eachSeries.data;
      switch (columnOption.type) {
        case 'group':
          var points = getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, process);
          points = fixBarData(points, eachSpacing, series.length, seriesIndex, config, opts);
          drawBarPointText(points, eachSeries, config, context, opts);
          break;
        case 'stack':
          var points = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
          drawBarPointText(points, eachSeries, config, context, opts);
          break;}

    });
  }
  return {
    yAxisPoints: yAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawCandleDataPoints(series, seriesMA, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var candleOption = assign({}, {
    color: {},
    average: {} },
  opts.extra.candle);
  candleOption.color = assign({}, {
    upLine: '#f04864',
    upFill: '#f04864',
    downLine: '#2fc25b',
    downFill: '#2fc25b' },
  candleOption.color);
  candleOption.average = assign({}, {
    show: false,
    name: [],
    day: [],
    color: config.color },
  candleOption.average);
  opts.extra.candle = candleOption;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  //?????????
  if (candleOption.average.show || seriesMA) {//Merge pull request !12 from ?????????
    seriesMA.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      var splitPointList = splitPoints(points, eachSeries);
      for (var i = 0; i < splitPointList.length; i++) {
        var _points = splitPointList[i];
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(1);
        if (_points.length === 1) {
          context.moveTo(_points[0].x, _points[0].y);
          context.arc(_points[0].x, _points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(_points[0].x, _points[0].y);
          var startPoint = 0;
          for (var j = 0; j < _points.length; j++) {
            var item = _points[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(_points, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x,
              item.y);
            }
          }
          context.moveTo(_points[0].x, _points[0].y);
        }
        context.closePath();
        context.stroke();
      }
    });
  }
  //???K???
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points, eachSeries);
    for (var i = 0; i < splitPointList[0].length; i++) {
      if (i > leftNum && i < rightNum) {
        var item = splitPointList[0][i];
        context.beginPath();
        //????????????
        if (data[i][1] - data[i][0] > 0) {
          context.setStrokeStyle(candleOption.color.upLine);
          context.setFillStyle(candleOption.color.upFill);
          context.setLineWidth(1 * opts.pix);
          context.moveTo(item[3].x, item[3].y); //??????
          context.lineTo(item[1].x, item[1].y); //???????????????
          context.lineTo(item[1].x - eachSpacing / 4, item[1].y); //???????????????
          context.lineTo(item[0].x - eachSpacing / 4, item[0].y); //???????????????
          context.lineTo(item[0].x, item[0].y); //???????????????
          context.lineTo(item[2].x, item[2].y); //??????
          context.lineTo(item[0].x, item[0].y); //???????????????
          context.lineTo(item[0].x + eachSpacing / 4, item[0].y); //???????????????
          context.lineTo(item[1].x + eachSpacing / 4, item[1].y); //???????????????
          context.lineTo(item[1].x, item[1].y); //???????????????
          context.moveTo(item[3].x, item[3].y); //??????
        } else {
          context.setStrokeStyle(candleOption.color.downLine);
          context.setFillStyle(candleOption.color.downFill);
          context.setLineWidth(1 * opts.pix);
          context.moveTo(item[3].x, item[3].y); //??????
          context.lineTo(item[0].x, item[0].y); //???????????????
          context.lineTo(item[0].x - eachSpacing / 4, item[0].y); //???????????????
          context.lineTo(item[1].x - eachSpacing / 4, item[1].y); //???????????????
          context.lineTo(item[1].x, item[1].y); //???????????????
          context.lineTo(item[2].x, item[2].y); //??????
          context.lineTo(item[1].x, item[1].y); //???????????????
          context.lineTo(item[1].x + eachSpacing / 4, item[1].y); //???????????????
          context.lineTo(item[0].x + eachSpacing / 4, item[0].y); //???????????????
          context.lineTo(item[0].x, item[0].y); //???????????????
          context.moveTo(item[3].x, item[3].y); //??????
        }
        context.closePath();
        context.fill();
        context.stroke();
      }
    }
  });
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawAreaDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var areaOption = assign({}, {
    type: 'straight',
    opacity: 0.2,
    addLine: false,
    width: 2,
    gradient: false },
  opts.extra.area);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var endY = opts.height - opts.area[2];
  var calPoints = [];
  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points, eachSeries);
    for (var i = 0; i < splitPointList.length; i++) {
      var _points2 = splitPointList[i];
      // ???????????????
      context.beginPath();
      context.setStrokeStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      if (areaOption.gradient) {
        var gradient = context.createLinearGradient(0, opts.area[0], 0, opts.height - opts.area[2]);
        gradient.addColorStop('0', hexToRgb(eachSeries.color, areaOption.opacity));
        gradient.addColorStop('1.0', hexToRgb("#FFFFFF", 0.1));
        context.setFillStyle(gradient);
      } else {
        context.setFillStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      }
      context.setLineWidth(areaOption.width * opts.pix);
      if (_points2.length > 1) {
        var firstPoint = _points2[0];
        var lastPoint = _points2[_points2.length - 1];
        context.moveTo(firstPoint.x, firstPoint.y);
        var startPoint = 0;
        if (areaOption.type === 'curve') {
          for (var j = 0; j < _points2.length; j++) {
            var item = _points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(_points2, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          };
        }
        if (areaOption.type === 'straight') {
          for (var _j = 0; _j < _points2.length; _j++) {
            var _item11 = _points2[_j];
            if (startPoint == 0 && _item11.x > leftSpace) {
              context.moveTo(_item11.x, _item11.y);
              startPoint = 1;
            }
            if (_j > 0 && _item11.x > leftSpace && _item11.x < rightSpace) {
              context.lineTo(_item11.x, _item11.y);
            }
          };
        }
        if (areaOption.type === 'step') {
          for (var _j2 = 0; _j2 < _points2.length; _j2++) {
            var _item12 = _points2[_j2];
            if (startPoint == 0 && _item12.x > leftSpace) {
              context.moveTo(_item12.x, _item12.y);
              startPoint = 1;
            }
            if (_j2 > 0 && _item12.x > leftSpace && _item12.x < rightSpace) {
              context.lineTo(_item12.x, _points2[_j2 - 1].y);
              context.lineTo(_item12.x, _item12.y);
            }
          };
        }
        context.lineTo(lastPoint.x, endY);
        context.lineTo(firstPoint.x, endY);
        context.lineTo(firstPoint.x, firstPoint.y);
      } else {
        var _item13 = _points2[0];
        context.moveTo(_item13.x - eachSpacing / 2, _item13.y);
        context.lineTo(_item13.x + eachSpacing / 2, _item13.y);
        context.lineTo(_item13.x + eachSpacing / 2, endY);
        context.lineTo(_item13.x - eachSpacing / 2, endY);
        context.moveTo(_item13.x - eachSpacing / 2, _item13.y);
      }
      context.closePath();
      context.fill();
      //?????????
      if (areaOption.addLine) {
        if (eachSeries.lineType == 'dash') {
          var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
          dashLength *= opts.pix;
          context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(areaOption.width * opts.pix);
        if (_points2.length === 1) {
          context.moveTo(_points2[0].x, _points2[0].y);
          context.arc(_points2[0].x, _points2[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(_points2[0].x, _points2[0].y);
          var _startPoint = 0;
          if (areaOption.type === 'curve') {
            for (var _j3 = 0; _j3 < _points2.length; _j3++) {
              var _item14 = _points2[_j3];
              if (_startPoint == 0 && _item14.x > leftSpace) {
                context.moveTo(_item14.x, _item14.y);
                _startPoint = 1;
              }
              if (_j3 > 0 && _item14.x > leftSpace && _item14.x < rightSpace) {
                var _ctrlPoint = createCurveControlPoints(_points2, _j3 - 1);
                context.bezierCurveTo(_ctrlPoint.ctrA.x, _ctrlPoint.ctrA.y, _ctrlPoint.ctrB.x, _ctrlPoint.ctrB.y, _item14.x, _item14.y);
              }
            };
          }
          if (areaOption.type === 'straight') {
            for (var _j4 = 0; _j4 < _points2.length; _j4++) {
              var _item15 = _points2[_j4];
              if (_startPoint == 0 && _item15.x > leftSpace) {
                context.moveTo(_item15.x, _item15.y);
                _startPoint = 1;
              }
              if (_j4 > 0 && _item15.x > leftSpace && _item15.x < rightSpace) {
                context.lineTo(_item15.x, _item15.y);
              }
            };
          }
          if (areaOption.type === 'step') {
            for (var _j5 = 0; _j5 < _points2.length; _j5++) {
              var _item16 = _points2[_j5];
              if (_startPoint == 0 && _item16.x > leftSpace) {
                context.moveTo(_item16.x, _item16.y);
                _startPoint = 1;
              }
              if (_j5 > 0 && _item16.x > leftSpace && _item16.x < rightSpace) {
                context.lineTo(_item16.x, _points2[_j5 - 1].y);
                context.lineTo(_item16.x, _item16.y);
              }
            };
          }
          context.moveTo(_points2[0].x, _points2[0].y);
        }
        context.stroke();
        context.setLineDash([]);
      }
    }
    //??????
    if (opts.dataPointShape !== false) {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawScatterDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var scatterOption = assign({}, {
    type: 'circle' },
  opts.extra.scatter);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setFillStyle(eachSeries.color);
    context.setLineWidth(1 * opts.pix);
    var shape = eachSeries.pointShape;
    if (shape === 'diamond') {
      points.forEach(function (item, index) {
        if (item !== null) {
          context.moveTo(item.x, item.y - 4.5);
          context.lineTo(item.x - 4.5, item.y);
          context.lineTo(item.x, item.y + 4.5);
          context.lineTo(item.x + 4.5, item.y);
          context.lineTo(item.x, item.y - 4.5);
        }
      });
    } else if (shape === 'circle') {
      points.forEach(function (item, index) {
        if (item !== null) {
          context.moveTo(item.x + 2.5 * opts.pix, item.y);
          context.arc(item.x, item.y, 3 * opts.pix, 0, 2 * Math.PI, false);
        }
      });
    } else if (shape === 'square') {
      points.forEach(function (item, index) {
        if (item !== null) {
          context.moveTo(item.x - 3.5, item.y - 3.5);
          context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
        }
      });
    } else if (shape === 'triangle') {
      points.forEach(function (item, index) {
        if (item !== null) {
          context.moveTo(item.x, item.y - 4.5);
          context.lineTo(item.x - 4.5, item.y + 4.5);
          context.lineTo(item.x + 4.5, item.y + 4.5);
          context.lineTo(item.x, item.y - 4.5);
        }
      });
    } else if (shape === 'triangle') {
      return;
    }
    context.closePath();
    context.fill();
    context.stroke();
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawBubbleDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var bubbleOption = assign({}, {
    opacity: 1,
    border: 2 },
  opts.extra.bubble);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setLineWidth(bubbleOption.border * opts.pix);
    context.setFillStyle(hexToRgb(eachSeries.color, bubbleOption.opacity));
    points.forEach(function (item, index) {
      context.moveTo(item.x + item.r, item.y);
      context.arc(item.x, item.y, item.r * opts.pix, 0, 2 * Math.PI, false);
    });
    context.closePath();
    context.fill();
    context.stroke();

    if (opts.dataLabel !== false && process === 1) {
      points.forEach(function (item, index) {
        context.beginPath();
        var fontSize = series.textSize * opts.pix || config.fontSize;
        context.setFontSize(fontSize);
        context.setFillStyle(series.textColor || "#FFFFFF");
        context.setTextAlign('center');
        context.fillText(String(item.t), item.x, item.y + fontSize / 2);
        context.closePath();
        context.stroke();
        context.setTextAlign('left');
      });
    }
  });
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}


function drawLineDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var lineOption = assign({}, {
    type: 'straight',
    width: 2 },
  opts.extra.line);
  lineOption.width *= opts.pix;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points, eachSeries);
    if (eachSeries.lineType == 'dash') {
      var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
      dashLength *= opts.pix;
      context.setLineDash([dashLength, dashLength]);
    }
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setLineWidth(lineOption.width);
    splitPointList.forEach(function (points, index) {
      if (points.length === 1) {
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
      } else {
        context.moveTo(points[0].x, points[0].y);
        var startPoint = 0;
        if (lineOption.type === 'curve') {
          for (var j = 0; j < points.length; j++) {
            var item = points[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(points, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          };
        }
        if (lineOption.type === 'straight') {
          for (var _j6 = 0; _j6 < points.length; _j6++) {
            var _item17 = points[_j6];
            if (startPoint == 0 && _item17.x > leftSpace) {
              context.moveTo(_item17.x, _item17.y);
              startPoint = 1;
            }
            if (_j6 > 0 && _item17.x > leftSpace && _item17.x < rightSpace) {
              context.lineTo(_item17.x, _item17.y);
            }
          };
        }
        if (lineOption.type === 'step') {
          for (var _j7 = 0; _j7 < points.length; _j7++) {
            var _item18 = points[_j7];
            if (startPoint == 0 && _item18.x > leftSpace) {
              context.moveTo(_item18.x, _item18.y);
              startPoint = 1;
            }
            if (_j7 > 0 && _item18.x > leftSpace && _item18.x < rightSpace) {
              context.lineTo(_item18.x, points[_j7 - 1].y);
              context.lineTo(_item18.x, _item18.y);
            }
          };
        }
        context.moveTo(points[0].x, points[0].y);
      }
    });
    context.stroke();
    context.setLineDash([]);
    if (opts.dataPointShape !== false) {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawMixDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var columnOption = assign({}, {
    width: eachSpacing / 2,
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: 'none',
    linearOpacity: 1,
    customColor: [],
    colorStop: 0 },
  opts.extra.mix.column);
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var endY = opts.height - opts.area[2];
  var calPoints = [];
  var columnIndex = 0;
  var columnLength = 0;
  series.forEach(function (eachSeries, seriesIndex) {
    if (eachSeries.type == 'column') {
      columnLength += 1;
    }
  });
  context.save();
  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config);
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    // ?????????????????????
    if (eachSeries.type == 'column') {
      points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
      for (var i = 0; i < points.length; i++) {
        var item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          var startX = item.x - item.width / 2;
          var height = opts.height - item.y - opts.area[2];
          context.beginPath();
          var fillColor = item.color || eachSeries.color;
          var strokeColor = item.color || eachSeries.color;
          if (columnOption.linearType !== 'none') {
            var grd = context.createLinearGradient(startX, item.y, startX, opts.height - opts.area[2]);
            //????????????
            if (columnOption.linearType == 'opacity') {
              grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
              grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          // ????????????
          if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle) {
            var left = startX;
            var top = item.y;
            var width = item.width;
            var _height3 = opts.height - opts.area[2] - item.y;
            if (columnOption.barBorderCircle) {
              columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
            }var _columnOption$barBord3 = _slicedToArray(
            columnOption.barBorderRadius, 4),r0 = _columnOption$barBord3[0],r1 = _columnOption$barBord3[1],r2 = _columnOption$barBord3[2],r3 = _columnOption$barBord3[3];
            if (r0 + r2 > _height3) {
              r0 = _height3;
              r2 = 0;
              r1 = _height3;
              r3 = 0;
            }
            if (r0 + r2 > width / 2) {
              r0 = width / 2;
              r2 = 0;
              r1 = width / 2;
              r3 = 0;
            }
            r0 = r0 < 0 ? 0 : r0;
            r1 = r1 < 0 ? 0 : r1;
            r2 = r2 < 0 ? 0 : r2;
            r3 = r3 < 0 ? 0 : r3;
            context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
            context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
            context.arc(left + width - r2, top + _height3 - r2, r2, 0, Math.PI / 2);
            context.arc(left + r3, top + _height3 - r3, r3, Math.PI / 2, Math.PI);
          } else {
            context.moveTo(startX, item.y);
            context.lineTo(startX + item.width - 2, item.y);
            context.lineTo(startX + item.width - 2, opts.height - opts.area[2]);
            context.lineTo(startX, opts.height - opts.area[2]);
            context.lineTo(startX, item.y);
            context.setLineWidth(1);
            context.setStrokeStyle(strokeColor);
          }
          context.setFillStyle(fillColor);
          context.closePath();
          context.fill();
        }
      }
      columnIndex += 1;
    }
    //?????????????????????
    if (eachSeries.type == 'area') {
      var _splitPointList = splitPoints(points, eachSeries);
      for (var _i20 = 0; _i20 < _splitPointList.length; _i20++) {
        var _points3 = _splitPointList[_i20];
        // ??????????????????
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setFillStyle(hexToRgb(eachSeries.color, 0.2));
        context.setLineWidth(2 * opts.pix);
        if (_points3.length > 1) {
          var firstPoint = _points3[0];
          var lastPoint = _points3[_points3.length - 1];
          context.moveTo(firstPoint.x, firstPoint.y);
          var startPoint = 0;
          if (eachSeries.style === 'curve') {
            for (var j = 0; j < _points3.length; j++) {
              var _item19 = _points3[j];
              if (startPoint == 0 && _item19.x > leftSpace) {
                context.moveTo(_item19.x, _item19.y);
                startPoint = 1;
              }
              if (j > 0 && _item19.x > leftSpace && _item19.x < rightSpace) {
                var ctrlPoint = createCurveControlPoints(_points3, j - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, _item19.x, _item19.y);
              }
            };
          } else {
            for (var _j8 = 0; _j8 < _points3.length; _j8++) {
              var _item20 = _points3[_j8];
              if (startPoint == 0 && _item20.x > leftSpace) {
                context.moveTo(_item20.x, _item20.y);
                startPoint = 1;
              }
              if (_j8 > 0 && _item20.x > leftSpace && _item20.x < rightSpace) {
                context.lineTo(_item20.x, _item20.y);
              }
            };
          }
          context.lineTo(lastPoint.x, endY);
          context.lineTo(firstPoint.x, endY);
          context.lineTo(firstPoint.x, firstPoint.y);
        } else {
          var _item21 = _points3[0];
          context.moveTo(_item21.x - eachSpacing / 2, _item21.y);
          context.lineTo(_item21.x + eachSpacing / 2, _item21.y);
          context.lineTo(_item21.x + eachSpacing / 2, endY);
          context.lineTo(_item21.x - eachSpacing / 2, endY);
          context.moveTo(_item21.x - eachSpacing / 2, _item21.y);
        }
        context.closePath();
        context.fill();
      }
    }
    // ?????????????????????
    if (eachSeries.type == 'line') {
      var splitPointList = splitPoints(points, eachSeries);
      splitPointList.forEach(function (points, index) {
        if (eachSeries.lineType == 'dash') {
          var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
          dashLength *= opts.pix;
          context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(2 * opts.pix);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          var _startPoint2 = 0;
          if (eachSeries.style == 'curve') {
            for (var _j9 = 0; _j9 < points.length; _j9++) {
              var _item22 = points[_j9];
              if (_startPoint2 == 0 && _item22.x > leftSpace) {
                context.moveTo(_item22.x, _item22.y);
                _startPoint2 = 1;
              }
              if (_j9 > 0 && _item22.x > leftSpace && _item22.x < rightSpace) {
                var ctrlPoint = createCurveControlPoints(points, _j9 - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y,
                _item22.x, _item22.y);
              }
            }
          } else {
            for (var _j10 = 0; _j10 < points.length; _j10++) {
              var _item23 = points[_j10];
              if (_startPoint2 == 0 && _item23.x > leftSpace) {
                context.moveTo(_item23.x, _item23.y);
                _startPoint2 = 1;
              }
              if (_j10 > 0 && _item23.x > leftSpace && _item23.x < rightSpace) {
                context.lineTo(_item23.x, _item23.y);
              }
            }
          }
          context.moveTo(points[0].x, points[0].y);
        }
        context.stroke();
        context.setLineDash([]);
      });
    }
    // ??????????????????
    if (eachSeries.type == 'point') {
      eachSeries.addPoint = true;
    }
    if (eachSeries.addPoint == true && eachSeries.type !== 'column') {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    var columnIndex = 0;
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      if (eachSeries.type !== 'column') {
        drawPointText(points, eachSeries, config, context, opts);
      } else {
        points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
        drawPointText(points, eachSeries, config, context, opts);
        columnIndex += 1;
      }
    });
  }
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints) {
  var toolTipOption = opts.extra.tooltip || {};
  if (toolTipOption.horizentalLine && opts.tooltip && process === 1 && (opts.type == 'line' || opts.type == 'area' || opts.type == 'column' || opts.type == 'candle' || opts.type == 'mix')) {
    drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context, eachSpacing, xAxisPoints);
  }
  context.restore();

}

function drawXAxis(categories, opts, config, context) {

  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  startX = xAxisData.startX,
  endX = xAxisData.endX,
  eachSpacing = xAxisData.eachSpacing;
  var boundaryGap = 'center';
  if (opts.type == 'bar' || opts.type == 'line' || opts.type == 'area' || opts.type == 'scatter' || opts.type == 'bubble') {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var startY = opts.height - opts.area[2];
  var endY = opts.area[0];

  //???????????????
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    var scrollY = opts.height - opts.area[2] + config.xAxisHeight;
    var scrollScreenWidth = endX - startX;
    var scrollTotalWidth = eachSpacing * (xAxisPoints.length - 1);
    var scrollWidth = scrollScreenWidth * scrollScreenWidth / scrollTotalWidth;
    var scrollLeft = 0;
    if (opts._scrollDistance_) {
      scrollLeft = -opts._scrollDistance_ * scrollScreenWidth / scrollTotalWidth;
    }
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pix);
    context.setStrokeStyle(opts.xAxis.scrollBackgroundColor || "#EFEBEF");
    context.moveTo(startX, scrollY);
    context.lineTo(endX, scrollY);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pix);
    context.setStrokeStyle(opts.xAxis.scrollColor || "#A6A6A6");
    context.moveTo(startX + scrollLeft, scrollY);
    context.lineTo(startX + scrollLeft + scrollWidth, scrollY);
    context.stroke();
    context.closePath();
    context.setLineCap('butt');
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }
  //??????X????????????
  if (opts.xAxis.calibration === true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap('butt');
    context.setLineWidth(1 * opts.pix);
    xAxisPoints.forEach(function (item, index) {
      if (index > 0) {
        context.beginPath();
        context.moveTo(item - eachSpacing / 2, startY);
        context.lineTo(item - eachSpacing / 2, startY + 3 * opts.pix);
        context.closePath();
        context.stroke();
      }
    });
  }
  //??????X?????????
  if (opts.xAxis.disableGrid !== true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap('butt');
    context.setLineWidth(1 * opts.pix);
    if (opts.xAxis.gridType == 'dash') {
      context.setLineDash([opts.xAxis.dashLength * opts.pix, opts.xAxis.dashLength * opts.pix]);
    }
    opts.xAxis.gridEval = opts.xAxis.gridEval || 1;
    xAxisPoints.forEach(function (item, index) {
      if (index % opts.xAxis.gridEval == 0) {
        context.beginPath();
        context.moveTo(item, startY);
        context.lineTo(item, endY);
        context.stroke();
      }
    });
    context.setLineDash([]);
  }
  //??????X?????????
  if (opts.xAxis.disabled !== true) {
    // ???X????????????????????????
    //??????????????????X?????????
    var maxXAxisListLength = categories.length;
    //???????????????X???????????????
    if (opts.xAxis.labelCount) {
      //????????????X?????????
      if (opts.xAxis.itemCount) {
        maxXAxisListLength = Math.ceil(categories.length / opts.xAxis.itemCount * opts.xAxis.labelCount);
      } else {
        maxXAxisListLength = opts.xAxis.labelCount;
      }
      maxXAxisListLength -= 1;
    }

    var ratio = Math.ceil(categories.length / maxXAxisListLength);

    var newCategories = [];
    var cgLength = categories.length;
    for (var i = 0; i < cgLength; i++) {
      if (i % ratio !== 0) {
        newCategories.push("");
      } else {
        newCategories.push(categories[i]);
      }
    }
    newCategories[cgLength - 1] = categories[cgLength - 1];
    var xAxisFontSize = opts.xAxis.fontSize * opts.pix || config.fontSize;
    if (config._xAxisTextAngle_ === 0) {
      newCategories.forEach(function (item, index) {
        var xitem = opts.xAxis.formatter ? opts.xAxis.formatter(item) : item;
        var offset = -measureText(String(xitem), xAxisFontSize, context) / 2;
        if (boundaryGap == 'center') {
          offset += eachSpacing / 2;
        }
        var scrollHeight = 0;
        if (opts.xAxis.scrollShow) {
          scrollHeight = 6 * opts.pix;
        }
        context.beginPath();
        context.setFontSize(xAxisFontSize);
        context.setFillStyle(opts.xAxis.fontColor || opts.fontColor);
        context.fillText(String(xitem), xAxisPoints[index] + offset, startY + xAxisFontSize + (config.xAxisHeight - scrollHeight - xAxisFontSize) / 2);
        context.closePath();
        context.stroke();
      });
    } else {
      newCategories.forEach(function (item, index) {
        var xitem = opts.xAxis.formatter ? opts.xAxis.formatter(Number(item)) : item;
        context.save();
        context.beginPath();
        context.setFontSize(xAxisFontSize);
        context.setFillStyle(opts.xAxis.fontColor || opts.fontColor);
        var textWidth = measureText(String(xitem), xAxisFontSize, context);
        var offset = -textWidth;
        if (boundaryGap == 'center') {
          offset += eachSpacing / 2;
        }
        var _calRotateTranslate = calRotateTranslate(xAxisPoints[index] + eachSpacing / 2, startY + xAxisFontSize / 2 + 5, opts.height),
        transX = _calRotateTranslate.transX,
        transY = _calRotateTranslate.transY;

        context.rotate(-1 * config._xAxisTextAngle_);
        context.translate(transX, transY);
        context.fillText(String(xitem), xAxisPoints[index] + offset, startY + xAxisFontSize + 5);
        context.closePath();
        context.stroke();
        context.restore();
      });
    }
  }
  context.restore();
  //??????X?????????
  if (opts.xAxis.axisLine) {
    context.beginPath();
    context.setStrokeStyle(opts.xAxis.axisLineColor);
    context.setLineWidth(1 * opts.pix);
    context.moveTo(startX, opts.height - opts.area[2]);
    context.lineTo(endX, opts.height - opts.area[2]);
    context.stroke();
  }
}

function drawYAxisGrid(categories, opts, config, context) {
  if (opts.yAxis.disableGrid === true) {
    return;
  }
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = spacingValid / opts.yAxis.splitNumber;
  var startX = opts.area[3];
  var xAxisPoints = opts.chartData.xAxisData.xAxisPoints,
  xAxiseachSpacing = opts.chartData.xAxisData.eachSpacing;
  var TotalWidth = xAxiseachSpacing * (xAxisPoints.length - 1);
  var endX = startX + TotalWidth;
  var points = [];
  var startY = 1;
  if (opts.xAxis.axisLine === false) {
    startY = 0;
  }
  for (var i = startY; i < opts.yAxis.splitNumber + 1; i++) {
    points.push(opts.height - opts.area[2] - eachSpacing * i);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.yAxis.gridType == 'dash') {
    context.setLineDash([opts.yAxis.dashLength * opts.pix, opts.yAxis.dashLength * opts.pix]);
  }
  context.setStrokeStyle(opts.yAxis.gridColor);
  context.setLineWidth(1 * opts.pix);
  points.forEach(function (item, index) {
    context.beginPath();
    context.moveTo(startX, item);
    context.lineTo(endX, item);
    context.stroke();
  });
  context.setLineDash([]);
  context.restore();
}

function drawYAxis(series, opts, config, context) {
  if (opts.yAxis.disabled === true) {
    return;
  }
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = spacingValid / opts.yAxis.splitNumber;
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  var endY = opts.height - opts.area[2];
  var fillEndY = endY + config.xAxisHeight;
  if (opts.xAxis.scrollShow) {
    fillEndY -= 3 * opts.pix;
  }
  if (opts.xAxis.rotateLabel) {
    fillEndY = opts.height - opts.area[2] + opts.fontSize * opts.pix / 2;
  }
  // set YAxis background
  context.beginPath();
  context.setFillStyle(opts.background);
  if (opts.enableScroll == true && opts.xAxis.scrollPosition && opts.xAxis.scrollPosition !== 'left') {
    context.fillRect(0, 0, startX, fillEndY);
  }
  if (opts.enableScroll == true && opts.xAxis.scrollPosition && opts.xAxis.scrollPosition !== 'right') {
    context.fillRect(endX, 0, opts.width, fillEndY);
  }
  context.closePath();
  context.stroke();

  var tStartLeft = opts.area[3];
  var tStartRight = opts.width - opts.area[1];
  var tStartCenter = opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2;
  if (opts.yAxis.data) {var _loop4 = function _loop4(
    i) {
      var yData = opts.yAxis.data[i];
      points = [];
      if (yData.type === 'categories') {
        for (var _i21 = 0; _i21 <= yData.categories.length; _i21++) {
          points.push(opts.area[0] + spacingValid / yData.categories.length / 2 + spacingValid / yData.categories.length * _i21);
        }
      } else {
        for (var _i22 = 0; _i22 <= opts.yAxis.splitNumber; _i22++) {
          points.push(opts.area[0] + eachSpacing * _i22);
        }
      }
      if (yData.disabled !== true) {
        var rangesFormat = opts.chartData.yAxisData.rangesFormat[i];
        var yAxisFontSize = yData.fontSize ? yData.fontSize * opts.pix : config.fontSize;
        var yAxisWidth = opts.chartData.yAxisData.yAxisWidth[i];
        var textAlign = yData.textAlign || "right";
        //???Y??????????????????
        rangesFormat.forEach(function (item, index) {
          var pos = points[index] ? points[index] : endY;
          context.beginPath();
          context.setFontSize(yAxisFontSize);
          context.setLineWidth(1 * opts.pix);
          context.setStrokeStyle(yData.axisLineColor || '#cccccc');
          context.setFillStyle(yData.fontColor || opts.fontColor);
          var tmpstrat = 0;
          var gapwidth = 4 * opts.pix;
          if (yAxisWidth.position == 'left') {
            //????????????
            if (yData.calibration == true) {
              context.moveTo(tStartLeft, pos);
              context.lineTo(tStartLeft - 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            //?????????
            switch (textAlign) {
              case "left":
                context.setTextAlign('left');
                tmpstrat = tStartLeft - yAxisWidth.width;
                break;
              case "right":
                context.setTextAlign('right');
                tmpstrat = tStartLeft - gapwidth;
                break;
              default:
                context.setTextAlign('center');
                tmpstrat = tStartLeft - yAxisWidth.width / 2;}

            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);

          } else if (yAxisWidth.position == 'right') {
            //????????????
            if (yData.calibration == true) {
              context.moveTo(tStartRight, pos);
              context.lineTo(tStartRight + 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            switch (textAlign) {
              case "left":
                context.setTextAlign('left');
                tmpstrat = tStartRight + gapwidth;
                break;
              case "right":
                context.setTextAlign('right');
                tmpstrat = tStartRight + yAxisWidth.width;
                break;
              default:
                context.setTextAlign('center');
                tmpstrat = tStartRight + yAxisWidth.width / 2;}

            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);
          } else if (yAxisWidth.position == 'center') {
            //????????????
            if (yData.calibration == true) {
              context.moveTo(tStartCenter, pos);
              context.lineTo(tStartCenter - 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            //?????????
            switch (textAlign) {
              case "left":
                context.setTextAlign('left');
                tmpstrat = tStartCenter - yAxisWidth.width;
                break;
              case "right":
                context.setTextAlign('right');
                tmpstrat = tStartCenter - gapwidth;
                break;
              default:
                context.setTextAlign('center');
                tmpstrat = tStartCenter - yAxisWidth.width / 2;}

            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);
          }
          context.closePath();
          context.stroke();
          context.setTextAlign('left');
        });
        //???Y?????????
        if (yData.axisLine !== false) {
          context.beginPath();
          context.setStrokeStyle(yData.axisLineColor || '#cccccc');
          context.setLineWidth(1 * opts.pix);
          if (yAxisWidth.position == 'left') {
            context.moveTo(tStartLeft, opts.height - opts.area[2]);
            context.lineTo(tStartLeft, opts.area[0]);
          } else if (yAxisWidth.position == 'right') {
            context.moveTo(tStartRight, opts.height - opts.area[2]);
            context.lineTo(tStartRight, opts.area[0]);
          } else if (yAxisWidth.position == 'center') {
            context.moveTo(tStartCenter, opts.height - opts.area[2]);
            context.lineTo(tStartCenter, opts.area[0]);
          }
          context.stroke();
        }
        //???Y?????????
        if (opts.yAxis.showTitle) {
          var titleFontSize = yData.titleFontSize * opts.pix || config.fontSize;
          var title = yData.title;
          context.beginPath();
          context.setFontSize(titleFontSize);
          context.setFillStyle(yData.titleFontColor || opts.fontColor);
          if (yAxisWidth.position == 'left') {
            context.fillText(title, tStartLeft - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          } else if (yAxisWidth.position == 'right') {
            context.fillText(title, tStartRight - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          } else if (yAxisWidth.position == 'center') {
            context.fillText(title, tStartCenter - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          }
          context.closePath();
          context.stroke();
        }
        if (yAxisWidth.position == 'left') {
          tStartLeft -= yAxisWidth.width + opts.yAxis.padding * opts.pix;
        } else {
          tStartRight += yAxisWidth.width + opts.yAxis.padding * opts.pix;
        }
      }};for (var i = 0; i < opts.yAxis.data.length; i++) {var points;_loop4(i);
    }
  }

}

function drawLegend(series, opts, config, context, chartData) {
  if (opts.legend.show === false) {
    return;
  }
  var legendData = chartData.legendData;
  var legendList = legendData.points;
  var legendArea = legendData.area;
  var padding = opts.legend.padding * opts.pix;
  var fontSize = opts.legend.fontSize * opts.pix;
  var shapeWidth = 15 * opts.pix;
  var shapeRight = 5 * opts.pix;
  var itemGap = opts.legend.itemGap * opts.pix;
  var lineHeight = Math.max(opts.legend.lineHeight * opts.pix, fontSize);
  //??????????????????
  context.beginPath();
  context.setLineWidth(opts.legend.borderWidth * opts.pix);
  context.setStrokeStyle(opts.legend.borderColor);
  context.setFillStyle(opts.legend.backgroundColor);
  context.moveTo(legendArea.start.x, legendArea.start.y);
  context.rect(legendArea.start.x, legendArea.start.y, legendArea.width, legendArea.height);
  context.closePath();
  context.fill();
  context.stroke();
  legendList.forEach(function (itemList, listIndex) {
    var width = 0;
    var height = 0;
    width = legendData.widthArr[listIndex];
    height = legendData.heightArr[listIndex];
    var startX = 0;
    var startY = 0;
    if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
      switch (opts.legend.float) {
        case 'left':
          startX = legendArea.start.x + padding;
          break;
        case 'right':
          startX = legendArea.start.x + legendArea.width - width;
          break;
        default:
          startX = legendArea.start.x + (legendArea.width - width) / 2;}

      startY = legendArea.start.y + padding + listIndex * lineHeight;
    } else {
      if (listIndex == 0) {
        width = 0;
      } else {
        width = legendData.widthArr[listIndex - 1];
      }
      startX = legendArea.start.x + padding + width;
      startY = legendArea.start.y + padding + (legendArea.height - height) / 2;
    }
    context.setFontSize(config.fontSize);
    for (var i = 0; i < itemList.length; i++) {
      var item = itemList[i];
      item.area = [0, 0, 0, 0];
      item.area[0] = startX;
      item.area[1] = startY;
      item.area[3] = startY + lineHeight;
      context.beginPath();
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.show ? item.color : opts.legend.hiddenColor);
      context.setFillStyle(item.show ? item.color : opts.legend.hiddenColor);
      switch (item.legendShape) {
        case 'line':
          context.moveTo(startX, startY + 0.5 * lineHeight - 2 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 2 * opts.pix, 15 * opts.pix, 4 * opts.pix);
          break;
        case 'triangle':
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.lineTo(startX + 2.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 12.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          break;
        case 'diamond':
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.lineTo(startX + 2.5 * opts.pix, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 12.5 * opts.pix, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          break;
        case 'circle':
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight);
          context.arc(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight, 5 * opts.pix, 0, 2 * Math.PI);
          break;
        case 'rect':
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pix, 15 * opts.pix, 10 * opts.pix);
          break;
        case 'square':
          context.moveTo(startX + 5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX + 5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix, 10 * opts.pix, 10 * opts.pix);
          break;
        case 'none':
          break;
        default:
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pix, 15 * opts.pix, 10 * opts.pix);}

      context.closePath();
      context.fill();
      context.stroke();
      startX += shapeWidth + shapeRight;
      var fontTrans = 0.5 * lineHeight + 0.5 * fontSize - 2;
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.show ? opts.legend.fontColor : opts.legend.hiddenColor);
      context.fillText(item.name, startX, startY + fontTrans);
      context.closePath();
      context.stroke();
      if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
        startX += measureText(item.name, fontSize, context) + itemGap;
        item.area[2] = startX;
      } else {
        item.area[2] = startX + measureText(item.name, fontSize, context) + itemGap;;
        startX -= shapeWidth + shapeRight;
        startY += lineHeight;
      }
    }
  });
}

function drawPieDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var pieOption = assign({}, {
    activeOpacity: 0.5,
    activeRadius: 10,
    offsetAngle: 0,
    labelWidth: 15,
    ringWidth: 30,
    customRadius: 0,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    centerColor: '#FFFFFF',
    linearType: 'none',
    customColor: [] },
  opts.type == "pie" ? opts.extra.pie : opts.extra.ring);
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  if (config.pieChartLinePadding == 0) {
    config.pieChartLinePadding = pieOption.activeRadius * opts.pix;
  }

  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding);
  if (pieOption.customRadius > 0) {
    radius = pieOption.customRadius * opts.pix;
  }
  series = getPieDataPoints(series, radius, process);
  var activeRadius = pieOption.activeRadius * opts.pix;
  pieOption.customColor = fillCustomColor(pieOption.linearType, pieOption.customColor, series, config);
  series = series.map(function (eachSeries) {
    eachSeries._start_ += pieOption.offsetAngle * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, pieOption.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_ + activeRadius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(pieOption.borderWidth * opts.pix);
    context.lineJoin = "round";
    context.setStrokeStyle(pieOption.borderColor);
    var fillcolor = eachSeries.color;
    if (pieOption.linearType == 'custom') {
      var grd;
      if (context.createCircularGradient) {
        grd = context.createCircularGradient(centerPosition.x, centerPosition.y, eachSeries._radius_);
      } else {
        grd = context.createRadialGradient(centerPosition.x, centerPosition.y, 0, centerPosition.x, centerPosition.y, eachSeries._radius_);
      }
      grd.addColorStop(0, hexToRgb(pieOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(1, hexToRgb(eachSeries.color, 1));
      fillcolor = grd;
    }
    context.setFillStyle(fillcolor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (pieOption.border == true) {
      context.stroke();
    }
  });
  if (opts.type === 'ring') {
    var innerPieWidth = radius * 0.6;
    if (typeof pieOption.ringWidth === 'number' && pieOption.ringWidth > 0) {
      innerPieWidth = Math.max(0, radius - pieOption.ringWidth * opts.pix);
    }
    context.beginPath();
    context.setFillStyle(pieOption.centerColor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
  if (opts.dataLabel !== false && process === 1) {
    var valid = false;
    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }
    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }
  if (process === 1 && opts.type === 'ring') {
    drawRingTitle(opts, config, context, centerPosition);
  }
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawRoseDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var roseOption = assign({}, {
    type: 'area',
    activeOpacity: 0.5,
    activeRadius: 10,
    offsetAngle: 0,
    labelWidth: 15,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    linearType: 'none',
    customColor: [] },
  opts.extra.rose);
  if (config.pieChartLinePadding == 0) {
    config.pieChartLinePadding = roseOption.activeRadius * opts.pix;
  }
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding);
  var minRadius = roseOption.minRadius || radius * 0.5;
  series = getRoseDataPoints(series, roseOption.type, minRadius, radius, process);
  var activeRadius = roseOption.activeRadius * opts.pix;
  roseOption.customColor = fillCustomColor(roseOption.linearType, roseOption.customColor, series, config);
  series = series.map(function (eachSeries) {
    eachSeries._start_ += (roseOption.offsetAngle || 0) * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, roseOption.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, activeRadius + eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._rose_proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(roseOption.borderWidth * opts.pix);
    context.lineJoin = "round";
    context.setStrokeStyle(roseOption.borderColor);
    var fillcolor = eachSeries.color;
    if (roseOption.linearType == 'custom') {
      var grd;
      if (context.createCircularGradient) {
        grd = context.createCircularGradient(centerPosition.x, centerPosition.y, eachSeries._radius_);
      } else {
        grd = context.createRadialGradient(centerPosition.x, centerPosition.y, 0, centerPosition.x, centerPosition.y, eachSeries._radius_);
      }
      grd.addColorStop(0, hexToRgb(roseOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(1, hexToRgb(eachSeries.color, 1));
      fillcolor = grd;
    }
    context.setFillStyle(fillcolor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._rose_proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (roseOption.border == true) {
      context.stroke();
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    var valid = false;
    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }
    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawArcbarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var arcbarOption = assign({}, {
    startAngle: 0.75,
    endAngle: 0.25,
    type: 'default',
    width: 12,
    gap: 2,
    linearType: 'none',
    customColor: [] },
  opts.extra.arcbar);
  series = getArcbarDataPoints(series, arcbarOption, process);
  var centerPosition;
  if (arcbarOption.centerX || arcbarOption.centerY) {
    centerPosition = {
      x: arcbarOption.centerX ? arcbarOption.centerX : opts.width / 2,
      y: arcbarOption.centerY ? arcbarOption.centerY : opts.height / 2 };

  } else {
    centerPosition = {
      x: opts.width / 2,
      y: opts.height / 2 };

  }
  var radius;
  if (arcbarOption.radius) {
    radius = arcbarOption.radius;
  } else {
    radius = Math.min(centerPosition.x, centerPosition.y);
    radius -= 5 * opts.pix;
    radius -= arcbarOption.width / 2;
  }
  arcbarOption.customColor = fillCustomColor(arcbarOption.linearType, arcbarOption.customColor, series, config);

  for (var i = 0; i < series.length; i++) {
    var eachSeries = series[i];
    //????????????
    context.setLineWidth(arcbarOption.width * opts.pix);
    context.setStrokeStyle(arcbarOption.backgroundColor || '#E9E9E9');
    context.setLineCap('round');
    context.beginPath();
    if (arcbarOption.type == 'default') {
      context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, arcbarOption.startAngle * Math.PI, arcbarOption.endAngle * Math.PI, false);
    } else {
      context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, 0, 2 * Math.PI, false);
    }
    context.stroke();
    //?????????
    var fillColor = eachSeries.color;
    if (arcbarOption.linearType == 'custom') {
      var grd = context.createLinearGradient(centerPosition.x - radius, centerPosition.y, centerPosition.x + radius, centerPosition.y);
      grd.addColorStop(1, hexToRgb(arcbarOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(0, hexToRgb(eachSeries.color, 1));
      fillColor = grd;
    }
    context.setLineWidth(arcbarOption.width * opts.pix);
    context.setStrokeStyle(fillColor);
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, arcbarOption.startAngle * Math.PI, eachSeries._proportion_ * Math.PI, false);
    context.stroke();
  }
  drawRingTitle(opts, config, context, centerPosition);
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawGaugeDataPoints(categories, series, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var gaugeOption = assign({}, {
    type: 'default',
    startAngle: 0.75,
    endAngle: 0.25,
    width: 15,
    labelOffset: 13,
    splitLine: {
      fixRadius: 0,
      splitNumber: 10,
      width: 15,
      color: '#FFFFFF',
      childNumber: 5,
      childWidth: 5 },

    pointer: {
      width: 15,
      color: 'auto' } },

  opts.extra.gauge);
  if (gaugeOption.oldAngle == undefined) {
    gaugeOption.oldAngle = gaugeOption.startAngle;
  }
  if (gaugeOption.oldData == undefined) {
    gaugeOption.oldData = 0;
  }
  categories = getGaugeAxisPoints(categories, gaugeOption.startAngle, gaugeOption.endAngle);
  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);
  radius -= 5 * opts.pix;
  radius -= gaugeOption.width / 2;
  var innerRadius = radius - gaugeOption.width;
  var totalAngle = 0;
  //???????????????????????????default???????????????progress?????????
  if (gaugeOption.type == 'progress') {
    //## ????????????????????????????????????????????????
    //??????????????????
    var pieRadius = radius - gaugeOption.width * 3;
    context.beginPath();
    var gradient = context.createLinearGradient(centerPosition.x, centerPosition.y - pieRadius, centerPosition.x, centerPosition.y + pieRadius);
    //?????????????????????????????????????????????????????????????????????????????????????????????
    gradient.addColorStop('0', hexToRgb(series[0].color, 0.3));
    gradient.addColorStop('1.0', hexToRgb("#FFFFFF", 0.1));
    context.setFillStyle(gradient);
    context.arc(centerPosition.x, centerPosition.y, pieRadius, 0, 2 * Math.PI, false);
    context.fill();
    //??????????????????
    context.setLineWidth(gaugeOption.width);
    context.setStrokeStyle(hexToRgb(series[0].color, 0.3));
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, innerRadius, gaugeOption.startAngle * Math.PI, gaugeOption.endAngle * Math.PI, false);
    context.stroke();
    //## ?????????????????????
    totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
    var childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
    var startX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
    var endX = -radius - gaugeOption.width - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    var len = gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1;
    var proc = series[0].data * process;
    for (var i = 0; i < len; i++) {
      context.beginPath();
      //????????????????????????
      if (proc > i / len) {
        context.setStrokeStyle(hexToRgb(series[0].color, 1));
      } else {
        context.setStrokeStyle(hexToRgb(series[0].color, 0.3));
      }
      context.setLineWidth(3 * opts.pix);
      context.moveTo(startX, 0);
      context.lineTo(endX, 0);
      context.stroke();
      context.rotate(childAngle * Math.PI);
    }
    context.restore();
    //## ?????????????????????
    series = getArcbarDataPoints(series, gaugeOption, process);
    context.setLineWidth(gaugeOption.width);
    context.setStrokeStyle(series[0].color);
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, innerRadius, gaugeOption.startAngle * Math.PI, series[0]._proportion_ * Math.PI, false);
    context.stroke();
    //## ??????????????????
    var pointerRadius = radius - gaugeOption.width * 2.5;
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((series[0]._proportion_ - 1) * Math.PI);
    context.beginPath();
    context.setLineWidth(gaugeOption.width / 3);
    var gradient3 = context.createLinearGradient(0, -pointerRadius * 0.6, 0, pointerRadius * 0.6);
    gradient3.addColorStop('0', hexToRgb('#FFFFFF', 0));
    gradient3.addColorStop('0.5', hexToRgb(series[0].color, 1));
    gradient3.addColorStop('1.0', hexToRgb('#FFFFFF', 0));
    context.setStrokeStyle(gradient3);
    context.arc(0, 0, pointerRadius, 0.85 * Math.PI, 1.15 * Math.PI, false);
    context.stroke();
    context.beginPath();
    context.setLineWidth(1);
    context.setStrokeStyle(series[0].color);
    context.setFillStyle(series[0].color);
    context.moveTo(-pointerRadius - gaugeOption.width / 3 / 2, -4);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2 - 4, 0);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2, 4);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2, -4);
    context.stroke();
    context.fill();
    context.restore();
    //default????????????
  } else {
    //?????????
    context.setLineWidth(gaugeOption.width);
    context.setLineCap('butt');
    for (var _i23 = 0; _i23 < categories.length; _i23++) {
      var eachCategories = categories[_i23];
      context.beginPath();
      context.setStrokeStyle(eachCategories.color);
      context.arc(centerPosition.x, centerPosition.y, radius, eachCategories._startAngle_ * Math.PI, eachCategories._endAngle_ * Math.PI, false);
      context.stroke();
    }
    context.save();
    //????????????
    totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    var _splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
    var _childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
    var _startX2 = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
    var _endX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
    var childendX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.childWidth;
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    for (var _i24 = 0; _i24 < gaugeOption.splitLine.splitNumber + 1; _i24++) {
      context.beginPath();
      context.setStrokeStyle(gaugeOption.splitLine.color);
      context.setLineWidth(2 * opts.pix);
      context.moveTo(_startX2, 0);
      context.lineTo(_endX, 0);
      context.stroke();
      context.rotate(_splitAngle * Math.PI);
    }
    context.restore();
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    for (var _i25 = 0; _i25 < gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1; _i25++) {
      context.beginPath();
      context.setStrokeStyle(gaugeOption.splitLine.color);
      context.setLineWidth(1 * opts.pix);
      context.moveTo(_startX2, 0);
      context.lineTo(childendX, 0);
      context.stroke();
      context.rotate(_childAngle * Math.PI);
    }
    context.restore();
    //?????????
    series = getGaugeDataPoints(series, categories, gaugeOption, process);
    for (var _i26 = 0; _i26 < series.length; _i26++) {
      var eachSeries = series[_i26];
      context.save();
      context.translate(centerPosition.x, centerPosition.y);
      context.rotate((eachSeries._proportion_ - 1) * Math.PI);
      context.beginPath();
      context.setFillStyle(eachSeries.color);
      context.moveTo(gaugeOption.pointer.width, 0);
      context.lineTo(0, -gaugeOption.pointer.width / 2);
      context.lineTo(-innerRadius, 0);
      context.lineTo(0, gaugeOption.pointer.width / 2);
      context.lineTo(gaugeOption.pointer.width, 0);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFillStyle('#FFFFFF');
      context.arc(0, 0, gaugeOption.pointer.width / 6, 0, 2 * Math.PI, false);
      context.fill();
      context.restore();
    }
    if (opts.dataLabel !== false) {
      drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context);
    }
  }
  //??????????????????????????????
  drawRingTitle(opts, config, context, centerPosition);
  if (process === 1 && opts.type === 'gauge') {
    opts.extra.gauge.oldAngle = series[0]._proportion_;
    opts.extra.gauge.oldData = series[0].data;
  }
  return {
    center: centerPosition,
    radius: radius,
    innerRadius: innerRadius,
    categories: categories,
    totalAngle: totalAngle };

}

function drawRadarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var radarOption = assign({}, {
    gridColor: '#cccccc',
    gridType: 'radar',
    opacity: 0.2,
    gridCount: 3,
    border: false,
    borderWidth: 2 },
  opts.extra.radar);
  var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  var xr = (opts.width - opts.area[1] - opts.area[3]) / 2;
  var yr = (opts.height - opts.area[0] - opts.area[2]) / 2;
  var radius = Math.min(xr - (getMaxTextListLength(opts.categories, config.fontSize, context) + config.radarLabelTextMargin), yr - config.radarLabelTextMargin);
  radius -= config.radarLabelTextMargin * opts.pix;
  // ????????????
  context.beginPath();
  context.setLineWidth(1 * opts.pix);
  context.setStrokeStyle(radarOption.gridColor);
  coordinateAngle.forEach(function (angle) {
    var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.lineTo(pos.x, pos.y);
  });
  context.stroke();
  context.closePath();

  // ???????????????
  var _loop = function _loop(i) {
    var startPos = {};
    context.beginPath();
    context.setLineWidth(1 * opts.pix);
    context.setStrokeStyle(radarOption.gridColor);
    if (radarOption.gridType == 'radar') {
      coordinateAngle.forEach(function (angle, index) {
        var pos = convertCoordinateOrigin(radius / radarOption.gridCount * i * Math.cos(angle), radius /
        radarOption.gridCount * i * Math.sin(angle), centerPosition);
        if (index === 0) {
          startPos = pos;
          context.moveTo(pos.x, pos.y);
        } else {
          context.lineTo(pos.x, pos.y);
        }
      });
      context.lineTo(startPos.x, startPos.y);
    } else {
      var pos = convertCoordinateOrigin(radius / radarOption.gridCount * i * Math.cos(1.5), radius / radarOption.gridCount * i * Math.sin(1.5), centerPosition);
      context.arc(centerPosition.x, centerPosition.y, centerPosition.y - pos.y, 0, 2 * Math.PI, false);
    }
    context.stroke();
    context.closePath();
  };
  for (var i = 1; i <= radarOption.gridCount; i++) {
    _loop(i);
  }
  var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);
  radarDataPoints.forEach(function (eachSeries, seriesIndex) {
    // ??????????????????
    context.beginPath();
    context.setLineWidth(radarOption.borderWidth * opts.pix);
    context.setStrokeStyle(eachSeries.color);
    context.setFillStyle(hexToRgb(eachSeries.color, radarOption.opacity));
    eachSeries.data.forEach(function (item, index) {
      if (index === 0) {
        context.moveTo(item.position.x, item.position.y);
      } else {
        context.lineTo(item.position.x, item.position.y);
      }
    });
    context.closePath();
    context.fill();
    if (radarOption.border === true) {
      context.stroke();
    }
    context.closePath();
    if (opts.dataPointShape !== false) {
      var points = eachSeries.data.map(function (item) {
        return item.position;
      });
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  // draw label text
  drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);
  return {
    center: centerPosition,
    radius: radius,
    angleList: coordinateAngle };

}

function normalInt(min, max, iter) {
  iter = iter == 0 ? 1 : iter;
  var arr = [];
  for (var i = 0; i < iter; i++) {
    arr[i] = Math.random();
  };
  return Math.floor(arr.reduce(function (i, j) {
    return i + j;
  }) / iter * (max - min)) + min;
};

function collisionNew(area, points, width, height) {
  var isIn = false;
  for (var i = 0; i < points.length; i++) {
    if (points[i].area) {
      if (area[3] < points[i].area[1] || area[0] > points[i].area[2] || area[1] > points[i].area[3] || area[2] < points[i].area[0]) {
        if (area[0] < 0 || area[1] < 0 || area[2] > width || area[3] > height) {
          isIn = true;
          break;
        } else {
          isIn = false;
        }
      } else {
        isIn = true;
        break;
      }
    }
  }
  return isIn;
};

function getBoundingBox(data) {
  var bounds = {},coords;
  bounds.xMin = 180;
  bounds.xMax = 0;
  bounds.yMin = 90;
  bounds.yMax = 0;
  for (var i = 0; i < data.length; i++) {
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        var longitude = coords[j][0];
        var latitude = coords[j][1];
        var point = {
          x: longitude,
          y: latitude };

        bounds.xMin = bounds.xMin < point.x ? bounds.xMin : point.x;
        bounds.xMax = bounds.xMax > point.x ? bounds.xMax : point.x;
        bounds.yMin = bounds.yMin < point.y ? bounds.yMin : point.y;
        bounds.yMax = bounds.yMax > point.y ? bounds.yMax : point.y;
      }
    }
  }
  return bounds;
}

function coordinateToPoint(latitude, longitude, bounds, scale, xoffset, yoffset) {
  return {
    x: (longitude - bounds.xMin) * scale + xoffset,
    y: (bounds.yMax - latitude) * scale + yoffset };

}

function pointToCoordinate(pointY, pointX, bounds, scale, xoffset, yoffset) {
  return {
    x: (pointX - xoffset) / scale + bounds.xMin,
    y: bounds.yMax - (pointY - yoffset) / scale };

}

function isRayIntersectsSegment(poi, s_poi, e_poi) {
  if (s_poi[1] == e_poi[1]) {
    return false;
  }
  if (s_poi[1] > poi[1] && e_poi[1] > poi[1]) {
    return false;
  }
  if (s_poi[1] < poi[1] && e_poi[1] < poi[1]) {
    return false;
  }
  if (s_poi[1] == poi[1] && e_poi[1] > poi[1]) {
    return false;
  }
  if (e_poi[1] == poi[1] && s_poi[1] > poi[1]) {
    return false;
  }
  if (s_poi[0] < poi[0] && e_poi[1] < poi[1]) {
    return false;
  }
  var xseg = e_poi[0] - (e_poi[0] - s_poi[0]) * (e_poi[1] - poi[1]) / (e_poi[1] - s_poi[1]);
  if (xseg < poi[0]) {
    return false;
  } else {
    return true;
  }
}

function isPoiWithinPoly(poi, poly, mercator) {
  var sinsc = 0;
  for (var i = 0; i < poly.length; i++) {
    var epoly = poly[i][0];
    if (poly.length == 1) {
      epoly = poly[i][0];
    }
    for (var j = 0; j < epoly.length - 1; j++) {
      var s_poi = epoly[j];
      var e_poi = epoly[j + 1];
      if (mercator) {
        s_poi = lonlat2mercator(epoly[j][0], epoly[j][1]);
        e_poi = lonlat2mercator(epoly[j + 1][0], epoly[j + 1][1]);
      }
      if (isRayIntersectsSegment(poi, s_poi, e_poi)) {
        sinsc += 1;
      }
    }
  }
  if (sinsc % 2 == 1) {
    return true;
  } else {
    return false;
  }
}


function drawMapDataPoints(series, opts, config, context) {
  var mapOption = assign({}, {
    border: true,
    mercator: false,
    borderWidth: 1,
    borderColor: '#666666',
    fillOpacity: 0.6,
    activeBorderColor: '#f04864',
    activeFillColor: '#facc14',
    activeFillOpacity: 1 },
  opts.extra.map);
  var coords, point;
  var data = series;
  var bounds = getBoundingBox(data);
  if (mapOption.mercator) {
    var max = lonlat2mercator(bounds.xMax, bounds.yMax);
    var min = lonlat2mercator(bounds.xMin, bounds.yMin);
    bounds.xMax = max[0];
    bounds.yMax = max[1];
    bounds.xMin = min[0];
    bounds.yMin = min[1];
  }
  var xScale = opts.width / Math.abs(bounds.xMax - bounds.xMin);
  var yScale = opts.height / Math.abs(bounds.yMax - bounds.yMin);
  var scale = xScale < yScale ? xScale : yScale;
  var xoffset = opts.width / 2 - Math.abs(bounds.xMax - bounds.xMin) / 2 * scale;
  var yoffset = opts.height / 2 - Math.abs(bounds.yMax - bounds.yMin) / 2 * scale;
  for (var i = 0; i < data.length; i++) {
    context.beginPath();
    context.setLineWidth(mapOption.borderWidth * opts.pix);
    context.setStrokeStyle(mapOption.borderColor);
    context.setFillStyle(hexToRgb(series[i].color, mapOption.fillOpacity));
    if (opts.tooltip) {
      if (opts.tooltip.index == i) {
        context.setStrokeStyle(mapOption.activeBorderColor);
        context.setFillStyle(hexToRgb(mapOption.activeFillColor, mapOption.activeFillOpacity));
      }
    }
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        var gaosi = Array(2);
        if (mapOption.mercator) {
          gaosi = lonlat2mercator(coords[j][0], coords[j][1]);
        } else {
          gaosi = coords[j];
        }
        point = coordinateToPoint(gaosi[1], gaosi[0], bounds, scale, xoffset, yoffset);
        if (j === 0) {
          context.beginPath();
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      }
      context.fill();
      if (mapOption.border == true) {
        context.stroke();
      }
    }
    if (opts.dataLabel == true) {
      var centerPoint = data[i].properties.centroid;
      if (centerPoint) {
        if (mapOption.mercator) {
          centerPoint = lonlat2mercator(data[i].properties.centroid[0], data[i].properties.centroid[1]);
        }
        point = coordinateToPoint(centerPoint[1], centerPoint[0], bounds, scale, xoffset, yoffset);
        var fontSize = data[i].textSize * opts.pix || config.fontSize;
        var text = data[i].properties.name;
        context.beginPath();
        context.setFontSize(fontSize);
        context.setFillStyle(data[i].textColor || opts.fontColor);
        context.fillText(text, point.x - measureText(text, fontSize, context) / 2, point.y + fontSize / 2);
        context.closePath();
        context.stroke();
      }
    }
  }
  opts.chartData.mapData = {
    bounds: bounds,
    scale: scale,
    xoffset: xoffset,
    yoffset: yoffset,
    mercator: mapOption.mercator };

  drawToolTipBridge(opts, config, context, 1);
  context.draw();
}

function getWordCloudPoint(opts, type, context) {
  var points = opts.series;
  switch (type) {
    case 'normal':
      for (var i = 0; i < points.length; i++) {
        var text = points[i].name;
        var tHeight = points[i].textSize * opts.pix;
        var tWidth = measureText(text, tHeight, context);
        var x = void 0,y = void 0;
        var area = void 0;
        var breaknum = 0;
        while (true) {
          breaknum++;
          x = normalInt(-opts.width / 2, opts.width / 2, 5) - tWidth / 2;
          y = normalInt(-opts.height / 2, opts.height / 2, 5) + tHeight / 2;
          area = [x - 5 + opts.width / 2, y - 5 - tHeight + opts.height / 2, x + tWidth + 5 + opts.width / 2, y + 5 +
          opts.height / 2];

          var isCollision = collisionNew(area, points, opts.width, opts.height);
          if (!isCollision) break;
          if (breaknum == 1000) {
            area = [-100, -100, -100, -100];
            break;
          }
        };
        points[i].area = area;
      }
      break;
    case 'vertical':var
      Spin = function Spin() {
        //????????????????????????????????????????????????????????????1-0.5???
        if (Math.random() > 0.7) {
          return true;
        } else {
          return false;
        };
      };;
      for (var _i27 = 0; _i27 < points.length; _i27++) {
        var _text = points[_i27].name;
        var _tHeight = points[_i27].textSize * opts.pix;
        var _tWidth = measureText(_text, _tHeight, context);
        var isSpin = Spin();
        var _x = void 0,_y = void 0,_area = void 0,areav = void 0;
        var _breaknum = 0;
        while (true) {
          _breaknum++;
          var _isCollision = void 0;
          if (isSpin) {
            _x = normalInt(-opts.width / 2, opts.width / 2, 5) - _tWidth / 2;
            _y = normalInt(-opts.height / 2, opts.height / 2, 5) + _tHeight / 2;
            _area = [_y - 5 - _tWidth + opts.width / 2, -_x - 5 + opts.height / 2, _y + 5 + opts.width / 2, -_x + _tHeight + 5 + opts.height / 2];
            areav = [opts.width - (opts.width / 2 - opts.height / 2) - (-_x + _tHeight + 5 + opts.height / 2) - 5, opts.height / 2 - opts.width / 2 + (_y - 5 - _tWidth + opts.width / 2) - 5, opts.width - (opts.width / 2 - opts.height / 2) - (-_x + _tHeight + 5 + opts.height / 2) + _tHeight, opts.height / 2 - opts.width / 2 + (_y - 5 - _tWidth + opts.width / 2) + _tWidth + 5];
            _isCollision = collisionNew(areav, points, opts.height, opts.width);
          } else {
            _x = normalInt(-opts.width / 2, opts.width / 2, 5) - _tWidth / 2;
            _y = normalInt(-opts.height / 2, opts.height / 2, 5) + _tHeight / 2;
            _area = [_x - 5 + opts.width / 2, _y - 5 - _tHeight + opts.height / 2, _x + _tWidth + 5 + opts.width / 2, _y + 5 + opts.height / 2];
            _isCollision = collisionNew(_area, points, opts.width, opts.height);
          }
          if (!_isCollision) break;
          if (_breaknum == 1000) {
            _area = [-1000, -1000, -1000, -1000];
            break;
          }
        };
        if (isSpin) {
          points[_i27].area = areav;
          points[_i27].areav = _area;
        } else {
          points[_i27].area = _area;
        }
        points[_i27].rotate = isSpin;
      };
      break;}

  return points;
}


function drawWordCloudDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var wordOption = assign({}, {
    type: 'normal',
    autoColors: true },
  opts.extra.word);
  if (!opts.chartData.wordCloudData) {
    opts.chartData.wordCloudData = getWordCloudPoint(opts, wordOption.type, context);
  }
  context.beginPath();
  context.setFillStyle(opts.background);
  context.rect(0, 0, opts.width, opts.height);
  context.fill();
  context.save();
  var points = opts.chartData.wordCloudData;
  context.translate(opts.width / 2, opts.height / 2);
  for (var i = 0; i < points.length; i++) {
    context.save();
    if (points[i].rotate) {
      context.rotate(90 * Math.PI / 180);
    }
    var text = points[i].name;
    var tHeight = points[i].textSize * opts.pix;
    var tWidth = measureText(text, tHeight, context);
    context.beginPath();
    context.setStrokeStyle(points[i].color);
    context.setFillStyle(points[i].color);
    context.setFontSize(tHeight);
    if (points[i].rotate) {
      if (points[i].areav[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
        }
      }
    } else {
      if (points[i].area[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
        }
      }
    }
    context.stroke();
    context.restore();
  }
  context.restore();
}

function drawFunnelDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var funnelOption = assign({}, {
    type: 'funnel',
    activeWidth: 10,
    activeOpacity: 0.3,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    fillOpacity: 1,
    labelAlign: 'right',
    linearType: 'none',
    customColor: [] },
  opts.extra.funnel);
  var eachSpacing = (opts.height - opts.area[0] - opts.area[2]) / series.length;
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.height - opts.area[2] };

  var activeWidth = funnelOption.activeWidth * opts.pix;
  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - activeWidth, (opts.height - opts.area[0] - opts.area[2]) / 2 - activeWidth);
  series = getFunnelDataPoints(series, radius, funnelOption.type, eachSpacing, process);
  context.save();
  context.translate(centerPosition.x, centerPosition.y);
  funnelOption.customColor = fillCustomColor(funnelOption.linearType, funnelOption.customColor, series, config);
  if (funnelOption.type == 'pyramid') {
    for (var i = 0; i < series.length; i++) {
      if (i == series.length - 1) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.beginPath();
            context.setFillStyle(hexToRgb(series[i].color, funnelOption.activeOpacity));
            context.moveTo(-activeWidth, -eachSpacing);
            context.lineTo(-series[i].radius - activeWidth, 0);
            context.lineTo(series[i].radius + activeWidth, 0);
            context.lineTo(activeWidth, -eachSpacing);
            context.lineTo(-activeWidth, -eachSpacing);
            context.closePath();
            context.fill();
          }
        }
        series[i].funnelArea = [centerPosition.x - series[i].radius, centerPosition.y - eachSpacing * (i + 1), centerPosition.x + series[i].radius, centerPosition.y - eachSpacing * i];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(series[i].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == 'custom') {
          var grd = context.createLinearGradient(series[i].radius, -eachSpacing, -series[i].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(series[i].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[series[i].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(series[i].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, -eachSpacing);
        context.lineTo(-series[i].radius, 0);
        context.lineTo(series[i].radius, 0);
        context.lineTo(0, -eachSpacing);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      } else {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.beginPath();
            context.setFillStyle(hexToRgb(series[i].color, funnelOption.activeOpacity));
            context.moveTo(0, 0);
            context.lineTo(-series[i].radius - activeWidth, 0);
            context.lineTo(-series[i + 1].radius - activeWidth, -eachSpacing);
            context.lineTo(series[i + 1].radius + activeWidth, -eachSpacing);
            context.lineTo(series[i].radius + activeWidth, 0);
            context.lineTo(0, 0);
            context.closePath();
            context.fill();
          }
        }
        series[i].funnelArea = [centerPosition.x - series[i].radius, centerPosition.y - eachSpacing * (i + 1), centerPosition.x + series[i].radius, centerPosition.y - eachSpacing * i];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(series[i].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == 'custom') {
          var grd = context.createLinearGradient(series[i].radius, -eachSpacing, -series[i].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(series[i].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[series[i].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(series[i].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-series[i].radius, 0);
        context.lineTo(-series[i + 1].radius, -eachSpacing);
        context.lineTo(series[i + 1].radius, -eachSpacing);
        context.lineTo(series[i].radius, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      }
      context.translate(0, -eachSpacing);
    }
  } else {
    for (var _i28 = 0; _i28 < series.length; _i28++) {
      if (_i28 == 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == _i28) {
            context.beginPath();
            context.setFillStyle(hexToRgb(series[_i28].color, funnelOption.activeOpacity));
            context.moveTo(-activeWidth, 0);
            context.lineTo(-series[_i28].radius - activeWidth, -eachSpacing);
            context.lineTo(series[_i28].radius + activeWidth, -eachSpacing);
            context.lineTo(activeWidth, 0);
            context.lineTo(-activeWidth, 0);
            context.closePath();
            context.fill();
          }
        }
        series[_i28].funnelArea = [centerPosition.x - series[_i28].radius, centerPosition.y - eachSpacing, centerPosition.x + series[_i28].radius, centerPosition.y];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(series[_i28].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == 'custom') {
          var grd = context.createLinearGradient(series[_i28].radius, -eachSpacing, -series[_i28].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(series[_i28].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[series[_i28].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(series[_i28].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-series[_i28].radius, -eachSpacing);
        context.lineTo(series[_i28].radius, -eachSpacing);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      } else {
        if (opts.tooltip) {
          if (opts.tooltip.index == _i28) {
            context.beginPath();
            context.setFillStyle(hexToRgb(series[_i28].color, funnelOption.activeOpacity));
            context.moveTo(0, 0);
            context.lineTo(-series[_i28 - 1].radius - activeWidth, 0);
            context.lineTo(-series[_i28].radius - activeWidth, -eachSpacing);
            context.lineTo(series[_i28].radius + activeWidth, -eachSpacing);
            context.lineTo(series[_i28 - 1].radius + activeWidth, 0);
            context.lineTo(0, 0);
            context.closePath();
            context.fill();
          }
        }
        series[_i28].funnelArea = [centerPosition.x - series[_i28].radius, centerPosition.y - eachSpacing * (_i28 + 1), centerPosition.x + series[_i28].radius, centerPosition.y - eachSpacing * _i28];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(series[_i28].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == 'custom') {
          var grd = context.createLinearGradient(series[_i28].radius, -eachSpacing, -series[_i28].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(series[_i28].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[series[_i28].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(series[_i28].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-series[_i28 - 1].radius, 0);
        context.lineTo(-series[_i28].radius, -eachSpacing);
        context.lineTo(series[_i28].radius, -eachSpacing);
        context.lineTo(series[_i28 - 1].radius, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      }
      context.translate(0, -eachSpacing);
    }
  }

  context.restore();
  if (opts.dataLabel !== false && process === 1) {
    drawFunnelText(series, opts, context, eachSpacing, funnelOption.labelAlign, activeWidth, centerPosition);
  }
  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawFunnelText(series, opts, context, eachSpacing, labelAlign, activeWidth, centerPosition) {
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var startX = void 0,endX = void 0,startY = void 0,fontSize = void 0;
    var text = item.formatter ? item.formatter(item, i, series) : util.toFixed(item._proportion_ * 100) + '%';
    if (labelAlign == 'right') {
      if (opts.extra.funnel.type === 'pyramid') {
        if (i == series.length - 1) {
          startX = (item.funnelArea[2] + centerPosition.x) / 2;
        } else {
          startX = (item.funnelArea[2] + series[i + 1].funnelArea[2]) / 2;
        }
      } else {
        if (i == 0) {
          startX = (item.funnelArea[2] + centerPosition.x) / 2;
        } else {
          startX = (item.funnelArea[2] + series[i - 1].funnelArea[2]) / 2;
        }
      }
      endX = startX + activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize * opts.pix || opts.fontSize * opts.pix;
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || opts.fontColor);
      context.fillText(text, endX + 5, startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    } else {
      if (opts.extra.funnel.type === 'pyramid') {
        if (i == series.length - 1) {
          startX = (item.funnelArea[0] + centerPosition.x) / 2;
        } else {
          startX = (item.funnelArea[0] + series[i + 1].funnelArea[0]) / 2;
        }
      } else {
        if (i == 0) {
          startX = (item.funnelArea[0] + centerPosition.x) / 2;
        } else {
          startX = (item.funnelArea[0] + series[i - 1].funnelArea[0]) / 2;
        }
      }
      endX = startX - activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize * opts.pix || opts.fontSize * opts.pix;
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || opts.fontColor);
      context.fillText(text, endX - 5 - measureText(text, fontSize, context), startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }

  }
}

function drawCanvas(opts, context) {
  context.draw();
}

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },
  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },
  linear: function linear(pos) {
    return pos;
  } };


function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
  opts.timing = opts.timing || 'easeInOut';
  var delay = 17;
  function createAnimationFrame() {
    if (typeof setTimeout !== 'undefined') {
      return function (step, delay) {
        setTimeout(function () {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay);
      };
    } else if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame;
    } else {
      return function (step) {
        step(null);
      };
    }
  };
  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;
  var _step = function step(timestamp) {
    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }
    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }
    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);
      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };
  _step = _step.bind(this);
  animationFrame(_step, delay);
}

Animation.prototype.stop = function () {
  this.isStop = true;
};

function drawCharts(type, opts, config, context) {
  var _this = this;
  var series = opts.series;
  //??????ECharts?????????????????????
  if (type === 'pie' || type === 'ring' || type === 'rose' || type === 'funnel') {
    series = fixPieSeries(series, opts, config);
  }
  var categories = opts.categories;
  series = fillSeries(series, opts, config);
  var duration = opts.animation ? opts.duration : 0;
  _this.animationInstance && _this.animationInstance.stop();
  var seriesMA = null;
  if (type == 'candle') {
    var average = assign({}, opts.extra.candle.average);
    if (average.show) {
      seriesMA = calCandleMA(average.day, average.name, average.color, series[0].data);
      seriesMA = fillSeries(seriesMA, opts, config);
      opts.seriesMA = seriesMA;
    } else if (opts.seriesMA) {
      seriesMA = opts.seriesMA = fillSeries(opts.seriesMA, opts, config);
    } else {
      seriesMA = series;
    }
  } else {
    seriesMA = series;
  }
  /* ?????????show=false???series */
  opts._series_ = series = filterSeries(series);
  //????????????????????????
  opts.area = new Array(4);
  //??????????????????
  for (var j = 0; j < 4; j++) {
    opts.area[j] = opts.padding[j] * opts.pix;
  }
  //????????????????????????????????????X??????Y?????????????????????????????????
  var _calLegendData = calLegendData(seriesMA, opts, config, opts.chartData, context),
  legendHeight = _calLegendData.area.wholeHeight,
  legendWidth = _calLegendData.area.wholeWidth;

  switch (opts.legend.position) {
    case 'top':
      opts.area[0] += legendHeight;
      break;
    case 'bottom':
      opts.area[2] += legendHeight;
      break;
    case 'left':
      opts.area[3] += legendWidth;
      break;
    case 'right':
      opts.area[1] += legendWidth;
      break;}


  var _calYAxisData = {},
  yAxisWidth = 0;
  if (opts.type === 'line' || opts.type === 'column' || opts.type === 'area' || opts.type === 'mix' || opts.type === 'candle' || opts.type === 'scatter' || opts.type === 'bubble' || opts.type === 'bar') {
    _calYAxisData = calYAxisData(series, opts, config, context);
    yAxisWidth = _calYAxisData.yAxisWidth;
    //????????????Y?????????
    if (opts.yAxis.showTitle) {
      var maxTitleHeight = 0;
      for (var i = 0; i < opts.yAxis.data.length; i++) {
        maxTitleHeight = Math.max(maxTitleHeight, opts.yAxis.data[i].titleFontSize ? opts.yAxis.data[i].titleFontSize * opts.pix : config.fontSize);
      }
      opts.area[0] += maxTitleHeight;
    }
    var rightIndex = 0,
    leftIndex = 0;
    //?????????????????????????????????
    for (var _i29 = 0; _i29 < yAxisWidth.length; _i29++) {
      if (yAxisWidth[_i29].position == 'left') {
        if (leftIndex > 0) {
          opts.area[3] += yAxisWidth[_i29].width + opts.yAxis.padding * opts.pix;
        } else {
          opts.area[3] += yAxisWidth[_i29].width;
        }
        leftIndex += 1;
      } else if (yAxisWidth[_i29].position == 'right') {
        if (rightIndex > 0) {
          opts.area[1] += yAxisWidth[_i29].width + opts.yAxis.padding * opts.pix;
        } else {
          opts.area[1] += yAxisWidth[_i29].width;
        }
        rightIndex += 1;
      }
    }
  } else {
    config.yAxisWidth = yAxisWidth;
  }
  opts.chartData.yAxisData = _calYAxisData;

  if (opts.categories && opts.categories.length && opts.type !== 'radar' && opts.type !== 'gauge' && opts.type !== 'bar') {
    opts.chartData.xAxisData = getXAxisPoints(opts.categories, opts, config);
    var _calCategoriesData = calCategoriesData(opts.categories, opts, config, opts.chartData.xAxisData.eachSpacing, context),
    xAxisHeight = _calCategoriesData.xAxisHeight,
    angle = _calCategoriesData.angle;
    config.xAxisHeight = xAxisHeight;
    config._xAxisTextAngle_ = angle;
    opts.area[2] += xAxisHeight;
    opts.chartData.categoriesData = _calCategoriesData;
  } else {
    if (opts.type === 'line' || opts.type === 'area' || opts.type === 'scatter' || opts.type === 'bubble' || opts.type === 'bar') {
      opts.chartData.xAxisData = calXAxisData(series, opts, config, context);
      categories = opts.chartData.xAxisData.rangesFormat;
      var _calCategoriesData2 = calCategoriesData(categories, opts, config, opts.chartData.xAxisData.eachSpacing, context),
      _xAxisHeight = _calCategoriesData2.xAxisHeight,
      _angle = _calCategoriesData2.angle;
      config.xAxisHeight = _xAxisHeight;
      config._xAxisTextAngle_ = _angle;
      opts.area[2] += _xAxisHeight;
      opts.chartData.categoriesData = _calCategoriesData2;
    } else {
      opts.chartData.xAxisData = {
        xAxisPoints: [] };

    }
  }
  //???????????????????????????
  if (opts.enableScroll && opts.xAxis.scrollAlign == 'right' && opts._scrollDistance_ === undefined) {
    var offsetLeft = 0,
    xAxisPoints = opts.chartData.xAxisData.xAxisPoints,
    startX = opts.chartData.xAxisData.startX,
    endX = opts.chartData.xAxisData.endX,
    eachSpacing = opts.chartData.xAxisData.eachSpacing;
    var totalWidth = eachSpacing * (xAxisPoints.length - 1);
    var screenWidth = endX - startX;
    offsetLeft = screenWidth - totalWidth;
    _this.scrollOption = {
      currentOffset: offsetLeft,
      startTouchX: offsetLeft,
      distance: 0,
      lastMoveTime: 0 };

    opts._scrollDistance_ = offsetLeft;
  }

  if (type === 'pie' || type === 'ring' || type === 'rose') {
    config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(seriesMA, config, context, opts);
  }
  switch (type) {
    case 'word':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawWordCloudDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'map':
      context.clearRect(0, 0, opts.width, opts.height);
      drawMapDataPoints(series, opts, config, context);
      break;
    case 'funnel':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.funnelData = drawFunnelDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'line':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawLineDataPoints.xAxisPoints,
          calPoints = _drawLineDataPoints.calPoints,
          eachSpacing = _drawLineDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'scatter':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawScatterDataPoints = drawScatterDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawScatterDataPoints.xAxisPoints,
          calPoints = _drawScatterDataPoints.calPoints,
          eachSpacing = _drawScatterDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'bubble':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawBubbleDataPoints = drawBubbleDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawBubbleDataPoints.xAxisPoints,
          calPoints = _drawBubbleDataPoints.calPoints,
          eachSpacing = _drawBubbleDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'mix':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawMixDataPoints = drawMixDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawMixDataPoints.xAxisPoints,
          calPoints = _drawMixDataPoints.calPoints,
          eachSpacing = _drawMixDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'column':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawColumnDataPoints.xAxisPoints,
          calPoints = _drawColumnDataPoints.calPoints,
          eachSpacing = _drawColumnDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'bar':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawXAxis(categories, opts, config, context);
          var _drawBarDataPoints = drawBarDataPoints(series, opts, config, context, process),
          yAxisPoints = _drawBarDataPoints.yAxisPoints,
          calPoints = _drawBarDataPoints.calPoints,
          eachSpacing = _drawBarDataPoints.eachSpacing;
          opts.chartData.yAxisPoints = yAxisPoints;
          opts.chartData.xAxisPoints = opts.chartData.xAxisData.xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, yAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'area':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawAreaDataPoints.xAxisPoints,
          calPoints = _drawAreaDataPoints.calPoints,
          eachSpacing = _drawAreaDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'ring':
    case 'pie':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'rose':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawRoseDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'radar':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'arcbar':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.arcbarData = drawArcbarDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'gauge':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.gaugeData = drawGaugeDataPoints(categories, series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;
    case 'candle':
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawCandleDataPoints = drawCandleDataPoints(series, seriesMA, opts, config, context, process),
          xAxisPoints = _drawCandleDataPoints.xAxisPoints,
          calPoints = _drawCandleDataPoints.calPoints,
          eachSpacing = _drawCandleDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          if (seriesMA) {
            drawLegend(seriesMA, opts, config, context, opts.chartData);
          } else {
            drawLegend(opts.series, opts, config, context, opts.chartData);
          }
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger('renderComplete');
        } });

      break;}

}

function uChartsEvent() {
  this.events = {};
}

uChartsEvent.prototype.addEventListener = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

uChartsEvent.prototype.delEventListener = function (type) {
  this.events[type] = [];
};

uChartsEvent.prototype.trigger = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args[0];
  var params = args.slice(1);
  if (!!this.events[type]) {
    this.events[type].forEach(function (listener) {
      try {
        listener.apply(null, params);
      } catch (e) {
        //console.log('[uCharts] '+e);
      }
    });
  }
};

var uCharts = function uCharts(opts) {
  opts.pix = opts.pixelRatio ? opts.pixelRatio : 1;
  opts.fontSize = opts.fontSize ? opts.fontSize : 13;
  opts.fontColor = opts.fontColor ? opts.fontColor : config.fontColor;
  if (opts.background == "" || opts.background == "none") {
    opts.background = "#FFFFFF";
  }
  opts.title = assign({}, opts.title);
  opts.subtitle = assign({}, opts.subtitle);
  opts.duration = opts.duration ? opts.duration : 1000;
  opts.yAxis = assign({}, {
    data: [],
    showTitle: false,
    disabled: false,
    disableGrid: false,
    splitNumber: 5,
    gridType: 'solid',
    dashLength: 4 * opts.pix,
    gridColor: '#cccccc',
    padding: 10,
    fontColor: '#666666' },
  opts.yAxis);
  opts.xAxis = assign({}, {
    rotateLabel: false,
    disabled: false,
    disableGrid: false,
    splitNumber: 5,
    calibration: false,
    gridType: 'solid',
    dashLength: 4,
    scrollAlign: 'left',
    boundaryGap: 'center',
    axisLine: true,
    axisLineColor: '#cccccc' },
  opts.xAxis);
  opts.xAxis.scrollPosition = opts.xAxis.scrollAlign;
  opts.legend = assign({}, {
    show: true,
    position: 'bottom',
    float: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    padding: 5,
    margin: 5,
    itemGap: 10,
    fontSize: opts.fontSize,
    lineHeight: opts.fontSize,
    fontColor: opts.fontColor,
    formatter: {},
    hiddenColor: '#CECECE' },
  opts.legend);
  opts.extra = assign({}, opts.extra);
  opts.rotate = opts.rotate ? true : false;
  opts.animation = opts.animation ? true : false;
  opts.rotate = opts.rotate ? true : false;
  opts.canvas2d = opts.canvas2d ? true : false;

  var config$$1 = JSON.parse(JSON.stringify(config));
  config$$1.color = opts.color ? opts.color : config$$1.color;
  config$$1.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config$$1.yAxisTitleWidth : 0;
  if (opts.type == 'pie') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.pie.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  if (opts.type == 'ring') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.ring.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  if (opts.type == 'rose') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.rose.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding * opts.pix;
  config$$1.yAxisSplit = opts.yAxis.splitNumber ? opts.yAxis.splitNumber : config.yAxisSplit;

  //????????????
  config$$1.rotate = opts.rotate;
  if (opts.rotate) {
    var tempWidth = opts.width;
    var tempHeight = opts.height;
    opts.width = tempHeight;
    opts.height = tempWidth;
  }

  //???????????????
  opts.padding = opts.padding ? opts.padding : config$$1.padding;
  config$$1.yAxisWidth = config.yAxisWidth * opts.pix;
  config$$1.xAxisHeight = config.xAxisHeight * opts.pix;
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    config$$1.xAxisHeight += 6 * opts.pix;
  }
  config$$1.xAxisLineHeight = config.xAxisLineHeight * opts.pix;
  config$$1.fontSize = opts.fontSize * opts.pix;
  config$$1.titleFontSize = config.titleFontSize * opts.pix;
  config$$1.subtitleFontSize = config.subtitleFontSize * opts.pix;
  config$$1.toolTipPadding = config.toolTipPadding * opts.pix;
  config$$1.toolTipLineHeight = config.toolTipLineHeight * opts.pix;
  config$$1.columePadding = config.columePadding * opts.pix;
  //this.context = opts.context ? opts.context : uni.createCanvasContext(opts.canvasId, opts.$this);
  //v2.0???????????????????????????context?????????opts??????????????????????????????????????????uCharts??????????????????????????????????????????????????????this??????????????????????????????????????????????????????????????????????????????v1.0??????????????????????????????????????????????????????????????????
  if (!opts.context) {
    throw new Error('[uCharts] ????????????context????????????v2.0??????????????????????????????canvas???????????????????????????opts.context???');
  }
  this.context = opts.context;
  if (!this.context.setTextAlign) {
    this.context.setStrokeStyle = function (e) {
      return this.strokeStyle = e;
    };
    this.context.setLineWidth = function (e) {
      return this.lineWidth = e;
    };
    this.context.setLineCap = function (e) {
      return this.lineCap = e;
    };
    this.context.setFontSize = function (e) {
      return this.font = e + "px sans-serif";
    };
    this.context.setFillStyle = function (e) {
      return this.fillStyle = e;
    };
    this.context.setTextAlign = function (e) {
      return this.textAlign = e;
    };
    this.context.draw = function () {};
  }
  opts.chartData = {};
  this.uevent = new uChartsEvent();
  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0,
    lastMoveTime: 0 };

  this.opts = opts;
  this.config = config$$1;
  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};

uCharts.prototype.updateData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.opts = assign({}, this.opts, data);
  this.opts.updateData = true;
  var scrollPosition = data.scrollPosition || 'current';
  switch (scrollPosition) {
    case 'current':
      //this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      break;
    case 'left':
      this.opts._scrollDistance_ = 0;
      this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0,
        lastMoveTime: 0 };

      break;
    case 'right':
      var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config, this.context),yAxisWidth = _calYAxisData.yAxisWidth;
      this.config.yAxisWidth = yAxisWidth;
      var offsetLeft = 0;
      var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),xAxisPoints = _getXAxisPoints0.xAxisPoints,
      startX = _getXAxisPoints0.startX,
      endX = _getXAxisPoints0.endX,
      eachSpacing = _getXAxisPoints0.eachSpacing;
      var totalWidth = eachSpacing * (xAxisPoints.length - 1);
      var screenWidth = endX - startX;
      offsetLeft = screenWidth - totalWidth;
      this.scrollOption = {
        currentOffset: offsetLeft,
        startTouchX: offsetLeft,
        distance: 0,
        lastMoveTime: 0 };

      this.opts._scrollDistance_ = offsetLeft;
      break;}

  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

uCharts.prototype.zoom = function () {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.opts.xAxis.itemCount;
  if (this.opts.enableScroll !== true) {
    console.log('[uCharts] ???????????????????????????');
    return;
  }
  //?????????????????????
  var centerPoint = Math.round(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + Math.round(this.opts.xAxis.itemCount / 2);
  this.opts.animation = false;
  this.opts.xAxis.itemCount = val.itemCount;
  //????????????x???????????????
  var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config, this.context),
  yAxisWidth = _calYAxisData.yAxisWidth;
  this.config.yAxisWidth = yAxisWidth;
  var offsetLeft = 0;
  var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
  xAxisPoints = _getXAxisPoints0.xAxisPoints,
  startX = _getXAxisPoints0.startX,
  endX = _getXAxisPoints0.endX,
  eachSpacing = _getXAxisPoints0.eachSpacing;
  var centerLeft = eachSpacing * centerPoint;
  var screenWidth = endX - startX;
  var MaxLeft = screenWidth - eachSpacing * (xAxisPoints.length - 1);
  offsetLeft = screenWidth / 2 - centerLeft;
  if (offsetLeft > 0) {
    offsetLeft = 0;
  }
  if (offsetLeft < MaxLeft) {
    offsetLeft = MaxLeft;
  }
  this.scrollOption = {
    currentOffset: offsetLeft,
    startTouchX: offsetLeft,
    distance: 0,
    lastMoveTime: 0 };

  this.opts._scrollDistance_ = offsetLeft;
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

uCharts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
};

uCharts.prototype.addEventListener = function (type, listener) {
  this.uevent.addEventListener(type, listener);
};

uCharts.prototype.delEventListener = function (type) {
  this.uevent.delEventListener(type);
};

uCharts.prototype.getCurrentDataIndex = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    if (this.opts.type === 'pie' || this.opts.type === 'ring') {
      return findPieChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.pieData, this.opts);
    } else if (this.opts.type === 'rose') {
      return findRoseChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.pieData, this.opts);
    } else if (this.opts.type === 'radar') {
      return findRadarChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.radarData, this.opts.categories.length);
    } else if (this.opts.type === 'funnel') {
      return findFunnelChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.funnelData);
    } else if (this.opts.type === 'map') {
      return findMapChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts);
    } else if (this.opts.type === 'word') {
      return findWordChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.wordCloudData);
    } else if (this.opts.type === 'bar') {
      return findBarChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    } else {
      return findCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
  }
  return -1;
};

uCharts.prototype.getLegendDataIndex = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    return findLegendIndex({
      x: _touches$.x,
      y: _touches$.y },
    this.opts.chartData.legendData);
  }
  return -1;
};

uCharts.prototype.touchLegend = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    var index = this.getLegendDataIndex(e);
    if (index >= 0) {
      if (this.opts.type == 'candle') {
        this.opts.seriesMA[index].show = !this.opts.seriesMA[index].show;
      } else {
        this.opts.series[index].show = !this.opts.series[index].show;
      }
      this.opts.animation = option.animation ? true : false;
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
    }
  }

};

uCharts.prototype.showToolTip = function (e) {var _this2 = this;
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (!touches) {
    console.log("[uCharts] ????????????event????????????");
  }
  var _touches$ = getTouches(touches, this.opts, e);
  var currentOffset = this.scrollOption.currentOffset;
  var opts = assign({}, this.opts, {
    _scrollDistance_: currentOffset,
    animation: false });

  if (this.opts.type === 'line' || this.opts.type === 'area' || this.opts.type === 'column' || this.opts.type === 'scatter' || this.opts.type === 'bubble') {
    var current = this.getCurrentDataIndex(e);
    var index = option.index == undefined ? current.index : option.index;
    if (index > -1 || index.length > 0) {
      var seriesData = getSeriesDataItem(this.opts.series, index, current.group);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.opts, index, current.group, this.opts.categories, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList !== undefined ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'bar') {
    var current = this.getCurrentDataIndex(e);
    var index = option.index == undefined ? current.index : option.index;
    if (index > -1 || index.length > 0) {
      var seriesData = getSeriesDataItem(this.opts.series, index, current.group);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.opts, index, current.group, this.opts.categories, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.x = _touches$.x;
        opts.tooltip = {
          textList: option.textList !== undefined ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'mix') {
    var current = this.getCurrentDataIndex(e);
    var index = option.index == undefined ? current.index : option.index;
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getMixToolTipData = getMixToolTipData(seriesData, this.opts, index, this.opts.categories, option),
        textList = _getMixToolTipData.textList,
        offset = _getMixToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'candle') {
    var current = this.getCurrentDataIndex(e);
    var index = option.index == undefined ? current.index : option.index;
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getCandleToolTipData(this.opts.series[0].data, seriesData, this.opts, index, this.opts.categories, this.opts.extra.candle, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'pie' || this.opts.type === 'ring' || this.opts.type === 'rose' || this.opts.type === 'funnel') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e) : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, opts._series_[index]);
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, undefined, index, opts) : seriesData.name + ': ' + seriesData.data,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== undefined ? option.offset : offset,
        option: option,
        index: index };

    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'map') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e) : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, this.opts.series[index]);
      seriesData.name = seriesData.properties.name;
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, undefined, index, this.opts) : seriesData.name,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== undefined ? option.offset : offset,
        option: option,
        index: index };

    }
    opts.updateData = false;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'word') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e) : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, this.opts.series[index]);
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, undefined, index, this.opts) : seriesData.name,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== undefined ? option.offset : offset,
        option: option,
        index: index };

    }
    opts.updateData = false;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'radar') {
    var index = option.index == undefined ? this.getCurrentDataIndex(e) : option.index;
    if (index > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var textList = seriesData.map(function (item) {
          return {
            text: option.formatter ? option.formatter(item, _this2.opts.categories[index], index, _this2.opts) : item.name + ': ' + item.data,
            color: item.color };

        });
        var offset = {
          x: _touches$.x,
          y: _touches$.y };

        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== undefined ? option.offset : offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

uCharts.prototype.translate = function (distance) {
  this.scrollOption = {
    currentOffset: distance,
    startTouchX: distance,
    distance: 0,
    lastMoveTime: 0 };

  var opts = assign({}, this.opts, {
    _scrollDistance_: distance,
    animation: false });

  drawCharts.call(this, this.opts.type, opts, this.config, this.context);
};

uCharts.prototype.scrollStart = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  var _touches$ = getTouches(touches, this.opts, e);
  if (touches && this.opts.enableScroll === true) {
    this.scrollOption.startTouchX = _touches$.x;
  }
};

uCharts.prototype.scroll = function (e) {
  if (this.scrollOption.lastMoveTime === 0) {
    this.scrollOption.lastMoveTime = Date.now();
  }
  var Limit = this.opts.touchMoveLimit || 60;
  var currMoveTime = Date.now();
  var duration = currMoveTime - this.scrollOption.lastMoveTime;
  if (duration < Math.floor(1000 / Limit)) return;
  this.scrollOption.lastMoveTime = currMoveTime;
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches && this.opts.enableScroll === true) {
    var _touches$ = getTouches(touches, this.opts, e);
    var _distance;
    _distance = _touches$.x - this.scrollOption.startTouchX;
    var currentOffset = this.scrollOption.currentOffset;
    var validDistance = calValidDistance(this, currentOffset + _distance, this.opts.chartData, this.config, this.opts);
    this.scrollOption.distance = _distance = validDistance - currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset + _distance,
      animation: false });

    this.opts = opts;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
    return currentOffset + _distance;
  }
};

uCharts.prototype.scrollEnd = function (e) {
  if (this.opts.enableScroll === true) {
    var _scrollOption = this.scrollOption,
    currentOffset = _scrollOption.currentOffset,
    distance = _scrollOption.distance;
    this.scrollOption.currentOffset = currentOffset + distance;
    this.scrollOption.distance = 0;
  }
};

if ( true && typeof module.exports === "object") {
  module.exports = uCharts;
  //export default uCharts;//????????????nodejs???module?????????????????????????????????export????????????
}

/***/ }),

/***/ 179:
/*!**********************************************************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * uCharts??
 * ????????????????????????????????????H5???APP?????????????????????/?????????/??????/??????/QQ/360??????Vue???Taro?????????canvas???????????????
 * Copyright (c) 2021 QIUN???????? https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * ?????????????????????????????????????????????????????????
 * 
 * uCharts??????????????
 * https://www.uCharts.cn
 * 
 * ????????????:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app?????????????????????
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 */

// ????????????????????????????????????????????????????????????????????????????????????????????????color??????
var color = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'];

//??????????????????????????????????????????x??????????????????????????????????????????
var formatDateTime = function formatDateTime(timeStamp, returnType) {
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  var h = date.getHours();
  h = h < 10 ? '0' + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  if (returnType == 'full') {return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;}
  if (returnType == 'y-m-d') {return y + '-' + m + '-' + d;}
  if (returnType == 'h:m') {return h + ':' + minute;}
  if (returnType == 'h:m:s') {return h + ':' + minute + ':' + second;}
  return [y, m, d, h, minute, second];
};

module.exports = {
  //demotype???????????????????????????????????????????????????????????????????????????????????????????????????????????????
  "type": ["pie", "ring", "rose", "word", "funnel", "map", "arcbar", "line", "column", "bar", "area", "radar", "gauge", "candle", "mix", "tline", "tarea", "scatter", "bubble", "demotype"],
  "range": ["?????????", "?????????", "?????????", "?????????", "?????????", "??????", "???????????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "K??????", "?????????", "???????????????", "???????????????", "?????????", "?????????", "???????????????"],
  //??????????????????????????????????????????categories?????????????????????????????????????????????????????????"demotype"
  //??????????????????????????????"tline","tarea","scatter","bubble"?????????????????????x????????????????????????categories??????????????????categories
  "categories": ["line", "column", "bar", "area", "radar", "gauge", "candle", "mix", "demotype"],
  //instance??????????????????????????????????????????
  "instance": {},
  //option???opts???eopts???????????????????????????
  "option": {},
  //??????????????????format???????????????H5??????????????????????????????props??????????????????????????????????????????????????????????????????
  "formatter": {
    "yAxisDemo1": function yAxisDemo1(val) {return val + '???';},
    "yAxisDemo2": function yAxisDemo2(val) {return val.toFixed(2);},
    "xAxisDemo1": function xAxisDemo1(val) {return val + '???';},
    "xAxisDemo2": function xAxisDemo2(val) {return formatDateTime(val, 'h:m');},
    "seriesDemo1": function seriesDemo1(val) {return val + '???';},
    "tooltipDemo1": function tooltipDemo1(item, category, index, opts) {
      if (index == 0) {
        return '?????????' + item.data + '???';
      } else {
        return '???????????????' + item.data + '???';
      }
    },
    "pieDemo": function pieDemo(val, index, series) {
      if (index !== undefined) {
        return series[index].name + '???' + series[index].data + '???';
      }
    } },

  //?????????????????????????????????????????????option?????????????????????????????????????????? type="demotype" ??????????????????????????????????????????option???????????????????????????opts???????????????demotype???opts???option????????????????????????
  "demotype": {
    //??????????????????????????????????????????????????????????????????????????????????????????????????????
    "type": "line",
    "color": color,
    "padding": [15, 10, 0, 15],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2 },

    "legend": {},

    "extra": {
      "line": {
        "type": "curve",
        "width": 2 } } },



  //???????????????????????????????????????????????????????????????
  "pie": {
    "type": "pie",
    "color": color,
    "padding": [5, 5, 5, 5],
    "extra": {
      "pie": {
        "activeOpacity": 0.5,
        "activeRadius": 10,
        "offsetAngle": 0,
        "labelWidth": 15,
        "border": true,
        "borderWidth": 3,
        "borderColor": "#FFFFFF" } } },



  "ring": {
    "type": "ring",
    "color": color,
    "padding": [5, 5, 5, 5],
    "rotate": false,
    "dataLabel": true,
    "legend": {
      "show": true,
      "position": "right",
      "lineHeight": 25 },

    "title": {
      "name": "?????????",
      "fontSize": 15,
      "color": "#666666" },

    "subtitle": {
      "name": "70%",
      "fontSize": 25,
      "color": "#7cb5ec" },

    "extra": {
      "ring": {
        "ringWidth": 30,
        "activeOpacity": 0.5,
        "activeRadius": 10,
        "offsetAngle": 0,
        "labelWidth": 15,
        "border": true,
        "borderWidth": 3,
        "borderColor": "#FFFFFF" } } },



  "rose": {
    "type": "rose",
    "canvasId": "",
    "canvas2d": false,
    "background": "none",
    "animation": true,
    "timing": "easeOut",
    "duration": 1000,
    "color": [
    "#1890FF",
    "#91CB74",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#3CA272",
    "#FC8452",
    "#9A60B4",
    "#ea7ccc"],

    "padding": [
    5,
    5,
    5,
    5],

    "rotate": false,
    "errorReload": true,
    "fontSize": 13,
    "fontColor": "#666666",
    "enableScroll": false,
    "touchMoveLimit": 60,
    "enableMarkLine": false,
    "dataLabel": true,
    "dataPointShape": true,
    "dataPointShapeType": "solid",
    "legend": {
      "show": true,
      "position": "left",
      "float": "center",
      "padding": 5,
      "margin": 5,
      "backgroundColor": "rgba(0,0,0,0)",
      "borderColor": "rgba(0,0,0,0)",
      "borderWidth": 0,
      "fontSize": 13,
      "fontColor": "#666666",
      "lineHeight": 25,
      "hiddenColor": "#CECECE",
      "itemGap": 10 },

    "extra": {
      "rose": {
        "type": "area",
        "minRadius": 50,
        "activeOpacity": 0.5,
        "activeRadius": 10,
        "offsetAngle": 0,
        "labelWidth": 15,
        "border": false,
        "borderWidth": 2,
        "borderColor": "#FFFFFF",
        "linearType": "none" },

      "tooltip": {
        "showBox": true,
        "showArrow": true,
        "showCategory": false,
        "borderWidth": 0,
        "borderRadius": 0,
        "borderColor": "#000000",
        "borderOpacity": 0.7,
        "bgColor": "#000000",
        "bgOpacity": 0.7,
        "gridType": "solid",
        "dashLength": 4,
        "gridColor": "#CCCCCC",
        "fontColor": "#FFFFFF",
        "splitLine": true,
        "horizentalLine": false,
        "xAxisLabel": false,
        "yAxisLabel": false,
        "labelBgColor": "#FFFFFF",
        "labelBgOpacity": 0.7,
        "labelFontColor": "#666666" } } },



  "word": {
    "type": "word",
    "color": color,
    "extra": {
      "word": {
        "type": "normal",
        "autoColors": false } } },



  "funnel": {
    "type": "funnel",
    "color": color,
    "padding": [15, 15, 0, 15],
    "extra": {
      "funnel": {
        "activeOpacity": 0.3,
        "activeWidth": 10,
        "border": true,
        "borderWidth": 2,
        "borderColor": "#FFFFFF",
        "fillOpacity": 1,
        "labelAlign": "right" } } },



  "map": {
    "type": "map",
    "color": color,
    "padding": [0, 0, 0, 0],
    "dataLabel": true,
    "extra": {
      "map": {
        "border": true,
        "borderWidth": 1,
        "borderColor": "#666666",
        "fillOpacity": 0.6,
        "activeBorderColor": "#F04864",
        "activeFillColor": "#FACC14",
        "activeFillOpacity": 1 } } },



  "arcbar": {
    "type": "arcbar",
    "color": color,
    "title": {
      "name": "?????????",
      "fontSize": 25,
      "color": "#00FF00" },

    "subtitle": {
      "name": "????????????",
      "fontSize": 15,
      "color": "#666666" },

    "extra": {
      "arcbar": {
        "type": "default",
        "width": 12,
        "backgroundColor": "#E9E9E9",
        "startAngle": 0.75,
        "endAngle": 0.25,
        "gap": 2 } } },



  "line": {
    "type": "line",
    "canvasId": "",
    "canvas2d": false,
    "background": "none",
    "animation": true,
    "timing": "easeOut",
    "duration": 1000,
    "color": [
    "#1890FF",
    "#91CB74",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#3CA272",
    "#FC8452",
    "#9A60B4",
    "#ea7ccc"],

    "padding": [
    15,
    10,
    0,
    15],

    "rotate": false,
    "errorReload": true,
    "fontSize": 13,
    "fontColor": "#666666",
    "enableScroll": false,
    "touchMoveLimit": 60,
    "enableMarkLine": false,
    "dataLabel": true,
    "dataPointShape": true,
    "dataPointShapeType": "solid",
    "xAxis": {
      "disabled": false,
      "axisLine": true,
      "axisLineColor": "#CCCCCC",
      "calibration": false,
      "fontColor": "#666666",
      "fontSize": 13,
      "rotateLabel": false,
      "itemCount": 5,
      "boundaryGap": "center",
      "disableGrid": true,
      "gridColor": "#CCCCCC",
      "gridType": "solid",
      "dashLength": 4,
      "gridEval": 1,
      "scrollShow": false,
      "scrollAlign": "left",
      "scrollColor": "#A6A6A6",
      "scrollBackgroundColor": "#EFEBEF",
      "format": "" },

    "yAxis": {
      "disabled": false,
      "disableGrid": false,
      "splitNumber": 5,
      "gridType": "dash",
      "dashLength": 2,
      "gridColor": "#CCCCCC",
      "padding": 10,
      "showTitle": false,
      "data": [] },

    "legend": {
      "show": true,
      "position": "bottom",
      "float": "center",
      "padding": 5,
      "margin": 5,
      "backgroundColor": "rgba(0,0,0,0)",
      "borderColor": "rgba(0,0,0,0)",
      "borderWidth": 0,
      "fontSize": 13,
      "fontColor": "#666666",
      "lineHeight": 11,
      "hiddenColor": "#CECECE",
      "itemGap": 10 },

    "extra": {
      "line": {
        "type": "straight",
        "width": 2 },

      "tooltip": {
        "showBox": true,
        "showArrow": true,
        "showCategory": false,
        "borderWidth": 0,
        "borderRadius": 0,
        "borderColor": "#000000",
        "borderOpacity": 0.7,
        "bgColor": "#000000",
        "bgOpacity": 0.7,
        "gridType": "solid",
        "dashLength": 4,
        "gridColor": "#CCCCCC",
        "fontColor": "#FFFFFF",
        "splitLine": true,
        "horizentalLine": false,
        "xAxisLabel": false,
        "yAxisLabel": false,
        "labelBgColor": "#FFFFFF",
        "labelBgOpacity": 0.7,
        "labelFontColor": "#666666" },

      "markLine": {
        "type": "solid",
        "dashLength": 4,
        "data": [] } } },



  "tline": {
    "type": "line",
    "color": color,
    "padding": [15, 10, 0, 15],
    "xAxis": {
      "disableGrid": false,
      "boundaryGap": "justify" },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2,
      "data": [
      {
        "min": 0,
        "max": 80 }] },



    "legend": {},

    "extra": {
      "line": {
        "type": "curve",
        "width": 2 } } },



  "tarea": {
    "type": "area",
    "color": color,
    "padding": [15, 10, 0, 15],
    "xAxis": {
      "disableGrid": true,
      "boundaryGap": "justify" },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2,
      "data": [
      {
        "min": 0,
        "max": 80 }] },



    "legend": {},

    "extra": {
      "area": {
        "type": "curve",
        "opacity": 0.2,
        "addLine": true,
        "width": 2,
        "gradient": true } } },



  "column": {
    "type": "column",
    "canvasId": "",
    "canvas2d": false,
    "background": "none",
    "animation": true,
    "timing": "easeOut",
    "duration": 1000,
    "color": [
    "#1890FF",
    "#91CB74",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#3CA272",
    "#FC8452",
    "#9A60B4",
    "#ea7ccc"],

    "padding": [
    15,
    15,
    0,
    5],

    "rotate": false,
    "errorReload": true,
    "fontSize": 13,
    "fontColor": "#666666",
    "enableScroll": false,
    "touchMoveLimit": 60,
    "enableMarkLine": false,
    "dataLabel": true,
    "dataPointShape": true,
    "dataPointShapeType": "solid",
    "xAxis": {
      "disabled": false,
      "axisLine": true,
      "axisLineColor": "#CCCCCC",
      "calibration": false,
      "fontColor": "#666666",
      "fontSize": 13,
      "rotateLabel": false,
      "itemCount": 5,
      "boundaryGap": "center",
      "disableGrid": true,
      "gridColor": "#CCCCCC",
      "gridType": "solid",
      "dashLength": 4,
      "gridEval": 1,
      "scrollShow": false,
      "scrollAlign": "left",
      "scrollColor": "#A6A6A6",
      "scrollBackgroundColor": "#EFEBEF",
      "format": "" },

    "yAxis": {
      "disabled": false,
      "disableGrid": false,
      "splitNumber": 5,
      "gridType": "solid",
      "dashLength": 8,
      "gridColor": "#CCCCCC",
      "padding": 10,
      "showTitle": false,
      "data": [] },

    "legend": {
      "show": true,
      "position": "bottom",
      "float": "center",
      "padding": 5,
      "margin": 5,
      "backgroundColor": "rgba(0,0,0,0)",
      "borderColor": "rgba(0,0,0,0)",
      "borderWidth": 0,
      "fontSize": 13,
      "fontColor": "#666666",
      "lineHeight": 11,
      "hiddenColor": "#CECECE",
      "itemGap": 10 },

    "extra": {
      "column": {
        "type": "group",
        "width": 30,
        "seriesGap": 2,
        "categoryGap": 3,
        "barBorderCircle": false,
        "linearType": "none",
        "linearOpacity": 1,
        "colorStop": 0,
        "meterBorder": 1,
        "meterFillColor": "#FFFFFF",
        "activeBgColor": "#000000",
        "activeBgOpacity": 0.08,
        "meterBorde": 1 },

      "tooltip": {
        "showBox": true,
        "showArrow": true,
        "showCategory": false,
        "borderWidth": 0,
        "borderRadius": 0,
        "borderColor": "#000000",
        "borderOpacity": 0.7,
        "bgColor": "#000000",
        "bgOpacity": 0.7,
        "gridType": "solid",
        "dashLength": 4,
        "gridColor": "#CCCCCC",
        "fontColor": "#FFFFFF",
        "splitLine": true,
        "horizentalLine": false,
        "xAxisLabel": false,
        "yAxisLabel": false,
        "labelBgColor": "#FFFFFF",
        "labelBgOpacity": 0.7,
        "labelFontColor": "#666666" },

      "markLine": {
        "type": "solid",
        "dashLength": 4,
        "data": [] } } },



  "bar": {
    "type": "bar",
    "color": color,
    "padding": [15, 30, 0, 5],
    "xAxis": {
      "boundaryGap": "justify",
      "disableGrid": false,
      "min": 0,
      "axisLine": false },

    "yAxis": {},

    "legend": {},

    "extra": {
      "bar": {
        "type": "group",
        "width": 30,
        "meterBorde": 1,
        "meterFillColor": "#FFFFFF",
        "activeBgColor": "#000000",
        "activeBgOpacity": 0.08 } } },



  "area": {
    "type": "area",
    "color": color,
    "padding": [15, 15, 0, 15],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "gridType": "dash",
      "dashLength": 2 },

    "legend": {},

    "extra": {
      "area": {
        "type": "straight",
        "opacity": 0.2,
        "addLine": true,
        "width": 2,
        "gradient": false } } },



  "radar": {
    "type": "radar",
    "color": color,
    "padding": [5, 5, 5, 5],
    "legend": {
      "show": true,
      "position": "right",
      "lineHeight": 25 },

    "extra": {
      "radar": {
        "gridType": "radar",
        "gridColor": "#CCCCCC",
        "gridCount": 3,
        "opacity": 0.2,
        "max": 200 } } },



  "gauge": {
    "type": "gauge",
    "color": color,
    "title": {
      "name": "66Km/H",
      "fontSize": 25,
      "color": "#2fc25b",
      "offsetY": 50 },

    "subtitle": {
      "name": "????????????",
      "fontSize": 15,
      "color": "#1890ff",
      "offsetY": -50 },

    "extra": {
      "gauge": {
        "type": "default",
        "width": 30,
        "labelColor": "#666666",
        "startAngle": 0.75,
        "endAngle": 0.25,
        "startNumber": 0,
        "endNumber": 100,
        "labelFormat": "",
        "splitLine": {
          "fixRadius": 0,
          "splitNumber": 10,
          "width": 30,
          "color": "#FFFFFF",
          "childNumber": 5,
          "childWidth": 12 },

        "pointer": {
          "width": 24,
          "color": "auto" } } } },




  "candle": {
    "type": "candle",
    "color": color,
    "padding": [15, 15, 0, 15],
    "enableScroll": true,
    "enableMarkLine": true,
    "dataLabel": false,
    "xAxis": {
      "labelCount": 4,
      "itemCount": 40,
      "disableGrid": true,
      "gridColor": "#CCCCCC",
      "gridType": "solid",
      "dashLength": 4,
      "scrollShow": true,
      "scrollAlign": "left",
      "scrollColor": "#A6A6A6",
      "scrollBackgroundColor": "#EFEBEF" },

    "yAxis": {},

    "legend": {},

    "extra": {
      "candle": {
        "color": {
          "upLine": "#f04864",
          "upFill": "#f04864",
          "downLine": "#2fc25b",
          "downFill": "#2fc25b" },

        "average": {
          "show": true,
          "name": ["MA5", "MA10", "MA30"],
          "day": [5, 10, 20],
          "color": ["#1890ff", "#2fc25b", "#facc14"] } },


      "markLine": {
        "type": "dash",
        "dashLength": 5,
        "data": [
        {
          "value": 2150,
          "lineColor": "#f04864",
          "showLabel": true },

        {
          "value": 2350,
          "lineColor": "#f04864",
          "showLabel": true }] } } },





  "mix": {
    "type": "mix",
    "color": color,
    "padding": [15, 15, 0, 15],
    "xAxis": {
      "disableGrid": true },

    "yAxis": {
      "disabled": false,
      "disableGrid": false,
      "splitNumber": 5,
      "gridType": "dash",
      "dashLength": 4,
      "gridColor": "#CCCCCC",
      "padding": 10,
      "showTitle": true,
      "data": [] },

    "legend": {},

    "extra": {
      "mix": {
        "column": {
          "width": 20 } } } },




  "scatter": {
    "type": "scatter",
    "color": color,
    "padding": [15, 15, 0, 15],
    "dataLabel": false,
    "xAxis": {
      "disableGrid": false,
      "gridType": "dash",
      "splitNumber": 5,
      "boundaryGap": "justify",
      "min": 0 },

    "yAxis": {
      "disableGrid": false,
      "gridType": "dash" },

    "legend": {},

    "extra": {
      "scatter": {} } },



  "bubble": {
    "type": "bubble",
    "color": color,
    "padding": [15, 15, 0, 15],
    "xAxis": {
      "disableGrid": false,
      "gridType": "dash",
      "splitNumber": 5,
      "boundaryGap": "justify",
      "min": 0,
      "max": 250 },

    "yAxis": {
      "disableGrid": false,
      "gridType": "dash",
      "data": [{
        "min": 0,
        "max": 150 }] },


    "legend": {},

    "extra": {
      "bubble": {
        "border": 2,
        "opacity": 0.5 } } } };

/***/ }),

/***/ 192:
/*!*********************************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/node_modules/cl-uni/mixins/emitter.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =

{
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 193:
/*!******************************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/node_modules/cl-uni/mixins/form.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 194);var _default =

{
  computed: {
    $form: function $form() {
      return _utils.getParent.call(this, "ClForm", [
      "labelWidth",
      "labelPosition",
      "showMessage",
      "model",
      "validateOnValueChange",
      "disabled"]);

    },

    isDisabled: function isDisabled() {
      return this.$form ? this.$form.disabled || this.disabled : this.disabled;
    } } };exports.default = _default;

/***/ }),

/***/ 194:
/*!******************************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/node_modules/cl-uni/utils/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isFunction = isFunction;exports.isString = isString;exports.isNull = isNull;exports.isBoolean = isBoolean;exports.isNumber = isNumber;exports.isDecimal = isDecimal;exports.isPromise = isPromise;exports.isEmpty = isEmpty;exports.last = last;exports.firstUpperCase = firstUpperCase;exports.debounce = debounce;exports.compareValue = compareValue;exports.cloneDeep = cloneDeep;exports.deepMerge = deepMerge;exports.getCurrentPage = getCurrentPage;exports.parseRpx = parseRpx;exports.getParent = getParent;exports.getCurrentColor = getCurrentColor;exports.getQueryString = getQueryString;exports.orderBy = orderBy;exports.isDev = void 0; // ??????????????????
var isDev = "development" == "development";

// ??????Array??????
exports.isDev = isDev;function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

// ??????Object??????
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

// ??????Function??????
function isFunction(value) {
  return typeof value === "function";
}

// ??????String??????
function isString(value) {
  return typeof value === "string";
}

// ??????null??????
function isNull(value) {
  return !value && value !== 0;
}

// ??????Boolean??????
function isBoolean(value) {
  return typeof value === "boolean";
}

// ??????????????????
function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

// ????????????
function isDecimal(value) {
  return String(value).length - String(value).indexOf(".") + 1;
}

// ??????Promise??????
function isPromise(obj) {
  obj !== null && (
  typeof obj === "object" || typeof obj === "function") &&
  typeof obj.then === "function";
}

// ????????????
function isEmpty(value) {
  if (isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return value === "" || value === undefined || value === null;
}

// ??????????????????
function last(data) {
  if (isArray(data) || isString(data)) {
    return data[data.length - 1];
  }
}

// ???????????????
function firstUpperCase(value) {
  return value.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
}

// ??????
function debounce(fn, wait, immediate) {
  var timer;
  return function () {var _arguments = arguments,_this = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) {
        fn.apply(this, arguments);
      }
    } else {
      timer = setTimeout(function () {
        fn.apply(_this, _arguments);
      }, wait);
    }
  };
}

// ?????????
function compareValue(a, b) {
  return String(a) === String(b);
}

// ?????????
function cloneDeep(v) {
  if (isObject(v)) {
    var d = {};

    for (var k in v) {
      if (v.hasOwnProperty && v.hasOwnProperty(k)) {
        if (v[k] && typeof v[k] === "object") {
          d[k] = cloneDeep(v[k]);
        } else {
          d[k] = v[k];
        }
      }
    }

    return d;
  } else if (isArray(v)) {
    return v.map(cloneDeep);
  } else {
    return v;
  }
}

// ????????????
function deepMerge(a, b) {
  var k;
  for (k in b) {
    a[k] =
    a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : a[k] = b[k];
  }
  return a;
}

// ????????????????????????
function getCurrentPage() {var _last =
  last(getCurrentPages()),route = _last.route,$page = _last.$page,options = _last.options,$route = _last.$route;

  return {
    path: "/".concat(route),
    fullPath: $page.fullPath,

    query: options };





}

/**
   * ??????rpx
   * @param {*} val
   */
function parseRpx(val) {
  return isArray(val) ? val.map(parseRpx).join(" ") : isNumber(val) ? val + "rpx" : val;
}

/**
   * ??????????????????
   * @param {*} name componentName
   * @param {*} keys ???????????????????????? computed ??? H5 ????????????
   */
function getParent(name, keys) {
  var parent = this.$parent;

  while (parent) {
    if (parent.$options.componentName !== name) {
      parent = parent.$parent;
    } else {
      return keys.reduce(function (result, key) {
        result[key] = parent[key];
        return result;
      }, {});
    }
  }

  return null;
}

/**
   * ??????????????????
   *
   * @param {*} { color, max, value }
   */
function getCurrentColor(_ref) {var color = _ref.color,max = _ref.max,value = _ref.value;
  if (isString(color)) {
    return color;
  } else {
    var colorArray = color.
    map(function (item, index) {
      if (isString(item)) {
        return {
          color: item,
          value: (index + 1) * (max / color.length) };

      }
      return item;
    }).
    sort(function (a, b) {return a.value - b.value;});

    for (var i = 0; i < colorArray.length; i++) {
      if (colorArray[i].value >= value) {
        return colorArray[i].color;
      }
    }

    return colorArray[colorArray.length - 1].color;
  }
}

// ?????????????????????
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// ????????????????????????
function orderBy(list, key) {
  return list.sort(function (a, b) {return a[key] - b[key];});
}

/***/ }),

/***/ 195:
/*!********************************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/node_modules/cl-uni/mixins/parent.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 194);var _default =

{
  data: function data() {
    return {
      Parent: null };

  },

  computed: {
    parent: function parent() {
      return this.getParent() || this.Parent || {};
    },

    hasParent: function hasParent() {
      return !(0, _utils.isEmpty)(this.parent);
    } },


  mounted: function mounted() {
    this.Parent = this.getParent();
  },

  methods: {
    getParent: function getParent() {
      if (!this.ComponentName) {
        return null;
      }

      return _utils.getParent.call(this, this.ComponentName, this.Keys);
    } } };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx ????????????????????? plugins ???????????????????????????????????????????????????????????????????????? copyAugment ??????
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // ?????? externalClass ????????????(????????? externalClass ????????????????????????)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx ?????? hack ??? uni-app ???????????? name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//?????? observer ??? setData callback ?????????????????????????????? warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field ????????????
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Clothes sell","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick ?????? ??? setData ??? setData ??????????????????
    //2.nextTick ???????????? render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Clothes sell","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"Clothes sell","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // ???????????? vm ?????????????????????
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO ??????????????????????????????????????? list=>l0 ??? list ??????????????????????????????????????????
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //????????? data ???????????????
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"Clothes sell","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']????????????',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js ?????? new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay ???????????? selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO ???????????? string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // ??????????????????????????????????????????
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // ???????????????????????????????????????
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 266:
/*!*********************************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/static/region/region.json ***!
  \*********************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"id\":110000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":110100,\"name\":\"?????????\",\"pid\":110000,\"level\":2,\"children\":[{\"id\":110101,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110102,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110105,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110106,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110107,\"name\":\"????????????\",\"pid\":110100,\"level\":3},{\"id\":110108,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110109,\"name\":\"????????????\",\"pid\":110100,\"level\":3},{\"id\":110111,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110112,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110113,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110114,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110115,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110116,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110117,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110228,\"name\":\"?????????\",\"pid\":110100,\"level\":3},{\"id\":110229,\"name\":\"?????????\",\"pid\":110100,\"level\":3}]}]},{\"id\":120000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":120100,\"name\":\"?????????\",\"pid\":120000,\"level\":2,\"children\":[{\"id\":120101,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120102,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120103,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120104,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120105,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120106,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120110,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120111,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120112,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120113,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120114,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120115,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120116,\"name\":\"????????????\",\"pid\":120100,\"level\":3},{\"id\":120221,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120223,\"name\":\"?????????\",\"pid\":120100,\"level\":3},{\"id\":120225,\"name\":\"??????\",\"pid\":120100,\"level\":3}]}]},{\"id\":130000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":130100,\"name\":\"????????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130102,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130104,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130105,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130107,\"name\":\"????????????\",\"pid\":130100,\"level\":3},{\"id\":130108,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130109,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130110,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130111,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130121,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130123,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130125,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130126,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130127,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130128,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130129,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130130,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130131,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130132,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130133,\"name\":\"??????\",\"pid\":130100,\"level\":3},{\"id\":130181,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130183,\"name\":\"?????????\",\"pid\":130100,\"level\":3},{\"id\":130184,\"name\":\"?????????\",\"pid\":130100,\"level\":3}]},{\"id\":130200,\"name\":\"?????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130202,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130203,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130204,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130205,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130207,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130208,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130209,\"name\":\"????????????\",\"pid\":130200,\"level\":3},{\"id\":130223,\"name\":\"??????\",\"pid\":130200,\"level\":3},{\"id\":130224,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130225,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130227,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130229,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130281,\"name\":\"?????????\",\"pid\":130200,\"level\":3},{\"id\":130283,\"name\":\"?????????\",\"pid\":130200,\"level\":3}]},{\"id\":130300,\"name\":\"????????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130302,\"name\":\"?????????\",\"pid\":130300,\"level\":3},{\"id\":130303,\"name\":\"????????????\",\"pid\":130300,\"level\":3},{\"id\":130304,\"name\":\"????????????\",\"pid\":130300,\"level\":3},{\"id\":130321,\"name\":\"?????????????????????\",\"pid\":130300,\"level\":3},{\"id\":130322,\"name\":\"?????????\",\"pid\":130300,\"level\":3},{\"id\":130323,\"name\":\"?????????\",\"pid\":130300,\"level\":3},{\"id\":130324,\"name\":\"?????????\",\"pid\":130300,\"level\":3}]},{\"id\":130400,\"name\":\"?????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130402,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130403,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130404,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130406,\"name\":\"????????????\",\"pid\":130400,\"level\":3},{\"id\":130421,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130423,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130424,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130425,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130426,\"name\":\"??????\",\"pid\":130400,\"level\":3},{\"id\":130427,\"name\":\"??????\",\"pid\":130400,\"level\":3},{\"id\":130428,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130429,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130430,\"name\":\"??????\",\"pid\":130400,\"level\":3},{\"id\":130431,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130432,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130433,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130434,\"name\":\"??????\",\"pid\":130400,\"level\":3},{\"id\":130435,\"name\":\"?????????\",\"pid\":130400,\"level\":3},{\"id\":130481,\"name\":\"?????????\",\"pid\":130400,\"level\":3}]},{\"id\":130500,\"name\":\"?????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130502,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130503,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130521,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130522,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130523,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130524,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130525,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130526,\"name\":\"??????\",\"pid\":130500,\"level\":3},{\"id\":130527,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130528,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130529,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130530,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130531,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130532,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130533,\"name\":\"??????\",\"pid\":130500,\"level\":3},{\"id\":130534,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130535,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130581,\"name\":\"?????????\",\"pid\":130500,\"level\":3},{\"id\":130582,\"name\":\"?????????\",\"pid\":130500,\"level\":3}]},{\"id\":130600,\"name\":\"?????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130602,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130603,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130604,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130621,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130622,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130623,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130624,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130625,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130626,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130627,\"name\":\"??????\",\"pid\":130600,\"level\":3},{\"id\":130628,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130629,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130630,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130631,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130632,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130633,\"name\":\"??????\",\"pid\":130600,\"level\":3},{\"id\":130634,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130635,\"name\":\"??????\",\"pid\":130600,\"level\":3},{\"id\":130636,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130637,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130638,\"name\":\"??????\",\"pid\":130600,\"level\":3},{\"id\":130681,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130682,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130683,\"name\":\"?????????\",\"pid\":130600,\"level\":3},{\"id\":130684,\"name\":\"????????????\",\"pid\":130600,\"level\":3}]},{\"id\":130700,\"name\":\"????????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130702,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130703,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130705,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130706,\"name\":\"????????????\",\"pid\":130700,\"level\":3},{\"id\":130721,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130722,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130723,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130724,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130725,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130726,\"name\":\"??????\",\"pid\":130700,\"level\":3},{\"id\":130727,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130728,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130729,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130730,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130731,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130732,\"name\":\"?????????\",\"pid\":130700,\"level\":3},{\"id\":130733,\"name\":\"?????????\",\"pid\":130700,\"level\":3}]},{\"id\":130800,\"name\":\"?????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130802,\"name\":\"?????????\",\"pid\":130800,\"level\":3},{\"id\":130803,\"name\":\"?????????\",\"pid\":130800,\"level\":3},{\"id\":130804,\"name\":\"??????????????????\",\"pid\":130800,\"level\":3},{\"id\":130821,\"name\":\"?????????\",\"pid\":130800,\"level\":3},{\"id\":130822,\"name\":\"?????????\",\"pid\":130800,\"level\":3},{\"id\":130823,\"name\":\"?????????\",\"pid\":130800,\"level\":3},{\"id\":130824,\"name\":\"?????????\",\"pid\":130800,\"level\":3},{\"id\":130825,\"name\":\"?????????\",\"pid\":130800,\"level\":3},{\"id\":130826,\"name\":\"?????????????????????\",\"pid\":130800,\"level\":3},{\"id\":130827,\"name\":\"?????????????????????\",\"pid\":130800,\"level\":3},{\"id\":130828,\"name\":\"??????????????????????????????\",\"pid\":130800,\"level\":3}]},{\"id\":130900,\"name\":\"?????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":130902,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130903,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130921,\"name\":\"??????\",\"pid\":130900,\"level\":3},{\"id\":130922,\"name\":\"??????\",\"pid\":130900,\"level\":3},{\"id\":130923,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130924,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130925,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130926,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130927,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130928,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130929,\"name\":\"??????\",\"pid\":130900,\"level\":3},{\"id\":130930,\"name\":\"?????????????????????\",\"pid\":130900,\"level\":3},{\"id\":130981,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130982,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130983,\"name\":\"?????????\",\"pid\":130900,\"level\":3},{\"id\":130984,\"name\":\"?????????\",\"pid\":130900,\"level\":3}]},{\"id\":131000,\"name\":\"?????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":131002,\"name\":\"?????????\",\"pid\":131000,\"level\":3},{\"id\":131003,\"name\":\"?????????\",\"pid\":131000,\"level\":3},{\"id\":131022,\"name\":\"?????????\",\"pid\":131000,\"level\":3},{\"id\":131023,\"name\":\"?????????\",\"pid\":131000,\"level\":3},{\"id\":131024,\"name\":\"?????????\",\"pid\":131000,\"level\":3},{\"id\":131025,\"name\":\"?????????\",\"pid\":131000,\"level\":3},{\"id\":131026,\"name\":\"?????????\",\"pid\":131000,\"level\":3},{\"id\":131028,\"name\":\"?????????????????????\",\"pid\":131000,\"level\":3},{\"id\":131081,\"name\":\"?????????\",\"pid\":131000,\"level\":3},{\"id\":131082,\"name\":\"?????????\",\"pid\":131000,\"level\":3}]},{\"id\":131100,\"name\":\"?????????\",\"pid\":130000,\"level\":2,\"children\":[{\"id\":131102,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131121,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131122,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131123,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131124,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131125,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131126,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131127,\"name\":\"??????\",\"pid\":131100,\"level\":3},{\"id\":131128,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131181,\"name\":\"?????????\",\"pid\":131100,\"level\":3},{\"id\":131182,\"name\":\"?????????\",\"pid\":131100,\"level\":3}]}]},{\"id\":140000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":140100,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140105,\"name\":\"?????????\",\"pid\":140100,\"level\":3},{\"id\":140106,\"name\":\"?????????\",\"pid\":140100,\"level\":3},{\"id\":140107,\"name\":\"????????????\",\"pid\":140100,\"level\":3},{\"id\":140108,\"name\":\"????????????\",\"pid\":140100,\"level\":3},{\"id\":140109,\"name\":\"????????????\",\"pid\":140100,\"level\":3},{\"id\":140110,\"name\":\"?????????\",\"pid\":140100,\"level\":3},{\"id\":140121,\"name\":\"?????????\",\"pid\":140100,\"level\":3},{\"id\":140122,\"name\":\"?????????\",\"pid\":140100,\"level\":3},{\"id\":140123,\"name\":\"?????????\",\"pid\":140100,\"level\":3},{\"id\":140181,\"name\":\"?????????\",\"pid\":140100,\"level\":3}]},{\"id\":140200,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140202,\"name\":\"??????\",\"pid\":140200,\"level\":3},{\"id\":140203,\"name\":\"??????\",\"pid\":140200,\"level\":3},{\"id\":140211,\"name\":\"?????????\",\"pid\":140200,\"level\":3},{\"id\":140212,\"name\":\"?????????\",\"pid\":140200,\"level\":3},{\"id\":140221,\"name\":\"?????????\",\"pid\":140200,\"level\":3},{\"id\":140222,\"name\":\"?????????\",\"pid\":140200,\"level\":3},{\"id\":140223,\"name\":\"?????????\",\"pid\":140200,\"level\":3},{\"id\":140224,\"name\":\"?????????\",\"pid\":140200,\"level\":3},{\"id\":140225,\"name\":\"?????????\",\"pid\":140200,\"level\":3},{\"id\":140226,\"name\":\"?????????\",\"pid\":140200,\"level\":3},{\"id\":140227,\"name\":\"?????????\",\"pid\":140200,\"level\":3}]},{\"id\":140300,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140302,\"name\":\"??????\",\"pid\":140300,\"level\":3},{\"id\":140303,\"name\":\"??????\",\"pid\":140300,\"level\":3},{\"id\":140311,\"name\":\"??????\",\"pid\":140300,\"level\":3},{\"id\":140321,\"name\":\"?????????\",\"pid\":140300,\"level\":3},{\"id\":140322,\"name\":\"??????\",\"pid\":140300,\"level\":3}]},{\"id\":140400,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140402,\"name\":\"??????\",\"pid\":140400,\"level\":3},{\"id\":140411,\"name\":\"??????\",\"pid\":140400,\"level\":3},{\"id\":140421,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140423,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140424,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140425,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140426,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140427,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140428,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140429,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140430,\"name\":\"??????\",\"pid\":140400,\"level\":3},{\"id\":140431,\"name\":\"?????????\",\"pid\":140400,\"level\":3},{\"id\":140481,\"name\":\"?????????\",\"pid\":140400,\"level\":3}]},{\"id\":140500,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140502,\"name\":\"??????\",\"pid\":140500,\"level\":3},{\"id\":140521,\"name\":\"?????????\",\"pid\":140500,\"level\":3},{\"id\":140522,\"name\":\"?????????\",\"pid\":140500,\"level\":3},{\"id\":140524,\"name\":\"?????????\",\"pid\":140500,\"level\":3},{\"id\":140525,\"name\":\"?????????\",\"pid\":140500,\"level\":3},{\"id\":140581,\"name\":\"?????????\",\"pid\":140500,\"level\":3}]},{\"id\":140600,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140602,\"name\":\"?????????\",\"pid\":140600,\"level\":3},{\"id\":140603,\"name\":\"?????????\",\"pid\":140600,\"level\":3},{\"id\":140621,\"name\":\"?????????\",\"pid\":140600,\"level\":3},{\"id\":140622,\"name\":\"??????\",\"pid\":140600,\"level\":3},{\"id\":140623,\"name\":\"?????????\",\"pid\":140600,\"level\":3},{\"id\":140624,\"name\":\"?????????\",\"pid\":140600,\"level\":3}]},{\"id\":140700,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140702,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140721,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140722,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140723,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140724,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140725,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140726,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140727,\"name\":\"??????\",\"pid\":140700,\"level\":3},{\"id\":140728,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140729,\"name\":\"?????????\",\"pid\":140700,\"level\":3},{\"id\":140781,\"name\":\"?????????\",\"pid\":140700,\"level\":3}]},{\"id\":140800,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140802,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140821,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140822,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140823,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140824,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140825,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140826,\"name\":\"??????\",\"pid\":140800,\"level\":3},{\"id\":140827,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140828,\"name\":\"??????\",\"pid\":140800,\"level\":3},{\"id\":140829,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140830,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140881,\"name\":\"?????????\",\"pid\":140800,\"level\":3},{\"id\":140882,\"name\":\"?????????\",\"pid\":140800,\"level\":3}]},{\"id\":140900,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":140902,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140921,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140922,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140923,\"name\":\"??????\",\"pid\":140900,\"level\":3},{\"id\":140924,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140925,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140926,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140927,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140928,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140929,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140930,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140931,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140932,\"name\":\"?????????\",\"pid\":140900,\"level\":3},{\"id\":140981,\"name\":\"?????????\",\"pid\":140900,\"level\":3}]},{\"id\":141000,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":141002,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141021,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141022,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141023,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141024,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141025,\"name\":\"??????\",\"pid\":141000,\"level\":3},{\"id\":141026,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141027,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141028,\"name\":\"??????\",\"pid\":141000,\"level\":3},{\"id\":141029,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141030,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141031,\"name\":\"??????\",\"pid\":141000,\"level\":3},{\"id\":141032,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141033,\"name\":\"??????\",\"pid\":141000,\"level\":3},{\"id\":141034,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141081,\"name\":\"?????????\",\"pid\":141000,\"level\":3},{\"id\":141082,\"name\":\"?????????\",\"pid\":141000,\"level\":3}]},{\"id\":141100,\"name\":\"?????????\",\"pid\":140000,\"level\":2,\"children\":[{\"id\":141102,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141121,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141122,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141123,\"name\":\"??????\",\"pid\":141100,\"level\":3},{\"id\":141124,\"name\":\"??????\",\"pid\":141100,\"level\":3},{\"id\":141125,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141126,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141127,\"name\":\"??????\",\"pid\":141100,\"level\":3},{\"id\":141128,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141129,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141130,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141181,\"name\":\"?????????\",\"pid\":141100,\"level\":3},{\"id\":141182,\"name\":\"?????????\",\"pid\":141100,\"level\":3}]}]},{\"id\":150000,\"name\":\"??????????????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":150100,\"name\":\"???????????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150102,\"name\":\"?????????\",\"pid\":150100,\"level\":3},{\"id\":150103,\"name\":\"?????????\",\"pid\":150100,\"level\":3},{\"id\":150104,\"name\":\"?????????\",\"pid\":150100,\"level\":3},{\"id\":150105,\"name\":\"?????????\",\"pid\":150100,\"level\":3},{\"id\":150121,\"name\":\"???????????????\",\"pid\":150100,\"level\":3},{\"id\":150122,\"name\":\"????????????\",\"pid\":150100,\"level\":3},{\"id\":150123,\"name\":\"???????????????\",\"pid\":150100,\"level\":3},{\"id\":150124,\"name\":\"????????????\",\"pid\":150100,\"level\":3},{\"id\":150125,\"name\":\"?????????\",\"pid\":150100,\"level\":3}]},{\"id\":150200,\"name\":\"?????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150202,\"name\":\"?????????\",\"pid\":150200,\"level\":3},{\"id\":150203,\"name\":\"????????????\",\"pid\":150200,\"level\":3},{\"id\":150204,\"name\":\"?????????\",\"pid\":150200,\"level\":3},{\"id\":150205,\"name\":\"?????????\",\"pid\":150200,\"level\":3},{\"id\":150206,\"name\":\"??????????????????\",\"pid\":150200,\"level\":3},{\"id\":150207,\"name\":\"?????????\",\"pid\":150200,\"level\":3},{\"id\":150221,\"name\":\"???????????????\",\"pid\":150200,\"level\":3},{\"id\":150222,\"name\":\"?????????\",\"pid\":150200,\"level\":3},{\"id\":150223,\"name\":\"???????????????????????????\",\"pid\":150200,\"level\":3}]},{\"id\":150300,\"name\":\"?????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150302,\"name\":\"????????????\",\"pid\":150300,\"level\":3},{\"id\":150303,\"name\":\"?????????\",\"pid\":150300,\"level\":3},{\"id\":150304,\"name\":\"?????????\",\"pid\":150300,\"level\":3}]},{\"id\":150400,\"name\":\"?????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150402,\"name\":\"?????????\",\"pid\":150400,\"level\":3},{\"id\":150403,\"name\":\"????????????\",\"pid\":150400,\"level\":3},{\"id\":150404,\"name\":\"?????????\",\"pid\":150400,\"level\":3},{\"id\":150421,\"name\":\"??????????????????\",\"pid\":150400,\"level\":3},{\"id\":150422,\"name\":\"????????????\",\"pid\":150400,\"level\":3},{\"id\":150423,\"name\":\"????????????\",\"pid\":150400,\"level\":3},{\"id\":150424,\"name\":\"?????????\",\"pid\":150400,\"level\":3},{\"id\":150425,\"name\":\"???????????????\",\"pid\":150400,\"level\":3},{\"id\":150426,\"name\":\"????????????\",\"pid\":150400,\"level\":3},{\"id\":150428,\"name\":\"????????????\",\"pid\":150400,\"level\":3},{\"id\":150429,\"name\":\"?????????\",\"pid\":150400,\"level\":3},{\"id\":150430,\"name\":\"?????????\",\"pid\":150400,\"level\":3}]},{\"id\":150500,\"name\":\"?????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150502,\"name\":\"????????????\",\"pid\":150500,\"level\":3},{\"id\":150521,\"name\":\"?????????????????????\",\"pid\":150500,\"level\":3},{\"id\":150522,\"name\":\"?????????????????????\",\"pid\":150500,\"level\":3},{\"id\":150523,\"name\":\"?????????\",\"pid\":150500,\"level\":3},{\"id\":150524,\"name\":\"?????????\",\"pid\":150500,\"level\":3},{\"id\":150525,\"name\":\"?????????\",\"pid\":150500,\"level\":3},{\"id\":150526,\"name\":\"????????????\",\"pid\":150500,\"level\":3},{\"id\":150581,\"name\":\"???????????????\",\"pid\":150500,\"level\":3}]},{\"id\":150600,\"name\":\"???????????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150602,\"name\":\"?????????\",\"pid\":150600,\"level\":3},{\"id\":150621,\"name\":\"????????????\",\"pid\":150600,\"level\":3},{\"id\":150622,\"name\":\"????????????\",\"pid\":150600,\"level\":3},{\"id\":150623,\"name\":\"???????????????\",\"pid\":150600,\"level\":3},{\"id\":150624,\"name\":\"????????????\",\"pid\":150600,\"level\":3},{\"id\":150625,\"name\":\"?????????\",\"pid\":150600,\"level\":3},{\"id\":150626,\"name\":\"?????????\",\"pid\":150600,\"level\":3},{\"id\":150627,\"name\":\"???????????????\",\"pid\":150600,\"level\":3}]},{\"id\":150700,\"name\":\"???????????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150702,\"name\":\"????????????\",\"pid\":150700,\"level\":3},{\"id\":150703,\"name\":\"???????????????\",\"pid\":150700,\"level\":3},{\"id\":150721,\"name\":\"?????????\",\"pid\":150700,\"level\":3},{\"id\":150722,\"name\":\"?????????????????????????????????\",\"pid\":150700,\"level\":3},{\"id\":150723,\"name\":\"??????????????????\",\"pid\":150700,\"level\":3},{\"id\":150724,\"name\":\"?????????????????????\",\"pid\":150700,\"level\":3},{\"id\":150725,\"name\":\"???????????????\",\"pid\":150700,\"level\":3},{\"id\":150726,\"name\":\"??????????????????\",\"pid\":150700,\"level\":3},{\"id\":150727,\"name\":\"??????????????????\",\"pid\":150700,\"level\":3},{\"id\":150781,\"name\":\"????????????\",\"pid\":150700,\"level\":3},{\"id\":150782,\"name\":\"????????????\",\"pid\":150700,\"level\":3},{\"id\":150783,\"name\":\"????????????\",\"pid\":150700,\"level\":3},{\"id\":150784,\"name\":\"???????????????\",\"pid\":150700,\"level\":3},{\"id\":150785,\"name\":\"?????????\",\"pid\":150700,\"level\":3}]},{\"id\":150800,\"name\":\"???????????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150802,\"name\":\"?????????\",\"pid\":150800,\"level\":3},{\"id\":150821,\"name\":\"?????????\",\"pid\":150800,\"level\":3},{\"id\":150822,\"name\":\"?????????\",\"pid\":150800,\"level\":3},{\"id\":150823,\"name\":\"???????????????\",\"pid\":150800,\"level\":3},{\"id\":150824,\"name\":\"???????????????\",\"pid\":150800,\"level\":3},{\"id\":150825,\"name\":\"???????????????\",\"pid\":150800,\"level\":3},{\"id\":150826,\"name\":\"????????????\",\"pid\":150800,\"level\":3}]},{\"id\":150900,\"name\":\"???????????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":150902,\"name\":\"?????????\",\"pid\":150900,\"level\":3},{\"id\":150921,\"name\":\"?????????\",\"pid\":150900,\"level\":3},{\"id\":150922,\"name\":\"?????????\",\"pid\":150900,\"level\":3},{\"id\":150923,\"name\":\"?????????\",\"pid\":150900,\"level\":3},{\"id\":150924,\"name\":\"?????????\",\"pid\":150900,\"level\":3},{\"id\":150925,\"name\":\"?????????\",\"pid\":150900,\"level\":3},{\"id\":150926,\"name\":\"?????????????????????\",\"pid\":150900,\"level\":3},{\"id\":150927,\"name\":\"?????????????????????\",\"pid\":150900,\"level\":3},{\"id\":150928,\"name\":\"?????????????????????\",\"pid\":150900,\"level\":3},{\"id\":150929,\"name\":\"????????????\",\"pid\":150900,\"level\":3},{\"id\":150981,\"name\":\"?????????\",\"pid\":150900,\"level\":3}]},{\"id\":152200,\"name\":\"?????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":152201,\"name\":\"???????????????\",\"pid\":152200,\"level\":3},{\"id\":152202,\"name\":\"????????????\",\"pid\":152200,\"level\":3},{\"id\":152221,\"name\":\"?????????????????????\",\"pid\":152200,\"level\":3},{\"id\":152222,\"name\":\"?????????????????????\",\"pid\":152200,\"level\":3},{\"id\":152223,\"name\":\"????????????\",\"pid\":152200,\"level\":3},{\"id\":152224,\"name\":\"?????????\",\"pid\":152200,\"level\":3}]},{\"id\":152500,\"name\":\"???????????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":152501,\"name\":\"???????????????\",\"pid\":152500,\"level\":3},{\"id\":152502,\"name\":\"???????????????\",\"pid\":152500,\"level\":3},{\"id\":152522,\"name\":\"????????????\",\"pid\":152500,\"level\":3},{\"id\":152523,\"name\":\"???????????????\",\"pid\":152500,\"level\":3},{\"id\":152524,\"name\":\"???????????????\",\"pid\":152500,\"level\":3},{\"id\":152525,\"name\":\"??????????????????\",\"pid\":152500,\"level\":3},{\"id\":152526,\"name\":\"??????????????????\",\"pid\":152500,\"level\":3},{\"id\":152527,\"name\":\"????????????\",\"pid\":152500,\"level\":3},{\"id\":152528,\"name\":\"?????????\",\"pid\":152500,\"level\":3},{\"id\":152529,\"name\":\"????????????\",\"pid\":152500,\"level\":3},{\"id\":152530,\"name\":\"?????????\",\"pid\":152500,\"level\":3},{\"id\":152531,\"name\":\"?????????\",\"pid\":152500,\"level\":3}]},{\"id\":152900,\"name\":\"????????????\",\"pid\":150000,\"level\":2,\"children\":[{\"id\":152921,\"name\":\"???????????????\",\"pid\":152900,\"level\":3},{\"id\":152922,\"name\":\"???????????????\",\"pid\":152900,\"level\":3},{\"id\":152923,\"name\":\"????????????\",\"pid\":152900,\"level\":3}]}]},{\"id\":210000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":210100,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210102,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210103,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210104,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210105,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210106,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210111,\"name\":\"????????????\",\"pid\":210100,\"level\":3},{\"id\":210112,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210113,\"name\":\"????????????\",\"pid\":210100,\"level\":3},{\"id\":210114,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210122,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210123,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210124,\"name\":\"?????????\",\"pid\":210100,\"level\":3},{\"id\":210181,\"name\":\"?????????\",\"pid\":210100,\"level\":3}]},{\"id\":210200,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210202,\"name\":\"?????????\",\"pid\":210200,\"level\":3},{\"id\":210203,\"name\":\"?????????\",\"pid\":210200,\"level\":3},{\"id\":210204,\"name\":\"????????????\",\"pid\":210200,\"level\":3},{\"id\":210211,\"name\":\"????????????\",\"pid\":210200,\"level\":3},{\"id\":210212,\"name\":\"????????????\",\"pid\":210200,\"level\":3},{\"id\":210213,\"name\":\"?????????\",\"pid\":210200,\"level\":3},{\"id\":210224,\"name\":\"?????????\",\"pid\":210200,\"level\":3},{\"id\":210281,\"name\":\"????????????\",\"pid\":210200,\"level\":3},{\"id\":210282,\"name\":\"????????????\",\"pid\":210200,\"level\":3},{\"id\":210283,\"name\":\"?????????\",\"pid\":210200,\"level\":3}]},{\"id\":210300,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210302,\"name\":\"?????????\",\"pid\":210300,\"level\":3},{\"id\":210303,\"name\":\"?????????\",\"pid\":210300,\"level\":3},{\"id\":210304,\"name\":\"?????????\",\"pid\":210300,\"level\":3},{\"id\":210311,\"name\":\"?????????\",\"pid\":210300,\"level\":3},{\"id\":210321,\"name\":\"?????????\",\"pid\":210300,\"level\":3},{\"id\":210323,\"name\":\"?????????????????????\",\"pid\":210300,\"level\":3},{\"id\":210381,\"name\":\"?????????\",\"pid\":210300,\"level\":3}]},{\"id\":210400,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210402,\"name\":\"?????????\",\"pid\":210400,\"level\":3},{\"id\":210403,\"name\":\"?????????\",\"pid\":210400,\"level\":3},{\"id\":210404,\"name\":\"?????????\",\"pid\":210400,\"level\":3},{\"id\":210411,\"name\":\"?????????\",\"pid\":210400,\"level\":3},{\"id\":210421,\"name\":\"?????????\",\"pid\":210400,\"level\":3},{\"id\":210422,\"name\":\"?????????????????????\",\"pid\":210400,\"level\":3},{\"id\":210423,\"name\":\"?????????????????????\",\"pid\":210400,\"level\":3}]},{\"id\":210500,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210502,\"name\":\"?????????\",\"pid\":210500,\"level\":3},{\"id\":210503,\"name\":\"?????????\",\"pid\":210500,\"level\":3},{\"id\":210504,\"name\":\"?????????\",\"pid\":210500,\"level\":3},{\"id\":210505,\"name\":\"?????????\",\"pid\":210500,\"level\":3},{\"id\":210521,\"name\":\"?????????????????????\",\"pid\":210500,\"level\":3},{\"id\":210522,\"name\":\"?????????????????????\",\"pid\":210500,\"level\":3}]},{\"id\":210600,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210602,\"name\":\"?????????\",\"pid\":210600,\"level\":3},{\"id\":210603,\"name\":\"?????????\",\"pid\":210600,\"level\":3},{\"id\":210604,\"name\":\"?????????\",\"pid\":210600,\"level\":3},{\"id\":210624,\"name\":\"?????????????????????\",\"pid\":210600,\"level\":3},{\"id\":210681,\"name\":\"?????????\",\"pid\":210600,\"level\":3},{\"id\":210682,\"name\":\"?????????\",\"pid\":210600,\"level\":3}]},{\"id\":210700,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210702,\"name\":\"?????????\",\"pid\":210700,\"level\":3},{\"id\":210703,\"name\":\"?????????\",\"pid\":210700,\"level\":3},{\"id\":210711,\"name\":\"?????????\",\"pid\":210700,\"level\":3},{\"id\":210726,\"name\":\"?????????\",\"pid\":210700,\"level\":3},{\"id\":210727,\"name\":\"??????\",\"pid\":210700,\"level\":3},{\"id\":210781,\"name\":\"?????????\",\"pid\":210700,\"level\":3},{\"id\":210782,\"name\":\"?????????\",\"pid\":210700,\"level\":3}]},{\"id\":210800,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210802,\"name\":\"?????????\",\"pid\":210800,\"level\":3},{\"id\":210803,\"name\":\"?????????\",\"pid\":210800,\"level\":3},{\"id\":210804,\"name\":\"????????????\",\"pid\":210800,\"level\":3},{\"id\":210811,\"name\":\"?????????\",\"pid\":210800,\"level\":3},{\"id\":210881,\"name\":\"?????????\",\"pid\":210800,\"level\":3},{\"id\":210882,\"name\":\"????????????\",\"pid\":210800,\"level\":3}]},{\"id\":210900,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":210902,\"name\":\"?????????\",\"pid\":210900,\"level\":3},{\"id\":210903,\"name\":\"?????????\",\"pid\":210900,\"level\":3},{\"id\":210904,\"name\":\"?????????\",\"pid\":210900,\"level\":3},{\"id\":210905,\"name\":\"????????????\",\"pid\":210900,\"level\":3},{\"id\":210911,\"name\":\"?????????\",\"pid\":210900,\"level\":3},{\"id\":210921,\"name\":\"????????????????????????\",\"pid\":210900,\"level\":3},{\"id\":210922,\"name\":\"?????????\",\"pid\":210900,\"level\":3}]},{\"id\":211000,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":211002,\"name\":\"?????????\",\"pid\":211000,\"level\":3},{\"id\":211003,\"name\":\"?????????\",\"pid\":211000,\"level\":3},{\"id\":211004,\"name\":\"?????????\",\"pid\":211000,\"level\":3},{\"id\":211005,\"name\":\"????????????\",\"pid\":211000,\"level\":3},{\"id\":211011,\"name\":\"????????????\",\"pid\":211000,\"level\":3},{\"id\":211021,\"name\":\"?????????\",\"pid\":211000,\"level\":3},{\"id\":211081,\"name\":\"?????????\",\"pid\":211000,\"level\":3}]},{\"id\":211100,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":211102,\"name\":\"????????????\",\"pid\":211100,\"level\":3},{\"id\":211103,\"name\":\"????????????\",\"pid\":211100,\"level\":3},{\"id\":211121,\"name\":\"?????????\",\"pid\":211100,\"level\":3},{\"id\":211122,\"name\":\"?????????\",\"pid\":211100,\"level\":3}]},{\"id\":211200,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":211202,\"name\":\"?????????\",\"pid\":211200,\"level\":3},{\"id\":211204,\"name\":\"?????????\",\"pid\":211200,\"level\":3},{\"id\":211221,\"name\":\"?????????\",\"pid\":211200,\"level\":3},{\"id\":211223,\"name\":\"?????????\",\"pid\":211200,\"level\":3},{\"id\":211224,\"name\":\"?????????\",\"pid\":211200,\"level\":3},{\"id\":211281,\"name\":\"????????????\",\"pid\":211200,\"level\":3},{\"id\":211282,\"name\":\"?????????\",\"pid\":211200,\"level\":3}]},{\"id\":211300,\"name\":\"?????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":211302,\"name\":\"?????????\",\"pid\":211300,\"level\":3},{\"id\":211303,\"name\":\"?????????\",\"pid\":211300,\"level\":3},{\"id\":211321,\"name\":\"?????????\",\"pid\":211300,\"level\":3},{\"id\":211322,\"name\":\"?????????\",\"pid\":211300,\"level\":3},{\"id\":211324,\"name\":\"?????????????????????????????????\",\"pid\":211300,\"level\":3},{\"id\":211381,\"name\":\"?????????\",\"pid\":211300,\"level\":3},{\"id\":211382,\"name\":\"?????????\",\"pid\":211300,\"level\":3}]},{\"id\":211400,\"name\":\"????????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":211402,\"name\":\"?????????\",\"pid\":211400,\"level\":3},{\"id\":211403,\"name\":\"?????????\",\"pid\":211400,\"level\":3},{\"id\":211404,\"name\":\"?????????\",\"pid\":211400,\"level\":3},{\"id\":211421,\"name\":\"?????????\",\"pid\":211400,\"level\":3},{\"id\":211422,\"name\":\"?????????\",\"pid\":211400,\"level\":3},{\"id\":211481,\"name\":\"?????????\",\"pid\":211400,\"level\":3}]},{\"id\":211500,\"name\":\"????????????\",\"pid\":210000,\"level\":2,\"children\":[{\"id\":211501,\"name\":\"????????????\",\"pid\":211500,\"level\":3},{\"id\":211502,\"name\":\"????????????\",\"pid\":211500,\"level\":3},{\"id\":211503,\"name\":\"?????????\",\"pid\":211500,\"level\":3}]}]},{\"id\":220000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":220100,\"name\":\"?????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":220102,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220103,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220104,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220105,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220106,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220112,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220113,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220122,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220182,\"name\":\"?????????\",\"pid\":220100,\"level\":3},{\"id\":220183,\"name\":\"?????????\",\"pid\":220100,\"level\":3}]},{\"id\":220200,\"name\":\"?????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":220202,\"name\":\"?????????\",\"pid\":220200,\"level\":3},{\"id\":220203,\"name\":\"?????????\",\"pid\":220200,\"level\":3},{\"id\":220204,\"name\":\"?????????\",\"pid\":220200,\"level\":3},{\"id\":220211,\"name\":\"?????????\",\"pid\":220200,\"level\":3},{\"id\":220221,\"name\":\"?????????\",\"pid\":220200,\"level\":3},{\"id\":220281,\"name\":\"?????????\",\"pid\":220200,\"level\":3},{\"id\":220282,\"name\":\"?????????\",\"pid\":220200,\"level\":3},{\"id\":220283,\"name\":\"?????????\",\"pid\":220200,\"level\":3},{\"id\":220284,\"name\":\"?????????\",\"pid\":220200,\"level\":3}]},{\"id\":220300,\"name\":\"?????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":220302,\"name\":\"?????????\",\"pid\":220300,\"level\":3},{\"id\":220303,\"name\":\"?????????\",\"pid\":220300,\"level\":3},{\"id\":220322,\"name\":\"?????????\",\"pid\":220300,\"level\":3},{\"id\":220323,\"name\":\"?????????????????????\",\"pid\":220300,\"level\":3},{\"id\":220381,\"name\":\"????????????\",\"pid\":220300,\"level\":3},{\"id\":220382,\"name\":\"?????????\",\"pid\":220300,\"level\":3}]},{\"id\":220400,\"name\":\"?????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":220402,\"name\":\"?????????\",\"pid\":220400,\"level\":3},{\"id\":220403,\"name\":\"?????????\",\"pid\":220400,\"level\":3},{\"id\":220421,\"name\":\"?????????\",\"pid\":220400,\"level\":3},{\"id\":220422,\"name\":\"?????????\",\"pid\":220400,\"level\":3}]},{\"id\":220500,\"name\":\"?????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":220502,\"name\":\"?????????\",\"pid\":220500,\"level\":3},{\"id\":220503,\"name\":\"????????????\",\"pid\":220500,\"level\":3},{\"id\":220521,\"name\":\"?????????\",\"pid\":220500,\"level\":3},{\"id\":220523,\"name\":\"?????????\",\"pid\":220500,\"level\":3},{\"id\":220524,\"name\":\"?????????\",\"pid\":220500,\"level\":3},{\"id\":220581,\"name\":\"????????????\",\"pid\":220500,\"level\":3},{\"id\":220582,\"name\":\"?????????\",\"pid\":220500,\"level\":3}]},{\"id\":220600,\"name\":\"?????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":220602,\"name\":\"?????????\",\"pid\":220600,\"level\":3},{\"id\":220605,\"name\":\"?????????\",\"pid\":220600,\"level\":3},{\"id\":220621,\"name\":\"?????????\",\"pid\":220600,\"level\":3},{\"id\":220622,\"name\":\"?????????\",\"pid\":220600,\"level\":3},{\"id\":220623,\"name\":\"????????????????????????\",\"pid\":220600,\"level\":3},{\"id\":220681,\"name\":\"?????????\",\"pid\":220600,\"level\":3}]},{\"id\":220700,\"name\":\"?????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":220702,\"name\":\"?????????\",\"pid\":220700,\"level\":3},{\"id\":220721,\"name\":\"?????????????????????????????????\",\"pid\":220700,\"level\":3},{\"id\":220722,\"name\":\"?????????\",\"pid\":220700,\"level\":3},{\"id\":220723,\"name\":\"?????????\",\"pid\":220700,\"level\":3},{\"id\":220781,\"name\":\"?????????\",\"pid\":220700,\"level\":3}]},{\"id\":220800,\"name\":\"?????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":220802,\"name\":\"?????????\",\"pid\":220800,\"level\":3},{\"id\":220821,\"name\":\"?????????\",\"pid\":220800,\"level\":3},{\"id\":220822,\"name\":\"?????????\",\"pid\":220800,\"level\":3},{\"id\":220881,\"name\":\"?????????\",\"pid\":220800,\"level\":3},{\"id\":220882,\"name\":\"?????????\",\"pid\":220800,\"level\":3}]},{\"id\":222400,\"name\":\"????????????????????????\",\"pid\":220000,\"level\":2,\"children\":[{\"id\":222401,\"name\":\"?????????\",\"pid\":222400,\"level\":3},{\"id\":222402,\"name\":\"?????????\",\"pid\":222400,\"level\":3},{\"id\":222403,\"name\":\"?????????\",\"pid\":222400,\"level\":3},{\"id\":222404,\"name\":\"?????????\",\"pid\":222400,\"level\":3},{\"id\":222405,\"name\":\"?????????\",\"pid\":222400,\"level\":3},{\"id\":222406,\"name\":\"?????????\",\"pid\":222400,\"level\":3},{\"id\":222424,\"name\":\"?????????\",\"pid\":222400,\"level\":3},{\"id\":222426,\"name\":\"?????????\",\"pid\":222400,\"level\":3}]}]},{\"id\":230000,\"name\":\"????????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":230100,\"name\":\"????????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230102,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230103,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230104,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230108,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230109,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230110,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230111,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230112,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230113,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230123,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230124,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230125,\"name\":\"??????\",\"pid\":230100,\"level\":3},{\"id\":230126,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230127,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230128,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230129,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230183,\"name\":\"?????????\",\"pid\":230100,\"level\":3},{\"id\":230184,\"name\":\"?????????\",\"pid\":230100,\"level\":3}]},{\"id\":230200,\"name\":\"???????????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230202,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230203,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230204,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230205,\"name\":\"????????????\",\"pid\":230200,\"level\":3},{\"id\":230206,\"name\":\"???????????????\",\"pid\":230200,\"level\":3},{\"id\":230207,\"name\":\"????????????\",\"pid\":230200,\"level\":3},{\"id\":230208,\"name\":\"????????????????????????\",\"pid\":230200,\"level\":3},{\"id\":230221,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230223,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230224,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230225,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230227,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230229,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230230,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230231,\"name\":\"?????????\",\"pid\":230200,\"level\":3},{\"id\":230281,\"name\":\"?????????\",\"pid\":230200,\"level\":3}]},{\"id\":230300,\"name\":\"?????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230302,\"name\":\"?????????\",\"pid\":230300,\"level\":3},{\"id\":230303,\"name\":\"?????????\",\"pid\":230300,\"level\":3},{\"id\":230304,\"name\":\"?????????\",\"pid\":230300,\"level\":3},{\"id\":230305,\"name\":\"?????????\",\"pid\":230300,\"level\":3},{\"id\":230306,\"name\":\"????????????\",\"pid\":230300,\"level\":3},{\"id\":230307,\"name\":\"?????????\",\"pid\":230300,\"level\":3},{\"id\":230321,\"name\":\"?????????\",\"pid\":230300,\"level\":3},{\"id\":230381,\"name\":\"?????????\",\"pid\":230300,\"level\":3},{\"id\":230382,\"name\":\"?????????\",\"pid\":230300,\"level\":3}]},{\"id\":230400,\"name\":\"?????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230402,\"name\":\"?????????\",\"pid\":230400,\"level\":3},{\"id\":230403,\"name\":\"?????????\",\"pid\":230400,\"level\":3},{\"id\":230404,\"name\":\"?????????\",\"pid\":230400,\"level\":3},{\"id\":230405,\"name\":\"?????????\",\"pid\":230400,\"level\":3},{\"id\":230406,\"name\":\"?????????\",\"pid\":230400,\"level\":3},{\"id\":230407,\"name\":\"?????????\",\"pid\":230400,\"level\":3},{\"id\":230421,\"name\":\"?????????\",\"pid\":230400,\"level\":3},{\"id\":230422,\"name\":\"?????????\",\"pid\":230400,\"level\":3}]},{\"id\":230500,\"name\":\"????????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230502,\"name\":\"?????????\",\"pid\":230500,\"level\":3},{\"id\":230503,\"name\":\"?????????\",\"pid\":230500,\"level\":3},{\"id\":230505,\"name\":\"????????????\",\"pid\":230500,\"level\":3},{\"id\":230506,\"name\":\"?????????\",\"pid\":230500,\"level\":3},{\"id\":230521,\"name\":\"?????????\",\"pid\":230500,\"level\":3},{\"id\":230522,\"name\":\"?????????\",\"pid\":230500,\"level\":3},{\"id\":230523,\"name\":\"?????????\",\"pid\":230500,\"level\":3},{\"id\":230524,\"name\":\"?????????\",\"pid\":230500,\"level\":3}]},{\"id\":230600,\"name\":\"?????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230602,\"name\":\"????????????\",\"pid\":230600,\"level\":3},{\"id\":230603,\"name\":\"?????????\",\"pid\":230600,\"level\":3},{\"id\":230604,\"name\":\"????????????\",\"pid\":230600,\"level\":3},{\"id\":230605,\"name\":\"?????????\",\"pid\":230600,\"level\":3},{\"id\":230606,\"name\":\"?????????\",\"pid\":230600,\"level\":3},{\"id\":230621,\"name\":\"?????????\",\"pid\":230600,\"level\":3},{\"id\":230622,\"name\":\"?????????\",\"pid\":230600,\"level\":3},{\"id\":230623,\"name\":\"?????????\",\"pid\":230600,\"level\":3},{\"id\":230624,\"name\":\"??????????????????????????????\",\"pid\":230600,\"level\":3}]},{\"id\":230700,\"name\":\"?????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230702,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230703,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230704,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230705,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230706,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230707,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230708,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230709,\"name\":\"????????????\",\"pid\":230700,\"level\":3},{\"id\":230710,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230711,\"name\":\"????????????\",\"pid\":230700,\"level\":3},{\"id\":230712,\"name\":\"????????????\",\"pid\":230700,\"level\":3},{\"id\":230713,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230714,\"name\":\"????????????\",\"pid\":230700,\"level\":3},{\"id\":230715,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230716,\"name\":\"????????????\",\"pid\":230700,\"level\":3},{\"id\":230722,\"name\":\"?????????\",\"pid\":230700,\"level\":3},{\"id\":230781,\"name\":\"?????????\",\"pid\":230700,\"level\":3}]},{\"id\":230800,\"name\":\"????????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230803,\"name\":\"?????????\",\"pid\":230800,\"level\":3},{\"id\":230804,\"name\":\"?????????\",\"pid\":230800,\"level\":3},{\"id\":230805,\"name\":\"?????????\",\"pid\":230800,\"level\":3},{\"id\":230811,\"name\":\"??????\",\"pid\":230800,\"level\":3},{\"id\":230822,\"name\":\"?????????\",\"pid\":230800,\"level\":3},{\"id\":230826,\"name\":\"?????????\",\"pid\":230800,\"level\":3},{\"id\":230828,\"name\":\"?????????\",\"pid\":230800,\"level\":3},{\"id\":230833,\"name\":\"?????????\",\"pid\":230800,\"level\":3},{\"id\":230881,\"name\":\"?????????\",\"pid\":230800,\"level\":3},{\"id\":230882,\"name\":\"?????????\",\"pid\":230800,\"level\":3}]},{\"id\":230900,\"name\":\"????????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":230902,\"name\":\"?????????\",\"pid\":230900,\"level\":3},{\"id\":230903,\"name\":\"?????????\",\"pid\":230900,\"level\":3},{\"id\":230904,\"name\":\"????????????\",\"pid\":230900,\"level\":3},{\"id\":230921,\"name\":\"?????????\",\"pid\":230900,\"level\":3}]},{\"id\":231000,\"name\":\"????????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":231002,\"name\":\"?????????\",\"pid\":231000,\"level\":3},{\"id\":231003,\"name\":\"?????????\",\"pid\":231000,\"level\":3},{\"id\":231004,\"name\":\"?????????\",\"pid\":231000,\"level\":3},{\"id\":231005,\"name\":\"?????????\",\"pid\":231000,\"level\":3},{\"id\":231024,\"name\":\"?????????\",\"pid\":231000,\"level\":3},{\"id\":231025,\"name\":\"?????????\",\"pid\":231000,\"level\":3},{\"id\":231081,\"name\":\"????????????\",\"pid\":231000,\"level\":3},{\"id\":231083,\"name\":\"?????????\",\"pid\":231000,\"level\":3},{\"id\":231084,\"name\":\"?????????\",\"pid\":231000,\"level\":3},{\"id\":231085,\"name\":\"?????????\",\"pid\":231000,\"level\":3}]},{\"id\":231100,\"name\":\"?????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":231102,\"name\":\"?????????\",\"pid\":231100,\"level\":3},{\"id\":231121,\"name\":\"?????????\",\"pid\":231100,\"level\":3},{\"id\":231123,\"name\":\"?????????\",\"pid\":231100,\"level\":3},{\"id\":231124,\"name\":\"?????????\",\"pid\":231100,\"level\":3},{\"id\":231181,\"name\":\"?????????\",\"pid\":231100,\"level\":3},{\"id\":231182,\"name\":\"???????????????\",\"pid\":231100,\"level\":3}]},{\"id\":231200,\"name\":\"?????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":231202,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231221,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231222,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231223,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231224,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231225,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231226,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231281,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231282,\"name\":\"?????????\",\"pid\":231200,\"level\":3},{\"id\":231283,\"name\":\"?????????\",\"pid\":231200,\"level\":3}]},{\"id\":232700,\"name\":\"??????????????????\",\"pid\":230000,\"level\":2,\"children\":[{\"id\":232701,\"name\":\"???????????????\",\"pid\":232700,\"level\":3},{\"id\":232702,\"name\":\"?????????\",\"pid\":232700,\"level\":3},{\"id\":232703,\"name\":\"?????????\",\"pid\":232700,\"level\":3},{\"id\":232704,\"name\":\"?????????\",\"pid\":232700,\"level\":3},{\"id\":232721,\"name\":\"?????????\",\"pid\":232700,\"level\":3},{\"id\":232722,\"name\":\"?????????\",\"pid\":232700,\"level\":3},{\"id\":232723,\"name\":\"?????????\",\"pid\":232700,\"level\":3}]}]},{\"id\":310000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":310100,\"name\":\"?????????\",\"pid\":310000,\"level\":2,\"children\":[{\"id\":310101,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310104,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310105,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310106,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310107,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310108,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310109,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310110,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310112,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310113,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310114,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310115,\"name\":\"????????????\",\"pid\":310100,\"level\":3},{\"id\":310116,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310117,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310118,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310120,\"name\":\"?????????\",\"pid\":310100,\"level\":3},{\"id\":310230,\"name\":\"?????????\",\"pid\":310100,\"level\":3}]}]},{\"id\":320000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":320100,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320102,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320104,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320105,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320106,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320111,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320113,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320114,\"name\":\"????????????\",\"pid\":320100,\"level\":3},{\"id\":320115,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320116,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320117,\"name\":\"?????????\",\"pid\":320100,\"level\":3},{\"id\":320118,\"name\":\"?????????\",\"pid\":320100,\"level\":3}]},{\"id\":320200,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320202,\"name\":\"?????????\",\"pid\":320200,\"level\":3},{\"id\":320203,\"name\":\"?????????\",\"pid\":320200,\"level\":3},{\"id\":320204,\"name\":\"?????????\",\"pid\":320200,\"level\":3},{\"id\":320205,\"name\":\"?????????\",\"pid\":320200,\"level\":3},{\"id\":320206,\"name\":\"?????????\",\"pid\":320200,\"level\":3},{\"id\":320211,\"name\":\"?????????\",\"pid\":320200,\"level\":3},{\"id\":320281,\"name\":\"?????????\",\"pid\":320200,\"level\":3},{\"id\":320282,\"name\":\"?????????\",\"pid\":320200,\"level\":3}]},{\"id\":320300,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320302,\"name\":\"?????????\",\"pid\":320300,\"level\":3},{\"id\":320303,\"name\":\"?????????\",\"pid\":320300,\"level\":3},{\"id\":320305,\"name\":\"?????????\",\"pid\":320300,\"level\":3},{\"id\":320311,\"name\":\"?????????\",\"pid\":320300,\"level\":3},{\"id\":320312,\"name\":\"?????????\",\"pid\":320300,\"level\":3},{\"id\":320321,\"name\":\"??????\",\"pid\":320300,\"level\":3},{\"id\":320322,\"name\":\"??????\",\"pid\":320300,\"level\":3},{\"id\":320324,\"name\":\"?????????\",\"pid\":320300,\"level\":3},{\"id\":320381,\"name\":\"?????????\",\"pid\":320300,\"level\":3},{\"id\":320382,\"name\":\"?????????\",\"pid\":320300,\"level\":3}]},{\"id\":320400,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320402,\"name\":\"?????????\",\"pid\":320400,\"level\":3},{\"id\":320404,\"name\":\"?????????\",\"pid\":320400,\"level\":3},{\"id\":320405,\"name\":\"????????????\",\"pid\":320400,\"level\":3},{\"id\":320411,\"name\":\"?????????\",\"pid\":320400,\"level\":3},{\"id\":320412,\"name\":\"?????????\",\"pid\":320400,\"level\":3},{\"id\":320481,\"name\":\"?????????\",\"pid\":320400,\"level\":3},{\"id\":320482,\"name\":\"?????????\",\"pid\":320400,\"level\":3}]},{\"id\":320500,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320505,\"name\":\"?????????\",\"pid\":320500,\"level\":3},{\"id\":320506,\"name\":\"?????????\",\"pid\":320500,\"level\":3},{\"id\":320507,\"name\":\"?????????\",\"pid\":320500,\"level\":3},{\"id\":320508,\"name\":\"?????????\",\"pid\":320500,\"level\":3},{\"id\":320509,\"name\":\"?????????\",\"pid\":320500,\"level\":3},{\"id\":320581,\"name\":\"?????????\",\"pid\":320500,\"level\":3},{\"id\":320582,\"name\":\"????????????\",\"pid\":320500,\"level\":3},{\"id\":320583,\"name\":\"?????????\",\"pid\":320500,\"level\":3},{\"id\":320585,\"name\":\"?????????\",\"pid\":320500,\"level\":3}]},{\"id\":320600,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320602,\"name\":\"?????????\",\"pid\":320600,\"level\":3},{\"id\":320611,\"name\":\"?????????\",\"pid\":320600,\"level\":3},{\"id\":320612,\"name\":\"?????????\",\"pid\":320600,\"level\":3},{\"id\":320621,\"name\":\"?????????\",\"pid\":320600,\"level\":3},{\"id\":320623,\"name\":\"?????????\",\"pid\":320600,\"level\":3},{\"id\":320681,\"name\":\"?????????\",\"pid\":320600,\"level\":3},{\"id\":320682,\"name\":\"?????????\",\"pid\":320600,\"level\":3},{\"id\":320684,\"name\":\"?????????\",\"pid\":320600,\"level\":3}]},{\"id\":320700,\"name\":\"????????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320703,\"name\":\"?????????\",\"pid\":320700,\"level\":3},{\"id\":320706,\"name\":\"?????????\",\"pid\":320700,\"level\":3},{\"id\":320707,\"name\":\"?????????\",\"pid\":320700,\"level\":3},{\"id\":320722,\"name\":\"?????????\",\"pid\":320700,\"level\":3},{\"id\":320723,\"name\":\"?????????\",\"pid\":320700,\"level\":3},{\"id\":320724,\"name\":\"?????????\",\"pid\":320700,\"level\":3}]},{\"id\":320800,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320802,\"name\":\"?????????\",\"pid\":320800,\"level\":3},{\"id\":320803,\"name\":\"?????????\",\"pid\":320800,\"level\":3},{\"id\":320804,\"name\":\"?????????\",\"pid\":320800,\"level\":3},{\"id\":320811,\"name\":\"?????????\",\"pid\":320800,\"level\":3},{\"id\":320826,\"name\":\"?????????\",\"pid\":320800,\"level\":3},{\"id\":320829,\"name\":\"?????????\",\"pid\":320800,\"level\":3},{\"id\":320830,\"name\":\"?????????\",\"pid\":320800,\"level\":3},{\"id\":320831,\"name\":\"?????????\",\"pid\":320800,\"level\":3}]},{\"id\":320900,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":320902,\"name\":\"?????????\",\"pid\":320900,\"level\":3},{\"id\":320903,\"name\":\"?????????\",\"pid\":320900,\"level\":3},{\"id\":320921,\"name\":\"?????????\",\"pid\":320900,\"level\":3},{\"id\":320922,\"name\":\"?????????\",\"pid\":320900,\"level\":3},{\"id\":320923,\"name\":\"?????????\",\"pid\":320900,\"level\":3},{\"id\":320924,\"name\":\"?????????\",\"pid\":320900,\"level\":3},{\"id\":320925,\"name\":\"?????????\",\"pid\":320900,\"level\":3},{\"id\":320981,\"name\":\"?????????\",\"pid\":320900,\"level\":3},{\"id\":320982,\"name\":\"?????????\",\"pid\":320900,\"level\":3}]},{\"id\":321000,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":321002,\"name\":\"?????????\",\"pid\":321000,\"level\":3},{\"id\":321003,\"name\":\"?????????\",\"pid\":321000,\"level\":3},{\"id\":321012,\"name\":\"?????????\",\"pid\":321000,\"level\":3},{\"id\":321023,\"name\":\"?????????\",\"pid\":321000,\"level\":3},{\"id\":321081,\"name\":\"?????????\",\"pid\":321000,\"level\":3},{\"id\":321084,\"name\":\"?????????\",\"pid\":321000,\"level\":3}]},{\"id\":321100,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":321102,\"name\":\"?????????\",\"pid\":321100,\"level\":3},{\"id\":321111,\"name\":\"?????????\",\"pid\":321100,\"level\":3},{\"id\":321112,\"name\":\"?????????\",\"pid\":321100,\"level\":3},{\"id\":321181,\"name\":\"?????????\",\"pid\":321100,\"level\":3},{\"id\":321182,\"name\":\"?????????\",\"pid\":321100,\"level\":3},{\"id\":321183,\"name\":\"?????????\",\"pid\":321100,\"level\":3}]},{\"id\":321200,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":321202,\"name\":\"?????????\",\"pid\":321200,\"level\":3},{\"id\":321203,\"name\":\"?????????\",\"pid\":321200,\"level\":3},{\"id\":321204,\"name\":\"?????????\",\"pid\":321200,\"level\":3},{\"id\":321281,\"name\":\"?????????\",\"pid\":321200,\"level\":3},{\"id\":321282,\"name\":\"?????????\",\"pid\":321200,\"level\":3},{\"id\":321283,\"name\":\"?????????\",\"pid\":321200,\"level\":3}]},{\"id\":321300,\"name\":\"?????????\",\"pid\":320000,\"level\":2,\"children\":[{\"id\":321302,\"name\":\"?????????\",\"pid\":321300,\"level\":3},{\"id\":321311,\"name\":\"?????????\",\"pid\":321300,\"level\":3},{\"id\":321322,\"name\":\"?????????\",\"pid\":321300,\"level\":3},{\"id\":321323,\"name\":\"?????????\",\"pid\":321300,\"level\":3},{\"id\":321324,\"name\":\"?????????\",\"pid\":321300,\"level\":3}]}]},{\"id\":330000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":330100,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330102,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330103,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330104,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330105,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330106,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330108,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330109,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330110,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330122,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330127,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330182,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330183,\"name\":\"?????????\",\"pid\":330100,\"level\":3},{\"id\":330185,\"name\":\"?????????\",\"pid\":330100,\"level\":3}]},{\"id\":330200,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330203,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330204,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330205,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330206,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330211,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330212,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330225,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330226,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330281,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330282,\"name\":\"?????????\",\"pid\":330200,\"level\":3},{\"id\":330283,\"name\":\"?????????\",\"pid\":330200,\"level\":3}]},{\"id\":330300,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330302,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330303,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330304,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330322,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330324,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330326,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330327,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330328,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330329,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330381,\"name\":\"?????????\",\"pid\":330300,\"level\":3},{\"id\":330382,\"name\":\"?????????\",\"pid\":330300,\"level\":3}]},{\"id\":330400,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330402,\"name\":\"?????????\",\"pid\":330400,\"level\":3},{\"id\":330411,\"name\":\"?????????\",\"pid\":330400,\"level\":3},{\"id\":330421,\"name\":\"?????????\",\"pid\":330400,\"level\":3},{\"id\":330424,\"name\":\"?????????\",\"pid\":330400,\"level\":3},{\"id\":330481,\"name\":\"?????????\",\"pid\":330400,\"level\":3},{\"id\":330482,\"name\":\"?????????\",\"pid\":330400,\"level\":3},{\"id\":330483,\"name\":\"?????????\",\"pid\":330400,\"level\":3}]},{\"id\":330500,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330502,\"name\":\"?????????\",\"pid\":330500,\"level\":3},{\"id\":330503,\"name\":\"?????????\",\"pid\":330500,\"level\":3},{\"id\":330521,\"name\":\"?????????\",\"pid\":330500,\"level\":3},{\"id\":330522,\"name\":\"?????????\",\"pid\":330500,\"level\":3},{\"id\":330523,\"name\":\"?????????\",\"pid\":330500,\"level\":3}]},{\"id\":330600,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330602,\"name\":\"?????????\",\"pid\":330600,\"level\":3},{\"id\":330603,\"name\":\"?????????\",\"pid\":330600,\"level\":3},{\"id\":330604,\"name\":\"?????????\",\"pid\":330600,\"level\":3},{\"id\":330624,\"name\":\"?????????\",\"pid\":330600,\"level\":3},{\"id\":330681,\"name\":\"?????????\",\"pid\":330600,\"level\":3},{\"id\":330683,\"name\":\"?????????\",\"pid\":330600,\"level\":3}]},{\"id\":330700,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330702,\"name\":\"?????????\",\"pid\":330700,\"level\":3},{\"id\":330703,\"name\":\"?????????\",\"pid\":330700,\"level\":3},{\"id\":330723,\"name\":\"?????????\",\"pid\":330700,\"level\":3},{\"id\":330726,\"name\":\"?????????\",\"pid\":330700,\"level\":3},{\"id\":330727,\"name\":\"?????????\",\"pid\":330700,\"level\":3},{\"id\":330781,\"name\":\"?????????\",\"pid\":330700,\"level\":3},{\"id\":330782,\"name\":\"?????????\",\"pid\":330700,\"level\":3},{\"id\":330783,\"name\":\"?????????\",\"pid\":330700,\"level\":3},{\"id\":330784,\"name\":\"?????????\",\"pid\":330700,\"level\":3}]},{\"id\":330800,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330802,\"name\":\"?????????\",\"pid\":330800,\"level\":3},{\"id\":330803,\"name\":\"?????????\",\"pid\":330800,\"level\":3},{\"id\":330822,\"name\":\"?????????\",\"pid\":330800,\"level\":3},{\"id\":330824,\"name\":\"?????????\",\"pid\":330800,\"level\":3},{\"id\":330825,\"name\":\"?????????\",\"pid\":330800,\"level\":3},{\"id\":330881,\"name\":\"?????????\",\"pid\":330800,\"level\":3}]},{\"id\":330900,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":330902,\"name\":\"?????????\",\"pid\":330900,\"level\":3},{\"id\":330903,\"name\":\"?????????\",\"pid\":330900,\"level\":3},{\"id\":330921,\"name\":\"?????????\",\"pid\":330900,\"level\":3},{\"id\":330922,\"name\":\"?????????\",\"pid\":330900,\"level\":3}]},{\"id\":331000,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":331002,\"name\":\"?????????\",\"pid\":331000,\"level\":3},{\"id\":331003,\"name\":\"?????????\",\"pid\":331000,\"level\":3},{\"id\":331004,\"name\":\"?????????\",\"pid\":331000,\"level\":3},{\"id\":331021,\"name\":\"?????????\",\"pid\":331000,\"level\":3},{\"id\":331022,\"name\":\"?????????\",\"pid\":331000,\"level\":3},{\"id\":331023,\"name\":\"?????????\",\"pid\":331000,\"level\":3},{\"id\":331024,\"name\":\"?????????\",\"pid\":331000,\"level\":3},{\"id\":331081,\"name\":\"?????????\",\"pid\":331000,\"level\":3},{\"id\":331082,\"name\":\"?????????\",\"pid\":331000,\"level\":3}]},{\"id\":331100,\"name\":\"?????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":331102,\"name\":\"?????????\",\"pid\":331100,\"level\":3},{\"id\":331121,\"name\":\"?????????\",\"pid\":331100,\"level\":3},{\"id\":331122,\"name\":\"?????????\",\"pid\":331100,\"level\":3},{\"id\":331123,\"name\":\"?????????\",\"pid\":331100,\"level\":3},{\"id\":331124,\"name\":\"?????????\",\"pid\":331100,\"level\":3},{\"id\":331125,\"name\":\"?????????\",\"pid\":331100,\"level\":3},{\"id\":331126,\"name\":\"?????????\",\"pid\":331100,\"level\":3},{\"id\":331127,\"name\":\"?????????????????????\",\"pid\":331100,\"level\":3},{\"id\":331181,\"name\":\"?????????\",\"pid\":331100,\"level\":3}]},{\"id\":331200,\"name\":\"??????????????????\",\"pid\":330000,\"level\":2,\"children\":[{\"id\":331201,\"name\":\"?????????\",\"pid\":331200,\"level\":3},{\"id\":331202,\"name\":\"?????????\",\"pid\":331200,\"level\":3},{\"id\":331203,\"name\":\"?????????\",\"pid\":331200,\"level\":3},{\"id\":331204,\"name\":\"?????????????????????\",\"pid\":331200,\"level\":3},{\"id\":331205,\"name\":\"??????????????????\",\"pid\":331200,\"level\":3},{\"id\":331206,\"name\":\"?????????\",\"pid\":331200,\"level\":3},{\"id\":331207,\"name\":\"????????????\",\"pid\":331200,\"level\":3},{\"id\":331208,\"name\":\"?????????\",\"pid\":331200,\"level\":3},{\"id\":331209,\"name\":\"?????????\",\"pid\":331200,\"level\":3},{\"id\":331210,\"name\":\"?????????\",\"pid\":331200,\"level\":3}]}]},{\"id\":340000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":340100,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":340102,\"name\":\"?????????\",\"pid\":340100,\"level\":3},{\"id\":340103,\"name\":\"?????????\",\"pid\":340100,\"level\":3},{\"id\":340104,\"name\":\"?????????\",\"pid\":340100,\"level\":3},{\"id\":340111,\"name\":\"?????????\",\"pid\":340100,\"level\":3},{\"id\":340121,\"name\":\"?????????\",\"pid\":340100,\"level\":3},{\"id\":340122,\"name\":\"?????????\",\"pid\":340100,\"level\":3},{\"id\":340123,\"name\":\"?????????\",\"pid\":340100,\"level\":3},{\"id\":340124,\"name\":\"?????????\",\"pid\":340100,\"level\":3},{\"id\":340181,\"name\":\"?????????\",\"pid\":340100,\"level\":3}]},{\"id\":340200,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":340202,\"name\":\"?????????\",\"pid\":340200,\"level\":3},{\"id\":340203,\"name\":\"?????????\",\"pid\":340200,\"level\":3},{\"id\":340207,\"name\":\"?????????\",\"pid\":340200,\"level\":3},{\"id\":340208,\"name\":\"?????????\",\"pid\":340200,\"level\":3},{\"id\":340221,\"name\":\"?????????\",\"pid\":340200,\"level\":3},{\"id\":340222,\"name\":\"?????????\",\"pid\":340200,\"level\":3},{\"id\":340223,\"name\":\"?????????\",\"pid\":340200,\"level\":3},{\"id\":340225,\"name\":\"?????????\",\"pid\":340200,\"level\":3}]},{\"id\":340300,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":340302,\"name\":\"????????????\",\"pid\":340300,\"level\":3},{\"id\":340303,\"name\":\"?????????\",\"pid\":340300,\"level\":3},{\"id\":340304,\"name\":\"?????????\",\"pid\":340300,\"level\":3},{\"id\":340311,\"name\":\"?????????\",\"pid\":340300,\"level\":3},{\"id\":340321,\"name\":\"?????????\",\"pid\":340300,\"level\":3},{\"id\":340322,\"name\":\"?????????\",\"pid\":340300,\"level\":3},{\"id\":340323,\"name\":\"?????????\",\"pid\":340300,\"level\":3}]},{\"id\":340400,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":340402,\"name\":\"?????????\",\"pid\":340400,\"level\":3},{\"id\":340403,\"name\":\"????????????\",\"pid\":340400,\"level\":3},{\"id\":340404,\"name\":\"????????????\",\"pid\":340400,\"level\":3},{\"id\":340405,\"name\":\"????????????\",\"pid\":340400,\"level\":3},{\"id\":340406,\"name\":\"?????????\",\"pid\":340400,\"level\":3},{\"id\":340421,\"name\":\"?????????\",\"pid\":340400,\"level\":3}]},{\"id\":340500,\"name\":\"????????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":340503,\"name\":\"?????????\",\"pid\":340500,\"level\":3},{\"id\":340504,\"name\":\"?????????\",\"pid\":340500,\"level\":3},{\"id\":340506,\"name\":\"?????????\",\"pid\":340500,\"level\":3},{\"id\":340521,\"name\":\"?????????\",\"pid\":340500,\"level\":3},{\"id\":340522,\"name\":\"?????????\",\"pid\":340500,\"level\":3},{\"id\":340523,\"name\":\"??????\",\"pid\":340500,\"level\":3}]},{\"id\":340600,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":340602,\"name\":\"?????????\",\"pid\":340600,\"level\":3},{\"id\":340603,\"name\":\"?????????\",\"pid\":340600,\"level\":3},{\"id\":340604,\"name\":\"?????????\",\"pid\":340600,\"level\":3},{\"id\":340621,\"name\":\"?????????\",\"pid\":340600,\"level\":3}]},{\"id\":340700,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":340702,\"name\":\"????????????\",\"pid\":340700,\"level\":3},{\"id\":340703,\"name\":\"????????????\",\"pid\":340700,\"level\":3},{\"id\":340711,\"name\":\"??????\",\"pid\":340700,\"level\":3},{\"id\":340721,\"name\":\"?????????\",\"pid\":340700,\"level\":3}]},{\"id\":340800,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":340802,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340803,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340811,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340822,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340823,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340824,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340825,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340826,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340827,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340828,\"name\":\"?????????\",\"pid\":340800,\"level\":3},{\"id\":340881,\"name\":\"?????????\",\"pid\":340800,\"level\":3}]},{\"id\":341000,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":341002,\"name\":\"?????????\",\"pid\":341000,\"level\":3},{\"id\":341003,\"name\":\"?????????\",\"pid\":341000,\"level\":3},{\"id\":341004,\"name\":\"?????????\",\"pid\":341000,\"level\":3},{\"id\":341021,\"name\":\"??????\",\"pid\":341000,\"level\":3},{\"id\":341022,\"name\":\"?????????\",\"pid\":341000,\"level\":3},{\"id\":341023,\"name\":\"??????\",\"pid\":341000,\"level\":3},{\"id\":341024,\"name\":\"?????????\",\"pid\":341000,\"level\":3}]},{\"id\":341100,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":341102,\"name\":\"?????????\",\"pid\":341100,\"level\":3},{\"id\":341103,\"name\":\"?????????\",\"pid\":341100,\"level\":3},{\"id\":341122,\"name\":\"?????????\",\"pid\":341100,\"level\":3},{\"id\":341124,\"name\":\"?????????\",\"pid\":341100,\"level\":3},{\"id\":341125,\"name\":\"?????????\",\"pid\":341100,\"level\":3},{\"id\":341126,\"name\":\"?????????\",\"pid\":341100,\"level\":3},{\"id\":341181,\"name\":\"?????????\",\"pid\":341100,\"level\":3},{\"id\":341182,\"name\":\"?????????\",\"pid\":341100,\"level\":3}]},{\"id\":341200,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":341202,\"name\":\"?????????\",\"pid\":341200,\"level\":3},{\"id\":341203,\"name\":\"?????????\",\"pid\":341200,\"level\":3},{\"id\":341204,\"name\":\"?????????\",\"pid\":341200,\"level\":3},{\"id\":341221,\"name\":\"?????????\",\"pid\":341200,\"level\":3},{\"id\":341222,\"name\":\"?????????\",\"pid\":341200,\"level\":3},{\"id\":341225,\"name\":\"?????????\",\"pid\":341200,\"level\":3},{\"id\":341226,\"name\":\"?????????\",\"pid\":341200,\"level\":3},{\"id\":341282,\"name\":\"?????????\",\"pid\":341200,\"level\":3}]},{\"id\":341300,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":341302,\"name\":\"?????????\",\"pid\":341300,\"level\":3},{\"id\":341321,\"name\":\"?????????\",\"pid\":341300,\"level\":3},{\"id\":341322,\"name\":\"??????\",\"pid\":341300,\"level\":3},{\"id\":341323,\"name\":\"?????????\",\"pid\":341300,\"level\":3},{\"id\":341324,\"name\":\"??????\",\"pid\":341300,\"level\":3}]},{\"id\":341500,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":341502,\"name\":\"?????????\",\"pid\":341500,\"level\":3},{\"id\":341503,\"name\":\"?????????\",\"pid\":341500,\"level\":3},{\"id\":341521,\"name\":\"??????\",\"pid\":341500,\"level\":3},{\"id\":341522,\"name\":\"?????????\",\"pid\":341500,\"level\":3},{\"id\":341523,\"name\":\"?????????\",\"pid\":341500,\"level\":3},{\"id\":341524,\"name\":\"?????????\",\"pid\":341500,\"level\":3},{\"id\":341525,\"name\":\"?????????\",\"pid\":341500,\"level\":3}]},{\"id\":341600,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":341602,\"name\":\"?????????\",\"pid\":341600,\"level\":3},{\"id\":341621,\"name\":\"?????????\",\"pid\":341600,\"level\":3},{\"id\":341622,\"name\":\"?????????\",\"pid\":341600,\"level\":3},{\"id\":341623,\"name\":\"?????????\",\"pid\":341600,\"level\":3}]},{\"id\":341700,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":341702,\"name\":\"?????????\",\"pid\":341700,\"level\":3},{\"id\":341721,\"name\":\"?????????\",\"pid\":341700,\"level\":3},{\"id\":341722,\"name\":\"?????????\",\"pid\":341700,\"level\":3},{\"id\":341723,\"name\":\"?????????\",\"pid\":341700,\"level\":3}]},{\"id\":341800,\"name\":\"?????????\",\"pid\":340000,\"level\":2,\"children\":[{\"id\":341802,\"name\":\"?????????\",\"pid\":341800,\"level\":3},{\"id\":341821,\"name\":\"?????????\",\"pid\":341800,\"level\":3},{\"id\":341822,\"name\":\"?????????\",\"pid\":341800,\"level\":3},{\"id\":341823,\"name\":\"??????\",\"pid\":341800,\"level\":3},{\"id\":341824,\"name\":\"?????????\",\"pid\":341800,\"level\":3},{\"id\":341825,\"name\":\"?????????\",\"pid\":341800,\"level\":3},{\"id\":341881,\"name\":\"?????????\",\"pid\":341800,\"level\":3}]}]},{\"id\":350000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":350100,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350102,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350103,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350104,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350105,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350111,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350121,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350122,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350123,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350124,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350125,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350128,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350181,\"name\":\"?????????\",\"pid\":350100,\"level\":3},{\"id\":350182,\"name\":\"?????????\",\"pid\":350100,\"level\":3}]},{\"id\":350200,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350203,\"name\":\"?????????\",\"pid\":350200,\"level\":3},{\"id\":350205,\"name\":\"?????????\",\"pid\":350200,\"level\":3},{\"id\":350206,\"name\":\"?????????\",\"pid\":350200,\"level\":3},{\"id\":350211,\"name\":\"?????????\",\"pid\":350200,\"level\":3},{\"id\":350212,\"name\":\"?????????\",\"pid\":350200,\"level\":3},{\"id\":350213,\"name\":\"?????????\",\"pid\":350200,\"level\":3}]},{\"id\":350300,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350302,\"name\":\"?????????\",\"pid\":350300,\"level\":3},{\"id\":350303,\"name\":\"?????????\",\"pid\":350300,\"level\":3},{\"id\":350304,\"name\":\"?????????\",\"pid\":350300,\"level\":3},{\"id\":350305,\"name\":\"?????????\",\"pid\":350300,\"level\":3},{\"id\":350322,\"name\":\"?????????\",\"pid\":350300,\"level\":3}]},{\"id\":350400,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350402,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350403,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350421,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350423,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350424,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350425,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350426,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350427,\"name\":\"??????\",\"pid\":350400,\"level\":3},{\"id\":350428,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350429,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350430,\"name\":\"?????????\",\"pid\":350400,\"level\":3},{\"id\":350481,\"name\":\"?????????\",\"pid\":350400,\"level\":3}]},{\"id\":350500,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350502,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350503,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350504,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350505,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350521,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350524,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350525,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350526,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350527,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350581,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350582,\"name\":\"?????????\",\"pid\":350500,\"level\":3},{\"id\":350583,\"name\":\"?????????\",\"pid\":350500,\"level\":3}]},{\"id\":350600,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350602,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350603,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350622,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350623,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350624,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350625,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350626,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350627,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350628,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350629,\"name\":\"?????????\",\"pid\":350600,\"level\":3},{\"id\":350681,\"name\":\"?????????\",\"pid\":350600,\"level\":3}]},{\"id\":350700,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350702,\"name\":\"?????????\",\"pid\":350700,\"level\":3},{\"id\":350703,\"name\":\"?????????\",\"pid\":350700,\"level\":3},{\"id\":350721,\"name\":\"?????????\",\"pid\":350700,\"level\":3},{\"id\":350722,\"name\":\"?????????\",\"pid\":350700,\"level\":3},{\"id\":350723,\"name\":\"?????????\",\"pid\":350700,\"level\":3},{\"id\":350724,\"name\":\"?????????\",\"pid\":350700,\"level\":3},{\"id\":350725,\"name\":\"?????????\",\"pid\":350700,\"level\":3},{\"id\":350781,\"name\":\"?????????\",\"pid\":350700,\"level\":3},{\"id\":350782,\"name\":\"????????????\",\"pid\":350700,\"level\":3},{\"id\":350783,\"name\":\"?????????\",\"pid\":350700,\"level\":3}]},{\"id\":350800,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350802,\"name\":\"?????????\",\"pid\":350800,\"level\":3},{\"id\":350821,\"name\":\"?????????\",\"pid\":350800,\"level\":3},{\"id\":350822,\"name\":\"?????????\",\"pid\":350800,\"level\":3},{\"id\":350823,\"name\":\"?????????\",\"pid\":350800,\"level\":3},{\"id\":350824,\"name\":\"?????????\",\"pid\":350800,\"level\":3},{\"id\":350825,\"name\":\"?????????\",\"pid\":350800,\"level\":3},{\"id\":350881,\"name\":\"?????????\",\"pid\":350800,\"level\":3}]},{\"id\":350900,\"name\":\"?????????\",\"pid\":350000,\"level\":2,\"children\":[{\"id\":350902,\"name\":\"?????????\",\"pid\":350900,\"level\":3},{\"id\":350921,\"name\":\"?????????\",\"pid\":350900,\"level\":3},{\"id\":350922,\"name\":\"?????????\",\"pid\":350900,\"level\":3},{\"id\":350923,\"name\":\"?????????\",\"pid\":350900,\"level\":3},{\"id\":350924,\"name\":\"?????????\",\"pid\":350900,\"level\":3},{\"id\":350925,\"name\":\"?????????\",\"pid\":350900,\"level\":3},{\"id\":350926,\"name\":\"?????????\",\"pid\":350900,\"level\":3},{\"id\":350981,\"name\":\"?????????\",\"pid\":350900,\"level\":3},{\"id\":350982,\"name\":\"?????????\",\"pid\":350900,\"level\":3}]}]},{\"id\":360000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":360100,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360102,\"name\":\"?????????\",\"pid\":360100,\"level\":3},{\"id\":360103,\"name\":\"?????????\",\"pid\":360100,\"level\":3},{\"id\":360104,\"name\":\"????????????\",\"pid\":360100,\"level\":3},{\"id\":360105,\"name\":\"?????????\",\"pid\":360100,\"level\":3},{\"id\":360111,\"name\":\"????????????\",\"pid\":360100,\"level\":3},{\"id\":360121,\"name\":\"?????????\",\"pid\":360100,\"level\":3},{\"id\":360122,\"name\":\"?????????\",\"pid\":360100,\"level\":3},{\"id\":360123,\"name\":\"?????????\",\"pid\":360100,\"level\":3},{\"id\":360124,\"name\":\"?????????\",\"pid\":360100,\"level\":3}]},{\"id\":360200,\"name\":\"????????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360202,\"name\":\"?????????\",\"pid\":360200,\"level\":3},{\"id\":360203,\"name\":\"?????????\",\"pid\":360200,\"level\":3},{\"id\":360222,\"name\":\"?????????\",\"pid\":360200,\"level\":3},{\"id\":360281,\"name\":\"?????????\",\"pid\":360200,\"level\":3}]},{\"id\":360300,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360302,\"name\":\"?????????\",\"pid\":360300,\"level\":3},{\"id\":360313,\"name\":\"?????????\",\"pid\":360300,\"level\":3},{\"id\":360321,\"name\":\"?????????\",\"pid\":360300,\"level\":3},{\"id\":360322,\"name\":\"?????????\",\"pid\":360300,\"level\":3},{\"id\":360323,\"name\":\"?????????\",\"pid\":360300,\"level\":3}]},{\"id\":360400,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360402,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360403,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360421,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360423,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360424,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360425,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360426,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360427,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360428,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360429,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360430,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360481,\"name\":\"?????????\",\"pid\":360400,\"level\":3},{\"id\":360482,\"name\":\"????????????\",\"pid\":360400,\"level\":3}]},{\"id\":360500,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360502,\"name\":\"?????????\",\"pid\":360500,\"level\":3},{\"id\":360521,\"name\":\"?????????\",\"pid\":360500,\"level\":3}]},{\"id\":360600,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360602,\"name\":\"?????????\",\"pid\":360600,\"level\":3},{\"id\":360622,\"name\":\"?????????\",\"pid\":360600,\"level\":3},{\"id\":360681,\"name\":\"?????????\",\"pid\":360600,\"level\":3}]},{\"id\":360700,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360702,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360703,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360721,\"name\":\"??????\",\"pid\":360700,\"level\":3},{\"id\":360722,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360723,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360724,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360725,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360726,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360727,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360728,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360729,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360730,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360731,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360732,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360733,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360734,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360735,\"name\":\"?????????\",\"pid\":360700,\"level\":3},{\"id\":360781,\"name\":\"?????????\",\"pid\":360700,\"level\":3}]},{\"id\":360800,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360802,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360803,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360821,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360822,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360823,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360824,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360825,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360826,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360827,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360828,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360829,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360830,\"name\":\"?????????\",\"pid\":360800,\"level\":3},{\"id\":360881,\"name\":\"????????????\",\"pid\":360800,\"level\":3}]},{\"id\":360900,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":360902,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360921,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360922,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360923,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360924,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360925,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360926,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360981,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360982,\"name\":\"?????????\",\"pid\":360900,\"level\":3},{\"id\":360983,\"name\":\"?????????\",\"pid\":360900,\"level\":3}]},{\"id\":361000,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":361002,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361021,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361022,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361023,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361024,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361025,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361026,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361027,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361028,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361029,\"name\":\"?????????\",\"pid\":361000,\"level\":3},{\"id\":361030,\"name\":\"?????????\",\"pid\":361000,\"level\":3}]},{\"id\":361100,\"name\":\"?????????\",\"pid\":360000,\"level\":2,\"children\":[{\"id\":361102,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361121,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361122,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361123,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361124,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361125,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361126,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361127,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361128,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361129,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361130,\"name\":\"?????????\",\"pid\":361100,\"level\":3},{\"id\":361181,\"name\":\"?????????\",\"pid\":361100,\"level\":3}]}]},{\"id\":370000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":370100,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370102,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370103,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370104,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370105,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370112,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370113,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370124,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370125,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370126,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":370181,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":371202,\"name\":\"?????????\",\"pid\":370100,\"level\":3},{\"id\":371203,\"name\":\"?????????\",\"pid\":370100,\"level\":3}]},{\"id\":370200,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370202,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370203,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370211,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370212,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370213,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370214,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370281,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370282,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370283,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370285,\"name\":\"?????????\",\"pid\":370200,\"level\":3},{\"id\":370286,\"name\":\"???????????????\",\"pid\":370200,\"level\":3}]},{\"id\":370300,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370302,\"name\":\"?????????\",\"pid\":370300,\"level\":3},{\"id\":370303,\"name\":\"?????????\",\"pid\":370300,\"level\":3},{\"id\":370304,\"name\":\"?????????\",\"pid\":370300,\"level\":3},{\"id\":370305,\"name\":\"?????????\",\"pid\":370300,\"level\":3},{\"id\":370306,\"name\":\"?????????\",\"pid\":370300,\"level\":3},{\"id\":370321,\"name\":\"?????????\",\"pid\":370300,\"level\":3},{\"id\":370322,\"name\":\"?????????\",\"pid\":370300,\"level\":3},{\"id\":370323,\"name\":\"?????????\",\"pid\":370300,\"level\":3}]},{\"id\":370400,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370402,\"name\":\"?????????\",\"pid\":370400,\"level\":3},{\"id\":370403,\"name\":\"?????????\",\"pid\":370400,\"level\":3},{\"id\":370404,\"name\":\"?????????\",\"pid\":370400,\"level\":3},{\"id\":370405,\"name\":\"????????????\",\"pid\":370400,\"level\":3},{\"id\":370406,\"name\":\"?????????\",\"pid\":370400,\"level\":3},{\"id\":370481,\"name\":\"?????????\",\"pid\":370400,\"level\":3}]},{\"id\":370500,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370502,\"name\":\"?????????\",\"pid\":370500,\"level\":3},{\"id\":370503,\"name\":\"?????????\",\"pid\":370500,\"level\":3},{\"id\":370521,\"name\":\"?????????\",\"pid\":370500,\"level\":3},{\"id\":370522,\"name\":\"?????????\",\"pid\":370500,\"level\":3},{\"id\":370523,\"name\":\"?????????\",\"pid\":370500,\"level\":3}]},{\"id\":370600,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370602,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370611,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370612,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370613,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370634,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370681,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370682,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370683,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370684,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370685,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370686,\"name\":\"?????????\",\"pid\":370600,\"level\":3},{\"id\":370687,\"name\":\"?????????\",\"pid\":370600,\"level\":3}]},{\"id\":370700,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370702,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370703,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370704,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370705,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370724,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370725,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370781,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370782,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370783,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370784,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370785,\"name\":\"?????????\",\"pid\":370700,\"level\":3},{\"id\":370786,\"name\":\"?????????\",\"pid\":370700,\"level\":3}]},{\"id\":370800,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370811,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370812,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370826,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370827,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370828,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370829,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370830,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370831,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370832,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370881,\"name\":\"?????????\",\"pid\":370800,\"level\":3},{\"id\":370883,\"name\":\"?????????\",\"pid\":370800,\"level\":3}]},{\"id\":370900,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":370902,\"name\":\"?????????\",\"pid\":370900,\"level\":3},{\"id\":370911,\"name\":\"?????????\",\"pid\":370900,\"level\":3},{\"id\":370921,\"name\":\"?????????\",\"pid\":370900,\"level\":3},{\"id\":370923,\"name\":\"?????????\",\"pid\":370900,\"level\":3},{\"id\":370982,\"name\":\"?????????\",\"pid\":370900,\"level\":3},{\"id\":370983,\"name\":\"?????????\",\"pid\":370900,\"level\":3}]},{\"id\":371000,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":371002,\"name\":\"?????????\",\"pid\":371000,\"level\":3},{\"id\":371003,\"name\":\"?????????\",\"pid\":371000,\"level\":3},{\"id\":371082,\"name\":\"?????????\",\"pid\":371000,\"level\":3},{\"id\":371083,\"name\":\"?????????\",\"pid\":371000,\"level\":3}]},{\"id\":371100,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":371102,\"name\":\"?????????\",\"pid\":371100,\"level\":3},{\"id\":371103,\"name\":\"?????????\",\"pid\":371100,\"level\":3},{\"id\":371121,\"name\":\"?????????\",\"pid\":371100,\"level\":3},{\"id\":371122,\"name\":\"??????\",\"pid\":371100,\"level\":3}]},{\"id\":371300,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":371302,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371311,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371312,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371321,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371322,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371323,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371324,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371325,\"name\":\"??????\",\"pid\":371300,\"level\":3},{\"id\":371326,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371327,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371328,\"name\":\"?????????\",\"pid\":371300,\"level\":3},{\"id\":371329,\"name\":\"?????????\",\"pid\":371300,\"level\":3}]},{\"id\":371400,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":371402,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371403,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371422,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371423,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371424,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371425,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371426,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371427,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371428,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371481,\"name\":\"?????????\",\"pid\":371400,\"level\":3},{\"id\":371482,\"name\":\"?????????\",\"pid\":371400,\"level\":3}]},{\"id\":371500,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":371502,\"name\":\"????????????\",\"pid\":371500,\"level\":3},{\"id\":371521,\"name\":\"?????????\",\"pid\":371500,\"level\":3},{\"id\":371522,\"name\":\"??????\",\"pid\":371500,\"level\":3},{\"id\":371523,\"name\":\"?????????\",\"pid\":371500,\"level\":3},{\"id\":371524,\"name\":\"?????????\",\"pid\":371500,\"level\":3},{\"id\":371525,\"name\":\"??????\",\"pid\":371500,\"level\":3},{\"id\":371526,\"name\":\"?????????\",\"pid\":371500,\"level\":3},{\"id\":371581,\"name\":\"?????????\",\"pid\":371500,\"level\":3}]},{\"id\":371600,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":371602,\"name\":\"?????????\",\"pid\":371600,\"level\":3},{\"id\":371603,\"name\":\"?????????\",\"pid\":371600,\"level\":3},{\"id\":371621,\"name\":\"?????????\",\"pid\":371600,\"level\":3},{\"id\":371622,\"name\":\"?????????\",\"pid\":371600,\"level\":3},{\"id\":371623,\"name\":\"?????????\",\"pid\":371600,\"level\":3},{\"id\":371625,\"name\":\"?????????\",\"pid\":371600,\"level\":3},{\"id\":371626,\"name\":\"?????????\",\"pid\":371600,\"level\":3},{\"id\":371627,\"name\":\"????????????\",\"pid\":371600,\"level\":3}]},{\"id\":371700,\"name\":\"?????????\",\"pid\":370000,\"level\":2,\"children\":[{\"id\":371702,\"name\":\"?????????\",\"pid\":371700,\"level\":3},{\"id\":371721,\"name\":\"??????\",\"pid\":371700,\"level\":3},{\"id\":371722,\"name\":\"??????\",\"pid\":371700,\"level\":3},{\"id\":371723,\"name\":\"?????????\",\"pid\":371700,\"level\":3},{\"id\":371724,\"name\":\"?????????\",\"pid\":371700,\"level\":3},{\"id\":371725,\"name\":\"?????????\",\"pid\":371700,\"level\":3},{\"id\":371726,\"name\":\"?????????\",\"pid\":371700,\"level\":3},{\"id\":371727,\"name\":\"?????????\",\"pid\":371700,\"level\":3},{\"id\":371728,\"name\":\"?????????\",\"pid\":371700,\"level\":3}]}]},{\"id\":410000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":410100,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410102,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410103,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410104,\"name\":\"???????????????\",\"pid\":410100,\"level\":3},{\"id\":410105,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410106,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410108,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410122,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410181,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410182,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410183,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410184,\"name\":\"?????????\",\"pid\":410100,\"level\":3},{\"id\":410185,\"name\":\"?????????\",\"pid\":410100,\"level\":3}]},{\"id\":410200,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410202,\"name\":\"?????????\",\"pid\":410200,\"level\":3},{\"id\":410203,\"name\":\"???????????????\",\"pid\":410200,\"level\":3},{\"id\":410204,\"name\":\"?????????\",\"pid\":410200,\"level\":3},{\"id\":410205,\"name\":\"????????????\",\"pid\":410200,\"level\":3},{\"id\":410212,\"name\":\"?????????\",\"pid\":410200,\"level\":3},{\"id\":410221,\"name\":\"??????\",\"pid\":410200,\"level\":3},{\"id\":410222,\"name\":\"?????????\",\"pid\":410200,\"level\":3},{\"id\":410223,\"name\":\"?????????\",\"pid\":410200,\"level\":3},{\"id\":410225,\"name\":\"?????????\",\"pid\":410200,\"level\":3}]},{\"id\":410300,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410302,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410303,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410304,\"name\":\"???????????????\",\"pid\":410300,\"level\":3},{\"id\":410305,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410306,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410311,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410322,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410323,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410324,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410325,\"name\":\"??????\",\"pid\":410300,\"level\":3},{\"id\":410326,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410327,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410328,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410329,\"name\":\"?????????\",\"pid\":410300,\"level\":3},{\"id\":410381,\"name\":\"?????????\",\"pid\":410300,\"level\":3}]},{\"id\":410400,\"name\":\"????????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410402,\"name\":\"?????????\",\"pid\":410400,\"level\":3},{\"id\":410403,\"name\":\"?????????\",\"pid\":410400,\"level\":3},{\"id\":410404,\"name\":\"?????????\",\"pid\":410400,\"level\":3},{\"id\":410411,\"name\":\"?????????\",\"pid\":410400,\"level\":3},{\"id\":410421,\"name\":\"?????????\",\"pid\":410400,\"level\":3},{\"id\":410422,\"name\":\"??????\",\"pid\":410400,\"level\":3},{\"id\":410423,\"name\":\"?????????\",\"pid\":410400,\"level\":3},{\"id\":410425,\"name\":\"??????\",\"pid\":410400,\"level\":3},{\"id\":410481,\"name\":\"?????????\",\"pid\":410400,\"level\":3},{\"id\":410482,\"name\":\"?????????\",\"pid\":410400,\"level\":3}]},{\"id\":410500,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410502,\"name\":\"?????????\",\"pid\":410500,\"level\":3},{\"id\":410503,\"name\":\"?????????\",\"pid\":410500,\"level\":3},{\"id\":410505,\"name\":\"?????????\",\"pid\":410500,\"level\":3},{\"id\":410506,\"name\":\"?????????\",\"pid\":410500,\"level\":3},{\"id\":410522,\"name\":\"?????????\",\"pid\":410500,\"level\":3},{\"id\":410523,\"name\":\"?????????\",\"pid\":410500,\"level\":3},{\"id\":410526,\"name\":\"??????\",\"pid\":410500,\"level\":3},{\"id\":410527,\"name\":\"?????????\",\"pid\":410500,\"level\":3},{\"id\":410581,\"name\":\"?????????\",\"pid\":410500,\"level\":3}]},{\"id\":410600,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410602,\"name\":\"?????????\",\"pid\":410600,\"level\":3},{\"id\":410603,\"name\":\"?????????\",\"pid\":410600,\"level\":3},{\"id\":410611,\"name\":\"?????????\",\"pid\":410600,\"level\":3},{\"id\":410621,\"name\":\"??????\",\"pid\":410600,\"level\":3},{\"id\":410622,\"name\":\"??????\",\"pid\":410600,\"level\":3}]},{\"id\":410700,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410702,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410703,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410704,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410711,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410721,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410724,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410725,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410726,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410727,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410728,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410781,\"name\":\"?????????\",\"pid\":410700,\"level\":3},{\"id\":410782,\"name\":\"?????????\",\"pid\":410700,\"level\":3}]},{\"id\":410800,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410802,\"name\":\"?????????\",\"pid\":410800,\"level\":3},{\"id\":410803,\"name\":\"?????????\",\"pid\":410800,\"level\":3},{\"id\":410804,\"name\":\"?????????\",\"pid\":410800,\"level\":3},{\"id\":410811,\"name\":\"?????????\",\"pid\":410800,\"level\":3},{\"id\":410821,\"name\":\"?????????\",\"pid\":410800,\"level\":3},{\"id\":410822,\"name\":\"?????????\",\"pid\":410800,\"level\":3},{\"id\":410823,\"name\":\"?????????\",\"pid\":410800,\"level\":3},{\"id\":410825,\"name\":\"??????\",\"pid\":410800,\"level\":3},{\"id\":410882,\"name\":\"?????????\",\"pid\":410800,\"level\":3},{\"id\":410883,\"name\":\"?????????\",\"pid\":410800,\"level\":3}]},{\"id\":410900,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":410902,\"name\":\"?????????\",\"pid\":410900,\"level\":3},{\"id\":410922,\"name\":\"?????????\",\"pid\":410900,\"level\":3},{\"id\":410923,\"name\":\"?????????\",\"pid\":410900,\"level\":3},{\"id\":410926,\"name\":\"??????\",\"pid\":410900,\"level\":3},{\"id\":410927,\"name\":\"?????????\",\"pid\":410900,\"level\":3},{\"id\":410928,\"name\":\"?????????\",\"pid\":410900,\"level\":3}]},{\"id\":411000,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":411002,\"name\":\"?????????\",\"pid\":411000,\"level\":3},{\"id\":411023,\"name\":\"?????????\",\"pid\":411000,\"level\":3},{\"id\":411024,\"name\":\"?????????\",\"pid\":411000,\"level\":3},{\"id\":411025,\"name\":\"?????????\",\"pid\":411000,\"level\":3},{\"id\":411081,\"name\":\"?????????\",\"pid\":411000,\"level\":3},{\"id\":411082,\"name\":\"?????????\",\"pid\":411000,\"level\":3}]},{\"id\":411100,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":411102,\"name\":\"?????????\",\"pid\":411100,\"level\":3},{\"id\":411103,\"name\":\"?????????\",\"pid\":411100,\"level\":3},{\"id\":411104,\"name\":\"?????????\",\"pid\":411100,\"level\":3},{\"id\":411121,\"name\":\"?????????\",\"pid\":411100,\"level\":3},{\"id\":411122,\"name\":\"?????????\",\"pid\":411100,\"level\":3}]},{\"id\":411200,\"name\":\"????????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":411202,\"name\":\"?????????\",\"pid\":411200,\"level\":3},{\"id\":411221,\"name\":\"?????????\",\"pid\":411200,\"level\":3},{\"id\":411222,\"name\":\"??????\",\"pid\":411200,\"level\":3},{\"id\":411224,\"name\":\"?????????\",\"pid\":411200,\"level\":3},{\"id\":411281,\"name\":\"?????????\",\"pid\":411200,\"level\":3},{\"id\":411282,\"name\":\"?????????\",\"pid\":411200,\"level\":3}]},{\"id\":411300,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":411302,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411303,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411321,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411322,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411323,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411324,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411325,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411326,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411327,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411328,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411329,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411330,\"name\":\"?????????\",\"pid\":411300,\"level\":3},{\"id\":411381,\"name\":\"?????????\",\"pid\":411300,\"level\":3}]},{\"id\":411400,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":411402,\"name\":\"?????????\",\"pid\":411400,\"level\":3},{\"id\":411403,\"name\":\"?????????\",\"pid\":411400,\"level\":3},{\"id\":411421,\"name\":\"?????????\",\"pid\":411400,\"level\":3},{\"id\":411422,\"name\":\"??????\",\"pid\":411400,\"level\":3},{\"id\":411423,\"name\":\"?????????\",\"pid\":411400,\"level\":3},{\"id\":411424,\"name\":\"?????????\",\"pid\":411400,\"level\":3},{\"id\":411425,\"name\":\"?????????\",\"pid\":411400,\"level\":3},{\"id\":411426,\"name\":\"?????????\",\"pid\":411400,\"level\":3},{\"id\":411481,\"name\":\"?????????\",\"pid\":411400,\"level\":3}]},{\"id\":411500,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":411502,\"name\":\"?????????\",\"pid\":411500,\"level\":3},{\"id\":411503,\"name\":\"?????????\",\"pid\":411500,\"level\":3},{\"id\":411521,\"name\":\"?????????\",\"pid\":411500,\"level\":3},{\"id\":411522,\"name\":\"?????????\",\"pid\":411500,\"level\":3},{\"id\":411523,\"name\":\"??????\",\"pid\":411500,\"level\":3},{\"id\":411524,\"name\":\"?????????\",\"pid\":411500,\"level\":3},{\"id\":411525,\"name\":\"?????????\",\"pid\":411500,\"level\":3},{\"id\":411526,\"name\":\"?????????\",\"pid\":411500,\"level\":3},{\"id\":411527,\"name\":\"?????????\",\"pid\":411500,\"level\":3},{\"id\":411528,\"name\":\"??????\",\"pid\":411500,\"level\":3}]},{\"id\":411600,\"name\":\"?????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":411602,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411621,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411622,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411623,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411624,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411625,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411626,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411627,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411628,\"name\":\"?????????\",\"pid\":411600,\"level\":3},{\"id\":411681,\"name\":\"?????????\",\"pid\":411600,\"level\":3}]},{\"id\":411700,\"name\":\"????????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":411702,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411721,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411722,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411723,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411724,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411725,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411726,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411727,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411728,\"name\":\"?????????\",\"pid\":411700,\"level\":3},{\"id\":411729,\"name\":\"?????????\",\"pid\":411700,\"level\":3}]},{\"id\":419000,\"name\":\"????????????\",\"pid\":410000,\"level\":2,\"children\":[{\"id\":419001,\"name\":\"?????????\",\"pid\":419000,\"level\":3}]}]},{\"id\":420000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":420100,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":420102,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420103,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420104,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420105,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420106,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420107,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420111,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420112,\"name\":\"????????????\",\"pid\":420100,\"level\":3},{\"id\":420113,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420114,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420115,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420116,\"name\":\"?????????\",\"pid\":420100,\"level\":3},{\"id\":420117,\"name\":\"?????????\",\"pid\":420100,\"level\":3}]},{\"id\":420200,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":420202,\"name\":\"????????????\",\"pid\":420200,\"level\":3},{\"id\":420203,\"name\":\"????????????\",\"pid\":420200,\"level\":3},{\"id\":420204,\"name\":\"?????????\",\"pid\":420200,\"level\":3},{\"id\":420205,\"name\":\"?????????\",\"pid\":420200,\"level\":3},{\"id\":420222,\"name\":\"?????????\",\"pid\":420200,\"level\":3},{\"id\":420281,\"name\":\"?????????\",\"pid\":420200,\"level\":3}]},{\"id\":420300,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":420302,\"name\":\"?????????\",\"pid\":420300,\"level\":3},{\"id\":420303,\"name\":\"?????????\",\"pid\":420300,\"level\":3},{\"id\":420304,\"name\":\"?????????\",\"pid\":420300,\"level\":3},{\"id\":420322,\"name\":\"?????????\",\"pid\":420300,\"level\":3},{\"id\":420323,\"name\":\"?????????\",\"pid\":420300,\"level\":3},{\"id\":420324,\"name\":\"?????????\",\"pid\":420300,\"level\":3},{\"id\":420325,\"name\":\"??????\",\"pid\":420300,\"level\":3},{\"id\":420381,\"name\":\"????????????\",\"pid\":420300,\"level\":3}]},{\"id\":420500,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":420502,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420503,\"name\":\"????????????\",\"pid\":420500,\"level\":3},{\"id\":420504,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420505,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420506,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420525,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420526,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420527,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420528,\"name\":\"????????????????????????\",\"pid\":420500,\"level\":3},{\"id\":420529,\"name\":\"????????????????????????\",\"pid\":420500,\"level\":3},{\"id\":420581,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420582,\"name\":\"?????????\",\"pid\":420500,\"level\":3},{\"id\":420583,\"name\":\"?????????\",\"pid\":420500,\"level\":3}]},{\"id\":420600,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":420602,\"name\":\"?????????\",\"pid\":420600,\"level\":3},{\"id\":420606,\"name\":\"?????????\",\"pid\":420600,\"level\":3},{\"id\":420607,\"name\":\"?????????\",\"pid\":420600,\"level\":3},{\"id\":420624,\"name\":\"?????????\",\"pid\":420600,\"level\":3},{\"id\":420625,\"name\":\"?????????\",\"pid\":420600,\"level\":3},{\"id\":420626,\"name\":\"?????????\",\"pid\":420600,\"level\":3},{\"id\":420682,\"name\":\"????????????\",\"pid\":420600,\"level\":3},{\"id\":420683,\"name\":\"?????????\",\"pid\":420600,\"level\":3},{\"id\":420684,\"name\":\"?????????\",\"pid\":420600,\"level\":3}]},{\"id\":420700,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":420702,\"name\":\"????????????\",\"pid\":420700,\"level\":3},{\"id\":420703,\"name\":\"?????????\",\"pid\":420700,\"level\":3},{\"id\":420704,\"name\":\"?????????\",\"pid\":420700,\"level\":3}]},{\"id\":420800,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":420802,\"name\":\"?????????\",\"pid\":420800,\"level\":3},{\"id\":420804,\"name\":\"?????????\",\"pid\":420800,\"level\":3},{\"id\":420821,\"name\":\"?????????\",\"pid\":420800,\"level\":3},{\"id\":420822,\"name\":\"?????????\",\"pid\":420800,\"level\":3},{\"id\":420881,\"name\":\"?????????\",\"pid\":420800,\"level\":3}]},{\"id\":420900,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":420902,\"name\":\"?????????\",\"pid\":420900,\"level\":3},{\"id\":420921,\"name\":\"?????????\",\"pid\":420900,\"level\":3},{\"id\":420922,\"name\":\"?????????\",\"pid\":420900,\"level\":3},{\"id\":420923,\"name\":\"?????????\",\"pid\":420900,\"level\":3},{\"id\":420981,\"name\":\"?????????\",\"pid\":420900,\"level\":3},{\"id\":420982,\"name\":\"?????????\",\"pid\":420900,\"level\":3},{\"id\":420984,\"name\":\"?????????\",\"pid\":420900,\"level\":3}]},{\"id\":421000,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":421002,\"name\":\"?????????\",\"pid\":421000,\"level\":3},{\"id\":421003,\"name\":\"?????????\",\"pid\":421000,\"level\":3},{\"id\":421022,\"name\":\"?????????\",\"pid\":421000,\"level\":3},{\"id\":421023,\"name\":\"?????????\",\"pid\":421000,\"level\":3},{\"id\":421024,\"name\":\"?????????\",\"pid\":421000,\"level\":3},{\"id\":421081,\"name\":\"?????????\",\"pid\":421000,\"level\":3},{\"id\":421083,\"name\":\"?????????\",\"pid\":421000,\"level\":3},{\"id\":421087,\"name\":\"?????????\",\"pid\":421000,\"level\":3}]},{\"id\":421100,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":421102,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421121,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421122,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421123,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421124,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421125,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421126,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421127,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421181,\"name\":\"?????????\",\"pid\":421100,\"level\":3},{\"id\":421182,\"name\":\"?????????\",\"pid\":421100,\"level\":3}]},{\"id\":421200,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":421202,\"name\":\"?????????\",\"pid\":421200,\"level\":3},{\"id\":421221,\"name\":\"?????????\",\"pid\":421200,\"level\":3},{\"id\":421222,\"name\":\"?????????\",\"pid\":421200,\"level\":3},{\"id\":421223,\"name\":\"?????????\",\"pid\":421200,\"level\":3},{\"id\":421224,\"name\":\"?????????\",\"pid\":421200,\"level\":3},{\"id\":421281,\"name\":\"?????????\",\"pid\":421200,\"level\":3}]},{\"id\":421300,\"name\":\"?????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":421303,\"name\":\"?????????\",\"pid\":421300,\"level\":3},{\"id\":421321,\"name\":\"??????\",\"pid\":421300,\"level\":3},{\"id\":421381,\"name\":\"?????????\",\"pid\":421300,\"level\":3}]},{\"id\":422800,\"name\":\"??????????????????????????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":422801,\"name\":\"?????????\",\"pid\":422800,\"level\":3},{\"id\":422802,\"name\":\"?????????\",\"pid\":422800,\"level\":3},{\"id\":422822,\"name\":\"?????????\",\"pid\":422800,\"level\":3},{\"id\":422823,\"name\":\"?????????\",\"pid\":422800,\"level\":3},{\"id\":422825,\"name\":\"?????????\",\"pid\":422800,\"level\":3},{\"id\":422826,\"name\":\"?????????\",\"pid\":422800,\"level\":3},{\"id\":422827,\"name\":\"?????????\",\"pid\":422800,\"level\":3},{\"id\":422828,\"name\":\"?????????\",\"pid\":422800,\"level\":3}]},{\"id\":429000,\"name\":\"????????????\",\"pid\":420000,\"level\":2,\"children\":[{\"id\":429004,\"name\":\"?????????\",\"pid\":429000,\"level\":3},{\"id\":429005,\"name\":\"?????????\",\"pid\":429000,\"level\":3},{\"id\":429006,\"name\":\"?????????\",\"pid\":429000,\"level\":3},{\"id\":429021,\"name\":\"???????????????\",\"pid\":429000,\"level\":3}]}]},{\"id\":430000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":430100,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430102,\"name\":\"?????????\",\"pid\":430100,\"level\":3},{\"id\":430103,\"name\":\"?????????\",\"pid\":430100,\"level\":3},{\"id\":430104,\"name\":\"?????????\",\"pid\":430100,\"level\":3},{\"id\":430105,\"name\":\"?????????\",\"pid\":430100,\"level\":3},{\"id\":430111,\"name\":\"?????????\",\"pid\":430100,\"level\":3},{\"id\":430112,\"name\":\"?????????\",\"pid\":430100,\"level\":3},{\"id\":430121,\"name\":\"?????????\",\"pid\":430100,\"level\":3},{\"id\":430124,\"name\":\"?????????\",\"pid\":430100,\"level\":3},{\"id\":430181,\"name\":\"?????????\",\"pid\":430100,\"level\":3}]},{\"id\":430200,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430202,\"name\":\"?????????\",\"pid\":430200,\"level\":3},{\"id\":430203,\"name\":\"?????????\",\"pid\":430200,\"level\":3},{\"id\":430204,\"name\":\"?????????\",\"pid\":430200,\"level\":3},{\"id\":430211,\"name\":\"?????????\",\"pid\":430200,\"level\":3},{\"id\":430221,\"name\":\"?????????\",\"pid\":430200,\"level\":3},{\"id\":430223,\"name\":\"??????\",\"pid\":430200,\"level\":3},{\"id\":430224,\"name\":\"?????????\",\"pid\":430200,\"level\":3},{\"id\":430225,\"name\":\"?????????\",\"pid\":430200,\"level\":3},{\"id\":430281,\"name\":\"?????????\",\"pid\":430200,\"level\":3}]},{\"id\":430300,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430302,\"name\":\"?????????\",\"pid\":430300,\"level\":3},{\"id\":430304,\"name\":\"?????????\",\"pid\":430300,\"level\":3},{\"id\":430321,\"name\":\"?????????\",\"pid\":430300,\"level\":3},{\"id\":430381,\"name\":\"?????????\",\"pid\":430300,\"level\":3},{\"id\":430382,\"name\":\"?????????\",\"pid\":430300,\"level\":3}]},{\"id\":430400,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430405,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430406,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430407,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430408,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430412,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430421,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430422,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430423,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430424,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430426,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430481,\"name\":\"?????????\",\"pid\":430400,\"level\":3},{\"id\":430482,\"name\":\"?????????\",\"pid\":430400,\"level\":3}]},{\"id\":430500,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430502,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430503,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430511,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430521,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430522,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430523,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430524,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430525,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430527,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430528,\"name\":\"?????????\",\"pid\":430500,\"level\":3},{\"id\":430529,\"name\":\"?????????????????????\",\"pid\":430500,\"level\":3},{\"id\":430581,\"name\":\"?????????\",\"pid\":430500,\"level\":3}]},{\"id\":430600,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430602,\"name\":\"????????????\",\"pid\":430600,\"level\":3},{\"id\":430603,\"name\":\"?????????\",\"pid\":430600,\"level\":3},{\"id\":430611,\"name\":\"?????????\",\"pid\":430600,\"level\":3},{\"id\":430621,\"name\":\"?????????\",\"pid\":430600,\"level\":3},{\"id\":430623,\"name\":\"?????????\",\"pid\":430600,\"level\":3},{\"id\":430624,\"name\":\"?????????\",\"pid\":430600,\"level\":3},{\"id\":430626,\"name\":\"?????????\",\"pid\":430600,\"level\":3},{\"id\":430681,\"name\":\"?????????\",\"pid\":430600,\"level\":3},{\"id\":430682,\"name\":\"?????????\",\"pid\":430600,\"level\":3}]},{\"id\":430700,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430702,\"name\":\"?????????\",\"pid\":430700,\"level\":3},{\"id\":430703,\"name\":\"?????????\",\"pid\":430700,\"level\":3},{\"id\":430721,\"name\":\"?????????\",\"pid\":430700,\"level\":3},{\"id\":430722,\"name\":\"?????????\",\"pid\":430700,\"level\":3},{\"id\":430723,\"name\":\"??????\",\"pid\":430700,\"level\":3},{\"id\":430724,\"name\":\"?????????\",\"pid\":430700,\"level\":3},{\"id\":430725,\"name\":\"?????????\",\"pid\":430700,\"level\":3},{\"id\":430726,\"name\":\"?????????\",\"pid\":430700,\"level\":3},{\"id\":430781,\"name\":\"?????????\",\"pid\":430700,\"level\":3}]},{\"id\":430800,\"name\":\"????????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430802,\"name\":\"?????????\",\"pid\":430800,\"level\":3},{\"id\":430811,\"name\":\"????????????\",\"pid\":430800,\"level\":3},{\"id\":430821,\"name\":\"?????????\",\"pid\":430800,\"level\":3},{\"id\":430822,\"name\":\"?????????\",\"pid\":430800,\"level\":3}]},{\"id\":430900,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":430902,\"name\":\"?????????\",\"pid\":430900,\"level\":3},{\"id\":430903,\"name\":\"?????????\",\"pid\":430900,\"level\":3},{\"id\":430921,\"name\":\"??????\",\"pid\":430900,\"level\":3},{\"id\":430922,\"name\":\"?????????\",\"pid\":430900,\"level\":3},{\"id\":430923,\"name\":\"?????????\",\"pid\":430900,\"level\":3},{\"id\":430981,\"name\":\"?????????\",\"pid\":430900,\"level\":3}]},{\"id\":431000,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":431002,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431003,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431021,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431022,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431023,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431024,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431025,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431026,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431027,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431028,\"name\":\"?????????\",\"pid\":431000,\"level\":3},{\"id\":431081,\"name\":\"?????????\",\"pid\":431000,\"level\":3}]},{\"id\":431100,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":431102,\"name\":\"?????????\",\"pid\":431100,\"level\":3},{\"id\":431103,\"name\":\"????????????\",\"pid\":431100,\"level\":3},{\"id\":431121,\"name\":\"?????????\",\"pid\":431100,\"level\":3},{\"id\":431122,\"name\":\"?????????\",\"pid\":431100,\"level\":3},{\"id\":431123,\"name\":\"?????????\",\"pid\":431100,\"level\":3},{\"id\":431124,\"name\":\"??????\",\"pid\":431100,\"level\":3},{\"id\":431125,\"name\":\"?????????\",\"pid\":431100,\"level\":3},{\"id\":431126,\"name\":\"?????????\",\"pid\":431100,\"level\":3},{\"id\":431127,\"name\":\"?????????\",\"pid\":431100,\"level\":3},{\"id\":431128,\"name\":\"?????????\",\"pid\":431100,\"level\":3},{\"id\":431129,\"name\":\"?????????????????????\",\"pid\":431100,\"level\":3}]},{\"id\":431200,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":431202,\"name\":\"?????????\",\"pid\":431200,\"level\":3},{\"id\":431221,\"name\":\"?????????\",\"pid\":431200,\"level\":3},{\"id\":431222,\"name\":\"?????????\",\"pid\":431200,\"level\":3},{\"id\":431223,\"name\":\"?????????\",\"pid\":431200,\"level\":3},{\"id\":431224,\"name\":\"?????????\",\"pid\":431200,\"level\":3},{\"id\":431225,\"name\":\"?????????\",\"pid\":431200,\"level\":3},{\"id\":431226,\"name\":\"?????????????????????\",\"pid\":431200,\"level\":3},{\"id\":431227,\"name\":\"?????????????????????\",\"pid\":431200,\"level\":3},{\"id\":431228,\"name\":\"?????????????????????\",\"pid\":431200,\"level\":3},{\"id\":431229,\"name\":\"???????????????????????????\",\"pid\":431200,\"level\":3},{\"id\":431230,\"name\":\"?????????????????????\",\"pid\":431200,\"level\":3},{\"id\":431281,\"name\":\"?????????\",\"pid\":431200,\"level\":3}]},{\"id\":431300,\"name\":\"?????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":431302,\"name\":\"?????????\",\"pid\":431300,\"level\":3},{\"id\":431321,\"name\":\"?????????\",\"pid\":431300,\"level\":3},{\"id\":431322,\"name\":\"?????????\",\"pid\":431300,\"level\":3},{\"id\":431381,\"name\":\"????????????\",\"pid\":431300,\"level\":3},{\"id\":431382,\"name\":\"?????????\",\"pid\":431300,\"level\":3}]},{\"id\":433100,\"name\":\"??????????????????????????????\",\"pid\":430000,\"level\":2,\"children\":[{\"id\":433101,\"name\":\"?????????\",\"pid\":433100,\"level\":3},{\"id\":433122,\"name\":\"?????????\",\"pid\":433100,\"level\":3},{\"id\":433123,\"name\":\"?????????\",\"pid\":433100,\"level\":3},{\"id\":433124,\"name\":\"?????????\",\"pid\":433100,\"level\":3},{\"id\":433125,\"name\":\"?????????\",\"pid\":433100,\"level\":3},{\"id\":433126,\"name\":\"?????????\",\"pid\":433100,\"level\":3},{\"id\":433127,\"name\":\"?????????\",\"pid\":433100,\"level\":3},{\"id\":433130,\"name\":\"?????????\",\"pid\":433100,\"level\":3}]}]},{\"id\":440000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":440100,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440103,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440104,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440105,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440106,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440111,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440112,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440113,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440114,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440115,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440117,\"name\":\"?????????\",\"pid\":440100,\"level\":3},{\"id\":440118,\"name\":\"?????????\",\"pid\":440100,\"level\":3}]},{\"id\":440200,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440203,\"name\":\"?????????\",\"pid\":440200,\"level\":3},{\"id\":440204,\"name\":\"?????????\",\"pid\":440200,\"level\":3},{\"id\":440205,\"name\":\"?????????\",\"pid\":440200,\"level\":3},{\"id\":440222,\"name\":\"?????????\",\"pid\":440200,\"level\":3},{\"id\":440224,\"name\":\"?????????\",\"pid\":440200,\"level\":3},{\"id\":440229,\"name\":\"?????????\",\"pid\":440200,\"level\":3},{\"id\":440232,\"name\":\"?????????????????????\",\"pid\":440200,\"level\":3},{\"id\":440233,\"name\":\"?????????\",\"pid\":440200,\"level\":3},{\"id\":440281,\"name\":\"?????????\",\"pid\":440200,\"level\":3},{\"id\":440282,\"name\":\"?????????\",\"pid\":440200,\"level\":3}]},{\"id\":440300,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440303,\"name\":\"?????????\",\"pid\":440300,\"level\":3},{\"id\":440304,\"name\":\"?????????\",\"pid\":440300,\"level\":3},{\"id\":440305,\"name\":\"?????????\",\"pid\":440300,\"level\":3},{\"id\":440306,\"name\":\"?????????\",\"pid\":440300,\"level\":3},{\"id\":440307,\"name\":\"?????????\",\"pid\":440300,\"level\":3},{\"id\":440308,\"name\":\"?????????\",\"pid\":440300,\"level\":3},{\"id\":440309,\"name\":\"????????????\",\"pid\":440300,\"level\":3},{\"id\":440310,\"name\":\"????????????\",\"pid\":440300,\"level\":3},{\"id\":440311,\"name\":\"????????????\",\"pid\":440300,\"level\":3},{\"id\":440312,\"name\":\"????????????\",\"pid\":440300,\"level\":3}]},{\"id\":440400,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440402,\"name\":\"?????????\",\"pid\":440400,\"level\":3},{\"id\":440403,\"name\":\"?????????\",\"pid\":440400,\"level\":3},{\"id\":440404,\"name\":\"?????????\",\"pid\":440400,\"level\":3}]},{\"id\":440500,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440507,\"name\":\"?????????\",\"pid\":440500,\"level\":3},{\"id\":440511,\"name\":\"?????????\",\"pid\":440500,\"level\":3},{\"id\":440512,\"name\":\"?????????\",\"pid\":440500,\"level\":3},{\"id\":440513,\"name\":\"?????????\",\"pid\":440500,\"level\":3},{\"id\":440514,\"name\":\"?????????\",\"pid\":440500,\"level\":3},{\"id\":440515,\"name\":\"?????????\",\"pid\":440500,\"level\":3},{\"id\":440523,\"name\":\"?????????\",\"pid\":440500,\"level\":3}]},{\"id\":440600,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440604,\"name\":\"?????????\",\"pid\":440600,\"level\":3},{\"id\":440605,\"name\":\"?????????\",\"pid\":440600,\"level\":3},{\"id\":440606,\"name\":\"?????????\",\"pid\":440600,\"level\":3},{\"id\":440607,\"name\":\"?????????\",\"pid\":440600,\"level\":3},{\"id\":440608,\"name\":\"?????????\",\"pid\":440600,\"level\":3}]},{\"id\":440700,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440703,\"name\":\"?????????\",\"pid\":440700,\"level\":3},{\"id\":440704,\"name\":\"?????????\",\"pid\":440700,\"level\":3},{\"id\":440705,\"name\":\"?????????\",\"pid\":440700,\"level\":3},{\"id\":440781,\"name\":\"?????????\",\"pid\":440700,\"level\":3},{\"id\":440783,\"name\":\"?????????\",\"pid\":440700,\"level\":3},{\"id\":440784,\"name\":\"?????????\",\"pid\":440700,\"level\":3},{\"id\":440785,\"name\":\"?????????\",\"pid\":440700,\"level\":3}]},{\"id\":440800,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440802,\"name\":\"?????????\",\"pid\":440800,\"level\":3},{\"id\":440803,\"name\":\"?????????\",\"pid\":440800,\"level\":3},{\"id\":440804,\"name\":\"?????????\",\"pid\":440800,\"level\":3},{\"id\":440811,\"name\":\"?????????\",\"pid\":440800,\"level\":3},{\"id\":440823,\"name\":\"?????????\",\"pid\":440800,\"level\":3},{\"id\":440825,\"name\":\"?????????\",\"pid\":440800,\"level\":3},{\"id\":440881,\"name\":\"?????????\",\"pid\":440800,\"level\":3},{\"id\":440882,\"name\":\"?????????\",\"pid\":440800,\"level\":3},{\"id\":440883,\"name\":\"?????????\",\"pid\":440800,\"level\":3}]},{\"id\":440900,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":440902,\"name\":\"?????????\",\"pid\":440900,\"level\":3},{\"id\":440904,\"name\":\"?????????\",\"pid\":440900,\"level\":3},{\"id\":440981,\"name\":\"?????????\",\"pid\":440900,\"level\":3},{\"id\":440982,\"name\":\"?????????\",\"pid\":440900,\"level\":3},{\"id\":440983,\"name\":\"?????????\",\"pid\":440900,\"level\":3}]},{\"id\":441200,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":441202,\"name\":\"?????????\",\"pid\":441200,\"level\":3},{\"id\":441203,\"name\":\"?????????\",\"pid\":441200,\"level\":3},{\"id\":441223,\"name\":\"?????????\",\"pid\":441200,\"level\":3},{\"id\":441224,\"name\":\"?????????\",\"pid\":441200,\"level\":3},{\"id\":441225,\"name\":\"?????????\",\"pid\":441200,\"level\":3},{\"id\":441226,\"name\":\"?????????\",\"pid\":441200,\"level\":3},{\"id\":441283,\"name\":\"?????????\",\"pid\":441200,\"level\":3},{\"id\":441284,\"name\":\"?????????\",\"pid\":441200,\"level\":3}]},{\"id\":441300,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":441302,\"name\":\"?????????\",\"pid\":441300,\"level\":3},{\"id\":441303,\"name\":\"?????????\",\"pid\":441300,\"level\":3},{\"id\":441322,\"name\":\"?????????\",\"pid\":441300,\"level\":3},{\"id\":441323,\"name\":\"?????????\",\"pid\":441300,\"level\":3},{\"id\":441324,\"name\":\"?????????\",\"pid\":441300,\"level\":3}]},{\"id\":441400,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":441402,\"name\":\"?????????\",\"pid\":441400,\"level\":3},{\"id\":441403,\"name\":\"?????????\",\"pid\":441400,\"level\":3},{\"id\":441422,\"name\":\"?????????\",\"pid\":441400,\"level\":3},{\"id\":441423,\"name\":\"?????????\",\"pid\":441400,\"level\":3},{\"id\":441424,\"name\":\"?????????\",\"pid\":441400,\"level\":3},{\"id\":441426,\"name\":\"?????????\",\"pid\":441400,\"level\":3},{\"id\":441427,\"name\":\"?????????\",\"pid\":441400,\"level\":3},{\"id\":441481,\"name\":\"?????????\",\"pid\":441400,\"level\":3}]},{\"id\":441500,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":441502,\"name\":\"??????\",\"pid\":441500,\"level\":3},{\"id\":441521,\"name\":\"?????????\",\"pid\":441500,\"level\":3},{\"id\":441523,\"name\":\"?????????\",\"pid\":441500,\"level\":3},{\"id\":441581,\"name\":\"?????????\",\"pid\":441500,\"level\":3}]},{\"id\":441600,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":441602,\"name\":\"?????????\",\"pid\":441600,\"level\":3},{\"id\":441621,\"name\":\"?????????\",\"pid\":441600,\"level\":3},{\"id\":441622,\"name\":\"?????????\",\"pid\":441600,\"level\":3},{\"id\":441623,\"name\":\"?????????\",\"pid\":441600,\"level\":3},{\"id\":441624,\"name\":\"?????????\",\"pid\":441600,\"level\":3},{\"id\":441625,\"name\":\"?????????\",\"pid\":441600,\"level\":3}]},{\"id\":441700,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":441702,\"name\":\"?????????\",\"pid\":441700,\"level\":3},{\"id\":441704,\"name\":\"?????????\",\"pid\":441700,\"level\":3},{\"id\":441721,\"name\":\"?????????\",\"pid\":441700,\"level\":3},{\"id\":441781,\"name\":\"?????????\",\"pid\":441700,\"level\":3}]},{\"id\":441800,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":441802,\"name\":\"?????????\",\"pid\":441800,\"level\":3},{\"id\":441803,\"name\":\"?????????\",\"pid\":441800,\"level\":3},{\"id\":441821,\"name\":\"?????????\",\"pid\":441800,\"level\":3},{\"id\":441823,\"name\":\"?????????\",\"pid\":441800,\"level\":3},{\"id\":441825,\"name\":\"???????????????????????????\",\"pid\":441800,\"level\":3},{\"id\":441826,\"name\":\"?????????????????????\",\"pid\":441800,\"level\":3},{\"id\":441881,\"name\":\"?????????\",\"pid\":441800,\"level\":3},{\"id\":441882,\"name\":\"?????????\",\"pid\":441800,\"level\":3}]},{\"id\":441900,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":441901,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441902,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441904,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441905,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441906,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441907,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441908,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441909,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441910,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441911,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441912,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441913,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441914,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441915,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441916,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441917,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441918,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441919,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441920,\"name\":\"????????????\",\"pid\":441900,\"level\":3},{\"id\":441921,\"name\":\"????????????\",\"pid\":441900,\"level\":3},{\"id\":441922,\"name\":\"????????????\",\"pid\":441900,\"level\":3},{\"id\":441923,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441924,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441925,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441926,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441927,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441928,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441929,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441930,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441931,\"name\":\"?????????\",\"pid\":441900,\"level\":3},{\"id\":441932,\"name\":\"?????????\",\"pid\":441900,\"level\":3}]},{\"id\":442000,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":442001,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442004,\"name\":\"??????\",\"pid\":442000,\"level\":3},{\"id\":442005,\"name\":\"????????????\",\"pid\":442000,\"level\":3},{\"id\":442006,\"name\":\"???????????????\",\"pid\":442000,\"level\":3},{\"id\":442007,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442008,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442009,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442010,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442011,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442012,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442013,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442014,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442015,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442016,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442017,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442018,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442019,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442020,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442021,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442022,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442023,\"name\":\"?????????\",\"pid\":442000,\"level\":3},{\"id\":442024,\"name\":\"?????????\",\"pid\":442000,\"level\":3}]},{\"id\":445100,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":445102,\"name\":\"?????????\",\"pid\":445100,\"level\":3},{\"id\":445103,\"name\":\"?????????\",\"pid\":445100,\"level\":3},{\"id\":445122,\"name\":\"?????????\",\"pid\":445100,\"level\":3}]},{\"id\":445200,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":445202,\"name\":\"?????????\",\"pid\":445200,\"level\":3},{\"id\":445203,\"name\":\"?????????\",\"pid\":445200,\"level\":3},{\"id\":445222,\"name\":\"?????????\",\"pid\":445200,\"level\":3},{\"id\":445224,\"name\":\"?????????\",\"pid\":445200,\"level\":3},{\"id\":445281,\"name\":\"?????????\",\"pid\":445200,\"level\":3}]},{\"id\":445300,\"name\":\"?????????\",\"pid\":440000,\"level\":2,\"children\":[{\"id\":445302,\"name\":\"?????????\",\"pid\":445300,\"level\":3},{\"id\":445303,\"name\":\"?????????\",\"pid\":445300,\"level\":3},{\"id\":445321,\"name\":\"?????????\",\"pid\":445300,\"level\":3},{\"id\":445322,\"name\":\"?????????\",\"pid\":445300,\"level\":3},{\"id\":445381,\"name\":\"?????????\",\"pid\":445300,\"level\":3}]}]},{\"id\":450000,\"name\":\"?????????????????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":450100,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450102,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450103,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450105,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450107,\"name\":\"????????????\",\"pid\":450100,\"level\":3},{\"id\":450108,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450109,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450122,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450123,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450124,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450125,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450126,\"name\":\"?????????\",\"pid\":450100,\"level\":3},{\"id\":450127,\"name\":\"??????\",\"pid\":450100,\"level\":3},{\"id\":450128,\"name\":\"????????????\",\"pid\":450100,\"level\":3}]},{\"id\":450200,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450202,\"name\":\"?????????\",\"pid\":450200,\"level\":3},{\"id\":450203,\"name\":\"?????????\",\"pid\":450200,\"level\":3},{\"id\":450204,\"name\":\"?????????\",\"pid\":450200,\"level\":3},{\"id\":450205,\"name\":\"?????????\",\"pid\":450200,\"level\":3},{\"id\":450221,\"name\":\"?????????\",\"pid\":450200,\"level\":3},{\"id\":450222,\"name\":\"?????????\",\"pid\":450200,\"level\":3},{\"id\":450223,\"name\":\"?????????\",\"pid\":450200,\"level\":3},{\"id\":450224,\"name\":\"?????????\",\"pid\":450200,\"level\":3},{\"id\":450225,\"name\":\"?????????????????????\",\"pid\":450200,\"level\":3},{\"id\":450226,\"name\":\"?????????????????????\",\"pid\":450200,\"level\":3},{\"id\":450227,\"name\":\"????????????\",\"pid\":450200,\"level\":3}]},{\"id\":450300,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450302,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450303,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450304,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450305,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450311,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450312,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450321,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450323,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450324,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450325,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450326,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450327,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450328,\"name\":\"?????????????????????\",\"pid\":450300,\"level\":3},{\"id\":450329,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450330,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450331,\"name\":\"?????????\",\"pid\":450300,\"level\":3},{\"id\":450332,\"name\":\"?????????????????????\",\"pid\":450300,\"level\":3}]},{\"id\":450400,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450403,\"name\":\"?????????\",\"pid\":450400,\"level\":3},{\"id\":450405,\"name\":\"?????????\",\"pid\":450400,\"level\":3},{\"id\":450406,\"name\":\"?????????\",\"pid\":450400,\"level\":3},{\"id\":450421,\"name\":\"?????????\",\"pid\":450400,\"level\":3},{\"id\":450422,\"name\":\"??????\",\"pid\":450400,\"level\":3},{\"id\":450423,\"name\":\"?????????\",\"pid\":450400,\"level\":3},{\"id\":450481,\"name\":\"?????????\",\"pid\":450400,\"level\":3}]},{\"id\":450500,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450502,\"name\":\"?????????\",\"pid\":450500,\"level\":3},{\"id\":450503,\"name\":\"?????????\",\"pid\":450500,\"level\":3},{\"id\":450512,\"name\":\"????????????\",\"pid\":450500,\"level\":3},{\"id\":450521,\"name\":\"?????????\",\"pid\":450500,\"level\":3}]},{\"id\":450600,\"name\":\"????????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450602,\"name\":\"?????????\",\"pid\":450600,\"level\":3},{\"id\":450603,\"name\":\"?????????\",\"pid\":450600,\"level\":3},{\"id\":450621,\"name\":\"?????????\",\"pid\":450600,\"level\":3},{\"id\":450681,\"name\":\"?????????\",\"pid\":450600,\"level\":3}]},{\"id\":450700,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450702,\"name\":\"?????????\",\"pid\":450700,\"level\":3},{\"id\":450703,\"name\":\"?????????\",\"pid\":450700,\"level\":3},{\"id\":450721,\"name\":\"?????????\",\"pid\":450700,\"level\":3},{\"id\":450722,\"name\":\"?????????\",\"pid\":450700,\"level\":3}]},{\"id\":450800,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450802,\"name\":\"?????????\",\"pid\":450800,\"level\":3},{\"id\":450803,\"name\":\"?????????\",\"pid\":450800,\"level\":3},{\"id\":450804,\"name\":\"?????????\",\"pid\":450800,\"level\":3},{\"id\":450821,\"name\":\"?????????\",\"pid\":450800,\"level\":3},{\"id\":450881,\"name\":\"?????????\",\"pid\":450800,\"level\":3}]},{\"id\":450900,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":450902,\"name\":\"?????????\",\"pid\":450900,\"level\":3},{\"id\":450903,\"name\":\"?????????\",\"pid\":450900,\"level\":3},{\"id\":450904,\"name\":\"????????????\",\"pid\":450900,\"level\":3},{\"id\":450921,\"name\":\"??????\",\"pid\":450900,\"level\":3},{\"id\":450922,\"name\":\"?????????\",\"pid\":450900,\"level\":3},{\"id\":450923,\"name\":\"?????????\",\"pid\":450900,\"level\":3},{\"id\":450924,\"name\":\"?????????\",\"pid\":450900,\"level\":3},{\"id\":450981,\"name\":\"?????????\",\"pid\":450900,\"level\":3}]},{\"id\":451000,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":451002,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451021,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451022,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451023,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451024,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451025,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451026,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451027,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451028,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451029,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451030,\"name\":\"?????????\",\"pid\":451000,\"level\":3},{\"id\":451031,\"name\":\"?????????????????????\",\"pid\":451000,\"level\":3}]},{\"id\":451100,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":451102,\"name\":\"?????????\",\"pid\":451100,\"level\":3},{\"id\":451121,\"name\":\"?????????\",\"pid\":451100,\"level\":3},{\"id\":451122,\"name\":\"?????????\",\"pid\":451100,\"level\":3},{\"id\":451123,\"name\":\"?????????????????????\",\"pid\":451100,\"level\":3},{\"id\":451124,\"name\":\"???????????????\",\"pid\":451100,\"level\":3}]},{\"id\":451200,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":451202,\"name\":\"????????????\",\"pid\":451200,\"level\":3},{\"id\":451221,\"name\":\"?????????\",\"pid\":451200,\"level\":3},{\"id\":451222,\"name\":\"?????????\",\"pid\":451200,\"level\":3},{\"id\":451223,\"name\":\"?????????\",\"pid\":451200,\"level\":3},{\"id\":451224,\"name\":\"?????????\",\"pid\":451200,\"level\":3},{\"id\":451225,\"name\":\"????????????????????????\",\"pid\":451200,\"level\":3},{\"id\":451226,\"name\":\"????????????????????????\",\"pid\":451200,\"level\":3},{\"id\":451227,\"name\":\"?????????????????????\",\"pid\":451200,\"level\":3},{\"id\":451228,\"name\":\"?????????????????????\",\"pid\":451200,\"level\":3},{\"id\":451229,\"name\":\"?????????????????????\",\"pid\":451200,\"level\":3},{\"id\":451281,\"name\":\"?????????\",\"pid\":451200,\"level\":3}]},{\"id\":451300,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":451302,\"name\":\"?????????\",\"pid\":451300,\"level\":3},{\"id\":451321,\"name\":\"?????????\",\"pid\":451300,\"level\":3},{\"id\":451322,\"name\":\"?????????\",\"pid\":451300,\"level\":3},{\"id\":451323,\"name\":\"?????????\",\"pid\":451300,\"level\":3},{\"id\":451324,\"name\":\"?????????????????????\",\"pid\":451300,\"level\":3},{\"id\":451381,\"name\":\"?????????\",\"pid\":451300,\"level\":3}]},{\"id\":451400,\"name\":\"?????????\",\"pid\":450000,\"level\":2,\"children\":[{\"id\":451402,\"name\":\"?????????\",\"pid\":451400,\"level\":3},{\"id\":451421,\"name\":\"?????????\",\"pid\":451400,\"level\":3},{\"id\":451422,\"name\":\"?????????\",\"pid\":451400,\"level\":3},{\"id\":451423,\"name\":\"?????????\",\"pid\":451400,\"level\":3},{\"id\":451424,\"name\":\"?????????\",\"pid\":451400,\"level\":3},{\"id\":451425,\"name\":\"?????????\",\"pid\":451400,\"level\":3},{\"id\":451481,\"name\":\"?????????\",\"pid\":451400,\"level\":3}]}]},{\"id\":460000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":460100,\"name\":\"?????????\",\"pid\":460000,\"level\":2,\"children\":[{\"id\":460105,\"name\":\"?????????\",\"pid\":460100,\"level\":3},{\"id\":460106,\"name\":\"?????????\",\"pid\":460100,\"level\":3},{\"id\":460107,\"name\":\"?????????\",\"pid\":460100,\"level\":3},{\"id\":460108,\"name\":\"?????????\",\"pid\":460100,\"level\":3}]},{\"id\":460200,\"name\":\"?????????\",\"pid\":460000,\"level\":2,\"children\":[{\"id\":460202,\"name\":\"?????????\",\"pid\":460200,\"level\":3},{\"id\":460203,\"name\":\"?????????\",\"pid\":460200,\"level\":3},{\"id\":460204,\"name\":\"?????????\",\"pid\":460200,\"level\":3},{\"id\":460205,\"name\":\"?????????\",\"pid\":460200,\"level\":3}]},{\"id\":460300,\"name\":\"?????????\",\"pid\":460000,\"level\":2,\"children\":[{\"id\":460321,\"name\":\"????????????\",\"pid\":460300,\"level\":3},{\"id\":460322,\"name\":\"????????????\",\"pid\":460300,\"level\":3},{\"id\":460323,\"name\":\"????????????\",\"pid\":460300,\"level\":3}]},{\"id\":469000,\"name\":\"????????????\",\"pid\":460000,\"level\":2,\"children\":[{\"id\":469001,\"name\":\"????????????\",\"pid\":469000,\"level\":3},{\"id\":469002,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469003,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469005,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469006,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469007,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469021,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469022,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469023,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469024,\"name\":\"?????????\",\"pid\":469000,\"level\":3},{\"id\":469025,\"name\":\"?????????????????????\",\"pid\":469000,\"level\":3},{\"id\":469026,\"name\":\"?????????????????????\",\"pid\":469000,\"level\":3},{\"id\":469027,\"name\":\"?????????????????????\",\"pid\":469000,\"level\":3},{\"id\":469028,\"name\":\"?????????????????????\",\"pid\":469000,\"level\":3},{\"id\":469029,\"name\":\"???????????????????????????\",\"pid\":469000,\"level\":3},{\"id\":469030,\"name\":\"???????????????????????????\",\"pid\":469000,\"level\":3}]}]},{\"id\":500000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":500100,\"name\":\"?????????\",\"pid\":500000,\"level\":2,\"children\":[{\"id\":500101,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500102,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500103,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500104,\"name\":\"????????????\",\"pid\":500100,\"level\":3},{\"id\":500105,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500106,\"name\":\"????????????\",\"pid\":500100,\"level\":3},{\"id\":500107,\"name\":\"????????????\",\"pid\":500100,\"level\":3},{\"id\":500108,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500109,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500110,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500111,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500112,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500113,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500114,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500115,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500116,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500117,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500118,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500119,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500120,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500151,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500223,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500226,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500228,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500229,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500230,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500231,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500232,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500233,\"name\":\"??????\",\"pid\":500100,\"level\":3},{\"id\":500234,\"name\":\"??????\",\"pid\":500100,\"level\":3},{\"id\":500235,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500236,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500237,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500238,\"name\":\"?????????\",\"pid\":500100,\"level\":3},{\"id\":500240,\"name\":\"????????????????????????\",\"pid\":500100,\"level\":3},{\"id\":500241,\"name\":\"??????????????????????????????\",\"pid\":500100,\"level\":3},{\"id\":500242,\"name\":\"??????????????????????????????\",\"pid\":500100,\"level\":3},{\"id\":500243,\"name\":\"??????????????????????????????\",\"pid\":500100,\"level\":3}]},{\"id\":500300,\"name\":\"????????????\",\"pid\":500000,\"level\":2,\"children\":[{\"id\":500301,\"name\":\"????????????\",\"pid\":500300,\"level\":3},{\"id\":500302,\"name\":\"????????????\",\"pid\":500300,\"level\":3},{\"id\":500303,\"name\":\"????????????\",\"pid\":500300,\"level\":3}]}]},{\"id\":510000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":510100,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":510104,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510105,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510106,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510107,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510108,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510112,\"name\":\"????????????\",\"pid\":510100,\"level\":3},{\"id\":510113,\"name\":\"????????????\",\"pid\":510100,\"level\":3},{\"id\":510114,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510115,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510121,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510122,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510124,\"name\":\"??????\",\"pid\":510100,\"level\":3},{\"id\":510129,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510131,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510132,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510181,\"name\":\"????????????\",\"pid\":510100,\"level\":3},{\"id\":510182,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510183,\"name\":\"?????????\",\"pid\":510100,\"level\":3},{\"id\":510184,\"name\":\"?????????\",\"pid\":510100,\"level\":3}]},{\"id\":510300,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":510302,\"name\":\"????????????\",\"pid\":510300,\"level\":3},{\"id\":510303,\"name\":\"?????????\",\"pid\":510300,\"level\":3},{\"id\":510304,\"name\":\"?????????\",\"pid\":510300,\"level\":3},{\"id\":510311,\"name\":\"?????????\",\"pid\":510300,\"level\":3},{\"id\":510321,\"name\":\"??????\",\"pid\":510300,\"level\":3},{\"id\":510322,\"name\":\"?????????\",\"pid\":510300,\"level\":3}]},{\"id\":510400,\"name\":\"????????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":510402,\"name\":\"??????\",\"pid\":510400,\"level\":3},{\"id\":510403,\"name\":\"??????\",\"pid\":510400,\"level\":3},{\"id\":510411,\"name\":\"?????????\",\"pid\":510400,\"level\":3},{\"id\":510421,\"name\":\"?????????\",\"pid\":510400,\"level\":3},{\"id\":510422,\"name\":\"?????????\",\"pid\":510400,\"level\":3}]},{\"id\":510500,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":510502,\"name\":\"?????????\",\"pid\":510500,\"level\":3},{\"id\":510503,\"name\":\"?????????\",\"pid\":510500,\"level\":3},{\"id\":510504,\"name\":\"????????????\",\"pid\":510500,\"level\":3},{\"id\":510521,\"name\":\"??????\",\"pid\":510500,\"level\":3},{\"id\":510522,\"name\":\"?????????\",\"pid\":510500,\"level\":3},{\"id\":510524,\"name\":\"?????????\",\"pid\":510500,\"level\":3},{\"id\":510525,\"name\":\"?????????\",\"pid\":510500,\"level\":3}]},{\"id\":510600,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":510603,\"name\":\"?????????\",\"pid\":510600,\"level\":3},{\"id\":510623,\"name\":\"?????????\",\"pid\":510600,\"level\":3},{\"id\":510626,\"name\":\"?????????\",\"pid\":510600,\"level\":3},{\"id\":510681,\"name\":\"?????????\",\"pid\":510600,\"level\":3},{\"id\":510682,\"name\":\"?????????\",\"pid\":510600,\"level\":3},{\"id\":510683,\"name\":\"?????????\",\"pid\":510600,\"level\":3}]},{\"id\":510700,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":510703,\"name\":\"?????????\",\"pid\":510700,\"level\":3},{\"id\":510704,\"name\":\"?????????\",\"pid\":510700,\"level\":3},{\"id\":510722,\"name\":\"?????????\",\"pid\":510700,\"level\":3},{\"id\":510723,\"name\":\"?????????\",\"pid\":510700,\"level\":3},{\"id\":510724,\"name\":\"??????\",\"pid\":510700,\"level\":3},{\"id\":510725,\"name\":\"?????????\",\"pid\":510700,\"level\":3},{\"id\":510726,\"name\":\"?????????????????????\",\"pid\":510700,\"level\":3},{\"id\":510727,\"name\":\"?????????\",\"pid\":510700,\"level\":3},{\"id\":510781,\"name\":\"?????????\",\"pid\":510700,\"level\":3}]},{\"id\":510800,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":510802,\"name\":\"?????????\",\"pid\":510800,\"level\":3},{\"id\":510811,\"name\":\"?????????\",\"pid\":510800,\"level\":3},{\"id\":510812,\"name\":\"?????????\",\"pid\":510800,\"level\":3},{\"id\":510821,\"name\":\"?????????\",\"pid\":510800,\"level\":3},{\"id\":510822,\"name\":\"?????????\",\"pid\":510800,\"level\":3},{\"id\":510823,\"name\":\"?????????\",\"pid\":510800,\"level\":3},{\"id\":510824,\"name\":\"?????????\",\"pid\":510800,\"level\":3}]},{\"id\":510900,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":510903,\"name\":\"?????????\",\"pid\":510900,\"level\":3},{\"id\":510904,\"name\":\"?????????\",\"pid\":510900,\"level\":3},{\"id\":510921,\"name\":\"?????????\",\"pid\":510900,\"level\":3},{\"id\":510922,\"name\":\"?????????\",\"pid\":510900,\"level\":3},{\"id\":510923,\"name\":\"?????????\",\"pid\":510900,\"level\":3}]},{\"id\":511000,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511002,\"name\":\"?????????\",\"pid\":511000,\"level\":3},{\"id\":511011,\"name\":\"?????????\",\"pid\":511000,\"level\":3},{\"id\":511024,\"name\":\"?????????\",\"pid\":511000,\"level\":3},{\"id\":511025,\"name\":\"?????????\",\"pid\":511000,\"level\":3},{\"id\":511028,\"name\":\"?????????\",\"pid\":511000,\"level\":3}]},{\"id\":511100,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511102,\"name\":\"?????????\",\"pid\":511100,\"level\":3},{\"id\":511111,\"name\":\"?????????\",\"pid\":511100,\"level\":3},{\"id\":511112,\"name\":\"????????????\",\"pid\":511100,\"level\":3},{\"id\":511113,\"name\":\"????????????\",\"pid\":511100,\"level\":3},{\"id\":511123,\"name\":\"?????????\",\"pid\":511100,\"level\":3},{\"id\":511124,\"name\":\"?????????\",\"pid\":511100,\"level\":3},{\"id\":511126,\"name\":\"?????????\",\"pid\":511100,\"level\":3},{\"id\":511129,\"name\":\"?????????\",\"pid\":511100,\"level\":3},{\"id\":511132,\"name\":\"?????????????????????\",\"pid\":511100,\"level\":3},{\"id\":511133,\"name\":\"?????????????????????\",\"pid\":511100,\"level\":3},{\"id\":511181,\"name\":\"????????????\",\"pid\":511100,\"level\":3}]},{\"id\":511300,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511302,\"name\":\"?????????\",\"pid\":511300,\"level\":3},{\"id\":511303,\"name\":\"?????????\",\"pid\":511300,\"level\":3},{\"id\":511304,\"name\":\"?????????\",\"pid\":511300,\"level\":3},{\"id\":511321,\"name\":\"?????????\",\"pid\":511300,\"level\":3},{\"id\":511322,\"name\":\"?????????\",\"pid\":511300,\"level\":3},{\"id\":511323,\"name\":\"?????????\",\"pid\":511300,\"level\":3},{\"id\":511324,\"name\":\"?????????\",\"pid\":511300,\"level\":3},{\"id\":511325,\"name\":\"?????????\",\"pid\":511300,\"level\":3},{\"id\":511381,\"name\":\"?????????\",\"pid\":511300,\"level\":3}]},{\"id\":511400,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511402,\"name\":\"?????????\",\"pid\":511400,\"level\":3},{\"id\":511403,\"name\":\"?????????\",\"pid\":511400,\"level\":3},{\"id\":511421,\"name\":\"?????????\",\"pid\":511400,\"level\":3},{\"id\":511423,\"name\":\"?????????\",\"pid\":511400,\"level\":3},{\"id\":511424,\"name\":\"?????????\",\"pid\":511400,\"level\":3},{\"id\":511425,\"name\":\"?????????\",\"pid\":511400,\"level\":3}]},{\"id\":511500,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511502,\"name\":\"?????????\",\"pid\":511500,\"level\":3},{\"id\":511503,\"name\":\"?????????\",\"pid\":511500,\"level\":3},{\"id\":511521,\"name\":\"?????????\",\"pid\":511500,\"level\":3},{\"id\":511523,\"name\":\"?????????\",\"pid\":511500,\"level\":3},{\"id\":511524,\"name\":\"?????????\",\"pid\":511500,\"level\":3},{\"id\":511525,\"name\":\"??????\",\"pid\":511500,\"level\":3},{\"id\":511526,\"name\":\"??????\",\"pid\":511500,\"level\":3},{\"id\":511527,\"name\":\"?????????\",\"pid\":511500,\"level\":3},{\"id\":511528,\"name\":\"?????????\",\"pid\":511500,\"level\":3},{\"id\":511529,\"name\":\"?????????\",\"pid\":511500,\"level\":3}]},{\"id\":511600,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511602,\"name\":\"?????????\",\"pid\":511600,\"level\":3},{\"id\":511603,\"name\":\"?????????\",\"pid\":511600,\"level\":3},{\"id\":511621,\"name\":\"?????????\",\"pid\":511600,\"level\":3},{\"id\":511622,\"name\":\"?????????\",\"pid\":511600,\"level\":3},{\"id\":511623,\"name\":\"?????????\",\"pid\":511600,\"level\":3},{\"id\":511681,\"name\":\"?????????\",\"pid\":511600,\"level\":3}]},{\"id\":511700,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511702,\"name\":\"?????????\",\"pid\":511700,\"level\":3},{\"id\":511703,\"name\":\"?????????\",\"pid\":511700,\"level\":3},{\"id\":511722,\"name\":\"?????????\",\"pid\":511700,\"level\":3},{\"id\":511723,\"name\":\"?????????\",\"pid\":511700,\"level\":3},{\"id\":511724,\"name\":\"?????????\",\"pid\":511700,\"level\":3},{\"id\":511725,\"name\":\"??????\",\"pid\":511700,\"level\":3},{\"id\":511781,\"name\":\"?????????\",\"pid\":511700,\"level\":3}]},{\"id\":511800,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511802,\"name\":\"?????????\",\"pid\":511800,\"level\":3},{\"id\":511803,\"name\":\"?????????\",\"pid\":511800,\"level\":3},{\"id\":511822,\"name\":\"?????????\",\"pid\":511800,\"level\":3},{\"id\":511823,\"name\":\"?????????\",\"pid\":511800,\"level\":3},{\"id\":511824,\"name\":\"?????????\",\"pid\":511800,\"level\":3},{\"id\":511825,\"name\":\"?????????\",\"pid\":511800,\"level\":3},{\"id\":511826,\"name\":\"?????????\",\"pid\":511800,\"level\":3},{\"id\":511827,\"name\":\"?????????\",\"pid\":511800,\"level\":3}]},{\"id\":511900,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":511902,\"name\":\"?????????\",\"pid\":511900,\"level\":3},{\"id\":511903,\"name\":\"?????????\",\"pid\":511900,\"level\":3},{\"id\":511921,\"name\":\"?????????\",\"pid\":511900,\"level\":3},{\"id\":511922,\"name\":\"?????????\",\"pid\":511900,\"level\":3},{\"id\":511923,\"name\":\"?????????\",\"pid\":511900,\"level\":3}]},{\"id\":512000,\"name\":\"?????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":512002,\"name\":\"?????????\",\"pid\":512000,\"level\":3},{\"id\":512021,\"name\":\"?????????\",\"pid\":512000,\"level\":3},{\"id\":512022,\"name\":\"?????????\",\"pid\":512000,\"level\":3},{\"id\":512081,\"name\":\"?????????\",\"pid\":512000,\"level\":3}]},{\"id\":513200,\"name\":\"???????????????????????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":513221,\"name\":\"?????????\",\"pid\":513200,\"level\":3},{\"id\":513222,\"name\":\"??????\",\"pid\":513200,\"level\":3},{\"id\":513223,\"name\":\"??????\",\"pid\":513200,\"level\":3},{\"id\":513224,\"name\":\"?????????\",\"pid\":513200,\"level\":3},{\"id\":513225,\"name\":\"????????????\",\"pid\":513200,\"level\":3},{\"id\":513226,\"name\":\"?????????\",\"pid\":513200,\"level\":3},{\"id\":513227,\"name\":\"?????????\",\"pid\":513200,\"level\":3},{\"id\":513228,\"name\":\"?????????\",\"pid\":513200,\"level\":3},{\"id\":513229,\"name\":\"????????????\",\"pid\":513200,\"level\":3},{\"id\":513230,\"name\":\"?????????\",\"pid\":513200,\"level\":3},{\"id\":513231,\"name\":\"?????????\",\"pid\":513200,\"level\":3},{\"id\":513232,\"name\":\"????????????\",\"pid\":513200,\"level\":3},{\"id\":513233,\"name\":\"?????????\",\"pid\":513200,\"level\":3}]},{\"id\":513300,\"name\":\"?????????????????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":513321,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513322,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513323,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513324,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513325,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513326,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513327,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513328,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513329,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513330,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513331,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513332,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513333,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513334,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513335,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513336,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513337,\"name\":\"?????????\",\"pid\":513300,\"level\":3},{\"id\":513338,\"name\":\"?????????\",\"pid\":513300,\"level\":3}]},{\"id\":513400,\"name\":\"?????????????????????\",\"pid\":510000,\"level\":2,\"children\":[{\"id\":513401,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513422,\"name\":\"?????????????????????\",\"pid\":513400,\"level\":3},{\"id\":513423,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513424,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513425,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513426,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513427,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513428,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513429,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513430,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513431,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513432,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513433,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513434,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513435,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513436,\"name\":\"?????????\",\"pid\":513400,\"level\":3},{\"id\":513437,\"name\":\"?????????\",\"pid\":513400,\"level\":3}]}]},{\"id\":520000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":520100,\"name\":\"?????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":520102,\"name\":\"?????????\",\"pid\":520100,\"level\":3},{\"id\":520103,\"name\":\"?????????\",\"pid\":520100,\"level\":3},{\"id\":520111,\"name\":\"?????????\",\"pid\":520100,\"level\":3},{\"id\":520112,\"name\":\"?????????\",\"pid\":520100,\"level\":3},{\"id\":520113,\"name\":\"?????????\",\"pid\":520100,\"level\":3},{\"id\":520115,\"name\":\"????????????\",\"pid\":520100,\"level\":3},{\"id\":520121,\"name\":\"?????????\",\"pid\":520100,\"level\":3},{\"id\":520122,\"name\":\"?????????\",\"pid\":520100,\"level\":3},{\"id\":520123,\"name\":\"?????????\",\"pid\":520100,\"level\":3},{\"id\":520181,\"name\":\"?????????\",\"pid\":520100,\"level\":3}]},{\"id\":520200,\"name\":\"????????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":520201,\"name\":\"?????????\",\"pid\":520200,\"level\":3},{\"id\":520203,\"name\":\"????????????\",\"pid\":520200,\"level\":3},{\"id\":520221,\"name\":\"?????????\",\"pid\":520200,\"level\":3},{\"id\":520222,\"name\":\"??????\",\"pid\":520200,\"level\":3}]},{\"id\":520300,\"name\":\"?????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":520302,\"name\":\"????????????\",\"pid\":520300,\"level\":3},{\"id\":520303,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520321,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520322,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520323,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520324,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520325,\"name\":\"??????????????????????????????\",\"pid\":520300,\"level\":3},{\"id\":520326,\"name\":\"??????????????????????????????\",\"pid\":520300,\"level\":3},{\"id\":520327,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520328,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520329,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520330,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520381,\"name\":\"?????????\",\"pid\":520300,\"level\":3},{\"id\":520382,\"name\":\"?????????\",\"pid\":520300,\"level\":3}]},{\"id\":520400,\"name\":\"?????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":520402,\"name\":\"?????????\",\"pid\":520400,\"level\":3},{\"id\":520421,\"name\":\"?????????\",\"pid\":520400,\"level\":3},{\"id\":520422,\"name\":\"?????????\",\"pid\":520400,\"level\":3},{\"id\":520423,\"name\":\"??????????????????????????????\",\"pid\":520400,\"level\":3},{\"id\":520424,\"name\":\"??????????????????????????????\",\"pid\":520400,\"level\":3},{\"id\":520425,\"name\":\"??????????????????????????????\",\"pid\":520400,\"level\":3}]},{\"id\":520500,\"name\":\"?????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":520502,\"name\":\"????????????\",\"pid\":520500,\"level\":3},{\"id\":520521,\"name\":\"?????????\",\"pid\":520500,\"level\":3},{\"id\":520522,\"name\":\"?????????\",\"pid\":520500,\"level\":3},{\"id\":520523,\"name\":\"?????????\",\"pid\":520500,\"level\":3},{\"id\":520524,\"name\":\"?????????\",\"pid\":520500,\"level\":3},{\"id\":520525,\"name\":\"?????????\",\"pid\":520500,\"level\":3},{\"id\":520526,\"name\":\"?????????????????????????????????\",\"pid\":520500,\"level\":3},{\"id\":520527,\"name\":\"?????????\",\"pid\":520500,\"level\":3}]},{\"id\":520600,\"name\":\"?????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":520602,\"name\":\"?????????\",\"pid\":520600,\"level\":3},{\"id\":520603,\"name\":\"?????????\",\"pid\":520600,\"level\":3},{\"id\":520621,\"name\":\"?????????\",\"pid\":520600,\"level\":3},{\"id\":520622,\"name\":\"?????????????????????\",\"pid\":520600,\"level\":3},{\"id\":520623,\"name\":\"?????????\",\"pid\":520600,\"level\":3},{\"id\":520624,\"name\":\"?????????\",\"pid\":520600,\"level\":3},{\"id\":520625,\"name\":\"??????????????????????????????\",\"pid\":520600,\"level\":3},{\"id\":520626,\"name\":\"?????????\",\"pid\":520600,\"level\":3},{\"id\":520627,\"name\":\"????????????????????????\",\"pid\":520600,\"level\":3},{\"id\":520628,\"name\":\"?????????????????????\",\"pid\":520600,\"level\":3}]},{\"id\":522300,\"name\":\"?????????????????????????????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":522301,\"name\":\"????????? \",\"pid\":522300,\"level\":3},{\"id\":522322,\"name\":\"?????????\",\"pid\":522300,\"level\":3},{\"id\":522323,\"name\":\"?????????\",\"pid\":522300,\"level\":3},{\"id\":522324,\"name\":\"?????????\",\"pid\":522300,\"level\":3},{\"id\":522325,\"name\":\"?????????\",\"pid\":522300,\"level\":3},{\"id\":522326,\"name\":\"?????????\",\"pid\":522300,\"level\":3},{\"id\":522327,\"name\":\"?????????\",\"pid\":522300,\"level\":3},{\"id\":522328,\"name\":\"?????????\",\"pid\":522300,\"level\":3}]},{\"id\":522600,\"name\":\"??????????????????????????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":522601,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522622,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522623,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522624,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522625,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522626,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522627,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522628,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522629,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522630,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522631,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522632,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522633,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522634,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522635,\"name\":\"?????????\",\"pid\":522600,\"level\":3},{\"id\":522636,\"name\":\"?????????\",\"pid\":522600,\"level\":3}]},{\"id\":522700,\"name\":\"??????????????????????????????\",\"pid\":520000,\"level\":2,\"children\":[{\"id\":522701,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522702,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522722,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522723,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522725,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522726,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522727,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522728,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522729,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522730,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522731,\"name\":\"?????????\",\"pid\":522700,\"level\":3},{\"id\":522732,\"name\":\"?????????????????????\",\"pid\":522700,\"level\":3}]}]},{\"id\":530000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":530100,\"name\":\"?????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":530102,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530103,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530111,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530112,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530113,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530114,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530122,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530124,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530125,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530126,\"name\":\"?????????????????????\",\"pid\":530100,\"level\":3},{\"id\":530127,\"name\":\"?????????\",\"pid\":530100,\"level\":3},{\"id\":530128,\"name\":\"???????????????????????????\",\"pid\":530100,\"level\":3},{\"id\":530129,\"name\":\"??????????????????????????? \",\"pid\":530100,\"level\":3},{\"id\":530181,\"name\":\"?????????\",\"pid\":530100,\"level\":3}]},{\"id\":530300,\"name\":\"?????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":530302,\"name\":\"?????????\",\"pid\":530300,\"level\":3},{\"id\":530321,\"name\":\"?????????\",\"pid\":530300,\"level\":3},{\"id\":530322,\"name\":\"?????????\",\"pid\":530300,\"level\":3},{\"id\":530323,\"name\":\"?????????\",\"pid\":530300,\"level\":3},{\"id\":530324,\"name\":\"?????????\",\"pid\":530300,\"level\":3},{\"id\":530325,\"name\":\"?????????\",\"pid\":530300,\"level\":3},{\"id\":530326,\"name\":\"?????????\",\"pid\":530300,\"level\":3},{\"id\":530328,\"name\":\"?????????\",\"pid\":530300,\"level\":3},{\"id\":530381,\"name\":\"?????????\",\"pid\":530300,\"level\":3}]},{\"id\":530400,\"name\":\"?????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":530402,\"name\":\"?????????\",\"pid\":530400,\"level\":3},{\"id\":530421,\"name\":\"?????????\",\"pid\":530400,\"level\":3},{\"id\":530422,\"name\":\"?????????\",\"pid\":530400,\"level\":3},{\"id\":530423,\"name\":\"?????????\",\"pid\":530400,\"level\":3},{\"id\":530424,\"name\":\"?????????\",\"pid\":530400,\"level\":3},{\"id\":530425,\"name\":\"?????????\",\"pid\":530400,\"level\":3},{\"id\":530426,\"name\":\"?????????????????????\",\"pid\":530400,\"level\":3},{\"id\":530427,\"name\":\"???????????????????????????\",\"pid\":530400,\"level\":3},{\"id\":530428,\"name\":\"????????????????????????????????????\",\"pid\":530400,\"level\":3}]},{\"id\":530500,\"name\":\"?????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":530502,\"name\":\"?????????\",\"pid\":530500,\"level\":3},{\"id\":530521,\"name\":\"?????????\",\"pid\":530500,\"level\":3},{\"id\":530522,\"name\":\"?????????\",\"pid\":530500,\"level\":3},{\"id\":530523,\"name\":\"?????????\",\"pid\":530500,\"level\":3},{\"id\":530524,\"name\":\"?????????\",\"pid\":530500,\"level\":3}]},{\"id\":530600,\"name\":\"?????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":530602,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530621,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530622,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530623,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530624,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530625,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530626,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530627,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530628,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530629,\"name\":\"?????????\",\"pid\":530600,\"level\":3},{\"id\":530630,\"name\":\"?????????\",\"pid\":530600,\"level\":3}]},{\"id\":530700,\"name\":\"?????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":530702,\"name\":\"?????????\",\"pid\":530700,\"level\":3},{\"id\":530721,\"name\":\"????????????????????????\",\"pid\":530700,\"level\":3},{\"id\":530722,\"name\":\"?????????\",\"pid\":530700,\"level\":3},{\"id\":530723,\"name\":\"?????????\",\"pid\":530700,\"level\":3},{\"id\":530724,\"name\":\"?????????????????????\",\"pid\":530700,\"level\":3}]},{\"id\":530800,\"name\":\"?????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":530802,\"name\":\"?????????\",\"pid\":530800,\"level\":3},{\"id\":530821,\"name\":\"??????????????????????????????\",\"pid\":530800,\"level\":3},{\"id\":530822,\"name\":\"????????????????????????\",\"pid\":530800,\"level\":3},{\"id\":530823,\"name\":\"?????????????????????\",\"pid\":530800,\"level\":3},{\"id\":530824,\"name\":\"???????????????????????????\",\"pid\":530800,\"level\":3},{\"id\":530825,\"name\":\"???????????????????????????????????????\",\"pid\":530800,\"level\":3},{\"id\":530826,\"name\":\"??????????????????????????????\",\"pid\":530800,\"level\":3},{\"id\":530827,\"name\":\"????????????????????????????????????\",\"pid\":530800,\"level\":3},{\"id\":530828,\"name\":\"????????????????????????\",\"pid\":530800,\"level\":3},{\"id\":530829,\"name\":\"?????????????????????\",\"pid\":530800,\"level\":3}]},{\"id\":530900,\"name\":\"?????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":530902,\"name\":\"?????????\",\"pid\":530900,\"level\":3},{\"id\":530921,\"name\":\"?????????\",\"pid\":530900,\"level\":3},{\"id\":530922,\"name\":\"??????\",\"pid\":530900,\"level\":3},{\"id\":530923,\"name\":\"?????????\",\"pid\":530900,\"level\":3},{\"id\":530924,\"name\":\"?????????\",\"pid\":530900,\"level\":3},{\"id\":530925,\"name\":\"?????????????????????????????????????????????\",\"pid\":530900,\"level\":3},{\"id\":530926,\"name\":\"???????????????????????????\",\"pid\":530900,\"level\":3},{\"id\":530927,\"name\":\"?????????????????????\",\"pid\":530900,\"level\":3}]},{\"id\":532300,\"name\":\"?????????????????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":532301,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532322,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532323,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532324,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532325,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532326,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532327,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532328,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532329,\"name\":\"?????????\",\"pid\":532300,\"level\":3},{\"id\":532331,\"name\":\"?????????\",\"pid\":532300,\"level\":3}]},{\"id\":532500,\"name\":\"??????????????????????????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":532501,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532502,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532503,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532504,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532523,\"name\":\"?????????????????????\",\"pid\":532500,\"level\":3},{\"id\":532524,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532525,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532527,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532528,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532529,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532530,\"name\":\"?????????????????????????????????\",\"pid\":532500,\"level\":3},{\"id\":532531,\"name\":\"?????????\",\"pid\":532500,\"level\":3},{\"id\":532532,\"name\":\"?????????????????????\",\"pid\":532500,\"level\":3}]},{\"id\":532600,\"name\":\"???????????????????????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":532601,\"name\":\"?????????\",\"pid\":532600,\"level\":3},{\"id\":532622,\"name\":\"?????????\",\"pid\":532600,\"level\":3},{\"id\":532623,\"name\":\"?????????\",\"pid\":532600,\"level\":3},{\"id\":532624,\"name\":\"????????????\",\"pid\":532600,\"level\":3},{\"id\":532625,\"name\":\"?????????\",\"pid\":532600,\"level\":3},{\"id\":532626,\"name\":\"?????????\",\"pid\":532600,\"level\":3},{\"id\":532627,\"name\":\"?????????\",\"pid\":532600,\"level\":3},{\"id\":532628,\"name\":\"?????????\",\"pid\":532600,\"level\":3}]},{\"id\":532800,\"name\":\"???????????????????????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":532801,\"name\":\"?????????\",\"pid\":532800,\"level\":3},{\"id\":532822,\"name\":\"?????????\",\"pid\":532800,\"level\":3},{\"id\":532823,\"name\":\"?????????\",\"pid\":532800,\"level\":3}]},{\"id\":532900,\"name\":\"?????????????????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":532901,\"name\":\"?????????\",\"pid\":532900,\"level\":3},{\"id\":532922,\"name\":\"?????????????????????\",\"pid\":532900,\"level\":3},{\"id\":532923,\"name\":\"?????????\",\"pid\":532900,\"level\":3},{\"id\":532924,\"name\":\"?????????\",\"pid\":532900,\"level\":3},{\"id\":532925,\"name\":\"?????????\",\"pid\":532900,\"level\":3},{\"id\":532926,\"name\":\"?????????????????????\",\"pid\":532900,\"level\":3},{\"id\":532927,\"name\":\"???????????????????????????\",\"pid\":532900,\"level\":3},{\"id\":532928,\"name\":\"?????????\",\"pid\":532900,\"level\":3},{\"id\":532929,\"name\":\"?????????\",\"pid\":532900,\"level\":3},{\"id\":532930,\"name\":\"?????????\",\"pid\":532900,\"level\":3},{\"id\":532931,\"name\":\"?????????\",\"pid\":532900,\"level\":3},{\"id\":532932,\"name\":\"?????????\",\"pid\":532900,\"level\":3}]},{\"id\":533100,\"name\":\"??????????????????????????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":533102,\"name\":\"?????????\",\"pid\":533100,\"level\":3},{\"id\":533103,\"name\":\"??????\",\"pid\":533100,\"level\":3},{\"id\":533122,\"name\":\"?????????\",\"pid\":533100,\"level\":3},{\"id\":533123,\"name\":\"?????????\",\"pid\":533100,\"level\":3},{\"id\":533124,\"name\":\"?????????\",\"pid\":533100,\"level\":3}]},{\"id\":533300,\"name\":\"????????????????????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":533321,\"name\":\"?????????\",\"pid\":533300,\"level\":3},{\"id\":533323,\"name\":\"?????????\",\"pid\":533300,\"level\":3},{\"id\":533324,\"name\":\"??????????????????????????????\",\"pid\":533300,\"level\":3},{\"id\":533325,\"name\":\"??????????????????????????????\",\"pid\":533300,\"level\":3}]},{\"id\":533400,\"name\":\"?????????????????????\",\"pid\":530000,\"level\":2,\"children\":[{\"id\":533421,\"name\":\"???????????????\",\"pid\":533400,\"level\":3},{\"id\":533422,\"name\":\"?????????\",\"pid\":533400,\"level\":3},{\"id\":533423,\"name\":\"????????????????????????\",\"pid\":533400,\"level\":3}]}]},{\"id\":540000,\"name\":\"???????????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":540100,\"name\":\"?????????\",\"pid\":540000,\"level\":2,\"children\":[{\"id\":540102,\"name\":\"?????????\",\"pid\":540100,\"level\":3},{\"id\":540121,\"name\":\"?????????\",\"pid\":540100,\"level\":3},{\"id\":540122,\"name\":\"?????????\",\"pid\":540100,\"level\":3},{\"id\":540123,\"name\":\"?????????\",\"pid\":540100,\"level\":3},{\"id\":540124,\"name\":\"?????????\",\"pid\":540100,\"level\":3},{\"id\":540125,\"name\":\"???????????????\",\"pid\":540100,\"level\":3},{\"id\":540126,\"name\":\"?????????\",\"pid\":540100,\"level\":3},{\"id\":540127,\"name\":\"???????????????\",\"pid\":540100,\"level\":3}]},{\"id\":540200,\"name\":\"????????????\",\"pid\":540000,\"level\":2,\"children\":[{\"id\":540202,\"name\":\"????????????\",\"pid\":540200,\"level\":3},{\"id\":540221,\"name\":\"????????????\",\"pid\":540200,\"level\":3},{\"id\":540222,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540223,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540224,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540225,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540226,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540227,\"name\":\"????????????\",\"pid\":540200,\"level\":3},{\"id\":540228,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540229,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540230,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540231,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540232,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540233,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540234,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540235,\"name\":\"????????????\",\"pid\":540200,\"level\":3},{\"id\":540236,\"name\":\"?????????\",\"pid\":540200,\"level\":3},{\"id\":540237,\"name\":\"?????????\",\"pid\":540200,\"level\":3}]},{\"id\":540300,\"name\":\"?????????\",\"pid\":540000,\"level\":2,\"children\":[{\"id\":540302,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540321,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540322,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540323,\"name\":\"????????????\",\"pid\":540300,\"level\":3},{\"id\":540324,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540325,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540326,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540327,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540328,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540329,\"name\":\"?????????\",\"pid\":540300,\"level\":3},{\"id\":540330,\"name\":\"?????????\",\"pid\":540300,\"level\":3}]},{\"id\":542200,\"name\":\"????????????\",\"pid\":540000,\"level\":2,\"children\":[{\"id\":542221,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542222,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542223,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542224,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542225,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542226,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542227,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542228,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542229,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542231,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542232,\"name\":\"?????????\",\"pid\":542200,\"level\":3},{\"id\":542233,\"name\":\"????????????\",\"pid\":542200,\"level\":3}]},{\"id\":542400,\"name\":\"????????????\",\"pid\":540000,\"level\":2,\"children\":[{\"id\":542421,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542422,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542423,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542424,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542425,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542426,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542427,\"name\":\"??????\",\"pid\":542400,\"level\":3},{\"id\":542428,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542429,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542430,\"name\":\"?????????\",\"pid\":542400,\"level\":3},{\"id\":542431,\"name\":\"?????????\",\"pid\":542400,\"level\":3}]},{\"id\":542500,\"name\":\"????????????\",\"pid\":540000,\"level\":2,\"children\":[{\"id\":542521,\"name\":\"?????????\",\"pid\":542500,\"level\":3},{\"id\":542522,\"name\":\"?????????\",\"pid\":542500,\"level\":3},{\"id\":542523,\"name\":\"?????????\",\"pid\":542500,\"level\":3},{\"id\":542524,\"name\":\"?????????\",\"pid\":542500,\"level\":3},{\"id\":542525,\"name\":\"?????????\",\"pid\":542500,\"level\":3},{\"id\":542526,\"name\":\"?????????\",\"pid\":542500,\"level\":3},{\"id\":542527,\"name\":\"?????????\",\"pid\":542500,\"level\":3}]},{\"id\":542600,\"name\":\"????????????\",\"pid\":540000,\"level\":2,\"children\":[{\"id\":542621,\"name\":\"?????????\",\"pid\":542600,\"level\":3},{\"id\":542622,\"name\":\"???????????????\",\"pid\":542600,\"level\":3},{\"id\":542623,\"name\":\"?????????\",\"pid\":542600,\"level\":3},{\"id\":542624,\"name\":\"?????????\",\"pid\":542600,\"level\":3},{\"id\":542625,\"name\":\"?????????\",\"pid\":542600,\"level\":3},{\"id\":542626,\"name\":\"?????????\",\"pid\":542600,\"level\":3},{\"id\":542627,\"name\":\"??????\",\"pid\":542600,\"level\":3}]}]},{\"id\":610000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":610100,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610102,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610103,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610104,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610111,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610112,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610113,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610114,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610115,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610116,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610122,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610124,\"name\":\"?????????\",\"pid\":610100,\"level\":3},{\"id\":610125,\"name\":\"??????\",\"pid\":610100,\"level\":3},{\"id\":610126,\"name\":\"?????????\",\"pid\":610100,\"level\":3}]},{\"id\":610200,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610202,\"name\":\"?????????\",\"pid\":610200,\"level\":3},{\"id\":610203,\"name\":\"?????????\",\"pid\":610200,\"level\":3},{\"id\":610204,\"name\":\"?????????\",\"pid\":610200,\"level\":3},{\"id\":610222,\"name\":\"?????????\",\"pid\":610200,\"level\":3}]},{\"id\":610300,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610302,\"name\":\"?????????\",\"pid\":610300,\"level\":3},{\"id\":610303,\"name\":\"?????????\",\"pid\":610300,\"level\":3},{\"id\":610304,\"name\":\"?????????\",\"pid\":610300,\"level\":3},{\"id\":610322,\"name\":\"?????????\",\"pid\":610300,\"level\":3},{\"id\":610323,\"name\":\"?????????\",\"pid\":610300,\"level\":3},{\"id\":610324,\"name\":\"?????????\",\"pid\":610300,\"level\":3},{\"id\":610326,\"name\":\"??????\",\"pid\":610300,\"level\":3},{\"id\":610327,\"name\":\"??????\",\"pid\":610300,\"level\":3},{\"id\":610328,\"name\":\"?????????\",\"pid\":610300,\"level\":3},{\"id\":610329,\"name\":\"?????????\",\"pid\":610300,\"level\":3},{\"id\":610330,\"name\":\"??????\",\"pid\":610300,\"level\":3},{\"id\":610331,\"name\":\"?????????\",\"pid\":610300,\"level\":3}]},{\"id\":610400,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610402,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610403,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610404,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610422,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610423,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610424,\"name\":\"??????\",\"pid\":610400,\"level\":3},{\"id\":610425,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610426,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610427,\"name\":\"??????\",\"pid\":610400,\"level\":3},{\"id\":610428,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610429,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610430,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610431,\"name\":\"?????????\",\"pid\":610400,\"level\":3},{\"id\":610481,\"name\":\"?????????\",\"pid\":610400,\"level\":3}]},{\"id\":610500,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610502,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610521,\"name\":\"??????\",\"pid\":610500,\"level\":3},{\"id\":610522,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610523,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610524,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610525,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610526,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610527,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610528,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610581,\"name\":\"?????????\",\"pid\":610500,\"level\":3},{\"id\":610582,\"name\":\"?????????\",\"pid\":610500,\"level\":3}]},{\"id\":610600,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610602,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610621,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610622,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610623,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610624,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610625,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610626,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610627,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610628,\"name\":\"??????\",\"pid\":610600,\"level\":3},{\"id\":610629,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610630,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610631,\"name\":\"?????????\",\"pid\":610600,\"level\":3},{\"id\":610632,\"name\":\"?????????\",\"pid\":610600,\"level\":3}]},{\"id\":610700,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610702,\"name\":\"?????????\",\"pid\":610700,\"level\":3},{\"id\":610721,\"name\":\"?????????\",\"pid\":610700,\"level\":3},{\"id\":610722,\"name\":\"?????????\",\"pid\":610700,\"level\":3},{\"id\":610723,\"name\":\"??????\",\"pid\":610700,\"level\":3},{\"id\":610724,\"name\":\"?????????\",\"pid\":610700,\"level\":3},{\"id\":610725,\"name\":\"??????\",\"pid\":610700,\"level\":3},{\"id\":610726,\"name\":\"?????????\",\"pid\":610700,\"level\":3},{\"id\":610727,\"name\":\"?????????\",\"pid\":610700,\"level\":3},{\"id\":610728,\"name\":\"?????????\",\"pid\":610700,\"level\":3},{\"id\":610729,\"name\":\"?????????\",\"pid\":610700,\"level\":3},{\"id\":610730,\"name\":\"?????????\",\"pid\":610700,\"level\":3}]},{\"id\":610800,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610802,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610821,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610822,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610823,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610824,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610825,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610826,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610827,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610828,\"name\":\"??????\",\"pid\":610800,\"level\":3},{\"id\":610829,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610830,\"name\":\"?????????\",\"pid\":610800,\"level\":3},{\"id\":610831,\"name\":\"?????????\",\"pid\":610800,\"level\":3}]},{\"id\":610900,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":610902,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610921,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610922,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610923,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610924,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610925,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610926,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610927,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610928,\"name\":\"?????????\",\"pid\":610900,\"level\":3},{\"id\":610929,\"name\":\"?????????\",\"pid\":610900,\"level\":3}]},{\"id\":611000,\"name\":\"?????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":611002,\"name\":\"?????????\",\"pid\":611000,\"level\":3},{\"id\":611021,\"name\":\"?????????\",\"pid\":611000,\"level\":3},{\"id\":611022,\"name\":\"?????????\",\"pid\":611000,\"level\":3},{\"id\":611023,\"name\":\"?????????\",\"pid\":611000,\"level\":3},{\"id\":611024,\"name\":\"?????????\",\"pid\":611000,\"level\":3},{\"id\":611025,\"name\":\"?????????\",\"pid\":611000,\"level\":3},{\"id\":611026,\"name\":\"?????????\",\"pid\":611000,\"level\":3}]},{\"id\":611100,\"name\":\"????????????\",\"pid\":610000,\"level\":2,\"children\":[{\"id\":611101,\"name\":\"????????????\",\"pid\":611100,\"level\":3},{\"id\":611102,\"name\":\"????????????\",\"pid\":611100,\"level\":3},{\"id\":611103,\"name\":\"????????????\",\"pid\":611100,\"level\":3},{\"id\":611104,\"name\":\"????????????\",\"pid\":611100,\"level\":3},{\"id\":611105,\"name\":\"????????????\",\"pid\":611100,\"level\":3}]}]},{\"id\":620000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":620100,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620102,\"name\":\"?????????\",\"pid\":620100,\"level\":3},{\"id\":620103,\"name\":\"????????????\",\"pid\":620100,\"level\":3},{\"id\":620104,\"name\":\"?????????\",\"pid\":620100,\"level\":3},{\"id\":620105,\"name\":\"?????????\",\"pid\":620100,\"level\":3},{\"id\":620111,\"name\":\"?????????\",\"pid\":620100,\"level\":3},{\"id\":620121,\"name\":\"?????????\",\"pid\":620100,\"level\":3},{\"id\":620122,\"name\":\"?????????\",\"pid\":620100,\"level\":3},{\"id\":620123,\"name\":\"?????????\",\"pid\":620100,\"level\":3}]},{\"id\":620200,\"name\":\"????????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620201,\"name\":\"?????????\",\"pid\":620200,\"level\":3},{\"id\":620202,\"name\":\"?????????\",\"pid\":620200,\"level\":3},{\"id\":620203,\"name\":\"?????????\",\"pid\":620200,\"level\":3}]},{\"id\":620300,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620302,\"name\":\"?????????\",\"pid\":620300,\"level\":3},{\"id\":620321,\"name\":\"?????????\",\"pid\":620300,\"level\":3}]},{\"id\":620400,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620402,\"name\":\"?????????\",\"pid\":620400,\"level\":3},{\"id\":620403,\"name\":\"?????????\",\"pid\":620400,\"level\":3},{\"id\":620421,\"name\":\"?????????\",\"pid\":620400,\"level\":3},{\"id\":620422,\"name\":\"?????????\",\"pid\":620400,\"level\":3},{\"id\":620423,\"name\":\"?????????\",\"pid\":620400,\"level\":3}]},{\"id\":620500,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620502,\"name\":\"?????????\",\"pid\":620500,\"level\":3},{\"id\":620503,\"name\":\"?????????\",\"pid\":620500,\"level\":3},{\"id\":620521,\"name\":\"?????????\",\"pid\":620500,\"level\":3},{\"id\":620522,\"name\":\"?????????\",\"pid\":620500,\"level\":3},{\"id\":620523,\"name\":\"?????????\",\"pid\":620500,\"level\":3},{\"id\":620524,\"name\":\"?????????\",\"pid\":620500,\"level\":3},{\"id\":620525,\"name\":\"????????????????????????\",\"pid\":620500,\"level\":3}]},{\"id\":620600,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620602,\"name\":\"?????????\",\"pid\":620600,\"level\":3},{\"id\":620621,\"name\":\"?????????\",\"pid\":620600,\"level\":3},{\"id\":620622,\"name\":\"?????????\",\"pid\":620600,\"level\":3},{\"id\":620623,\"name\":\"?????????????????????\",\"pid\":620600,\"level\":3}]},{\"id\":620700,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620702,\"name\":\"?????????\",\"pid\":620700,\"level\":3},{\"id\":620721,\"name\":\"????????????????????????\",\"pid\":620700,\"level\":3},{\"id\":620722,\"name\":\"?????????\",\"pid\":620700,\"level\":3},{\"id\":620723,\"name\":\"?????????\",\"pid\":620700,\"level\":3},{\"id\":620724,\"name\":\"?????????\",\"pid\":620700,\"level\":3},{\"id\":620725,\"name\":\"?????????\",\"pid\":620700,\"level\":3}]},{\"id\":620800,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620802,\"name\":\"?????????\",\"pid\":620800,\"level\":3},{\"id\":620821,\"name\":\"?????????\",\"pid\":620800,\"level\":3},{\"id\":620822,\"name\":\"?????????\",\"pid\":620800,\"level\":3},{\"id\":620823,\"name\":\"?????????\",\"pid\":620800,\"level\":3},{\"id\":620824,\"name\":\"?????????\",\"pid\":620800,\"level\":3},{\"id\":620825,\"name\":\"?????????\",\"pid\":620800,\"level\":3},{\"id\":620826,\"name\":\"?????????\",\"pid\":620800,\"level\":3}]},{\"id\":620900,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":620902,\"name\":\"?????????\",\"pid\":620900,\"level\":3},{\"id\":620921,\"name\":\"?????????\",\"pid\":620900,\"level\":3},{\"id\":620922,\"name\":\"?????????\",\"pid\":620900,\"level\":3},{\"id\":620923,\"name\":\"????????????????????????\",\"pid\":620900,\"level\":3},{\"id\":620924,\"name\":\"??????????????????????????????\",\"pid\":620900,\"level\":3},{\"id\":620981,\"name\":\"?????????\",\"pid\":620900,\"level\":3},{\"id\":620982,\"name\":\"?????????\",\"pid\":620900,\"level\":3}]},{\"id\":621000,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":621002,\"name\":\"?????????\",\"pid\":621000,\"level\":3},{\"id\":621021,\"name\":\"?????????\",\"pid\":621000,\"level\":3},{\"id\":621022,\"name\":\"??????\",\"pid\":621000,\"level\":3},{\"id\":621023,\"name\":\"?????????\",\"pid\":621000,\"level\":3},{\"id\":621024,\"name\":\"?????????\",\"pid\":621000,\"level\":3},{\"id\":621025,\"name\":\"?????????\",\"pid\":621000,\"level\":3},{\"id\":621026,\"name\":\"??????\",\"pid\":621000,\"level\":3},{\"id\":621027,\"name\":\"?????????\",\"pid\":621000,\"level\":3}]},{\"id\":621100,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":621102,\"name\":\"?????????\",\"pid\":621100,\"level\":3},{\"id\":621121,\"name\":\"?????????\",\"pid\":621100,\"level\":3},{\"id\":621122,\"name\":\"?????????\",\"pid\":621100,\"level\":3},{\"id\":621123,\"name\":\"?????????\",\"pid\":621100,\"level\":3},{\"id\":621124,\"name\":\"?????????\",\"pid\":621100,\"level\":3},{\"id\":621125,\"name\":\"??????\",\"pid\":621100,\"level\":3},{\"id\":621126,\"name\":\"??????\",\"pid\":621100,\"level\":3}]},{\"id\":621200,\"name\":\"?????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":621202,\"name\":\"?????????\",\"pid\":621200,\"level\":3},{\"id\":621221,\"name\":\"??????\",\"pid\":621200,\"level\":3},{\"id\":621222,\"name\":\"??????\",\"pid\":621200,\"level\":3},{\"id\":621223,\"name\":\"?????????\",\"pid\":621200,\"level\":3},{\"id\":621224,\"name\":\"??????\",\"pid\":621200,\"level\":3},{\"id\":621225,\"name\":\"?????????\",\"pid\":621200,\"level\":3},{\"id\":621226,\"name\":\"??????\",\"pid\":621200,\"level\":3},{\"id\":621227,\"name\":\"??????\",\"pid\":621200,\"level\":3},{\"id\":621228,\"name\":\"?????????\",\"pid\":621200,\"level\":3}]},{\"id\":622900,\"name\":\"?????????????????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":622901,\"name\":\"?????????\",\"pid\":622900,\"level\":3},{\"id\":622921,\"name\":\"?????????\",\"pid\":622900,\"level\":3},{\"id\":622922,\"name\":\"?????????\",\"pid\":622900,\"level\":3},{\"id\":622923,\"name\":\"?????????\",\"pid\":622900,\"level\":3},{\"id\":622924,\"name\":\"?????????\",\"pid\":622900,\"level\":3},{\"id\":622925,\"name\":\"?????????\",\"pid\":622900,\"level\":3},{\"id\":622926,\"name\":\"??????????????????\",\"pid\":622900,\"level\":3},{\"id\":622927,\"name\":\"?????????????????????????????????????????????\",\"pid\":622900,\"level\":3}]},{\"id\":623000,\"name\":\"?????????????????????\",\"pid\":620000,\"level\":2,\"children\":[{\"id\":623001,\"name\":\"?????????\",\"pid\":623000,\"level\":3},{\"id\":623021,\"name\":\"?????????\",\"pid\":623000,\"level\":3},{\"id\":623022,\"name\":\"?????????\",\"pid\":623000,\"level\":3},{\"id\":623023,\"name\":\"?????????\",\"pid\":623000,\"level\":3},{\"id\":623024,\"name\":\"?????????\",\"pid\":623000,\"level\":3},{\"id\":623025,\"name\":\"?????????\",\"pid\":623000,\"level\":3},{\"id\":623026,\"name\":\"?????????\",\"pid\":623000,\"level\":3},{\"id\":623027,\"name\":\"?????????\",\"pid\":623000,\"level\":3}]}]},{\"id\":630000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":630100,\"name\":\"?????????\",\"pid\":630000,\"level\":2,\"children\":[{\"id\":630102,\"name\":\"?????????\",\"pid\":630100,\"level\":3},{\"id\":630103,\"name\":\"?????????\",\"pid\":630100,\"level\":3},{\"id\":630104,\"name\":\"?????????\",\"pid\":630100,\"level\":3},{\"id\":630105,\"name\":\"?????????\",\"pid\":630100,\"level\":3},{\"id\":630121,\"name\":\"???????????????????????????\",\"pid\":630100,\"level\":3},{\"id\":630122,\"name\":\"?????????\",\"pid\":630100,\"level\":3},{\"id\":630123,\"name\":\"?????????\",\"pid\":630100,\"level\":3}]},{\"id\":630200,\"name\":\"?????????\",\"pid\":630000,\"level\":2,\"children\":[{\"id\":630202,\"name\":\"?????????\",\"pid\":630200,\"level\":3},{\"id\":630221,\"name\":\"?????????\",\"pid\":630200,\"level\":3},{\"id\":630222,\"name\":\"???????????????????????????\",\"pid\":630200,\"level\":3},{\"id\":630223,\"name\":\"?????????????????????\",\"pid\":630200,\"level\":3},{\"id\":630224,\"name\":\"?????????????????????\",\"pid\":630200,\"level\":3},{\"id\":630225,\"name\":\"????????????????????????\",\"pid\":630200,\"level\":3}]},{\"id\":632200,\"name\":\"?????????????????????\",\"pid\":630000,\"level\":2,\"children\":[{\"id\":632221,\"name\":\"?????????????????????\",\"pid\":632200,\"level\":3},{\"id\":632222,\"name\":\"?????????\",\"pid\":632200,\"level\":3},{\"id\":632223,\"name\":\"?????????\",\"pid\":632200,\"level\":3},{\"id\":632224,\"name\":\"?????????\",\"pid\":632200,\"level\":3}]},{\"id\":632300,\"name\":\"?????????????????????\",\"pid\":630000,\"level\":2,\"children\":[{\"id\":632321,\"name\":\"?????????\",\"pid\":632300,\"level\":3},{\"id\":632322,\"name\":\"?????????\",\"pid\":632300,\"level\":3},{\"id\":632323,\"name\":\"?????????\",\"pid\":632300,\"level\":3},{\"id\":632324,\"name\":\"????????????????????????\",\"pid\":632300,\"level\":3}]},{\"id\":632500,\"name\":\"?????????????????????\",\"pid\":630000,\"level\":2,\"children\":[{\"id\":632521,\"name\":\"?????????\",\"pid\":632500,\"level\":3},{\"id\":632522,\"name\":\"?????????\",\"pid\":632500,\"level\":3},{\"id\":632523,\"name\":\"?????????\",\"pid\":632500,\"level\":3},{\"id\":632524,\"name\":\"?????????\",\"pid\":632500,\"level\":3},{\"id\":632525,\"name\":\"?????????\",\"pid\":632500,\"level\":3}]},{\"id\":632600,\"name\":\"?????????????????????\",\"pid\":630000,\"level\":2,\"children\":[{\"id\":632621,\"name\":\"?????????\",\"pid\":632600,\"level\":3},{\"id\":632622,\"name\":\"?????????\",\"pid\":632600,\"level\":3},{\"id\":632623,\"name\":\"?????????\",\"pid\":632600,\"level\":3},{\"id\":632624,\"name\":\"?????????\",\"pid\":632600,\"level\":3},{\"id\":632625,\"name\":\"?????????\",\"pid\":632600,\"level\":3},{\"id\":632626,\"name\":\"?????????\",\"pid\":632600,\"level\":3}]},{\"id\":632700,\"name\":\"?????????????????????\",\"pid\":630000,\"level\":2,\"children\":[{\"id\":632701,\"name\":\"?????????\",\"pid\":632700,\"level\":3},{\"id\":632722,\"name\":\"?????????\",\"pid\":632700,\"level\":3},{\"id\":632723,\"name\":\"?????????\",\"pid\":632700,\"level\":3},{\"id\":632724,\"name\":\"?????????\",\"pid\":632700,\"level\":3},{\"id\":632725,\"name\":\"?????????\",\"pid\":632700,\"level\":3},{\"id\":632726,\"name\":\"????????????\",\"pid\":632700,\"level\":3}]},{\"id\":632800,\"name\":\"??????????????????????????????\",\"pid\":630000,\"level\":2,\"children\":[{\"id\":632801,\"name\":\"????????????\",\"pid\":632800,\"level\":3},{\"id\":632802,\"name\":\"????????????\",\"pid\":632800,\"level\":3},{\"id\":632821,\"name\":\"?????????\",\"pid\":632800,\"level\":3},{\"id\":632822,\"name\":\"?????????\",\"pid\":632800,\"level\":3},{\"id\":632823,\"name\":\"?????????\",\"pid\":632800,\"level\":3}]}]},{\"id\":640000,\"name\":\"?????????????????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":640100,\"name\":\"?????????\",\"pid\":640000,\"level\":2,\"children\":[{\"id\":640104,\"name\":\"?????????\",\"pid\":640100,\"level\":3},{\"id\":640105,\"name\":\"?????????\",\"pid\":640100,\"level\":3},{\"id\":640106,\"name\":\"?????????\",\"pid\":640100,\"level\":3},{\"id\":640121,\"name\":\"?????????\",\"pid\":640100,\"level\":3},{\"id\":640122,\"name\":\"?????????\",\"pid\":640100,\"level\":3},{\"id\":640181,\"name\":\"?????????\",\"pid\":640100,\"level\":3}]},{\"id\":640200,\"name\":\"????????????\",\"pid\":640000,\"level\":2,\"children\":[{\"id\":640202,\"name\":\"????????????\",\"pid\":640200,\"level\":3},{\"id\":640205,\"name\":\"?????????\",\"pid\":640200,\"level\":3},{\"id\":640221,\"name\":\"?????????\",\"pid\":640200,\"level\":3}]},{\"id\":640300,\"name\":\"?????????\",\"pid\":640000,\"level\":2,\"children\":[{\"id\":640302,\"name\":\"?????????\",\"pid\":640300,\"level\":3},{\"id\":640303,\"name\":\"????????????\",\"pid\":640300,\"level\":3},{\"id\":640323,\"name\":\"?????????\",\"pid\":640300,\"level\":3},{\"id\":640324,\"name\":\"?????????\",\"pid\":640300,\"level\":3},{\"id\":640381,\"name\":\"????????????\",\"pid\":640300,\"level\":3}]},{\"id\":640400,\"name\":\"?????????\",\"pid\":640000,\"level\":2,\"children\":[{\"id\":640402,\"name\":\"?????????\",\"pid\":640400,\"level\":3},{\"id\":640422,\"name\":\"?????????\",\"pid\":640400,\"level\":3},{\"id\":640423,\"name\":\"?????????\",\"pid\":640400,\"level\":3},{\"id\":640424,\"name\":\"?????????\",\"pid\":640400,\"level\":3},{\"id\":640425,\"name\":\"?????????\",\"pid\":640400,\"level\":3}]},{\"id\":640500,\"name\":\"?????????\",\"pid\":640000,\"level\":2,\"children\":[{\"id\":640502,\"name\":\"????????????\",\"pid\":640500,\"level\":3},{\"id\":640521,\"name\":\"?????????\",\"pid\":640500,\"level\":3},{\"id\":640522,\"name\":\"?????????\",\"pid\":640500,\"level\":3}]}]},{\"id\":650000,\"name\":\"????????????????????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":650100,\"name\":\"???????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":650102,\"name\":\"?????????\",\"pid\":650100,\"level\":3},{\"id\":650103,\"name\":\"???????????????\",\"pid\":650100,\"level\":3},{\"id\":650104,\"name\":\"?????????\",\"pid\":650100,\"level\":3},{\"id\":650105,\"name\":\"????????????\",\"pid\":650100,\"level\":3},{\"id\":650106,\"name\":\"????????????\",\"pid\":650100,\"level\":3},{\"id\":650107,\"name\":\"????????????\",\"pid\":650100,\"level\":3},{\"id\":650109,\"name\":\"?????????\",\"pid\":650100,\"level\":3},{\"id\":650121,\"name\":\"???????????????\",\"pid\":650100,\"level\":3}]},{\"id\":650200,\"name\":\"???????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":650202,\"name\":\"????????????\",\"pid\":650200,\"level\":3},{\"id\":650203,\"name\":\"???????????????\",\"pid\":650200,\"level\":3},{\"id\":650204,\"name\":\"????????????\",\"pid\":650200,\"level\":3},{\"id\":650205,\"name\":\"????????????\",\"pid\":650200,\"level\":3}]},{\"id\":652100,\"name\":\"???????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":652101,\"name\":\"????????????\",\"pid\":652100,\"level\":3},{\"id\":652122,\"name\":\"?????????\",\"pid\":652100,\"level\":3},{\"id\":652123,\"name\":\"????????????\",\"pid\":652100,\"level\":3}]},{\"id\":652200,\"name\":\"????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":652201,\"name\":\"?????????\",\"pid\":652200,\"level\":3},{\"id\":652222,\"name\":\"???????????????????????????\",\"pid\":652200,\"level\":3},{\"id\":652223,\"name\":\"?????????\",\"pid\":652200,\"level\":3}]},{\"id\":652300,\"name\":\"?????????????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":652301,\"name\":\"?????????\",\"pid\":652300,\"level\":3},{\"id\":652302,\"name\":\"?????????\",\"pid\":652300,\"level\":3},{\"id\":652323,\"name\":\"????????????\",\"pid\":652300,\"level\":3},{\"id\":652324,\"name\":\"????????????\",\"pid\":652300,\"level\":3},{\"id\":652325,\"name\":\"?????????\",\"pid\":652300,\"level\":3},{\"id\":652327,\"name\":\"???????????????\",\"pid\":652300,\"level\":3},{\"id\":652328,\"name\":\"????????????????????????\",\"pid\":652300,\"level\":3}]},{\"id\":652700,\"name\":\"???????????????????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":652701,\"name\":\"?????????\",\"pid\":652700,\"level\":3},{\"id\":652702,\"name\":\"???????????????\",\"pid\":652700,\"level\":3},{\"id\":652722,\"name\":\"?????????\",\"pid\":652700,\"level\":3},{\"id\":652723,\"name\":\"?????????\",\"pid\":652700,\"level\":3}]},{\"id\":652800,\"name\":\"???????????????????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":652801,\"name\":\"????????????\",\"pid\":652800,\"level\":3},{\"id\":652822,\"name\":\"?????????\",\"pid\":652800,\"level\":3},{\"id\":652823,\"name\":\"?????????\",\"pid\":652800,\"level\":3},{\"id\":652824,\"name\":\"?????????\",\"pid\":652800,\"level\":3},{\"id\":652825,\"name\":\"?????????\",\"pid\":652800,\"level\":3},{\"id\":652826,\"name\":\"?????????????????????\",\"pid\":652800,\"level\":3},{\"id\":652827,\"name\":\"?????????\",\"pid\":652800,\"level\":3},{\"id\":652828,\"name\":\"?????????\",\"pid\":652800,\"level\":3},{\"id\":652829,\"name\":\"?????????\",\"pid\":652800,\"level\":3}]},{\"id\":652900,\"name\":\"???????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":652901,\"name\":\"????????????\",\"pid\":652900,\"level\":3},{\"id\":652922,\"name\":\"?????????\",\"pid\":652900,\"level\":3},{\"id\":652923,\"name\":\"?????????\",\"pid\":652900,\"level\":3},{\"id\":652924,\"name\":\"?????????\",\"pid\":652900,\"level\":3},{\"id\":652925,\"name\":\"?????????\",\"pid\":652900,\"level\":3},{\"id\":652926,\"name\":\"?????????\",\"pid\":652900,\"level\":3},{\"id\":652927,\"name\":\"?????????\",\"pid\":652900,\"level\":3},{\"id\":652928,\"name\":\"????????????\",\"pid\":652900,\"level\":3},{\"id\":652929,\"name\":\"?????????\",\"pid\":652900,\"level\":3}]},{\"id\":653000,\"name\":\"?????????????????????????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":653001,\"name\":\"????????????\",\"pid\":653000,\"level\":3},{\"id\":653022,\"name\":\"????????????\",\"pid\":653000,\"level\":3},{\"id\":653023,\"name\":\"????????????\",\"pid\":653000,\"level\":3},{\"id\":653024,\"name\":\"?????????\",\"pid\":653000,\"level\":3}]},{\"id\":653100,\"name\":\"????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":653101,\"name\":\"?????????\",\"pid\":653100,\"level\":3},{\"id\":653121,\"name\":\"?????????\",\"pid\":653100,\"level\":3},{\"id\":653122,\"name\":\"?????????\",\"pid\":653100,\"level\":3},{\"id\":653123,\"name\":\"????????????\",\"pid\":653100,\"level\":3},{\"id\":653124,\"name\":\"?????????\",\"pid\":653100,\"level\":3},{\"id\":653125,\"name\":\"?????????\",\"pid\":653100,\"level\":3},{\"id\":653126,\"name\":\"?????????\",\"pid\":653100,\"level\":3},{\"id\":653127,\"name\":\"????????????\",\"pid\":653100,\"level\":3},{\"id\":653128,\"name\":\"????????????\",\"pid\":653100,\"level\":3},{\"id\":653129,\"name\":\"?????????\",\"pid\":653100,\"level\":3},{\"id\":653130,\"name\":\"?????????\",\"pid\":653100,\"level\":3},{\"id\":653131,\"name\":\"?????????????????????????????????\",\"pid\":653100,\"level\":3}]},{\"id\":653200,\"name\":\"????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":653201,\"name\":\"?????????\",\"pid\":653200,\"level\":3},{\"id\":653221,\"name\":\"?????????\",\"pid\":653200,\"level\":3},{\"id\":653222,\"name\":\"?????????\",\"pid\":653200,\"level\":3},{\"id\":653223,\"name\":\"?????????\",\"pid\":653200,\"level\":3},{\"id\":653224,\"name\":\"?????????\",\"pid\":653200,\"level\":3},{\"id\":653225,\"name\":\"?????????\",\"pid\":653200,\"level\":3},{\"id\":653226,\"name\":\"?????????\",\"pid\":653200,\"level\":3},{\"id\":653227,\"name\":\"?????????\",\"pid\":653200,\"level\":3}]},{\"id\":654000,\"name\":\"????????????????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":654002,\"name\":\"?????????\",\"pid\":654000,\"level\":3},{\"id\":654003,\"name\":\"?????????\",\"pid\":654000,\"level\":3},{\"id\":654004,\"name\":\"???????????????\",\"pid\":654000,\"level\":3},{\"id\":654021,\"name\":\"?????????\",\"pid\":654000,\"level\":3},{\"id\":654022,\"name\":\"???????????????????????????\",\"pid\":654000,\"level\":3},{\"id\":654023,\"name\":\"?????????\",\"pid\":654000,\"level\":3},{\"id\":654024,\"name\":\"?????????\",\"pid\":654000,\"level\":3},{\"id\":654025,\"name\":\"?????????\",\"pid\":654000,\"level\":3},{\"id\":654026,\"name\":\"?????????\",\"pid\":654000,\"level\":3},{\"id\":654027,\"name\":\"????????????\",\"pid\":654000,\"level\":3},{\"id\":654028,\"name\":\"????????????\",\"pid\":654000,\"level\":3}]},{\"id\":654200,\"name\":\"????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":654201,\"name\":\"?????????\",\"pid\":654200,\"level\":3},{\"id\":654202,\"name\":\"?????????\",\"pid\":654200,\"level\":3},{\"id\":654221,\"name\":\"?????????\",\"pid\":654200,\"level\":3},{\"id\":654223,\"name\":\"?????????\",\"pid\":654200,\"level\":3},{\"id\":654224,\"name\":\"?????????\",\"pid\":654200,\"level\":3},{\"id\":654225,\"name\":\"?????????\",\"pid\":654200,\"level\":3},{\"id\":654226,\"name\":\"??????????????????????????????\",\"pid\":654200,\"level\":3}]},{\"id\":654300,\"name\":\"???????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":654301,\"name\":\"????????????\",\"pid\":654300,\"level\":3},{\"id\":654321,\"name\":\"????????????\",\"pid\":654300,\"level\":3},{\"id\":654322,\"name\":\"?????????\",\"pid\":654300,\"level\":3},{\"id\":654323,\"name\":\"?????????\",\"pid\":654300,\"level\":3},{\"id\":654324,\"name\":\"????????????\",\"pid\":654300,\"level\":3},{\"id\":654325,\"name\":\"?????????\",\"pid\":654300,\"level\":3},{\"id\":654326,\"name\":\"????????????\",\"pid\":654300,\"level\":3}]},{\"id\":659000,\"name\":\"????????????\",\"pid\":650000,\"level\":2,\"children\":[{\"id\":659001,\"name\":\"????????????\",\"pid\":659000,\"level\":3},{\"id\":659002,\"name\":\"????????????\",\"pid\":659000,\"level\":3},{\"id\":659003,\"name\":\"???????????????\",\"pid\":659000,\"level\":3},{\"id\":659004,\"name\":\"????????????\",\"pid\":659000,\"level\":3},{\"id\":659005,\"name\":\"?????????\",\"pid\":659000,\"level\":3},{\"id\":659006,\"name\":\"????????????\",\"pid\":659000,\"level\":3},{\"id\":659007,\"name\":\"?????????\",\"pid\":659000,\"level\":3}]}]},{\"id\":710000,\"name\":\"??????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":710100,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":710101,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710102,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710103,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710104,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710105,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710106,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710107,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710108,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710109,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710110,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710111,\"name\":\"?????????\",\"pid\":710100,\"level\":3},{\"id\":710112,\"name\":\"?????????\",\"pid\":710100,\"level\":3}]},{\"id\":710200,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":710201,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710202,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710203,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710204,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710205,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710206,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710207,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710208,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710209,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710210,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710211,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710212,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710213,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710214,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710215,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710216,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710217,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710218,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710219,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710220,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710221,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710222,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710223,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710224,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710225,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710226,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710227,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710228,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710229,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710230,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710231,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710232,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710233,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710234,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710235,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710236,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710237,\"name\":\"?????????\",\"pid\":710200,\"level\":3},{\"id\":710238,\"name\":\"????????????\",\"pid\":710200,\"level\":3}]},{\"id\":710300,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":710301,\"name\":\"?????????\",\"pid\":710300,\"level\":3},{\"id\":710302,\"name\":\"?????????\",\"pid\":710300,\"level\":3},{\"id\":710303,\"name\":\"?????????\",\"pid\":710300,\"level\":3},{\"id\":710304,\"name\":\"?????????\",\"pid\":710300,\"level\":3},{\"id\":710305,\"name\":\"?????????\",\"pid\":710300,\"level\":3},{\"id\":710306,\"name\":\"?????????\",\"pid\":710300,\"level\":3},{\"id\":710307,\"name\":\"?????????\",\"pid\":710300,\"level\":3}]},{\"id\":710400,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":710401,\"name\":\"??????\",\"pid\":710400,\"level\":3},{\"id\":710402,\"name\":\"??????\",\"pid\":710400,\"level\":3},{\"id\":710403,\"name\":\"??????\",\"pid\":710400,\"level\":3},{\"id\":710404,\"name\":\"??????\",\"pid\":710400,\"level\":3},{\"id\":710405,\"name\":\"??????\",\"pid\":710400,\"level\":3},{\"id\":710406,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710407,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710408,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710409,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710410,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710411,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710412,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710413,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710414,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710415,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710416,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710417,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710418,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710419,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710420,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710421,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710422,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710423,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710424,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710425,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710426,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710427,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710428,\"name\":\"?????????\",\"pid\":710400,\"level\":3},{\"id\":710429,\"name\":\"?????????\",\"pid\":710400,\"level\":3}]},{\"id\":710500,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":710501,\"name\":\"??????\",\"pid\":710500,\"level\":3},{\"id\":710502,\"name\":\"??????\",\"pid\":710500,\"level\":3},{\"id\":710504,\"name\":\"??????\",\"pid\":710500,\"level\":3},{\"id\":710506,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710507,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710508,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710509,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710510,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710511,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710512,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710513,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710514,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710515,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710516,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710517,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710518,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710519,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710520,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710521,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710522,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710523,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710524,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710525,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710526,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710527,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710528,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710529,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710530,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710531,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710532,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710533,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710534,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710535,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710536,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710537,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710538,\"name\":\"?????????\",\"pid\":710500,\"level\":3},{\"id\":710539,\"name\":\"?????????\",\"pid\":710500,\"level\":3}]},{\"id\":710600,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":710601,\"name\":\"??????\",\"pid\":710600,\"level\":3},{\"id\":710602,\"name\":\"??????\",\"pid\":710600,\"level\":3},{\"id\":710603,\"name\":\"?????????\",\"pid\":710600,\"level\":3}]},{\"id\":710700,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":710701,\"name\":\"??????\",\"pid\":710700,\"level\":3},{\"id\":710702,\"name\":\"??????\",\"pid\":710700,\"level\":3}]},{\"id\":710800,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":710801,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710802,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710803,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710804,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710805,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710806,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710807,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710808,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710809,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710810,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710811,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710812,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710813,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710814,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710815,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710816,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710817,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710818,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710819,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710820,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710821,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710822,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710823,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710824,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710825,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710826,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710827,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710828,\"name\":\"?????????\",\"pid\":710800,\"level\":3},{\"id\":710829,\"name\":\"?????????\",\"pid\":710800,\"level\":3}]},{\"id\":712200,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":712201,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712221,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712222,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712223,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712224,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712225,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712226,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712227,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712228,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712229,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712230,\"name\":\"?????????\",\"pid\":712200,\"level\":3},{\"id\":712231,\"name\":\"?????????\",\"pid\":712200,\"level\":3}]},{\"id\":712300,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":712301,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712302,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712303,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712304,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712305,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712306,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712321,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712324,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712325,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712327,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712329,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712330,\"name\":\"?????????\",\"pid\":712300,\"level\":3},{\"id\":712331,\"name\":\"?????????\",\"pid\":712300,\"level\":3}]},{\"id\":712400,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":712401,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712421,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712422,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712423,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712424,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712425,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712426,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712427,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712428,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712429,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712430,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712431,\"name\":\"?????????\",\"pid\":712400,\"level\":3},{\"id\":712432,\"name\":\"?????????\",\"pid\":712400,\"level\":3}]},{\"id\":712500,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":712501,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712521,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712522,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712523,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712524,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712525,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712526,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712527,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712528,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712529,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712530,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712531,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712532,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712533,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712534,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712535,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712536,\"name\":\"?????????\",\"pid\":712500,\"level\":3},{\"id\":712537,\"name\":\"?????????\",\"pid\":712500,\"level\":3}]},{\"id\":712700,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":712701,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712721,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712722,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712723,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712724,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712725,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712726,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712727,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712728,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712729,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712730,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712731,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712732,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712733,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712734,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712735,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712736,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712737,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712738,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712739,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712740,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712741,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712742,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712743,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712744,\"name\":\"?????????\",\"pid\":712700,\"level\":3},{\"id\":712745,\"name\":\"?????????\",\"pid\":712700,\"level\":3}]},{\"id\":712800,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":712801,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712821,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712822,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712823,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712824,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712825,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712826,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712827,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712828,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712829,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712830,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712831,\"name\":\"?????????\",\"pid\":712800,\"level\":3},{\"id\":712832,\"name\":\"?????????\",\"pid\":712800,\"level\":3}]},{\"id\":712900,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":712901,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712921,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712922,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712923,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712924,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712925,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712926,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712927,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712928,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712929,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712930,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712931,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712932,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712933,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712934,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712935,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712936,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712937,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712938,\"name\":\"?????????\",\"pid\":712900,\"level\":3},{\"id\":712939,\"name\":\"?????????\",\"pid\":712900,\"level\":3}]},{\"id\":713000,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":713001,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713002,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713023,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713024,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713025,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713026,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713027,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713028,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713029,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713030,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713031,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713032,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713033,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713034,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713035,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713036,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713037,\"name\":\"?????????\",\"pid\":713000,\"level\":3},{\"id\":713038,\"name\":\"????????????\",\"pid\":713000,\"level\":3}]},{\"id\":713300,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":713301,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713321,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713322,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713323,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713324,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713325,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713326,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713327,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713328,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713329,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713330,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713331,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713332,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713333,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713334,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713335,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713336,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713337,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713338,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713339,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713340,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713341,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713342,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713343,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713344,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713345,\"name\":\"????????????\",\"pid\":713300,\"level\":3},{\"id\":713346,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713347,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713348,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713349,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713350,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713351,\"name\":\"?????????\",\"pid\":713300,\"level\":3},{\"id\":713352,\"name\":\"?????????\",\"pid\":713300,\"level\":3}]},{\"id\":713400,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":713401,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713421,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713422,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713423,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713424,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713425,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713426,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713427,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713428,\"name\":\"????????????\",\"pid\":713400,\"level\":3},{\"id\":713429,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713430,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713431,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713432,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713433,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713434,\"name\":\"?????????\",\"pid\":713400,\"level\":3},{\"id\":713435,\"name\":\"?????????\",\"pid\":713400,\"level\":3}]},{\"id\":713500,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":713501,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713521,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713522,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713523,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713524,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713525,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713526,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713527,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713528,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713529,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713530,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713531,\"name\":\"?????????\",\"pid\":713500,\"level\":3},{\"id\":713532,\"name\":\"?????????\",\"pid\":713500,\"level\":3}]},{\"id\":713600,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":713601,\"name\":\"?????????\",\"pid\":713600,\"level\":3},{\"id\":713621,\"name\":\"?????????\",\"pid\":713600,\"level\":3},{\"id\":713622,\"name\":\"?????????\",\"pid\":713600,\"level\":3},{\"id\":713623,\"name\":\"?????????\",\"pid\":713600,\"level\":3},{\"id\":713624,\"name\":\"?????????\",\"pid\":713600,\"level\":3},{\"id\":713625,\"name\":\"?????????\",\"pid\":713600,\"level\":3}]},{\"id\":713700,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":713701,\"name\":\"?????????\",\"pid\":713700,\"level\":3},{\"id\":713702,\"name\":\"?????????\",\"pid\":713700,\"level\":3},{\"id\":713703,\"name\":\"?????????\",\"pid\":713700,\"level\":3},{\"id\":713704,\"name\":\"?????????\",\"pid\":713700,\"level\":3},{\"id\":713705,\"name\":\"?????????\",\"pid\":713700,\"level\":3},{\"id\":713706,\"name\":\"?????????\",\"pid\":713700,\"level\":3}]},{\"id\":713800,\"name\":\"?????????\",\"pid\":710000,\"level\":2,\"children\":[{\"id\":713801,\"name\":\"?????????\",\"pid\":713800,\"level\":3},{\"id\":713802,\"name\":\"?????????\",\"pid\":713800,\"level\":3},{\"id\":713803,\"name\":\"?????????\",\"pid\":713800,\"level\":3},{\"id\":713804,\"name\":\"?????????\",\"pid\":713800,\"level\":3}]}]},{\"id\":810000,\"name\":\"?????????????????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":810100,\"name\":\"?????????\",\"pid\":810000,\"level\":2,\"children\":[{\"id\":810101,\"name\":\"?????????\",\"pid\":810100,\"level\":3},{\"id\":810102,\"name\":\"?????????\",\"pid\":810100,\"level\":3},{\"id\":810103,\"name\":\"??????\",\"pid\":810100,\"level\":3},{\"id\":810104,\"name\":\"??????\",\"pid\":810100,\"level\":3}]},{\"id\":810200,\"name\":\"??????\",\"pid\":810000,\"level\":2,\"children\":[{\"id\":810201,\"name\":\"????????????\",\"pid\":810200,\"level\":3},{\"id\":810202,\"name\":\"????????????\",\"pid\":810200,\"level\":3},{\"id\":810203,\"name\":\"????????????\",\"pid\":810200,\"level\":3},{\"id\":810204,\"name\":\"????????????\",\"pid\":810200,\"level\":3},{\"id\":810205,\"name\":\"?????????\",\"pid\":810200,\"level\":3}]},{\"id\":810300,\"name\":\"??????\",\"pid\":810000,\"level\":2,\"children\":[{\"id\":810301,\"name\":\"?????????\",\"pid\":810300,\"level\":3},{\"id\":810302,\"name\":\"?????????\",\"pid\":810300,\"level\":3},{\"id\":810303,\"name\":\"?????????\",\"pid\":810300,\"level\":3},{\"id\":810304,\"name\":\"??????\",\"pid\":810300,\"level\":3},{\"id\":810305,\"name\":\"?????????\",\"pid\":810300,\"level\":3},{\"id\":810306,\"name\":\"?????????\",\"pid\":810300,\"level\":3},{\"id\":810307,\"name\":\"?????????\",\"pid\":810300,\"level\":3},{\"id\":810308,\"name\":\"?????????\",\"pid\":810300,\"level\":3},{\"id\":810309,\"name\":\"?????????\",\"pid\":810300,\"level\":3}]}]},{\"id\":820000,\"name\":\"?????????????????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":820100,\"name\":\"????????????\",\"pid\":820000,\"level\":2,\"children\":[{\"id\":820101,\"name\":\"???????????????\",\"pid\":820100,\"level\":3},{\"id\":820102,\"name\":\"??????????????????\",\"pid\":820100,\"level\":3},{\"id\":820103,\"name\":\"?????????\",\"pid\":820100,\"level\":3},{\"id\":820104,\"name\":\"????????????\",\"pid\":820100,\"level\":3},{\"id\":820105,\"name\":\"????????????\",\"pid\":820100,\"level\":3}]},{\"id\":820200,\"name\":\"?????????\",\"pid\":820000,\"level\":2,\"children\":[{\"id\":820201,\"name\":\"????????????\",\"pid\":820200,\"level\":3}]},{\"id\":820300,\"name\":\"?????????\",\"pid\":820000,\"level\":2,\"children\":[{\"id\":820301,\"name\":\"??????????????????\",\"pid\":820300,\"level\":3}]}]},{\"id\":900000,\"name\":\"?????????\",\"pid\":100000,\"level\":1,\"children\":[{\"id\":900001,\"name\":\"?????????\",\"pid\":900000,\"level\":2,\"children\":[{\"id\":900002,\"name\":\"?????????\",\"pid\":900001,\"level\":3}]}]}]");

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!******************************************************!*\
  !*** C:/Users/17999/Desktop/Clothes sell/pages.json ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map