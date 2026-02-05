import csv
from django.core.management.base import BaseCommand
from account.models import Student
from booking.models import Plan

class Command(BaseCommand):
    help = 'students.csv から Student モデルへ一括インポート'

    def handle(self, *args, **options):
        path = 'csv/students.csv'
        with open(path, encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # プランIDからPlanを取得
                plan = None
                plan_id = row.get('プラン名')
                if plan_id:
                    plan = Plan.objects.filter(plan_id=plan_id).first()
                Student.objects.create(
                    student_id=row.get('生徒ID'),
                    name=row.get('生徒名'),
                    status=row.get('ステータス'),
                    email=row.get('メール'),
                    plan=plan,
                    base_fee=row.get('基本料金') or None,
                    special_fee=row.get('特別料金') or None,
                    final_fee=row.get('最終料金') or None,
                    payment_method=row.get('支払い方法\n（振込/クレカ）'),
                    level=row.get('レベル'),
                    occupation=row.get('職業'),
                    lesson_goal=row.get('レッスン題材（目標）'),
                    hobbies=row.get('趣味・興味'),
                    referral=row.get('経緯'),
                    background=row.get('備考'),
                    notes=row.get('備考'),
                )
        self.stdout.write(self.style.SUCCESS('students.csvのインポートが完了しました'))
