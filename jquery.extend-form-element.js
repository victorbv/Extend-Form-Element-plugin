// JavaScript Document

/*
	Extend Form Element plugin
	Author: Victor Volker
	Version: 0.8
	Date: feb 28 2014
	
	extends the form element behaviour to its parent div; compatible with jQuery 1.6 or higher
	
*/

(function( $ ){

  var methods = {
    init : function(options) {
		
		return this.each(function(){
		
			var $this = $(this),
				data = $this.data('initialized'),
				type = $this.attr('type'),
				extendedElement
				;

			if (options && options.extendedElementSelector) {
				extendedElement = $(options.extendedElementSelector).first();
			} else {
				extendedElement = $(this).parent();
			}
				
			if ( ! data && (type=='radio' || type=='checkbox') ) {
			
				$(this).data('initialized', true);
				$(this).data('type', $(this).attr('type'));
				$(this).data('name', $(this).attr('name'));
				$(this).data('extendedElement', extendedElement);
				
				$(this).css('visibility','hidden');
				
				$(extendedElement).click(function(event){
					$(this).extendFormElement('doClick',$this); 
					event.preventDefault() 
				});
				
				$(this).extendFormElement('updateAll');
			
			}
			
		});		
		

	},
    doClick : function($input) {
		if ($input.data('type')=='radio') $input.extendFormElement('check');
		else if ($input.data('type')=='checkbox') {
			if ($input.prop("checked")) $input.extendFormElement('uncheck');
			else $input.extendFormElement('check');
		}
	},
    check : function() {
		return this.each(function(){
	    	if (!$(this).prop("disabled")) {
				$(this).prop('checked', true);
				$(this).trigger('change');
			}
			$(this).extendFormElement('updateAll');
		});
	},
    uncheck : function() {
		return this.each(function(){
			$(this).prop('checked',false);
			$(this).trigger('change');
			$(this).extendFormElement('updateAll');
		});
	},
    update : function() {		
		return this.each(function(){
			var extendedElement = $(this).data('extendedElement');
			if ($(this).prop("disabled")) {
				$(extendedElement).addClass("disabled");
				$(extendedElement).removeClass("checked");
			} else {
				$(extendedElement).removeClass("disabled");
				if ($(this).prop("checked")) {
					$(extendedElement).addClass("checked");
				} else {
					$(extendedElement).removeClass("checked");
				}
			}
		});	
	},
    updateAll : function() {		
		return this.each(function(){
			var type = $(this).data('type');
			if (type=='radio') {
				$('input[name="'+$(this).data('name')+'"]').each(function(){
					$(this).extendFormElement('update');
				});
			} else $(this).extendFormElement('update');
		});		
	}
  };

  $.fn.extendFormElement = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.extendFormElement' );
    }    
  
  };

})( jQuery );
