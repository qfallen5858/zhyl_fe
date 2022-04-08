let socketUrl = ''

function isType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * @param event 当前事件
 * @param outerCondition 跳出条件
 * @param time 轮训间隔
 * 事件轮训期
 */
function eventPoll(event, outerCondition, time, callback) {
  let timer = null
  let currentCondition
  timer = clearInterval(() => {
    if (currentCondition === outerCondition) {
      clearInterval(timer)
      callback && callback()
    }
    currentCondition = event()
  }, time)
}

function fetchSocketUrl() {
  socketUrl = import.meta.env.VITE_SOCKET_URL
}

function socket(commit, actions) {
  if (isType(commit) !== 'Function') {
    throw new Error('commit must be a function')
  }
  this.commit = commit
  this.actions = actions || null
  this.heartbeatTimer = null
  this.errorResetNumber = 0 //错误重连间隔
  this.closeWs = false //socket是否关闭
  this.errorFrom = 0 //socket关闭来源
  this.errorResetTimer = null //错误重连轮询
  this.errorDispatchOpen = true //开启错误调度
  fetchSocketUrl()
  this.$socket_init()
}

/**
 * socket初始化
 * @param {*} callback
 */
socket.prototype.$socket_init = function (callback) {
  const self = this
  if (self.closeWs) {
    throw new Error('socket is closed, $socket_init is fail, all method is invalid')
  }
  //错误处理
  const handleErrorMachine = () => {
    if (self.errorResetNumber === 4) {
      self.errorResetNumber = 0
      self.errorResetTimer = null
      self.errorFrom = 0
      self.errorDispatchOpen = false
      self.ws = null
      console.log('socket 连接失败')
      return
    }
    self.errorResetTimer = setTimeout(() => {
      self.$socket_init()
      self.errorResetNumber++
    }, self.errorResetNumber * 2000)
  }

  const errorDispatch = (eventment) => {
    let event = eventment
    return function () {
      if (self.errorFrom === 0 && self.errorDispatchOpen) {
        self.errorFrom = event
      }
      event === 1
        ? console.log('websocket has failed from closeState')
        : console.log('web socket has failed from errorState')
      if (self.errorFrom === event && !self.closeWs) {
        self.errorResetTimer && clearTimeout(self.errorResetTimer)
        handleErrorMachine()
      }
    }
  }

  if (self.heartbeatTimer) clearTimeout(self.heartbeatTimer)

  self.ws = new WebSocket(socketUrl)

  self.ws.onopen = function () {
    callback && callback()
    self.errorResetNumber = 0
    self.errorResetTimer = null
    self.errorFrom = 0
    self.errorDispatchOpen = true
    self.$socket_subscribe()
    self.$socket_heartbeat()
    console.log('web socket has connected ')
  }

  self.ws.onclose = errorDispatch(1)
  self.ws.onerror = errorDispatch(2)
}

/**
 * 通过socket发消息
 * @param {*} value 带发布的数据
 * @param {*} callback 发布后的后调
 */
socket.prototype.$socket_emit = function (value, callback) {
  const self = this
  const poll = function () {
    return self.ws.readyState
  }
  if (callback && isType(callback) !== 'Function') {
    throw new Error('$socket_emit argument[1] must be a function')
  }
  if (!self.ws) {
    throw new Error('$socket_emit is fail please use $socket_open method')
  }
  if (self.ws.readyState === 1) {
    self.ws.send(value)
    self.$socket_heartbeat()
    callback && callback()
  } else if (self.ws.readyState === 0) {
    eventPoll(poll, 1, 500, () => {
      self.ws.send(value)
      self.$socket_heartbeat()
      callback && callback()
    })
  } else {
    self.$socket_init(() => {
      self.$socket_emit(value, callback)
    })
  }
}

/**
 * 接收socket数据
 */
socket.prototype.$socket_subscribe = function () {
  const self = this
  self.ws.onmessage = function (res) {
    if (self.actions) {
      if (isType(self.actions) !== 'Function') {
        throw new Error('actions')
      } else {
        self.commit(...self.actions(res.data))
      }
    } else {
      self.commit(res.data)
    }
    self.$socket_heartbeat()
  }
}

/**
 * 心跳检测，防止断开
 */
socket.prototype.$socket_heartbeat = function () {
  if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer)
  console.log(this.heartbeatTimer)
  this.heartbeatTimer = setTimeout(() => {
    if (this.ws.readyState === 1 || this.ws.readyState === 0) {
      this.ws.send('heartbeat complete')
      this.$socket_heartbeat()
    } else {
      this.$socket_init()
    }
  }, 59000)
}

/**
 * 关闭socket连接
 */
socket.prototype.$socket_close = function () {
  if (this.heartbeatTimer) clearTimeout(timer)
  if (this.errorResetTimer) clearTimeout(this.errorResetTimer)
  this.closeWs = true
  this.ws.close()
}

/**
 * 重启socket连接
 */
socket.prototype.$socket_open = function () {
  if (!this.closeWs) {
    throw new Error('socket is connected')
  }
  this.heartbeatTimer = null
  this.errorResetNumber = 0
  this.errorResetTimer = null
  this.closeWs = false
  this.errorFrom = 0
  this.errorDispatchOpen = true
  this.socket_init()
}
export default socket
