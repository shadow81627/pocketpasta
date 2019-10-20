module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'pretty-quick --staged',
    'pre-push': 'npm test',
  },
};
