from rest_framework import serializers
from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            "highlights",
            "action_item_1",
            "action_item_2",
            "created_at",
            "message",
            "tutor_message",
            "speaking_field",
            "listening_field",
            "grammar_field",
            "vocabulary_field",
            "pronunciation_field",
            "recording_url",
        ]