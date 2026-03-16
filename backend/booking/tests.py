from datetime import date

from django.test import TestCase

from account.models import Student, User

from .models import Plan, Transaction


class TransactionSnapshotTests(TestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='student1', password='password')
		self.student = Student.objects.create(user=self.user, student_number=1, status='active')
		self.plan = Plan.objects.create(
			plan_number='P01',
			name='マイペース',
			base_fee_bank=50000,
			base_fee_card=55000,
			base_max_weeks=8,
			lessons=16,
			conversation_classes=4,
			ten_talk='月2回',
			correction_frequency='週1回',
		)

	def test_transaction_copies_plan_snapshot_on_create(self):
		transaction = Transaction.objects.create(
			student=self.student,
			plan=self.plan,
			payment_method='bank_transfer',
			period_start_date=date(2026, 3, 1),
		)

		self.assertEqual(transaction.plan_number_snapshot, 'P01')
		self.assertEqual(transaction.plan_name_snapshot, 'マイペース')
		self.assertEqual(transaction.price_snapshot, 50000)
		self.assertEqual(transaction.lesson_amount, 16)
		self.assertEqual(transaction.conversation_class_amount, 4)
		self.assertEqual(transaction.ten_talk_snapshot, '月2回')
		self.assertEqual(transaction.correction_frequency_snapshot, '週1回')
		self.assertEqual(transaction.max_weeks_snapshot, 8)
		self.assertEqual(transaction.period_end_date, date(2026, 4, 26))

	def test_transaction_keeps_snapshot_after_plan_update(self):
		transaction = Transaction.objects.create(
			student=self.student,
			plan=self.plan,
			payment_method='bank_transfer',
			period_start_date=date(2026, 3, 1),
		)

		self.plan.name = 'プレミアム'
		self.plan.lessons = 24
		self.plan.base_max_weeks = 12
		self.plan.save()

		transaction.notes = 'updated'
		transaction.save()
		transaction.refresh_from_db()

		self.assertEqual(transaction.plan_name_snapshot, 'マイペース')
		self.assertEqual(transaction.lesson_amount, 16)
		self.assertEqual(transaction.max_weeks_snapshot, 8)
