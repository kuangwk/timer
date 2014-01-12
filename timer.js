/*
  @Description: 方便管理复杂setTimeout 跟 clearTimeout 逻辑的组件
  @Author: Kuangweike
  @Date: 2014/1/11
  @Version: 0.0.1
 */

/* API:
set: 
  description: 
  param: String id, [Time(ms)] time, [Function] callback

clear: 
  description: 
  param: String id
  
*/ 
;;(function(){

  var uuid = function() { 
    return ('' + Math.random() + Date.now()).replace(/^0\./g, '')
  }

  var typeOf = function(param) {
    return Object.prototype.toString.call(param).toLowerCase().slice(8, -1);
  }

  function TimerItem(time, callback) {
    this.time = time
    this.callback = callback
    this.timer = setTimeout(callback, time)
  }

  TimerItem.prototype.set = function(time, callback) {
    this.clear()
    this.time = time || this.time || 0
    this.callback = callback || this.callback || function(){} 
    this.timer = setTimeout(this.callback, this.time)
    return this.timer
  }

  TimerItem.prototype.clear = function() {
    if (this.timer) {
      clearTimeout(this.timer, this.callback)
    }
  }  

  function Timer() {
    this.timers = {}
  }  

  Timer.prototype.set = function() {
    firstParamType = typeOf(arguments[0])
    if ( firstParamType === 'string' ) {
      id = arguments[0]
      time = arguments[1]
      callback = arguments[2]
    } else if ( firstParamType === 'number' ) {
      id = uuid() 
      time = arguments[0]
      callback = arguments[1]
    } else {
      throw('param error')
    }

    if (!(timerItem = this.timers[id])) {
      this.timers[id] = new TimerItem(time, callback)
    } 
    
    return this.timers[id].set(time, callback)
  }

  Timer.prototype.clear = function(id) {
    if (timerItem = this.timers[id]) {
      timerItem.clear()
    }
  }

  if(typeof(define) !== 'undefined') {
    define(function(require) {
      return Timer 
    })
  } else {
    window.Timer = Timer
  }

})()

