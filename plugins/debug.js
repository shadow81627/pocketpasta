export default ({ env, query }) => {
  if (query.debug) {
    console.log('env: ', env);
  }
};
