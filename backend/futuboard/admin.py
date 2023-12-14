from django.contrib import admin
from .models import Board
#from .models import Restaurant

# Register your models here.
#class RestaurantAdmin(admin.ModelAdmin):
#    fieldsets = [
#        (None,               {'fields': ['name']}),
##        (None,               {'fields': ['address']}),
#        (None,               {'fields': ['latitude']}),
##        (None,               {'fields': ['longitude']})
#    ]
#    list_display = ('name', 'address', 'latitude', 'longitude')
#admin.site.register(Restaurant, RestaurantAdmin)


class BoardAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['boardid']}),
        (None,               {'fields': ['description']}),
        (None,               {'fields': ['title']}),
        (None,               {'fields': ['creator']}),
        (None,               {'fields': ['creation_date']}),
        (None,               {'fields': ['passwordhash']}),
        (None,               {'fields': ['salt']}),
    ]
    list_display = ('title',)
admin.site.register(Board, BoardAdmin)