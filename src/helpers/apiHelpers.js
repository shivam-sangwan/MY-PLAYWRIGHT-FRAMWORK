class APIHelpers {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  // -------------------------
  // GET
  // -------------------------
  async get(url, { headers = {}, params = {} } = {}) {     //if no headers, params are provided, they will default to an empty object. This allows the method to be called without those arguments when they're not needed...this is called object destructuring with default values.
    const response = await this.apiContext.get(url, {      //actual api call with given url, headers, params.
      params,
    });

    return this.buildResponse(response);
  }

  // -------------------------
  // POST
  // -------------------------
  async post(url, data = null, { headers = {}, params = {} } = {}) {   //data = null: if no data is provided, it will default to null. This allows the method to be called without a data argument when it's not needed.
    const response = await this.apiContext.post(url, {
      data,
      headers,
      params,
    });

    return this.buildResponse(response);
  }

  // -------------------------
  // PUT
  // -------------------------
  async put(url, data = null, { headers = {}, params = {} } = {}) {
    const response = await this.apiContext.put(url, {
      data,
      headers,
      params,
    });

    return this.buildResponse(response);
  }

  // -------------------------
  // DELETE
  // -------------------------
  async delete(url, { headers = {}, params = {} } = {}) {
    const response = await this.apiContext.delete(url, {
      headers,
      params,
    });

    return this.buildResponse(response);
  }

  // -------------------------
  // Storing general Response data in an object
  // -------------------------
  async buildResponse(response) {
    let body;
  
    try {
      body = await response.json();   //response.json(): converts the 'json response body' to JavaScript object. If response is not valid JSON then error.
    } catch {
      body = null;
    }
  
    return {
      status: response.status(),         // 200, 404
      statusText: response.statusText(), // OK, Not Found
      headers: response.headers(),
      url: response.url(),
      ok: response.ok(),                 //gives true if status code is in the range 200-299 (successful response)
      body,
    };
  }
                   
  // -------------------------
  // Auth Helpers
  // -------------------------
  async setAuthToken(token, type = 'Bearer') {
    await this.apiContext.setExtraHTTPHeaders({  //setExtraHTTPHeaders is a method provided by Playwright's API context that allows you to set additional HTTP headers that will be included in all subsequent requests made using that context. In this case, we're setting the Authorization header with the provided token and type (defaulting to 'Bearer').
      Authorization: `${type} ${token}`,
    });
  }


  // -------------------------
  // Domain Helpers
  // -------------------------
  async loginCAP(mobileNumber, dateOfBirth) {
    return this.post('/external/cap/api/login', {   //calling our post method defined above with the login endpoint and the required data (mobileNumber and dateOfBirth)..no headers/params needed for this request.
      mobileNumber,
      dateOfBirth,
    });
  }

  async validateOTP(sessionId, otp) {
    return this.post('/external/cap/api/validate-otp', {
      sessionId,
      otp,
    });
  }

  async getCaseStatus(caseId) {
    return this.get(`/external/cap/api/case/${caseId}/status`);
  }

  async submitApplication(applicationData) {
    return this.post('/external/cap/api/application/submit', applicationData);
  }
}

module.exports = { APIHelpers };