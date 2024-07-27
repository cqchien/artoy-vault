module.exports = {
  lang: 'en-US',
  title: 'TalentFlow',
  description: 'Product can significantly enhance the efficiency of recruitment and ongoing talent management.',
  base: process.env.DEPLOY_ENV === 'gh-pages' ? '/talent-flow/' : '/',
  themeConfig: {
    sidebar: [
      ['/', 'Introduction'],
      '/docs/development',
      '/docs/architecture',
      '/docs/naming-cheatsheet',
      // '/docs/routing',
      // '/docs/state',
      '/docs/linting',
      // '/docs/editors',
      // '/docs/production',
      // '/docs/troubleshooting',
    ],
  },
};
