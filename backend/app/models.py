from datetime import date, datetime
from enum import Enum
from pydantic import BaseModel, Field, field_validator
import re


class ServiceType(str, Enum):
    pediatric_opd = "Pediatric OPD"
    critical_care = "Critical Care"
    vaccination = "Vaccination"
    bronchoscopy = "Bronchoscopy"
    emergency = "Emergency"


class AppointmentCreate(BaseModel):
    doctor: str = Field(default="Dr. Diksha Asati (Pediatrician)")
    service: str = Field(default="Pediatric OPD Consultation")
    patientName: str = Field(min_length=2, max_length=120)
    patientAge: str = Field(min_length=1, max_length=30)
    phone: str
    date: str
    timeSlot: str
    notes: str = Field(default="")

    @field_validator("patientName", "patientAge", "phone", "doctor", "service", "timeSlot", mode="before")
    @classmethod
    def trim_string(cls, value: str) -> str:
        if isinstance(value, str):
            return value.strip()
        return value

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not re.fullmatch(r"[+]?[0-9\s-]{10,16}", value):
            raise ValueError("Enter a valid phone number")
        return value


class AppointmentRecord(AppointmentCreate):
    id: str
    createdAt: datetime
    status: str = "confirmed"


class DirectQueryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str
    message: str = Field(min_length=2, max_length=1000)


class TpaProvider(BaseModel):
    name: str
    type: str
    status: str
    notes: str
