from django.conf.urls import patterns, include, url
import example.views

urlpatterns = patterns('',
    url(r'^$', example.views.formset_view),
)
