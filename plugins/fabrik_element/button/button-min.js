/*! Fabrik */

define(["jquery","fab/element"],function(jQuery,FbElement){return window.FbButton=new Class({Extends:FbElement,initialize:function(a,b){this.setPlugin("fabrikButton"),this.parent(a,b)},addNewEventAux:function(action,js){var self=this;jQuery(this.element).on(action,function(e){e&&e.stopPropagation(),"function"===jQuery.type(js)?js.delay(0,self,self):(js=js.replace(/\bthis\b(?![^{]*})/g,"self"),eval(js))})}}),window.FbButton});