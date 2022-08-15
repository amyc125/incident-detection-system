import uuid
from datetime import date
import firebase_admin 
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("../agent/service-account-file.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

today = date.today()
today = today.strftime("%d-%m-%Y")# convert timestamp to string in dd-mm-yyyy

print("Running alerts scan for: {}".format(today))

def extract_alerts_and_logs():
    alerts = []
    event_logs = []
    
    alert_docs = db.collection('alerts').stream()
    event_log_docs = db.collection(today).stream()

    for doc in alert_docs:
        alert = doc.to_dict()
        alert.update({"alert_doc_id": doc.id})
        alerts.append(alert)

    for doc in event_log_docs:
        log = doc.to_dict()
        log.update({"event_doc_id": doc.id})
        # if condition around if scanned 
        event_logs.append(log)

    return alerts, event_logs


def main():
    all_docs = extract_alerts_and_logs()
    alerts = all_docs[0]
    event_logs = all_docs[1]
    triggered = []

    for alert in alerts:
        print("-" * 20)
        alert_category = alert['alert_category'].replace(" ", "_").lower()
        alert_value = alert['alert_value']
        alert_id = alert['alert_doc_id']
        print("Alert: {} '==' {}".format(alert_category, alert_value))
        print("-" * 20)
        for event_log in event_logs:

            if alert_value == event_log[alert_category]:
                alert = event_log
                alert.update({
                    "alert_category": alert_category, 
                    "alert_value": alert_value,
                    "alert_id": alert_id,
                })
                print(alert)
                print("\n")
                triggered.append(alert)

    for alert in triggered:
         db.collection(u'triggered_alerts').document(str(uuid.uuid4())).set(alert)


if __name__ == "__main__":
    main()
