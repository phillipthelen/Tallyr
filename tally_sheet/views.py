from django.shortcuts import render
from django.views.generic.base import TemplateView
from .models import Item


class PublicView(TemplateView):
    template_name = "public.html"

    def get_context_data(self, **kwargs):
        context = super(PublicView, self).get_context_data(**kwargs)
        context["items_list"] = Item.objects.all().values("pk", "name", "value")
        return context
