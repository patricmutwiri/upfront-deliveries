/*! Fabrik */

define(["jquery"],function(a){return new Class({initialize:function(b){a("#"+b.id+" .togglecols .dropdown-menu a, #"+b.id+" .togglecols .dropdown-menu li").click(function(a){a.stopPropagation()}),b.addEvent("mouseup:relay(a[data-toggle-col])",function(a,b){var c=b.get("data-toggle-state"),d=b.get("data-toggle-col");this.toggleColumn(d,c,b)}.bind(this));b.getElements("a[data-toggle-group]");b.addEvent("mouseup:relay(a[data-toggle-group])",function(a,b){var c,d=b.get("data-toggle-state"),e=b.get("data-toggle-group");document.getElements("a[data-toggle-parent-group="+e+"]").each(function(a){var b=a.get("data-toggle-col");this.toggleColumn(b,d,a)}.bind(this)),d="open"===d?"close":"open",c="open"===d?"":" muted",b.getElement("i").className="icon-eye-"+d+c,b.set("data-toggle-state",d)}.bind(this))},toggleColumn:function(b,c,d){var e;c="open"===c?"close":"open","open"===c?(a(".fabrik___heading ."+b).show(),a(".fabrikFilterContainer ."+b).show(),a(".fabrik_row  ."+b).show(),a(".fabrik_calculations  ."+b).show(),e=""):(a(".fabrik___heading ."+b).hide(),a(".fabrikFilterContainer ."+b).hide(),a(".fabrik_row  ."+b).hide(),a(".fabrik_calculations  ."+b).hide(),e=" muted"),d.getElement("i").className="icon-eye-"+c+e,d.set("data-toggle-state",c)}})});