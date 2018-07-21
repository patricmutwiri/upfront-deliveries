/*! Fabrik */

define(["jquery","fab/fabrik"],function(a,b){"use strict";return new Class({Implements:[Events],options:{observe:"",trigger:"",cnn:0,table:0,map:"",editOrig:!1,fillOnLoad:!1,confirm:!0,autofill_lookup_field:0,showNotFound:!1,notFoundMsg:""},initialize:function(c){var d=this;this.options=a.extend(this.options,c),this.attached=[],this.setupDone=!1,this.setUp(b.getBlock("form_"+this.options.formid)),b.addEvent("fabrik.form.elements.added",function(a){d.setUp(a)}),b.addEvent("fabrik.form.element.added",function(a,b,c){d.element&&c.strElement===d.element.strElement&&(d.element=!1,d.setupDone=!1,d.setUp(a))})},getElement:function(a){var b,c=!1,d=this,e=this.form.formElements.get(this.options.observe),f=0;return e?this.attached.push(e.options.element):(b=Object.keys(this.form.formElements),b.each(function(b){b.contains(d.options.observe)&&(c=d.form.formElements.get(b),d.attached.contains(c.options.element)||d.attached.push(c.options.element),"null"!==typeOf(a)&&a!==f||(e=c),f++)})),e},setUp:function(a){var b=this;if(!this.setupDone&&void 0!==a){try{this.form=a}catch(a){return}var c=function(a){b.lookUp(a)},d=!1,e=this.form.formElements.get(this.options.observe);if(e)this.attached.push(e.options.element);else{var f=0;Object.keys(this.form.formElements).each(function(a){if(a.contains(b.options.observe)){d=b.form.formElements.get(a),b.attached.contains(d.options.element)||b.attached.push(d.options.element);var c=parseInt(d.getRepeatNum(),10);(isNaN(c)||c===f)&&(e=d),f++}})}if(this.element=e,""===this.options.trigger)if(this.element){var g=this.element.getBlurEvent();this.attached.each(function(a){b.form.formElements.get(a);b.form.dispatchEvent("",a,g,function(a){b.lookUp(a)})})}else fconsole("autofill - couldnt find element to observe");else this.form.dispatchEvent("",this.options.trigger,"click",c);if(this.options.fillOnLoad){var h=""===this.options.trigger?this.element.strElement:this.options.trigger;this.form.dispatchEvent("",h,"load",c)}this.setupDone=!0}},lookUp:function(c){if(this.options.trigger||(this.element=c),!0!==this.options.confirm||window.confirm(Joomla.JText._("PLG_FORM_AUTOFILL_DO_UPDATE"))){b.loader.start("form_"+this.options.formid,Joomla.JText._("PLG_FORM_AUTOFILL_SEARCHING")),this.element||(this.element=this.getElement(0));var d=this.element.getValue(),e=this.options.formid,f=this.options.observe,g=this;a.ajax({url:"index.php",method:"post",dataType:"json",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"autofill",method:"ajax_getAutoFill",g:"form",v:d,formid:e,observe:f,cnn:this.options.cnn,table:this.options.table,map:this.options.map,autofill_lookup_field:this.options.autofill_lookup_field}}).always(function(){b.loader.stop("form_"+g.options.formid)}).fail(function(a,b,c){window.alert(b)}).done(function(a){g.updateForm(a)})}},updateForm:function(c){this.json=c,b.fireEvent("fabrik.form.autofill.update.start",[this,c]);var d,e,f,g=this.element.getRepeatNum();if(a.isEmptyObject(this.json)){if(this.options.showNotFound){var h=""===this.options.notFoundMsg?Joomla.JText._("PLG_FORM_AUTOFILL_NORECORDS_FOUND"):this.options.notFoundMsg;window.alert(h)}}else{for(d in this.json)this.json.hasOwnProperty(d)&&(e=this.json[d],"_raw"===d.substr(d.length-4,4)&&(d=d.replace("_raw",""),f=d,this.tryUpdate(d,e)||(d=this.updateRepeats(d,e,g,f))));!0===this.options.editOrig&&(this.form.getForm().getElement("input[name=rowid]").value=this.json.__pk_val),b.fireEvent("fabrik.form.autofill.update.end",[this,c])}},updateRepeats:function(a,b,c,d){var e,f;if("object"==typeof b)for(e in b)b.hasOwnProperty(e)&&(f=a+"_"+e,this.tryUpdate(f,b[e]));else a+=c?"_"+c:"_0",this.tryUpdate(a,b)||(a="join___"+this.element.options.joinid+"___"+a,this.tryUpdate(d,b,!0));return a},tryUpdate:function(a,b,c){var d,e,f=this;if(c=!!c){if(d=Object.keys(this.form.formElements).filter(function(b,c){return b.contains(a)}),d.length>0)return d.each(function(a){e=f.form.elements[a],e.update(b),e.baseElementId!==f.element.baseElementId&&(e.element.fireEvent(e.getBlurEvent(),new Event.Mock(e.element,e.getBlurEvent())),e.getBlurEvent()!==e.getChangeEvent()&&e.element.fireEvent(e.getChangeEvent(),new Event.Mock(e.element,e.getChangeEvent())))}),!0}else if(void 0!==(e=this.form.elements[a]))return"auto-complete"===e.options.displayType&&(e.activePopUp=!0),e.update(b),e.baseElementId!==this.element.baseElementId&&(e.element.fireEvent(e.getBlurEvent(),new Event.Mock(e.element,e.getBlurEvent())),e.getBlurEvent()!==e.getChangeEvent()&&e.element.fireEvent(e.getChangeEvent(),new Event.Mock(e.element,e.getChangeEvent()))),!0;return!1}})});