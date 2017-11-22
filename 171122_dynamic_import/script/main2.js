import('./sub.js')
  .then(module => {
      const sub = new module.Sub()
      sub.subMethod()
    });
