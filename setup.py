#!/usr/bin/env python
"""
Install django-formset-js using setuptools
"""

from djangoformsetjs import __version__

try:
    from setuptools import setup, find_packages
except ImportError:
    from ez_setup import use_setuptools
    use_setuptools()
    from setuptools import setup, find_packages

setup(
    name='django-formset-js',
    version=__version__,
    description='Extend Django formsets with JavaScript',
    author='Ionata Web Solutions',
    author_email='webmaster@ionata.com.au',
    url='https://bitbucket.org/ionata/django-formset-js',

    install_requires=['Django', 'django-jquery-js'],
    zip_safe=False,

    packages=find_packages(),

    include_package_data=True,
    package_data={ },

    classifiers=[
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Framework :: Django',
    ],
)
