from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from .models import AppointmentCreate, DirectQueryCreate
from .store import get_booked_slots, save_appointment, search_tpa
from .notifier import send_email_notification, send_whatsapp_notification, send_sms_notification


app = FastAPI(
    title="Pearl Clinic API",
    version="1.0.0",
    description="Python backend for appointments, automated notifications, and TPA checks.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "pearl-clinic-api"}


@app.get("/api/appointments/booked-slots")
def fetch_booked_slots(date: str = Query(...), doctor: str = Query(...)):
    slots = get_booked_slots(date, doctor)
    return {"date": date, "doctor": doctor, "bookedSlots": slots}


@app.post("/api/appointments", status_code=201)
def create_appointment(payload: AppointmentCreate):
    try:
        appointment = save_appointment(payload)

        msg_body = (
            f"PEARL CLINIC APPOINTMENT CONFIRMATION\n"
            f"Appointment ID: {appointment.id}\n"
            f"Doctor: {payload.doctor}\n"
            f"Service: {payload.service}\n"
            f"Date: {payload.date}\n"
            f"Time Slot: {payload.timeSlot}\n"
            f"Patient: {payload.patientName} (Age: {payload.patientAge})\n"
            f"Phone: {payload.phone}\n"
            f"Notes: {payload.notes or 'None'}\n\n"
            f"Location: Pearl Clinic, Scheme No 54, Vijay Nagar, Jabalpur, MP 482002\n"
            f"Helpline: +91 9981342401 | Email: pearlclinic.jbp@gmail.com"
        )

        email_res = send_email_notification(
            subject=f"New Appointment Booking #{appointment.id} - {payload.patientName}",
            body=msg_body
        )

        wa_res = send_whatsapp_notification(payload.phone, msg_body)
        sms_res = send_sms_notification(payload.phone, msg_body)

        return {
            "message": "Appointment confirmed. Notifications dispatched to WhatsApp, SMS, and Email.",
            "appointment": appointment,
            "notifications": {
                "email": email_res,
                "whatsapp": wa_res,
                "sms": sms_res,
                "patientWhatsapp": f"Dispatched to +91 {payload.phone}",
                "doctorWhatsapp": "Dispatched to +91 9981342401",
                "patientSms": f"Dispatched to +91 {payload.phone}",
                "doctorSms": "Dispatched to +91 9981342401",
                "emailTarget": "pearlclinic.jbp@gmail.com"
            }
        }
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))


@app.post("/api/messages/direct-query", status_code=200)
def handle_direct_query(payload: DirectQueryCreate):
    msg_body = (
        f"📩 NEW DIRECT CLINIC QUERY\n\n"
        f"👤 SENDER DETAILS:\n"
        f"Name: {payload.name}\n"
        f"Phone: {payload.phone}\n\n"
        f"💬 QUERY / MESSAGE:\n"
        f"{payload.message}\n\n"
        f"📍 Sent from Pearl Clinic Website\n"
        f"Helpline: +91 9981342401 | Email: pearlclinic.jbp@gmail.com"
    )

    email_res = send_email_notification(
        subject=f"Direct Query from {payload.name} ({payload.phone})",
        body=msg_body
    )

    wa_res = send_whatsapp_notification(payload.phone, msg_body)
    sms_res = send_sms_notification(payload.phone, msg_body)

    return {
        "status": "success",
        "message": "Message sent successfully!",
        "notifications": {
            "email": email_res,
            "whatsapp": wa_res,
            "sms": sms_res,
            "patientWhatsapp": f"Dispatched to +91 {payload.phone}",
            "doctorWhatsapp": "Dispatched to +91 9981342401",
            "patientSms": f"Dispatched to +91 {payload.phone}",
            "doctorSms": "Dispatched to +91 9981342401",
            "emailTarget": "pearlclinic.jbp@gmail.com"
        }
    }


@app.get("/api/tpa-check")
def tpa_check(query: str = Query(default="")):
    matches = search_tpa(query)
    return {
        "query": query,
        "eligible": any(match.status == "eligible" for match in matches),
        "count": len(matches),
        "matches": matches,
    }
