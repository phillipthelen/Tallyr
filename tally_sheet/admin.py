from django.contrib import admin
from .models import Item, Tally, TallyUser

admin.site.register(Item)
admin.site.register(Tally)
admin.site.register(TallyUser)

