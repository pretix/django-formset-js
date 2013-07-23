/**
* Django formset helper
*/
(function($) {
    "use strict";

    var pluginName = 'formset';

    /**
    * Wraps up a formset, allowing adding, and removing forms
    */
    var Formset = function(el, options) {
        var _this = this;

        //Defaults:
        this.opts = $.extend({}, Formset.defaults, options);

        this.$formset = $(el);
        this.$emptyForm = this.$formset.find(this.opts.emptyForm);
        this.$body = this.$formset.find(this.opts.body);
        this.$add = this.$formset.find(this.opts.add);

        this.formsetPrefix = $(el).data('formset-prefix');

        // Bind to the `Add form` button
        this.addForm = $.proxy(this, 'addForm');
        this.$add.click(this.addForm);

        // Set up the existing forms
        this.$body.find(this.opts.form).each(function(i, form) {
            var $form = $(form);
            _this.bindForm($(this), i);
        });

        // Store a reference to this in the formset element
        this.$formset.data(pluginName, this);
    };

    Formset.defaults = {
        form: '[data-formset-form]',
        emptyForm: 'script[type=form-template][data-formset-empty-form]',
        body: '[data-formset-body]',
        add: '[data-formset-add]',
        deleteButton: '[data-formset-delete-button]'

    };

    Formset.prototype.addForm = function() {
        var newIndex = this.formCount();
        this.formCount(newIndex + 1);

        var newFormHtml = this.$emptyForm.html()
            .replace(new RegExp('__prefix__', 'g'), newIndex)
            .replace(new RegExp('<\\\\/script>', 'g'), '</script>');

        var $newForm = $(newFormHtml);
        this.$body.append($newForm);
        this.bindForm($newForm, newIndex);
        $newForm.slideUp(0);
        $newForm.slideDown();

        return $newForm;
    };

    /**
    * Attach any events needed to a new form
    */
    Formset.prototype.bindForm = function($form, index) {
        var prefix = this.formsetPrefix + '-' + index;
        $form.data(pluginName + '__formPrefix', prefix);

        var $delete = $form.find('[name=' + prefix + '-DELETE]');
        var $deleteButton = $form.find(this.opts.deleteButton);

        if ($deleteButton.length) {
            $deleteButton.bind('click', function() {
                $form.slideUp();
                $delete.attr('checked', true);
            });

            if ($delete.is(':checked')) {
                $form.slideUp(0);
            }
        }
    };

    Formset.prototype.managementForm = function(name) {
        return this.$formset.find('[name=' + this.formsetPrefix + '-' + name + ']');
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
