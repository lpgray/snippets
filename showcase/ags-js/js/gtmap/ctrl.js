define([
        'gtmap/service/city'
        , 'gtmap/service/glass'
        , 'gtmap/service/identify'
        , 'gtmap/service/layer'
        , 'gtmap/service/location'
        , 'gtmap/service/measurement'
        , 'gtmap/service/print'
        , 'gtmap/service/search'
        , 'dojo/text!gtmap/template/servicetree.html'
      ] , 

function() {
  var rendered = 0, 
      $serviceTree = $('#mapTypesTree'), 
      args = arguments, 
      serviceTreeTpl = arguments[arguments.length - 1];

  return {
    bindHandler : function() {
      for (var i = 0; i < args.length - 1; i++) {
        for (var k in args[i] ) {
          $('[data-gtmap-service*=' + k + ']').each(function() {
            var self = $(this), serviceDesc = self.attr('data-gtmap-service');

            if (serviceDesc.search(/,/) !== -1) {
              var subDescArray = serviceDesc.split(',');
              for (var j = 0; j < subDescArray.length; j++) {
                if (subDescArray[j].indexOf(k) !== -1) {
                  serviceDesc = subDescArray[j];
                  break;
                }
              }
            }

            if (serviceDesc.search(/\(/) !== -1) {
              var jqSelectorString = serviceDesc.substring(serviceDesc.indexOf('(') + 1, serviceDesc.indexOf(')'));
              self.delegate(jqSelectorString, 'click', args[i][k]);
            } else {
              self.click(args[i][k]);
            }
          });
        }
      }
    },

    loadServiceTree : function(service) {
      $serviceTree.append(_.template( serviceTreeTpl )(service));
      rendered++;
      if (rendered == services.length) {
        $serviceTree.listtree();
      }
    }
  }

});