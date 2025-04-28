const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    const { serverUrl, pageSize } = this.config.news;

    // const { data: idList } = await this.ctx.curl(
    //   `${serverUrl}/topstories.json`,
    //   {
    //     data: {
    //       orderBy: '"$key"',
    //       startAt: `"${pageSize * (page - 1)}"`,
    //       endAt: `"${pageSize * page - 1}"`,
    //     },
    //     dataType: 'json',
    //   }
    // );

    // parallel GET detail
    // const newsList = await Promise.all(
    //   Object.keys(idList).map((key) => {
    //     const url = `${serverUrl}/item/${idList[key]}.json`;
    //     return this.ctx.curl(url, { dataType: 'json' });
    //   })
    // );

    const newsList = {
      list: [
        { id: 1, title: 'This is news 1', url: '/news/1', time: 17458420287 },
        { id: 2, title: 'This is news 2', url: '/news/2', time: 17458420287 }
      ]
    };
    return newsList.list;
  }
}

module.exports = NewsService;