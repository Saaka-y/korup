(function () {
    function getField(name) {
        return document.getElementById('id_' + name);
    }

    function selectedPlanData() {
        const planField = getField('plan');
        if (!planField) {
            return null;
        }

        const selectedOption = planField.options[planField.selectedIndex];
        if (!selectedOption || !selectedOption.value) {
            return null;
        }

        return selectedOption.dataset;
    }

    function setValue(fieldName, value) {
        const field = getField(fieldName);
        if (!field) {
            return;
        }
        field.value = value ?? '';
    }

    function calculatePrice(data) {
        const paymentMethodField = getField('payment_method');
        const paymentMethod = paymentMethodField ? paymentMethodField.value : '';

        if (paymentMethod === 'credit_card') {
            return data.baseFeeCard || '';
        }
        if (paymentMethod === 'bank_transfer') {
            return data.baseFeeBank || '';
        }
        return data.baseFeeBank || data.baseFeeCard || '';
    }

    function calculateEndDate(startDateValue, maxWeeks) {
        if (!startDateValue || !maxWeeks) {
            return '';
        }

        const startDate = new Date(startDateValue + 'T00:00:00');
        if (Number.isNaN(startDate.getTime())) {
            return '';
        }

        startDate.setDate(startDate.getDate() + Number(maxWeeks) * 7);
        return startDate.toISOString().slice(0, 10);
    }

    function updateSnapshotFields() {
        const data = selectedPlanData();
        if (!data) {
            return;
        }

        setValue('plan_number_snapshot', data.planNumber);
        setValue('plan_name_snapshot', data.planName);
        setValue('price_snapshot', calculatePrice(data));
        setValue('lesson_amount', data.lessons || '');
        setValue('conversation_class_amount', data.conversationClasses || '');
        setValue('ten_talk_snapshot', data.tenTalk || '');
        setValue('correction_frequency_snapshot', data.correctionFrequency || '');
        setValue('max_weeks_snapshot', data.maxWeeks || '');

        const periodStartDateField = getField('period_start_date');
        setValue(
            'period_end_date',
            calculateEndDate(periodStartDateField ? periodStartDateField.value : '', data.maxWeeks || '')
        );
    }

    function refreshDerivedFields() {
        const data = selectedPlanData();
        if (!data) {
            return;
        }

        setValue('price_snapshot', calculatePrice(data));

        const periodStartDateField = getField('period_start_date');
        setValue(
            'period_end_date',
            calculateEndDate(periodStartDateField ? periodStartDateField.value : '', data.maxWeeks || '')
        );
    }

    document.addEventListener('DOMContentLoaded', function () {
        const planField = getField('plan');
        const paymentMethodField = getField('payment_method');
        const periodStartDateField = getField('period_start_date');

        if (planField) {
            planField.addEventListener('change', updateSnapshotFields);
        }
        if (paymentMethodField) {
            paymentMethodField.addEventListener('change', refreshDerivedFields);
        }
        if (periodStartDateField) {
            periodStartDateField.addEventListener('change', refreshDerivedFields);
            periodStartDateField.addEventListener('input', refreshDerivedFields);
        }

        refreshDerivedFields();
    });
})();