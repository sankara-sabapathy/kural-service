
export const emailTemplate =  `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <style>
    table, td, div, h1, p {
      font-family: Arial, sans-serif;
    }
    @media screen and (max-width: 530px) {
      .unsub {
        display: block;
        padding: 8px;
        margin-top: 14px;
        border-radius: 6px;
        background-color: #555555;
        text-decoration: none !important;
        font-weight: bold;
      }
      .col-lge {
        max-width: 100% !important;
      }
    }
    @media screen and (min-width: 531px) {
      .col-sml {
        max-width: 27% !important;
      }
      .col-lge {
        max-width: 73% !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:#ffffff;">
  <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#ffffff;">
    <table role="presentation" style="width:100%;border:none;border-spacing:0;">
      <tr>
        <td align="center" style="padding:0;">
          <!--[if mso]>
          <table role="presentation" align="center" style="width:600px;">
          <tr>
          <td>
          <![endif]-->
          <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
            <tr>
              <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://ik.imagekit.io/rw020j6tr/logo_5lMKBvzgZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657084538579" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background-color:#ffffff;">
                <h1 style="margin-top:0;margin-bottom:16px;font-size:small;line-height:32px;font-weight:bold;letter-spacing:-0.02em;"><strong>{{params.line1}}<br>{{params.line2}}</strong></h1>
                <p style="margin:0;font-size:small">
                <strong>குறள் எண்: </strong>{{params.number}}<br>
                <strong>பால்: </strong>{{params.pal}}<br>
                <strong>இயல்: </strong>{{params.iyal}}<br>
                <strong>அதிகாரம்: </strong>{{params.adikaram}}<br><br>
                <strong>{{params.mu_varatha_key}}: </strong>{{params.mu_varatha_value}}<br><br>
                <strong>{{params.mu_karu_key}}: </strong>{{params.mu_karu_value}}<br><br>
                <strong>{{params.salaman_key}}: </strong>{{params.salaman_value}}<br><br>
                <strong>Explanation: </strong>{{params.explanation}}<br>
                </p>
              </td>
            </tr>
            <tr>
            <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
              <p style="margin:0 0 8px 0;"><a href="https://rzp.io/l/hnc9bwqe" style="text-decoration:none;"><img src="https://ik.imagekit.io/rw020j6tr/donate_PNG12_iFWDL8ybD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657389754191&tr=w-1080%2Ch-1080%2Cfo-auto" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a></p>
              <p style="margin:0;font-size:14px;line-height:20px;">&reg; Kural Service 2022<br><a class="unsub" href="https://docs.google.com/forms/d/e/1FAIpQLSfvsJjdAmXbSE7DsS8gl-r2AH8ajQZNmQk6mXIYGFntyU2k8Q/viewform" style="color:#cccccc;text-decoration:underline;">Unsubscribe</a></p>
            </td>
          </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;