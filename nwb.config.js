module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'CervezaTools',
      externals: {
        react: 'React'
      }
    }
  }
}
