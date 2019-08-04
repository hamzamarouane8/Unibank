import axios from 'axios';

const instanceAuth = axios.create({baseURL: 'http://localhost:9090/api/v1/auth'});
const instanceAccount = axios.create({baseURL: 'http://localhost:7070/api/v1/accounts'});
const instancelocations = axios.create({baseURL: 'http://localhost:8090/api/v1/branches'});
const instanceVirement = axios.create({baseURL: 'http://localhost:6060/api/v1/transfer'});
const instanceOperations = axios.create({baseURL: 'http://localhost:5050/api/v1'});
const instanceBeneficiary = axios.create({baseURL: 'http://localhost:8080/api/v1/beneficiary'});
const instanceCheckbook = axios.create({baseURL: 'http://localhost:6162/api/v1/checkbook-orders'});

const BOUCHON = true

const mapAuthError = (message) => {
  if (message != null && message === 'errors.no.credentials') {
    return "login or password is empty."
  } else if (message != null && message === 'AUTH02') {
    return "veuillez vérifier votre identifiant et/ou mot de passe"
  } else if (message != null && message === 'AUTH03') {
    return 'veuillez vérifier votre identifiant et/ou mot de passe';
  } else if (message != null && message === 'AUTH01') {
    return "mot de passe incorrect. A la troisiéme saisie erronée votre compte sera bloqué"
  } else if (message != null && message === 'AUTH04') {
    return "vous avez saisit trois fois de suite un mauvais mot de passe. Votre compte et bloqué , veuillez contacter le centre de service client"
  }
  return "Erreur d'authentification"
}
const mapBeneficiaryError = (message) => {
  if (message != null && message === 'errors.beneficiary.customernumber.invalid') {
    return "veuillez vérifier votre id."
  } else if (message != null && message === 'errors.beneficiary.beneficiaryrib.invalid') {
    return "veuillez vérifier votre Rib."
  } else if (message != null && message === 'errors.beneficiary.firstname.invalid') {
    return 'veuillez vérifier votre prenom';
  } else if (message != null && message === 'errors.beneficiary.name.invalid') {
    return "veuillez vérifier votre nom"
  } else if (message != null && message === 'errors.beneficiary.notfound') {
    return "Le rib que vous avez saisi est introuvable dans notre base de données."
  } else if (message != null && message === 'errors.beneficiary.beneficiaryaccountid.invalid') {
    return "veuillez vérifier votre numero de compte."
  }

  return "Erreur de la gestion beneficifiare"
}
const mapVirementError = (message) => {
  if (message != null && message === 'error.transfer.amount.invalid') {
    return "Le montant saisi est invalide."
  } else if (message != null && message === 'error.transfer.scheduledat.invalid') {
    return "La date choisie est Invalide."
  } else if (message != null && message === 'error.transfer.account.invalid') {
    return "Le numéro de compte est Invalid."
  }else if (message != null && message === 'error.transfer.scheduleduntil.invalid') {
    return "La date fin est Invalide."
  } else if (message != null && message === 'error.transfer.beneficiaryrib.invalid') {
    return "Le RIB bénéficiaire est Invalide."
  }else if (message != null && message === 'error.transfer.insufficient.funds') {
    return "Le montant de votre virement dépasse le solde de votre compte  "
  }
return "Erreur de Virement"
}

export const login = ({username, password}) => {

  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      if (username === 'user001' && password === 'user001') {
        resolve({
          id: 1,
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExMTExMSIsIm1haWwiOiJyZWRhQGFkYXJpLmZyIiwidXNlcm5hbWUiOiIxMTExMTExMSJ9.AK_A4POrInL5BB8C65qHExRI5ZGAB-_E1XMkzusH7PY'
        })
      } else {
        reject(new Error('errors.password.not.valid'))
      }
    })
  } else {
    return instanceAuth.post('/', {username, password}).then((response) => {
      return response.data
    }).catch((err) => {
      if (err.response) {
        throw new Error(mapAuthError(err.response.data.error))
      }
      throw err;
    })
  }
}

export const geoList = ()  =>{
  if(BOUCHON){
    return new Promise((resolve,reject) =>{
      var latitude =true
      if(latitude){
        resolve({
            "dabs": [
              {
                dabId: "11111111",
                name: "Guichets automatique",
                address: {
                  country: "Cameroun",
                  locality: "Yaoundé",
                  region: "CENTRE",
                  postalCode: "98052",
                  streetAddress: "Ancien palais presidentiel. BP 12 798"
                },
                status: "ACTIVE",
                services: "Guichets automatique multifonction;Western Union",
                longitude: "-7.578313",
                latitude: "33.575453"
              },
              {
                dabId: "11111112",
                name: "Guichets automatique",
                address: {
                  country: "Cameroun",
                  locality: "Yaoundé",
                  region: "CENTRE",
                  postalCode: "98052",
                  streetAddress: "Ancien palais presidentiel. BP 12 798"
                },
                status: "ACTIVE",
                services: "Guichets automatique multifonction;Western Union",
                longitude: "-7.56629",
                latitude: "33.5925"
              },{
                dabId: "11111113",
                name: "Guichets automatique",
                address: {
                  country: "Cameroun",
                  locality: "Yaoundé",
                  region: "CENTRE",
                  postalCode: "98052",
                  streetAddress: "Ancien palais presidentiel. BP 12 798"
                },
                status: "ACTIVE",
                services: "Guichets automatique multifonction;Western Union",
                longitude: "-7.56686",
                latitude: "33.58582"
              },
              {
                dabId: "11111114",
                name: "Guichets automatique",
                address: {
                  country: "Cameroun",
                  locality: "Yaoundé",
                  region: "CENTRE",
                  postalCode: "98052",
                  streetAddress: "Ancien palais presidentiel. BP 12 798"
                },
                status: "ACTIVE",
                services: "Guichets automatique multifonction;Western Union",
                longitude: "-7.57571",
                latitude: "33.58558"
              },
              {
                dabId: "11111115",
                name: "Guichets automatique",
                address: {
                  country: "Cameroun",
                  locality: "Yaoundé",
                  region: "CENTRE",
                  postalCode: "98052",
                  streetAddress: "Ancien palais presidentiel. BP 12 798"
                },
                status: "ACTIVE",
                services: "Guichets automatique multifonction;Western Union",
                longitude: "-7.548406",
                latitude: "33.583198"
              },
              {
                dabId: "22222221",
                name: "Guichets automatique",
                address: {
                  country: "Ghana",
                  locality: "Adabraka",
                  region: "Grand Accra",
                  postalCode: "3920",
                  streetAddress: "Kwame Nkrumah Avenue, Near Adabraka Police Station"
                },
                status: "ACTIVE",
                services: "Guichets automatique multifonction;Western Union",
                longitude: "-7.572124",
                latitude: "33.580202"
              }
            ]
          }

        )
      }else{
        reject(new Error('errors.password.not.valid'))
      }
    })
  }else{
    return  instancelocations.get('/')
      .then((response) =>  {
        return response.data
      })

  }
}

export const virement = (data,token) => {
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      var valid =false
      if (valid) {
        resolve({accountId: '', details :[{beneficiaryRIB:'',amount:'',reason:''}] ,reason:'',scheduledAt	:'',scheduledUntil:''})
      } else {
        reject(new Error('amout is not valid'))
      }
    })
  } else {
    let dataInput ={accountId: data.accountTransmitter, details :[{beneficiaryRIB:data.accountReceiver,amount:data.amount,reason:data.pattern}] ,reason:data.pattern,scheduledAt	:data.date_vir,scheduledUntil:''}
    return instanceVirement.post('/',dataInput, {headers: {Authorization: 'Bearer ' + token}}  ).then((response) => {
      return response.data
    }).catch((err) => {
      if (err.response) {
        throw new Error(mapVirementError(err.response.data.message))
      }
      throw err;
    })
  }
}

export const accounts = (token) => {
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      var valid =true
      if (valid) {
      return  resolve({accounts: [
            {
              accountId: "3601236547893232",
              iban: "7.780360123654789E21",
              name: "REDA ADARI",
              details: "DB",
              plafond:1500,
              linkedAccount: "7.780360123654755E21",
              usage: "DB",
              cashAccountType: "Compte Cheque",
              currency: "MAD",
              product: "GOLD",
              psuStatus: "A",
              customerNumber: "11111111",
              stoppageStatus: "CLOSE",
              availableBalance: 25000000,
              ibanAccountKey: "500",
              branchCode: "780",
              balances: [
                {
                  balanceId: 111,
                  accountId: "3601236547893232",
                  name: "REDA ADARI",
                  amount: 25000000,
                  currency: "MAD",
                  balanceType: "CR",
                  lastCommitedTransaction: "5321",
                  lastChangeDateTime: "2016-11-16T00:00:00.000+0000",
                  referenceDate: "2016-11-16T00:00:00.000+0000"
                }
              ]
            },
            {
              accountId: "36012987458932321",
              iban: "7.560360129874589E21",
              name: "Issam Louhman",
              details: "CR",
              plafond:1500,
              linkedAccount: "7.780360123654789E21",
              usage: "DB",
              cashAccountType: "Compte courant",
              currency: "MAD",
              product: "GOLD",
              psuStatus: "A",
              customerNumber: "11111111",
              stoppageStatus: "CLOSE",
              availableBalance: 1400,
              ibanAccountKey: "700",
              branchCode: "560",
              balances: [
                {
                  balanceId: 112,
                  accountId: "3601298745893232",
                  name: "REDA ADARI",
                  amount: 30000,
                  currency: "EUR",
                  balanceType: "CR",
                  lastCommitedTransaction: "5521",
                  lastChangeDateTime: "2016-11-18T00:00:00.000+0000",
                  referenceDate: "2016-11-16T00:00:00.000+0000"
                }
              ]
            },{
            accountId: "3601236547893232099",
            iban: "7.780360123654789E767676721",
            name: "REDA ADARI",
            details: "CR",
            linkedAccount: "7.780360123654755E21",
            usage: "DB",
            plafond:1500,
            cashAccountType: "Compte courant",
            currency: "MAD",
            product: "GOLD",
            psuStatus: "A",
            customerNumber: "11111111",
            stoppageStatus: "CLOSE",
            availableBalance: 900000,
            ibanAccountKey: "500",
            branchCode: "780",
            balances: [
              {
                balanceId: 111,
                accountId: "3601236547893232",
                name: "REDA ADARI",
                amount: 25000000,
                currency: "MAD",
                balanceType: "CR",
                lastCommitedTransaction: "5321",
                lastChangeDateTime: "2016-11-16T00:00:00.000+0000",
                referenceDate: "2016-11-16T00:00:00.000+0000"
              }
            ]
          },
          {
            accountId: "360129874589323245",
            iban: "7.560360129874589E21678",
            name: "Issam Louhman",
            details: "CR",
            linkedAccount: "7.780360123654789E21",
            usage: "CR",
            plafond:1500,
            cashAccountType: "Compte courant",
            currency: "MAD",
            product: "GOLD",
            psuStatus: "A",
            customerNumber: "11111111",
            stoppageStatus: "CLOSE",
            availableBalance: 3008900,
            ibanAccountKey: "700",
            branchCode: "560",
            balances: [
              {
                balanceId: 112,
                accountId: "3601298745893232",
                name: "REDA ADARI",
                amount: 30000,
                currency: "EUR",
                balanceType: "CR",
                lastCommitedTransaction: "5521",
                lastChangeDateTime: "2016-11-18T00:00:00.000+0000",
                referenceDate: "2016-11-16T00:00:00.000+0000"
              }
            ]
          }]})
      } else {
        reject(new Error('errors.password.not.valid'))
      }
    })
  } else {
    return instanceAccount.get('/', {headers: {Authorization: 'Bearer ' + token}})
      .then((response) => {
        return response.data
      })
  }
}

export const historyById =(token,accountId)=>{
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      var valid =true
      if (valid) {
        return  resolve({operations: [
            {
              test:accountId,
              operationId: "3601236547893232",
              name: "Caffee Latte- Starbucks",
              date: "20/07/2018",
              dateVal: "20/07/2018",
              timeExact: "08:15",
              balance: "35.50",
              currency: "MAD",
            },
            {test:accountId,
              operationId: "3601236547893232",
              name: "Paiement des factures d'éléctricité de l'ONEE",
              date: "20/07/2018",
              dateVal: "20/07/2018",
              timeExact: "20:40",
              balance: "322.10",
              currency: "MAD",
            },{test:accountId,
              operationId: "3601236547893232",
              name: "Apple iSpot - Iphone X",
              date: "20/08/2018",
              dateVal: "20/07/2018",
              timeExact: "15:10",
              balance: "1050.64",
              currency: "MAD",
            },
            {test:accountId,
              operationId: "3601236547893232",
              name: "Netflix - dashboard design",
              date: "20/09/2018",
              dateVal: "20/07/2018",
              timeExact: "23:36",
              balance: "105.90",
              currency: "MAD",
            }]})
      } else {
        reject(new Error('errors.password.not.valid'))
      }
    })
  } else {
    var operationId= '/'+accountId+'/operations';
    return instanceOperations.get(operationId, {headers: {Authorization: 'Bearer ' + token}})
      .then((response) => {
        return response.data
      })
  }
}

export const beneficiaires = (token) => {
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      var valid =true
      if (valid) {
      return  resolve({ beneficiaries: [
          {
            beneficiaryRIB: "147852369987456321456987",
            beneficiaryName: "BENALI AHMED",
            beneficiaryFirstName: "Ahmed",
            tel: "06100532325",
            business: false
          },
          {
            beneficiaryRIB: "159951159951147856987412",
            beneficiaryName: "HAMZA MAROUANE",
            beneficiaryFirstName: "Hamza",
            tel: "0661059898",
            business: false
          }
        ]})
      } else {
        reject(new Error(''))
      }
    })
  } else {
    return instanceBeneficiary.get('/beneficiaries', {headers: {Authorization: 'Bearer ' + token}})
      .then((response) => {
        return response.data
      }).catch((err) => {
        if (err.response) {
          throw new Error(mapBeneficiaryError(err.response.data.message))
        }
        throw err;
      })
  }
}

export const addBeneficiairy = (user,data) => {
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      var valid =true
      if (valid) {
        resolve({
              beneficiaryRIB: "147852369987456321456987",
              beneficiaryName: "BENALI AHMED",
              beneficiaryFirstName: "Ahmed",
              tel: "06100532325",
              business: false
          })
      } else {
        reject(new Error(''))
      }
    })
  } else {
    let dataInput ={
      customerNumber:user.id,
      accountId:data.toggle ? data.numAccount:null,
      beneficiaryRIB:!data.toggle ?data.rib:null,
      beneficiaryName :data.typeBeneficiary==='Personne Physique'?data.lname:data.raison ,
      beneficiaryFirstName:data.fname ,
      tel	:"",
      business:data.typeBeneficiary==='Personne Physique'?false:true}
    return instanceBeneficiary.post('/add',dataInput, {headers: {Authorization: 'Bearer ' + user.token}}  ).then((response) => {
      return response.data
    }).catch((err) => {
      if (err.response) {
        throw new Error(mapBeneficiaryError(err.response.data.message))
      }
      throw err;
    })
  }
}
export const deleteBeneficiairy = (token,listBeneficiaries) => {
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      console.log('data final',listBeneficiaries)

      var valid =true
      if (valid) {
        resolve({
          beneficiaryRIB: "147852369987456321456987",
        })
      } else {
        reject(new Error(''))
      }
    })
  } else {
    let dataInput ={beneficiaryRIB: listBeneficiaries}
    return instanceBeneficiary.post('/delete',dataInput,{headers: {Authorization: 'Bearer ' + token}}).then((response) => {
      return response.data
    }).catch((err) => {
      if (err.response) {
        throw new Error(mapBeneficiaryError(err.response.data.message))
      }
      throw err;
    })
  }
}

export const chequebooks = (token,accountId) => {
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      var valid =true
      if (valid) {
        return  resolve({
          checkBookOrders: [
            {
              ckeckBookOrderId: "11111111",
              orderDate: "2011-01-18 00:00:00.0",
              type: "cheque normal",
              accountId: "3601236547893232",
              capacity: "40 sheet",
              archived: false,
              status: "pending"
            },
            {
              ckeckBookOrderId: "22222222",
              orderDate: "2011-01-18 00:00:00.0",
              type: "cheque normal",
              accountId: "36012987458932321",
              capacity: "40 sheet",
              archived: false,
              status: "pending"
            },
            {
              ckeckBookOrderId: "33333333",
              orderDate: "2011-01-18 00:00:00.0",
              type: "cheque normal",
              accountId: "1234567",
              capacity: "20 sheet",
              archived: false,
              status: "success"
            }
          ],
          checkbookOrder: null})
      } else {
        reject(new Error('error'))
      }
    })
  } else {
    return instanceCheckbook.get(`/list`, {headers: {Authorization: 'Bearer ' + token}})
      .then((response) => {
        return response.data
      }).catch((err) => {
        if (err.response) {
          throw new Error(err.response)
        }
        throw err;
      })
  }
}

export const addChequebook = (user,data) => {
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      var valid =true
      if (valid) {
        resolve({})
      } else {
        reject(new Error('error'))
      }
    })
  } else {
    let dataInput ={
      accountId:data.accountChequebook ,
      type:data.type,
      capacity:data.typepages,
      }
      console.log('data',dataInput)
    return instanceCheckbook.post('/add',dataInput, {headers: {Authorization: 'Bearer ' + user.token}}  ).then((response) => {
      return response.data
    }).catch((err) => {
      if (err.response) {
        throw new Error(err.response)
      }
      throw err;
    })
  }
}
export const cancelChequebook = (user,checkbookId) => {
  if (BOUCHON) {
    return new Promise((resolve, reject) => {
      var valid =true
      if (valid) {
        resolve({})
      } else {
        reject(new Error('error'))
      }
    })
  } else {
    return instanceCheckbook.get(`/${checkbookId}/cancel`, {headers: {Authorization: 'Bearer ' + user.token}}  ).then((response) => {
      return response.data
    }).catch((err) => {
      if (err.response) {
        throw new Error(err.response)
      }
      throw err;
    })
  }
}
