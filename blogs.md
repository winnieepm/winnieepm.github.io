---
title: blogs home
layout: collection-home.njk
collection: blogs
---

An archive of blogs I've published.


<ul>
{% for blog in collections.blogs %}
<li><a href="{{blog.url}}">{{ blog.data.title }}</a> | {{ blog.data.date }}</li>
{% endfor %}
</ul>