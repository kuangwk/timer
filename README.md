timer
=====

description
------
This is a little object to easily manager timers of `setTimeout` and `clearTimeout`

apis
------
set: 

  * param: String id, [Time(ms)] time, [Function] callback
  * description: 
    * pass '*' to param id means: 'I dont want to mark the setTimeout event and I do not want to think out an id(name)' 
    * You can set more than one setTimeout and timers are identified by id
    * if `timer[id]` doesn't exist, it will be created
    * if it already exists, it will be reset: 
        + if param `time`, or `callback` is omitted, previous param `time` and `callback` will be used
        + else param will be overwritten 


remove: 

  * param: String id
  * description: will clear `timer[id]`

usage
----- 
    //init
    timer = new Timer()

set: 
    
    // create or overwrite
    timer.set('eventId1', 1000, function(){
      console.log('event1')
    })    
    timer.set('eventId1', 500)
      console.log('event1 reseted')
    })    

    // reset ('eventId1' has been created)
    timer.set('eventId1')
    })    

remove:
    
    timer.remove('eventId1')
  
