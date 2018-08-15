$.fn.modal.Constructor.prototype.enforceFocus = function () {};

var myApp;
myApp = myApp || (function () {
    var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h3 class="pleaseWaitDialogTitle">Processing...</h3></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
    return {
        showPleaseWait: function(title) {
            pleaseWaitDiv.modal();
            if(!!title){
              $('.pleaseWaitDialogTitle').text(title);
            }
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        },
        showCursorPleaseWait: function () {
            $("body").css("cursor", "progress");
        },
        hideCursorPleaseWait: function () {
            $("body").css("cursor", "default");
        },
    };
})();

var JsonToTable;
JsonToTable = (function(){
    var data_table = {'table':{'th':[{'th1':'id','th2':'name','th3':'surename'}],'data_rows':[{'cols1':'1160100090025','cols2':'Phattara','cols3':'Kiantong'}]}};
    var tag_table  = "<table />";
    var tag_tr     = "<tr />";
    var tag_td     = "<td />";
    var tag_th     = "<th />";
    return{
      setMainTable: function(attribute)
      {

      },
      setTHTable: function (thead)
      {
            //alert(thead);
            var obj = jQuery.parseJSON(thead);
            $.each(obj.table.th, function(index, object){
                console.log(object);
            });
            /*$.each(data_table.table.data_rows, function(index, object){
                $.each(object, function(index2,object2){
                  console.log(object2);
                });
            });*/

      },
      setDetailTable: function (data_rows)
      {

      },
    };
})();
/*
delay(function(){
  alert('Time elapsed!');
}, 1000 );
 */
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

/*function number_format_js(number, decimals, dec_point, thousands_sep) {
  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}*/

function number_format_js(number, decimals = 2, dec_point, thousands_sep) {
    var decimal = '0.'+new Array(decimals+1).join('0');
    var string = numeral(number).format(decimal);
    return string;
}

function removeCommas(str) {
    str = str.toString();
    return(str.replace(/,/g,''));
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//export csv
function exportTableToCSV($table, filename) {
    var $rows = $table.find('tr:has(td)'),

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
            var $row = $(row),
            $cols = $row.find('td');

            return $cols.map(function (j, col) {
                var $col = $(col),
                text = $col.text();

                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
        .split(tmpRowDelim).join(rowDelim)
        .split(tmpColDelim).join(colDelim) + '"',

        // Data URI
        csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this)
        .attr({
            'download': filename,
            'href': csvData,
            'target': '_blank'
        });
}

$(document).ready(function(){
    $("[rel=tooltip]").tooltip({
      position: { my: "left center", at: "right center" },
      open: function( event, ui ) {
        //$(this).tooltip("option", "content", $(this).prev().find("*:last").parent().attr('essoft-object-id') );
      }
    });
});

$(document).on('keypress', '.number_only', function(event){
    if(event.which == 32){
        event.preventDefault();
    }else if( event.which != 8 && isNaN(String.fromCharCode(event.which))){
        event.preventDefault();
    }
});

$(document).on('keypress', '.money_only', function(event){
    if(event.which == 32){
        event.preventDefault();
    }else if( event.which != 46 && event.which != 8 && isNaN(String.fromCharCode(event.which))){
        event.preventDefault();
    }
});

// $(document).ajaxError(function(event, jqxhr, settings, thrownError) {
//     var d = new Date().toLocaleString();
//     alert("DateTime : " + d + "\nError : " + jqxhr.status + " " + thrownError+ "\nRequesting : " + settings.url);
// });


function in_array(needle, haystack, argStrict) {
  var key = '',
    strict = !! argStrict;

  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] == needle) {
        return true;
      }
    }
  }

  return false;
}

$(document).on('change','.validate_file_image', function (event) {
    var files = $(this)[0].files;
    var fileName = files[0].name;
    var notification = "File : ";
    var error = 0;
    if (!getExtImage(fileName)) {
        notification += fileName + "\n";
        error++;
    }
    if (error != 0) {
        alert(notification + "\nประเภทไฟล์ไม่ถูกต้อง ตัวอย่าง Image.jpg, Image.jpeg, Image.png");
        $(this).val('');
    }
});

function getExtImage(filename) {
    var ext = filename.split('.').pop();
    if (ext == filename) return "";
    ext = ext.toLowerCase();
    if (ext == "jpg" || ext == "jpeg" || ext == "png") {
        return true;
    }
}

$(document).on('change','.validate_file_image_pdf', function (event) {
    var files = $(this)[0].files;
    var fileName = files[0].name;
    var notification = "File : ";
    var error = 0;
    if (!getExtImagePdf(fileName)) {
        notification += fileName + "\n";
        error++;
    }
    if (error != 0) {
        alert(notification + "\nประเภทไฟล์ไม่ถูกต้อง ตัวอย่าง Image.jpg, Image.jpeg, Image.png, File.pdf");
        $(this).val('');
    }
});

function getExtImagePdf(filename) {
    var ext = filename.split('.').pop();
    if (ext == filename) return "";
    ext = ext.toLowerCase();
    if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "pdf") {
        return true;
    }
}

function essoft_show_modal(name,url,width,backdrop,keyboard){
    $('BODY').append('<div class="modal hide" id="'+name+'" data-backdrop="'+backdrop+'" data-keyboard="'+keyboard+'"></div>');
    $('#'+name+'').load(url,function(data){
        $('#'+name+'').modal('show',{

        }).css({
           'width': function () {
               return width;
           },
           'margin-left': function () {
               return -($(this).width() / 2);
           }
        });
    });

    $('#'+name+'').on('hide', function(e){
        $('#'+name+'').remove();
    });
}

function essoft_show_modal_not_remove(name,url,width,backdrop,keyboard){
    $('BODY').append('<div class="modal hide" id="'+name+'" data-backdrop="'+backdrop+'" data-keyboard="'+keyboard+'"></div>');
    $('#'+name+'').load(url,function(data){
        $('#'+name+'').modal('show',{

        }).css({
           'width': function () {
               return width;
           },
           'margin-left': function () {
               return -($(this).width() / 2);
           }
        });
    });

    $('#'+name+'').on('hide', function(e){

    });
}


function isInt(value) {
  var x;
  return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}

function isValidDateThai(dateString) {
  var regEx = /^\d{2}\/\d{2}\/\d{4}$/;
  if(!dateString.match(regEx))
    return false;  // Invalid format
  var d;
  var date_split = dateString.split("/");
  var dateString2 = date_split[2]+'-'+date_split[1]+'-'+date_split[0];
  if(!((d = new Date(dateString2))|0))
    return false; // Invalid date (or this could be epoch)
  return d.toISOString().slice(0,10) == dateString2;
}


function isValidDateEng(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx))
    return false;  // Invalid format
  var d;
  if(!((d = new Date(dateString))|0))
    return false; // Invalid date (or this could be epoch)
  return d.toISOString().slice(0,10) == dateString;
}



/*
Class Play Element เพิ่มและลบรายการ Element
push_element_table เพิ่ม Element 
Example::
var  play_element_obj = new class_play_element();
function addRowsUnit()
 {
        play_element_obj.tbody_id   = 'tbody_unit'; ---> id tbody
        play_element_obj.amount_tr  = 1; ---> จำนวนแถว tr
        play_element_obj.amount_col = 4; ---> จำนวน col
        play_element_obj.element_type  = 'label,text,text,button';
        play_element_obj.element_name  = '@tr_order,unit_name[],amount_name[],delete[]';
        play_element_obj.element_value = '@tr_order,,,<i class="icon-minus icon-white"></i>';
        play_element_obj.element_class  = ',form-control,form-control,btn btn-danger text-center';
        play_element_obj.element_event  = ',obblur,onblur,onclick';
        play_element_obj.element_action  =  ',,,removeRowsUnit';
        play_element_obj.push_element_table();
}
function removeRowsUnit(tbody_id,thistag)
{
   play_element_obj.remove_element_table(tbody_id,thistag);
}
*/
var class_play_element = function(){};
    class_play_element.prototype = {
        use_create_element : ['label'],
        use_set_attribute  : ['text','button'],
        tbody_id           : '',
        amount_tr          : '',
        amount_col         : '',
        element_type       : '',
        element_name       : '',
        element_value      : '',
        element_class      : '',
        element_event      : '',
        element_action     : '',
        push_element_table : function()
        {
            var split_element_type = this.split_parameter(this.element_type);
            var split_element_name = this.split_parameter(this.element_name);
            var split_element_value = this.split_parameter(this.element_value);
            var split_element_class = this.split_parameter(this.element_class);
            var split_element_event  = this.split_parameter(this.element_event);
            var split_element_action  = this.split_parameter(this.element_action);
            var tr = new Array(this.amount_tr);
            var td = new Array(this.amount_col);
            var temp_tag,tr_id,function_name;
            var tbody_cout_row =this.tbody_cout_row(this.tbody_id);
            var tr_order = tbody_cout_row;
            for(j = 0 ; j<this.amount_tr;j++)
            {

                tr[j] = this.create_element('tr');
                tr_order = this.run_order(tr_order);
                for(i = 0 ; i<this.amount_col;i++)
                {
                    td[i] = this.create_element('td');
                               
                    if(jQuery.inArray( split_element_type[i],  this.use_create_element) != -1 && jQuery.inArray( split_element_type[i],  this.use_set_attribute) == -1)
                    {
                        
                        if(split_element_name[i] == '@tr_order')
                        {
                            temp_tag = this.create_element(split_element_type[i]);
                            this.append_element(temp_tag,tr_order);                            
                        }

                    }
                    else if(jQuery.inArray( split_element_type[i],  this.use_create_element) == -1 && jQuery.inArray( split_element_type[i],  this.use_set_attribute) != -1)
                    {
                        if(split_element_type[i] != 'button')
                        {
                            temp_tag = this.create_element('input');
                            this.set_attribute(temp_tag,'type',split_element_type[i]);
                            this.set_attribute(temp_tag,'name',split_element_name[i]);
                            this.set_attribute(temp_tag,'value',split_element_value[i]);
                            
                        }
                        else if(split_element_type[i] == 'button')
                        {                           
                            function_name = split_element_action[i] != '' && split_element_event[i] != '' ? split_element_action[i]+'("'+this.tbody_id+'",this)' : '';      
                            temp_tag = this.create_element('button');
                            this.add_class_element(td[i],'text-center');
                            this.set_attribute(temp_tag,'type',split_element_type[i]);
                            this.set_attribute(temp_tag,'name',split_element_name[i]);
                            this.set_attribute(temp_tag,split_element_event[i],function_name);
                            this.append_element(temp_tag,split_element_value[i]);
                        }

                    }

                    this.add_class_element(temp_tag,split_element_class[i]);
                    this.append_element(td[i],temp_tag);
                    this.append_element(tr[j],td[i]);
                }
            }
            $('#'+this.tbody_id).append(tr);

        },
        remove_element_table:function(tbody_id,thistag)
        {
            var row =  $(thistag).closest("tr");
            $(row).remove();
            $('#'+tbody_id+' tr').each(function(idx){
                $(this).children().first().html(idx + 1);
            });
           
        },
        run_order:function(tbody_cout_row)
        {
            return tbody_cout_row+1;
        },
        create_element:function(element_type)
        {
            var new_element     = $("<"+element_type+" />");
            return new_element;
        },
        split_parameter:function(_text)
        {
            var split_element = _text.split(',');
            return split_element;
        },
        tbody_cout_row:function(tbody_id)
        {
            return $("#"+tbody_id+" tr").length;
        },
        set_attribute:function(_tag,_attr,_text)
        {
            _tag.attr(_attr,_text);
        },
        append_element:function(_parent,_child)
        {
            $(_parent).append(_child);
        },
        add_class_element:function(_tag,_class)
        {
            _tag.addClass(_class);
        },
        
    };

    function essoft_js_format_number(number, decimals = 2) {
        var decimal = '0,0.'+new Array(decimals+1).join('0');
        var string = numeral(number).format(decimal);
        return string;
     };
     
     function essoft_js_tofixed(number, decimals = 2) {
        var decimal = '0.'+new Array(decimals+1).join('0');
        var string = numeral(number).format(decimal);
        return parseFloat(string);
     };

     function essoft_set_datetime(string,error_message){
        return (moment(string).isValid() ? moment(string).format("YYYY-MM-DD HH:mm:ss") : error_message);
     }

     function essoft_set_datetime_thai(string,error_message){
        return (moment(string).isValid() ? moment(string).format("DD/MM/YYYY HH:mm:ss") : error_message);
     }

     function essoft_set_date(string,error_message){
        return (moment(string).isValid() ? moment(string).format("YYYY-MM-DD") : error_message);
     }

     function essoft_set_date_thai(string,error_message){
        return (moment(string).isValid() ? moment(string).format("DD/MM/YYYY") : error_message);
     }

     function essoft_set_custom_date(string,custom,error_message){
        var str_custom = (custom=='' ? "YYYY-MM-DD HH:mm:ss" : custom);//set default date format
        return (moment(string).isValid() ? moment(string).format(str_custom) : error_message);
     }
