/* API:
set: 
  description: 
  param: String id, [Time(ms)] time, [Function] callback

remove: 
  description: 
  param: String id
  
*/ 

function uuid (){
  return ('' + Math.random() + Date.now()).replace(/^0\./g, '')
}

function TimerItem(time, callback) {
  this.time = time
  this.callback = callback
  this.timer = setTimeout(callback, time)
}

TimerItem.prototype.set = function(time, callback) {
  this.remove()
  this.time = time || this.time || 0
  this.callback = callback || this.callback || function(){} 
  this.timer = setTimeout(this.callback, this.time)
}

TimerItem.prototype.remove = function() {
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
  this.timers[id].set(time, callback)
}

Timer.prototype.remove = function(id) {
  //TODO: '*' => remove all
  if(timerItem = this.timers[id]) {
    timerItem.remove()
  }
}

var timer = new Timer()
timer.set('keke', 1000, function(){ console.log('a') })
timer.set('*', 500, function(){
  console.log('reset')
  timer.set('keke', 2000)
})
timer.set("*", 700, function(){
  console.log('remove')
  timer.remove('keke')
})