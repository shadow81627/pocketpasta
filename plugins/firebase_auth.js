export default (context) => {
  const { store, app } = context;

  return new Promise((resolve, reject) => {
    app.$firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // return resolve(console.log(user));
        store.dispatch('setUser', user);
        resolve();
      }
      return resolve();
    });
  });
};
