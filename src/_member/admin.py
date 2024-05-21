from django.contrib import admin
from .models import Student


class SRN(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an exsisting object
            return list(self.readonly_fields) + ['SRN']
        else:
            return self.readonly_fields


admin.site.register(Student, SRN)
