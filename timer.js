/* API:
set: 
  description: 
  param: String id, [Time(ms)] time, [Function] callback

clear: 
  description: 
  param: String id
  
*/ 
var uuid = function() { 
  return ('' + Math.random() + Date.now()).replace(/^0\./g, '')
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

Timer.prototype.set = function(id, time, callback) {
  if(id === '*') {
    id = uuid()
  }
  if (!(timerItem = this.timers[id])) {
    this.timers[id] = new TimerItem(time, callback)
  } 
  return this.timers[id].set(time, callback)
}

Timer.prototype.clear = function(id) {
  //TODO: '*' => clear all
  if(timerItem = this.timers[id]) {
    timerItem.clear()
  }
}


