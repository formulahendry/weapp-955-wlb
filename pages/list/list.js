// pages/list/list.js
const companies = [
  "Autodesk - 北京/上海",
  "Cisco - 北京/上海/杭州/苏州",
  "coolapk (酷安) - 北京/深圳",
  "Douban (豆瓣) - 北京",
  "eBay - 上海",
  "EMC - 上海",
  "Ericsson - 上海",
  "Google - 北京/上海",
  "HP - 上海",
  "HSBC - 上海",
  "IBM - 上海 (GBS除外)",
  "Intel - 上海",
  "LeetCode - 上海",
  "LintCode/九章算法 - 杭州/远程",
  "Microsoft - 北京/上海/苏州",
  "Oracle - 上海",
  "PayPal - 上海",
  "Pivotal - 北京/上海",
  "RingCentral - 厦门",
  "SAP - 上海",
  "Splunk - 上海",
  "SUSE - 北京/上海/深圳",
  "ThoughtWorks - 西安/北京/深圳/成都/武汉/上海",
  "Vipshop (唯品会) - 上海",
  "VMware - 北京/上海",
  "WeWork - 上海",
  "Works Applications - 上海"
]

Page({
  data: {
    companies: []
  },

  onLoad: function (options) {
    this.setData({
      companies: this.getCompanies()
    });
  },

  getCompanies: function () {
    const list = [];
    for (let company of companies) {
      const items = company.split(" - ");
      list.push({
        name: items[0],
        city: items[1]
      });
    }
    return list;
  }
})