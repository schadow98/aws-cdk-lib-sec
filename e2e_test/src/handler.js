exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const name = body.name;

    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing 'name' in request body" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `hello ${name}` }),
    };
  } catch (error) {
    console.error("internal server error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
