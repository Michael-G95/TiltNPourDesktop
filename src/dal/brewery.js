export const createBrewery = (object_id=null,name=null,established=null,street_address=null,town=null,county=null,contry=null,postcode=null,website=null,email=null,telephone=null,
                                facebook=null,twitter=null,instagram=null,trading_as=null,company_number=null,companies_house_url=null,distributors=[])=>{
    return {
        object_id,
        name,
        established,
        street_address,
        town,
        county,
        contry,
        postcode,
        website,
        email,
        telephone,
        facebook,
        twitter,
        instagram,
        trading_as,
        company_number,
        companies_house_url,
        distributors:[

        ]
    }
}

