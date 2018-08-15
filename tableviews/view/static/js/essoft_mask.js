Inputmask.extendAliases({

    'essoft_mask_float_comma': {
      alias: "numeric",
      digits: 2,
      rightAlign: true,
      groupSeparator: ",",
      autoGroup: !0,
      oncomplete: function() {
       // console.log('oncomplete');
      },
      onincomplete: function() {
       // console.log('onincomplete');
      },
      oncleared: function() {
       // console.log('oncleared');
      },
    },

    'essoft_mask_float_uncomma': {
      alias: "numeric",
      digits: 2,
      rightAlign: true,
      groupSeparator: "",
      autoGroup: !0,
      oncomplete: function() {
       // console.log('oncomplete');
      },
      onincomplete: function() {
       // console.log('onincomplete');
      },
      oncleared: function() {
       // console.log('oncleared');
      },
    },

    'essoft_mask_integer_comma': {
      alias: "numeric",
      digits: 0,
      rightAlign: true,
      groupSeparator: ",",
      autoGroup: !0,
    },

    'essoft_mask_integer_uncomma': {
        alias: "numeric",
        digits: 0,
        rightAlign: true,
        groupSeparator: "",
        autoGroup: !0,
      },
      
      'essoft_mask_number_5': {
        mask: "99999",
        placeholder: "" 
      }

   });
   
   

