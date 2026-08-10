from datetime import datetime, timezone
from uuid import uuid4
from .models import AppointmentCreate, AppointmentRecord, TpaProvider


appointments: list[AppointmentRecord] = []

tpa_providers = [
    TpaProvider(
        name="Star Health",
        type="Cashless TPA",
        status="eligible",
        notes="Cashless pediatric admission desk support available with policy card and ID.",
    ),
    TpaProvider(
        name="Care Health Insurance",
        type="Cashless TPA",
        status="eligible",
        notes="Pre-authorization can be initiated after pediatrician admission advice.",
    ),
    TpaProvider(
        name="HDFC ERGO",
        type="Private Insurance",
        status="eligible",
        notes="Planned and emergency admission verification supported.",
    ),
    TpaProvider(
        name="ICICI Lombard",
        type="Private Insurance",
        status="documentation-needed",
        notes="Bring policy copy, patient ID, previous records and discharge summaries.",
    ),
    TpaProvider(
        name="Medi Assist",
        type="Cashless TPA",
        status="eligible",
        notes="Common employer-linked TPA. Eligibility depends on active policy terms.",
    ),
    TpaProvider(
        name="Raksha TPA",
        type="Cashless TPA",
        status="documentation-needed",
        notes="Verification available. Emergency admission may proceed while documents are checked.",
    ),
    TpaProvider(
        name="CGHS",
        type="CGHS",
        status="eligible",
        notes="CGHS and government scheme guidance available for eligible beneficiaries.",
    ),
    TpaProvider(
        name="Ayushman Bharat",
        type="Government Scheme",
        status="call-clinic",
        notes="Call the clinic desk for current pediatric package and empanelment guidance.",
    ),
]


def is_slot_booked(date: str, doctor: str, time_slot: str) -> bool:
    target_date = date.strip()
    target_doctor = doctor.strip().lower()
    target_slot = time_slot.strip().lower()
    for appt in appointments:
        if (
            appt.date.strip() == target_date
            and appt.doctor.strip().lower() == target_doctor
            and appt.timeSlot.strip().lower() == target_slot
        ):
            return True
    return False


def get_booked_slots(date: str, doctor: str) -> list[str]:
    target_date = date.strip()
    target_doctor = doctor.strip().lower()
    booked = []
    for appt in appointments:
        if (
            appt.date.strip() == target_date
            and appt.doctor.strip().lower() == target_doctor
        ):
            booked.append(appt.timeSlot)
    return booked


def save_appointment(payload: AppointmentCreate) -> AppointmentRecord:
    if is_slot_booked(payload.date, payload.doctor, payload.timeSlot):
        raise ValueError(f"Time slot {payload.timeSlot} on {payload.date} is already booked for {payload.doctor}.")

    record = AppointmentRecord(
        **payload.model_dump(),
        id="PC-" + str(uuid4())[:6].upper(),
        createdAt=datetime.now(timezone.utc),
        status="confirmed",
    )
    appointments.insert(0, record)
    return record


def search_tpa(query: str) -> list[TpaProvider]:
    term = query.strip().lower()
    if not term:
        return tpa_providers[:6]

    return [
        provider
        for provider in tpa_providers
        if term in f"{provider.name} {provider.type} {provider.notes}".lower()
    ]
