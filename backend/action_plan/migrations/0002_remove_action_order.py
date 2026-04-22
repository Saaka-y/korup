from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("action_plan", "0001_initial"),
    ]

    operations = [
        # 先に order を参照している制約を削除する
        migrations.RemoveConstraint(
            model_name="action",
            name="uq_action_order_per_final_goal",
        ),
        migrations.RemoveConstraint(
            model_name="action",
            name="uq_action_order_per_milestone",
        ),
        # 制約が消えてからカラムを削除する
        migrations.RemoveField(
            model_name="action",
            name="order",
        ),
        # ordering メタも不要になったので削除
        migrations.AlterModelOptions(
            name="action",
            options={},
        ),
    ]
