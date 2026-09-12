// Livestock Farming Management System - lightweight client-side helper validation.
// This runs in the browser before submit, in addition to the JSR-380 bean
// validation enforced server-side on the Animal / HealthRecord entities.

function confirmDelete(itemLabel) {
    return window.confirm('Are you sure you want to delete "' + itemLabel + '"? This cannot be undone.');
}

function validateWeightField(inputElement) {
    var value = parseFloat(inputElement.value);
    var warningSpan = document.getElementById(inputElement.id + '-jsWarning');

    if (!warningSpan) {
        return;
    }

    if (isNaN(value) || value <= 0) {
        warningSpan.textContent = 'Weight should be a positive number.';
        warningSpan.style.display = 'inline';
    } else {
        warningSpan.textContent = '';
        warningSpan.style.display = 'none';
    }
}
