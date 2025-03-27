module.exports = {
  "title": "lufangzhou",
  "description": "记录平凡的人生",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": '/img/favicon.ico'
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        text: '个人主页',
        items: [
          {text: 'GitHub', link: 'https://github.com/zhoufanglu'},
          {text: '掘金', link: 'https://juejin.im/user/5afd39c36fb9a07ac162a318'},
          {text: 'previous-blog', link: 'https://zhoufanglu.github.io/'},
        ]
      },
      {text: '专利', link: '/随笔/patent.html'},
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      },
    ],
/*
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
*/
    "type": "blog",
    "authorAvatar": '/img/headimg.jpg',
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    friendLink: [
      {
        title: 'an9wer',
        logo: "/img/headImg/wuXinRun.png",
        link: 'https://an9wer.github.io/blog.html'
      },
      {
        title: 'wanger',
        logo: "/img/headImg/wangYuLue.png",
        //email: 'recoluan@qq.com',
        link: 'https://wangyulue.com/'
      },
      {
        title: '饭团也有春天',
        link: 'http://www.zpzpup.com/blog/'
      },
      {
        title: 'Chereby',
        link: 'http://www.chereby.com/'
      },
      {
        title: 'RE1IFE\'s Blog',
        link: 'http://www.re1ife.top',
        logo: "https://re1ife.oss-cn-chengdu.aliyuncs.com/media/re1ife-site.ico",
      },
      {
        "title": "Xiaojun Zhou",
        "logo": "https://www.xiaojun.im/avatar.jpg",
        "link": "https://xiaojun.im"
      },
      {
        "title": "YeYuanChuan",
        "logo": "https://crazystudent13.cn/images/avatar.png",
        "link": "https://crazystudent13.cn/"
      },
      {
        "title": "申请添加",
        "link": "https://github.com/zhoufanglu/vuepressBlog/issues"
      },
    ],
    logo: '/img/headimg.jpg',
    mode: 'dark', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "lufangzhou",
    "record": "xxxx",
    "startYear": "2019"
  },
  "markdown": {
    "lineNumbers": true
  }
}
