from rest_framework import serializers
from ..models.taf_machine import MachineModel


class MachineModelSerializer(serializers.Serializer):
    class Meta:
        model = MachineModel
        fields = [
            "machine_name",
            "machine_code",
            "new_record",
            "previous_record",
        ]
        extra_fields = {"machine_id" : {"read_only": True}}
