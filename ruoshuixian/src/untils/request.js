const domain = 'https://rsx.majiangyun.com';
function request (url, method, data, header = {}) {
  wx.showLoading ({
    title: '加载中', // 数据请求前loading
  });
  return new Promise ((resolve, reject) => {
    wx.request ({
      url: domain + url, // 仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET'
          ? 'application/json'
          : 'application/x-www-form-urlencoded',
        // 默认值
        token: header.token,
      },
      success: function (res) {
        wx.hideLoading ();
        resolve (res.data);
      },
      fail: function (res) {
        wx.hideLoading ();
        // reject(false)
      },
      complete: function () {
        wx.hideLoading ();
      },
    });
  });
}

function get (obj) {
  return request (obj.url, 'GET', obj.data, obj.header);
}

function post (obj) {
  return request (obj.url, 'POST', obj.data, obj.header);
}
export default {
  request,
  get,
  domain,
  post,
};
