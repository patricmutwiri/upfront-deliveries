/*! Fabrik */

var fbVisApprovals=new Class({Implements:[Options],options:{},initialize:function(a,b){this.setOptions(b),this.el=document.id(a),document.addEvent("click:relay(a.approve)",function(a){var b=a.target;a.stop(),"a"!==b.get("tag")&&(b=b.findUp("a")),new Request.HTML({url:b.href,onSuccess:function(){b.getParent("tr").dispose()}}).send()}),document.addEvent("click:relay(a.disapprove)",function(a){var b=a.target;a.stop(),"a"!==b.get("tag")&&(b=b.findUp("a")),new Request.HTML({url:b.href,onSuccess:function(){b.getParent("tr").dispose()}}).send()}),new FloatingTips(".approvalTip",{position:"right",content:function(a){var b=a.getNext();return b.store("trigger",a),b},hideOn:"mousedown"})}});