---
title: blogs home
layout: collection-home.njk
collection: blogs
---

This is the archive of the blogs I've published so far.


<ul>
{% for blog in collections.blogs %}
<li><a href="{{blog.url}}">{{ blog.data.title }}</a> | {{ blog.data.date }}</li>
{% endfor %}
</ul>