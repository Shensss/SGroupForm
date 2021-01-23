const pkg = require('../../package.json')
module.exports = {
  title: pkg.name,
  description: '快速搭建第三方库',
  base: '/',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '快速上手', link: '/guide/start' },
      { text: '测试', link: '/lib/test' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '简介',
          collapsable: false,
          children: [
            {
              title: '开始',
              path: 'start',
              collapsable: false,
            },
            {
              title: '组件中使用',
              path: 'useInComponent',
              collapsable: false,
            },
            {
              title: 'form参数说明',
              path: 'form',
              collapsable: false,
            },
            {
              title: 'itemStyle参数说明',
              path: 'itemStyle',
              collapsable: false,
            },
            {
              title: 'props参数说明',
              path: 'props',
              collapsable: false,
            },
            {
              title: '支持的type类型',
              path: 'type',
              collapsable: false,
            },
            {
              title: 'Api',
              path: 'api',
              collapsable: false,
            }
          ]
        }
      ],
      '/lib/':
        [
          {
            title: '测试',
            collapsable: false,
            children: [
              {
                title: '使用说明',
                path: 'test',
                collapsable: false,
              }
            ]
          }
        ]
    },
    sidebarDepth: 1
  },
  plugins: [
    // 回到顶部
    '@vuepress/back-to-top',

    // 放大
    ['@vuepress/medium-zoom', { selector: 'img' }]
  ]
}
