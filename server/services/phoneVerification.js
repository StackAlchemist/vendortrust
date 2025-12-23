export async function verifyPhone(phone) {
    if (!phone) return null;
  
    const cleaned = phone.replace(/\D/g, "");
  
    const flags = [];
    let riskScore = 0;
  
    // Nigerian phone format check
    const isValidFormat = /^0[789][01]\d{8}$/.test(cleaned);
  
    if (!isValidFormat) {
      flags.push("Invalid or unusual Nigerian phone format");
      riskScore += 25;
    }
  
    let apiData = null;
  
    // OPTIONAL free RapidAPI lookup (fails safely)
    try {
      const res = await fetch(
        `https://numverify.p.rapidapi.com/validate?number=${cleaned}&country_code=NG`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": "numverify.p.rapidapi.com",
          },
        }
      );
      apiData = await res.json();
    } catch (err) {
      // silent fail (important for MVP)
    }
  
    if (apiData && apiData.valid === false) {
      flags.push("Phone number failed external validation");
      riskScore += 15;
    }
  
    if (apiData?.line_type && apiData.line_type !== "mobile") {
      flags.push("Non-mobile phone line detected");
      riskScore += 10;
    }
  
    return {
      raw: phone,
      normalized: cleaned,
      isValidFormat,
      country: "NG",
      lineType: apiData?.line_type,
      carrier: apiData?.carrier,
      riskScore,
      flags,
    };
  }
  