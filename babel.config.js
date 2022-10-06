module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        target: {
            chrome: '59',
        	ie: '11'	
        },
        corejs: 3,
        useBuiltIns: 'entry',
        modules: false,
        shippedProposals: true
      }
    ],
  ]
};