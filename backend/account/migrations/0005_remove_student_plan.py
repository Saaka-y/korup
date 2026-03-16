from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_rename_student_id_student_student_number_and_more'),
        ('booking', '0006_rename_user_lessonstatus_student_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='plan',
        ),
    ]