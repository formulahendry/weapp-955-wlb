//index.js

Page({
  data: {
    motto: 'Hello World'
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})
