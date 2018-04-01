(async () => {
  try {
    const result = await import('./module');

    console.log(result);
    console.log(result.default.name);
    console.log(module);
  }
  catch(error) {
    console.log(error);
  }
})();
