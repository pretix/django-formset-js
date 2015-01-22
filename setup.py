#!/usr/bin/env python
"""
Install django-formset-js using setuptools
"""

from djangoformsetjs import __version__

with open('README') as f:
    readme = f.read()

from setuptools import setup, find_packages

setup(
    name='django-formset-js',
    version=__version__,
    description='Extend Django formsets with JavaScript',
    long_description=readme,
    author='Tim Heap',
    author_email='tim@timheap.me',
    url='https://bitbucket.org/tim_heap/django-formset-js',

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
        'License :: OSI Approved :: BSD License',
    ],
    license='BSD',
)
