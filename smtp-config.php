<?php
/**
 * SAIM BAIG - SMTP CONFIGURATION SETTINGS (GMAIL / CPANEL / SENDGRID)
 * File: smtp-config.php
 * 
 * Instructions:
 * If hosting on standard PHP server or Apache/Nginx, you can configure your SMTP credentials here.
 */

return [
    'smtp_host'     => 'smtp.gmail.com',         // e.g. smtp.gmail.com
    'smtp_port'     => 587,                      // 587 (TLS) or 465 (SSL)
    'smtp_auth'     => true,
    'smtp_user'     => 'saimkd1211@gmail.com',   // Your Gmail or SMTP Email
    'smtp_pass'     => 'YOUR_GMAIL_APP_PASSWORD',// Gmail App Password (16-digits)
    'recipient_email' => 'saimkd1211@gmail.com',
    'recipient_name'  => 'Saim Baig'
];
