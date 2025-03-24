from utils.custom_exception_handler import CustomExceptionForError

from django.db.models import Q

def evaluate_entry_criteria(stage, request_instance):
    """
        Evaluates the entry criteria for a given approval stage and request.
        Args:
            stage (ApprovalStageModel): The approval stage to evaluate.
            request_instance: The request object to validate against the criteria.
        Returns:
            bool: True if the entry criteria are satisfied, False otherwise.
    """
    entry_criteria = stage.entryCriteria
    print(f"Entry evaluate Criteria: {entry_criteria}")

    if not entry_criteria:
        # No criteria defined, automatically satisfy
        return True

    filter_items = entry_criteria.criteria_items.all()
    query = Q()

    for item in filter_items:
        # Dynamically fetch the field value from the request_instance
        field_value = getattr(request_instance, item.field_name, None)

        if field_value is None:
            # Field does not exist on the request instance
            return False

        operator = item.operator
        filter_value = item.value

        # Build the query dynamically based on the operator
        if operator == "=":
            query &= Q(**{item.field_name: filter_value})
        elif operator == "!=":
            query &= ~Q(**{item.field_name: filter_value})
        elif operator == ">":
            query &= Q(**{f"{item.field_name}__gt": filter_value})
        elif operator == "<":
            query &= Q(**{f"{item.field_name}__lt": filter_value})
        elif operator == ">=":
            query &= Q(**{f"{item.field_name}__gte": filter_value})
        elif operator == "<=":
            query &= Q(**{f"{item.field_name}__lte": filter_value})
        elif operator == "IN":
            query &= Q(**{f"{item.field_name}__in": filter_value})
        elif operator == "NOT IN":
            query &= ~Q(**{f"{item.field_name}__in": filter_value})

    # Evaluate the query dynamically against the request_instance
    return True