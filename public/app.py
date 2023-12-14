import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def send_email(sender_email, sender_password, recipient_emails, message='<p>About the meeting</p>', title='About the meeting'):
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = ", ".join(recipient_emails)
    msg["Subject"] = title
    msg.attach(MIMEText(message, "html"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_emails, msg.as_string())

@app.route('/send-mail', methods=['POST'])
def send_mail():
    data = request.get_json()
    message = data.get('message')
    title = data.get('title') 

    sender_email = "abhishekbabhi55@gmail.com"
    sender_password = "ptbb wwzr xcby aghm"
    recipient_emails = ["", ""]

    send_email(sender_email, sender_password, recipient_emails, message, title)
    return 'Email sent successfully'

if __name__ == '__main__':
    app.run(debug=True)
