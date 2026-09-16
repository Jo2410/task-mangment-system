export const verifyEmail = (otp: string, title: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${title}</title>
    <!--[if mso]>
    <style type="text/css">
      table { border-collapse: collapse; }
      .fallback-font { font-family: Arial, sans-serif !important; }
    </style>
    <![endif]-->
  </head>
  <body style="margin:0; padding:0; background-color:#eef2f6; font-family: Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      Your Rehabix verification code is inside.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f6; padding:30px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #e2e8f0;">

            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#0d3b4d; padding:34px 20px 26px 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:Arial, Helvetica, sans-serif; font-size:30px; font-weight:bold; letter-spacing:0.5px;">
                      <span style="color:#ffffff;">Rehab</span><span style="color:#5eead4;">ix</span>
                    </td>
                  </tr>
                </table>
                <p style="margin:14px 0 0 0; color:#a7f3d0; font-size:15px; font-family:Arial, Helvetica, sans-serif;">
                  ${title}
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 30px 10px 30px; text-align:center; font-family:Arial, Helvetica, sans-serif;">
                <p style="margin:0 0 20px 0; font-size:15px; color:#334155; line-height:1.6;">
                  Please use the verification code below to continue.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto 20px auto;">
                  <tr>
                    <td style="background-color:#f0fdfa; border:1px solid #5eead4; border-radius:10px; padding:16px 32px;">
                      <span style="font-size:30px; font-weight:bold; letter-spacing:8px; color:#0d3b4d; font-family:Arial, Helvetica, sans-serif;">
                        ${otp}
                      </span>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 6px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
                  Didn't request this? You can safely ignore this email — no changes will be made to your account.
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:20px 30px 0 30px;">
                <hr style="border:none; border-top:1px solid #e2e8f0; margin:0;" />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:20px 30px 30px 30px; font-family:Arial, Helvetica, sans-serif;">
                <p style="margin:0; font-size:12px; color:#94a3b8;">
                  © ${new Date().getFullYear()} Rehabix. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};