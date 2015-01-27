from django.shortcuts import render
from django.views.generic.base import TemplateView


class PublicView(TemplateView):
    template_name = "public.html"
