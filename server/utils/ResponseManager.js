class ResponseManager {
  constructor() {
    this._basicResponse = {
      success: false,
      message: "",
      data: {}
    };
  }

  getResponseHandler(res) {
    return {
      onSuccess: (data) => {
        this.respondWithSuccess(res, 200, data);
      },
      onError: (error) => {
        this.respondWithError(
          res,
          error.status || 500,
          error.message || "Unknown error"
        );
      },
      onResourceNotFound: (message) => {
        this.respondWithError(res, 404, message || "Resource not found");
      }
    };
  }

  respondWithSuccess(res, code, data) {
    const response = { ...this._basicResponse, success: true, data };
    res.status(code).json(response);
  }

  respondWithError(res, errorCode, message = "") {
    const response = { ...this._basicResponse, message };
    res.status(errorCode).json(response);
  }
}

module.exports = new ResponseManager();
