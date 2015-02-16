#!/usr/bin/env python
"""
Install django-formset-js using setuptools
"""
import os
import subprocess
import warnings

from distutils.core import Command
from setuptools.command.sdist import sdist
from setuptools import setup, find_packages

from djangoformsetjs import __version__


with open('README') as f:
    readme = f.read()


class MinifyCommand(Command):

    source_js = 'djangoformsetjs/static/js/jquery.formset.js'
    dest_js = 'djangoformsetjs/static/js/jquery.formset.min.js'

    user_options = []

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def minify_js(self):
        map_js = self.dest_js + '.map'
        uglifyjs = './node_modules/.bin/uglifyjs'
        if os.path.exists(uglifyjs):
            try:
                subprocess.check_call([
                    uglifyjs, self.source_js,
                    '-o', self.dest_js,
                    '--source-map', map_js,
                    '--source-map-url', os.path.basename(map_js),
                    '-p', 'relative'])
            except subprocess.CalledProcessError:
                raise SystemExit(1)
        else:
            warnings.warn("uglify-js not found, can not minify JavaScript")
            self.copy_js()

    def copy_js(self):
        import shutil
        shutil.copy(self.source_js, self.dest_js)

    def run(self):
        self.minify_js()


class MinifyAndSdist(sdist):
    sub_commands = sdist.sub_commands + [('minify', None)]


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
    package_data={},

    classifiers=[
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Framework :: Django',
        'License :: OSI Approved :: BSD License',
    ],
    license='BSD',
    cmdclass={
        'sdist': MinifyAndSdist,
        'minify': MinifyCommand,
    },
)
