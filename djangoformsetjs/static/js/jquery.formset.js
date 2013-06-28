/**
* Django formset helper
*/
(function($) {
    "use strict";

    var pluginName = 'formset';

    //Show dates in one format, submit in another
    var Formset = function(el, options) {
        var _this = this;

        //Defaults:
        this.defaults = {
            emptyForm: '[data-formset-empty-form]',
            body: '[data-formset-body]',
            add: '[data-formset-add]'
        };
        //Extending options:
        this.opts = $.extend({}, this.defaults, options);

        this.$formset = $(el);
        this.$emptyForm = this.$formset.find(this.opts.emptyForm);
        this.$body = this.$formset.find(this.opts.body);
        this.$add = this.$formset.find(this.opts.add);

        this.addForm = (function(addForm) {
            return function() { return addForm.apply(_this, arguments); };
        })(this.addForm);

        this.$add.click(this.addForm);

        // Store a reference to this in the elements
        this.$formset.data(pluginName, this);
    };

    Formset.prototype.addForm = function() {
        var attrs = ['name', 'id', 'for'];
        var selector = $.map(attrs, function(val) {
            return '[' + val + '*=__prefix__]';
        }).join(',');

        var count = this.formCount();
        this.formCount(count + 1);

        var $newForm = this.$emptyForm.clone();
        var $els = $newForm.find(selector);

        $els.each(function(i, el) {
            var $el = $(el);
            $.each(attrs, function(i, attrName) {
                var attr = $el.attr(attrName);
                if (!attr) return;
                $el.attr(attrName, attr.replace('__prefix__', count));
            });
        });


        this.$body.append($newForm);

        return $newForm;

    };

    Formset.prototype.managementForm = function(name) {
        return this.$formset.find('[name=' + this.$formset.data('formset-prefix') + '-' + name + ']');
    };

    Formset.prototype.formCount = function() {
        var $totalForms = this.managementForm('TOTAL_FORMS');

        if (arguments.length) {
            $totalForms.val(arguments[0]);
            return this;
        } else {
            return parseInt($totalForms.val(), 10) || 0;
        }
    };

    Formset.getOrCreate = function(el, options) {
        var rev = $(el).data(pluginName);
        if (!rev) {
            rev = new Formset(el, options);
        }

        return rev;
    };

    $.fn[pluginName] = function() {
        var options, fn, args;
        // Create a new Formset for each element
        if (arguments.length === 0 || (arguments.length === 1 && $.type(arguments[0]) != 'string')) {
            options = arguments[0];
            return this.each(function() {
                return Formset.getOrCreate(this, options);
            });
        }

        // Call a function on each Formset in the selector
        fn = arguments[0];
        args = $.makeArray(arguments).slice(1);

        if (fn in Formset) {
            // Call the Formset class method if it exists
            args.unshift(this);
            return Formset[fn].apply(Formset, args);
        } else {
            throw new Error("Unknown function call " + fn + " for $.fn.formset");
        }
    };
})(jQuery);
