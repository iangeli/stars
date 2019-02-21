const isProduction = process.env.NODE_ENV === 'production'
const clientId = isProduction ? '75a8420544b014947848' : 'b83c98cebb51903b8417'
const clientSecret = isProduction ? '4c8c8465424312c7a1791669e617b522f8b304b3' : '61ab3ee44e5e437ab02730b8f5d1e5e7b698381d'

export default {
  clientId,
  clientSecret,
  localStorageKeys: {
    gistId: 'gitstars_gist_id',
    accessToken: 'gitstars_access_token',
    code: 'gitstars_code',
    user: 'gitstars_user',
    settings: 'gitstars_settings',
    activeSelect: 'gitstars_activeselect',
  },
  filename: `${isProduction ? 'stars.json' : 'stars_dev.json'}`,
  description: `Stars Manager Database for ${isProduction ? 'Production' : 'Development'}`,
  notify: {
    duration: 3000,
    showClose: false,
    position: 'bottom-right',
  },
  starredReposPerPage: 100, // Github 最大值

  defaultTags: {
    all: { id: 0, icon: 'fa-tags', key: '' },
    untagged: { id: -1, icon: 'fa-snowflake-o', key: '' },
  },
  tagCategorys: {
    custom: { id: 0, name: '自定义', key: 'custom' },
    language: { id: 1, name: '语言', key: 'language' },
  },
  repoSorts: {
    time: { id: 0, sortKey: 'sortTime', name: 'Time', icon: 'fa-clock-o' },
    star: { id: 1, sortKey: 'stargazers_count', name: 'star', icon: 'fa-star' },
    update: { id: 0, sortKey: 'pushed_at', name: 'Update', icon: 'fa-refresh' },
  },
}
