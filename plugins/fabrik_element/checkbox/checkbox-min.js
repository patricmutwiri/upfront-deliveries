/*! Fabrik */

define(["jquery","fab/elementlist"],function(a,b){return window.FbCheckBox=new Class({Extends:b,type:"checkbox",initialize:function(a,b){this.setPlugin("fabrikcheckbox"),this.parent(a,b),this._getSubElements()},watchAddToggle:function(){var a,b,c=this.getContainer(),d=c.getElement("div.addoption"),e=c.getElement(".toggle-addoption");this.mySlider&&(a=d.clone(),b=c.getElement(".fabrikElement"),d.getParent().destroy(),b.adopt(a),d=c.getElement("div.addoption"),d.setStyle("margin",0)),this.mySlider=new Fx.Slide(d,{duration:500}),this.mySlider.hide(),e.addEvent("click",function(a){a.stop(),this.mySlider.toggle()}.bind(this))},getValue:function(){if(!this.options.editable)return this.options.value;var a=[];return this.options.editable?(this._getSubElements().each(function(b){b.checked&&a.push(b.get("value"))}),a):this.options.value},numChecked:function(){return this._getSubElements().filter(function(a){return a.checked}).length},update:function(a){var b,c;if(this.getElement(),"string"===typeOf(a)&&(a=""===a?[]:JSON.parse(a)),!this.options.editable){if(this.element.innerHTML="",""===a)return;return b=$H(this.options.data),void a.each(function(a){this.element.innerHTML+=b.get(a)+"<br />"}.bind(this))}this._getSubElements(),this.subElements.each(function(b){c=!1,a.each(function(a){a===b.value&&(c=!0)}.bind(this)),b.checked=c}.bind(this))},cloned:function(a){!0===this.options.allowadd&&!1!==this.options.editable&&(this.watchAddToggle(),this.watchAdd()),this.parent(a)}}),window.FbCheckBox});