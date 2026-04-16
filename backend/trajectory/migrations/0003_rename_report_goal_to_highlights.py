from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("trajectory", "0002_alter_report_unique_together_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="report",
            old_name="goal",
            new_name="highlights",
        ),
        migrations.AlterField(
            model_name="report",
            name="highlights",
            field=models.TextField(help_text="レポートのハイライト"),
        ),
    ]
