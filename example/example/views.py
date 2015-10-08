from django import forms
from django.forms.formsets import formset_factory
from django.shortcuts import render
from djangoformsetjs.utils import formset_media_js

class MyForm(forms.Form):

    foo = forms.CharField()

    class Media(object):
        # The form must have `formset_media_js` in its Media
        js = formset_media_js + (
            # Other form javascript...
        )


MyFormSet = formset_factory(MyForm, can_delete=True, can_order=True)


def formset_view(request):
    formset = MyFormSet(request.POST or None)

    if formset.is_valid():
        pass

    return render(request, 'formset.html', {'formset': formset})
