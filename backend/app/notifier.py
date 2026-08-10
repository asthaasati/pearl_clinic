import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import urllib.request
import urllib.parse

CLINIC_EMAIL = "pearlclinic.jbp@gmail.com"
DOCTOR_PHONE = "9981342401"

def send_email_notification(subject: str, body: str, recipient: str = CLINIC_EMAIL) -> dict:
    """
    Sends an email using standard SMTP (Gmail, Outlook, Custom SMTP).
    Configured via environment variables SMTP_USER and SMTP_PASSWORD.
    """
    smtp_server = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER", CLINIC_EMAIL)
    smtp_password = os.environ.get("SMTP_PASSWORD", "").strip()

    if not smtp_password or smtp_password == "your_16_character_app_password":
        print(f"[EMAIL DISPATCH NOTICE] SMTP_PASSWORD is not set or using placeholder.")
        print(f"[EMAIL DISPATCH NOTICE] Simulated dispatch for: {subject}")
        return {
            "status": "simulated",
            "reason": "SMTP_PASSWORD environment variable missing. Set SMTP_PASSWORD on Render to enable live SMTP delivery.",
            "recipient": recipient
        }

    try:
        msg = MIMEMultipart()
        msg["From"] = f"Pearl Clinic Desk <{smtp_user}>"
        msg["To"] = recipient
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain", "utf-8"))

        context = ssl.create_default_context()
        recipients = list(set([recipient, CLINIC_EMAIL]))

        if smtp_port == 465:
            with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
                server.login(smtp_user, smtp_password)
                server.sendmail(smtp_user, recipients, msg.as_string())
        else:
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls(context=context)
                server.login(smtp_user, smtp_password)
                server.sendmail(smtp_user, recipients, msg.as_string())

        print(f"[EMAIL DISPATCH SUCCESS] Real SMTP Email delivered to {recipients}")
        return {"status": "sent", "recipients": recipients}
    except Exception as e:
        print(f"[EMAIL DISPATCH ERROR] Failed to send email via SMTP: {e}")
        return {"status": "error", "error": str(e)}


def send_whatsapp_notification(phone: str, message: str) -> dict:
    """
    Dispatches WhatsApp notification via configured API webhook or deep link protocols.
    """
    clean_phone = "".join(filter(str.isdigit, str(phone)))
    if len(clean_phone) == 10:
        clean_phone = "91" + clean_phone

    whatsapp_api_url = os.environ.get("WHATSAPP_API_URL", "")
    whatsapp_token = os.environ.get("WHATSAPP_API_TOKEN", "")

    encoded_msg = urllib.parse.quote(message)
    wa_link = f"https://wa.me/{clean_phone}?text={encoded_msg}"
    doctor_wa_link = f"https://wa.me/91{DOCTOR_PHONE}?text={encoded_msg}"

    if whatsapp_api_url and whatsapp_token:
        try:
            req_data = urllib.parse.urlencode({
                "token": whatsapp_token,
                "to": clean_phone,
                "body": message
            }).encode("utf-8")
            req = urllib.request.Request(whatsapp_api_url, data=req_data)
            with urllib.request.urlopen(req, timeout=5) as resp:
                res_body = resp.read().decode("utf-8")
                print(f"[WHATSAPP API SUCCESS] Delivered to +{clean_phone}: {res_body}")
                return {"status": "sent", "target": clean_phone, "api_response": res_body}
        except Exception as e:
            print(f"[WHATSAPP API ERROR] Failed to post to WhatsApp API: {e}")

    print(f"[WHATSAPP DISPATCH] Prepared links for Patient +{clean_phone} and Doctor Desk +91{DOCTOR_PHONE}")
    return {
        "status": "prepared",
        "patient_link": wa_link,
        "doctor_link": doctor_wa_link
    }


def send_sms_notification(phone: str, message: str) -> dict:
    """
    Dispatches SMS notification via SMS gateway HTTP API or generates SMS protocols.
    """
    clean_phone = "".join(filter(str.isdigit, str(phone)))
    sms_api_url = os.environ.get("SMS_API_URL", "")
    sms_api_key = os.environ.get("SMS_API_KEY", "")

    encoded_msg = urllib.parse.quote(message)
    doctor_sms_link = f"sms:+91{DOCTOR_PHONE}?body={encoded_msg}"
    patient_sms_link = f"sms:+{clean_phone}?body={encoded_msg}"

    if sms_api_url and sms_api_key:
        try:
            params = urllib.parse.urlencode({
                "authorization": sms_api_key,
                "message": message,
                "numbers": clean_phone
            })
            req = urllib.request.Request(f"{sms_api_url}?{params}")
            with urllib.request.urlopen(req, timeout=5) as resp:
                res_body = resp.read().decode("utf-8")
                print(f"[SMS API SUCCESS] Delivered SMS to +{clean_phone}: {res_body}")
                return {"status": "sent", "target": clean_phone}
        except Exception as e:
            print(f"[SMS API ERROR] Failed to send SMS: {e}")

    print(f"[SMS DISPATCH] Prepared links for Patient +{clean_phone} and Doctor Desk +91{DOCTOR_PHONE}")
    return {
        "status": "prepared",
        "target": clean_phone,
        "patient_sms_link": patient_sms_link,
        "doctor_sms_link": doctor_sms_link
    }
