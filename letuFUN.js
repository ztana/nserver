(function(ext) {
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
        alert('Letu extension has been installed.');
    };

    //Start of extensions
    ext.custom = function(jsrun){
      eval(jsrun);
    };

    ext.switch = function(id, status) {
      var url = new URL('http://napi.letufun.com/profile')
      params = {orem:id,op:'set',v:status}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url);
    };

    ext.test = function() {
      fetch('http://napi.letufun.com/profile?orem=1&op=set&v=7');
    };

    //End of extensions

    var descriptor = {
        blocks: [
          ['', 'javascript %s', 'custom'],
          ['', 'swtich %s %s', 'switch'],
          ['', 'test', 'test']
        ]
    };
    ScratchExtensions.register('LetuFun', descriptor, ext);
})({});
