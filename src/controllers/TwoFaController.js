const speakeasy = require('speakeasy')
const qrcode = require('qrcode')

class TwoFaController{

    gerarToken(request, response){
        const secret = speakeasy.generateSecret();
        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            response.json({token: secret.base32, qr_code: data_url})
        })
    }   
    
    validarToken(request, response){
        const { token, secret } = request.body

        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token
        });

        response.json({ verified })
    }

}

module.exports = new TwoFaController()