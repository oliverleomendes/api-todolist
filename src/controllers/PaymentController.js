const { MercadoPagoConfig, Payment } = require('mercadopago')
require('dotenv').config()

class PaymentController{

    processarPagamento(request, response) {
        const { total, descricao, id_metodo_pag, email, id_req_pag } = request.body

        const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP, options: { timeout: 5000, idempotencyKey: 'abc' } })
        const payment = new Payment(client)

        const body = {
            transaction_amount: total,
            additional_info: {
                items: [
                    {
                        id: 'PLANOGOLD2025',
                        title: 'Plano Gold',
                        description: 'Plano Gold',
                        picture_url: 'https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium2x.png',
                        category_id: 'assinaturas',
                        quantity: 1,
                        unit_price: total,
                    }
                ],
                payer: {
                    first_name: 'Test',
                    last_name: 'Test',
                    phone: {
                        area_code: '11',
                        number: '987654321'
                    },
                    address: {
                        street_number: null
                    }
                },
                shipments: {
                    receiver_address: {
                        zip_code: '12312-123',
                        state_name: 'Rio de Janeiro',
                        city_name: 'Buzios',
                        street_name: 'Av das Nacoes Unidas',
                        street_number: 3003
                    }
                }
            },
            description: descricao,
            payment_method_id: id_metodo_pag,
            payer: {
                entity_type: 'individual',
                type: 'customer',
                identification: {
                    type: 'CPF',
                    number: '95749019047'
                },
                email: email
            },
        }

        const requestOptions = {
            idempotencyKey: id_req_pag,
        }

        payment.create({ body, requestOptions }).then(data => {
            console.log(data)
            response.status(200).json({message: "Sucesso"})
        }).catch(console.log)
    }
}

module.exports = new PaymentController()