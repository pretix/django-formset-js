django-formset-js
=================

A wrapper for a JavaScript formset helper.

Installing
----------

Install via pip:

    pip install django-formset-js

Then add it and its dependancies `django-jquery-js` to your `INSTALLED_APPS`:

    INSTALLED_APPS += (
        'django.contrib.staticfiles',
        'jquery',
        'djangoformsetjs',
    )

Using
-----

Include the `djangoformsetjs.utils.formset_media_js` files in your form Media,
and render it on the page:

    from djangoformsetsjs.utils import formset_media_js

    class MyForm(forms.Form):
        class Media(object):
            js = formset_media_js + (
                # Your form media here
            )

    MyFormSet = formset_factory(MyForm)

Alternatively, simply add the script tag:

    <script src="{{ STATIC_URL }}js/jquery.formset.js"></script>

To activate it in the page, you must include the Media of the form:

    {% block extra_script %}
        {{ form.media }}
    {% endblock %}

Then render your formset. Certain blocks of your formset need to be marked up
so the formset library can find them. Note the `data-formset-...` attributes in
the code below:

    <div data-formset-wrapper data-formset-prefix="{{ formset.prefix }}">

        <div data-formset-body>
            <!-- New forms will be inserted in here -->
            {% for form in formset %} {{ form }} {% endfor %}
        </div>

        <div style="display: none">
            <div data-formset-empty>
                <!-- This element will be cloned for new forms inserted -->
                {{ formset.empty_form }}
            </div>
        </div>

        <!-- This button will add a new form when clicked -->
        <input type="button" value="Add another" data-formset-add>

        <script>jQuery(function($) {
            $("[data-formset-wrapper]").formset();
        });</script>

    </div>
