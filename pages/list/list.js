// pages/list/list.js
const util = require('../../utils/util.js')

const companies = []
const allCities = '全部城市'

// 目前是github地址，在国内可能特别慢，可以考虑使用国内镜像
const remoteDataUrl = 'https://raw.githubusercontent.com/formulahendry/955.WLB/master/README.md'

Page({
  data: {
    companies: [],
    cities: [],
    cityIndex: 0,
  },

  onLoad: async function (options) {

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    const companies = await this.fetchCompaniesData()
    const cities = this.getCities(companies)
    this.setData({
      companies,
      cities,
    })
  },

  // 从远程获取数据
  fetchCompaniesData: async function () {
    // 如果已经存在，则直接返回
    if (companies.length > 0) {
      return companies
    }
    // 开始从远程获取数据
    wx.showLoading('获取数据中')
    try {
      const res = await util.asyncRequest({
        url: remoteDataUrl
      })
      const [companiesString] = res.data.match(/## 955 的公司名单[\s\S]+?## 添加公司/)
      // 循环匹配
      const regExp = /\* (.+?) - (.+)/g
      while (true) {
        const match = regExp.exec(companiesString)
        if (!match) break
        const [, name, city] = match
        companies.push({
          name,
          city
        })
      }
    } catch (e) {
      wx.showToast({
        title: '获取数据失败',
        icon: 'error'
      })
    }
    wx.hideLoading()
    return companies
  },

  getCompanies: function (city = '') {
    if (city === '' || city === allCities)
      return companies
    else {
      return companies.filter(item => item.city && item.city.includes(city))
    }
  },

  getCities: function (companies) {
    const citySet = new Set()
    citySet.add(allCities)
    for (let company of companies) {
      const cities = company.city.split('/')
      for (let city of cities) {
        citySet.add(city)
      }
    }
    return Array.from(citySet)
  },

  bindCityPickerChange: function (e) {
    const cityIndex = e.detail.value
    const city = this.data.cities[cityIndex]
    this.setData({
      companies: this.getCompanies(city),
      cityIndex,
    });
  },
})