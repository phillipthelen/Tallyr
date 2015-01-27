# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tally_sheet', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tally',
            name='paid_on',
            field=models.DateTimeField(null=True),
            preserve_default=True,
        ),
    ]
